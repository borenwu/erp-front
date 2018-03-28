import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Line} from 'react-chartjs-2';
import moment from 'moment'

const brandPrimary = '#20a8d8';
const brandSuccess = '#4dbd74';
const brandInfo = '#63c2de';
const brandWarning = '#f8cb00';
const brandDanger = '#f86c6b';

// convert Hex to RGBA
function convertHex(hex, opacity) {
    hex = hex.replace('#', '');
    var r = parseInt(hex.substring(0, 2), 16);
    var g = parseInt(hex.substring(2, 4), 16);
    var b = parseInt(hex.substring(4, 6), 16);

    var result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')';
    return result;
}

@observer
export default class LineChart extends Component{
    constructor(props) {
        super(props)
    }

    componentDidMount(){
        this.props.store.fetchTaskWastesForMonth()
    }

    processData(){
        let taskWastes = this.props.store.taskWastes
        if(! taskWastes){
            let data = [0]
            let labels = ['empty']
            return {
                data:data,
                labels:labels
            }
        }
        else{
            let data = []
            let labels = []
            taskWastes.forEach(record=>{
                if(record.waste_name === this.props.wasteName){
                    console.log('equal')
                    data.push(record.amount)
                    labels.push(moment(record.op_date).format('YYYY-MM-DD'))
                }
            })
            return {
                data:data,
                labels:labels
            }
        }

    }

    render(){
        const mainChartOpts = {
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    gridLines: {
                        drawOnChartArea: false,
                    }
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        maxTicksLimit: 5,
                        stepSize: Math.ceil(Math.max(...this.processData().data) / 10),
                        max: Math.max(...this.processData().data)
                    }
                }]
            },
            elements: {
                point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4,
                    hoverBorderWidth: 3,
                }
            }
        }



        const mainChart = {
            labels: this.processData().labels,
            datasets: [
                {
                    label: `近一个月废料-${this.props.wasteName}`,
                    backgroundColor: convertHex(brandInfo, 10),
                    borderColor: brandInfo,
                    pointHoverBackgroundColor: '#fff',
                    borderWidth: 2,
                    data: this.processData().data
                }
            ]
        }

        return(
            <div className="chart-wrapper" style={{height: 300 + 'px', marginTop: 40 + 'px'}}>
                <Line data={mainChart} options={mainChartOpts} height={300}/>
            </div>
        )
    }
}