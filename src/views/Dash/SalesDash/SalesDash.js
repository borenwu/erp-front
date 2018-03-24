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
export default class SalesDash extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        let companyInfo = {
            company_id: this.props.store.company_id
        }
        this.props.store.fetchSaleToday(companyInfo)
        this.props.store.fetchSaleSoFar(companyInfo)
        this.props.store.fetchSaleEachDay(companyInfo)
    }

    processData(){
        let saleEachDay = this.props.store.saleEachDay
        if(! saleEachDay){
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
            saleEachDay.forEach(record=>{
                data.push(record.total)
                labels.push(moment(record._id).format('YYYY-MM-DD'))
            })
            return {
                data:data.reverse(),
                labels:labels.reverse()
            }
        }

    }


    render() {
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
                    label: '当月每日销售额',
                    backgroundColor: convertHex(brandInfo, 10),
                    borderColor: brandInfo,
                    pointHoverBackgroundColor: '#fff',
                    borderWidth: 2,
                    data: this.processData().data
                }
            ]
        }


        return (
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-lg-6">
                        <div className="card">
                            <div className="card-body pb-0">
                                <h4 className="mb-0">{this.props.store.saleToday}</h4>
                                <p>今日已录入销售额</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-xs-12 col-sm-12 col-lg-6">
                        <div className="card">
                            <div className="card-body pb-0">
                                <h4 className="mb-0">{this.props.store.saleSoFar}</h4>
                                <p>当月累计销售额</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-lg-12">
                        <div className="card">
                            <div className="card-body pb-0">
                                <h4 className="mb-0">9.823</h4>
                                <p>今日已录入销售的任务统计</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-5">
                                        <div className="card-title mb-0">当月销售</div>
                                        <div className="text-muted">{this.props.store.saleLineTime}</div>
                                    </div>
                                </div>
                                <div className="chart-wrapper" style={{height: 300 + 'px', marginTop: 40 + 'px'}}>
                                    <Line data={mainChart} options={mainChartOpts} height={300}/>
                                </div>
                            </div>
                            <div className="card-footer">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}