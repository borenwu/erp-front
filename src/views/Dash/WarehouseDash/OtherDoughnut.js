import React, {Component} from 'react';
import {Doughnut} from 'react-chartjs-2';
import { Table} from 'antd';
import {observer} from 'mobx-react';


@observer
export default class PaperDoughnut extends Component{
    handleClick(record){
        this.props.store.handleRatio(record)
    }

    componentDidMount(){
        console.log(this.props.item_name)
        let itemInfo = {
            company_id:this.props.store.company_id,
            item_name:this.props.item_name
        }
        this.props.store.fetchDashItems(itemInfo)
    }

    componentWillUnmount(){
        this.props.store.reset()
    }

    render(){
        const doughnut = {
            labels: [
                '目前剩余量',
                '已用完',

            ],
            datasets: [{
                data: [this.props.store.now, this.props.store.empty],
                backgroundColor: [
                    '#FF6384',
                    '#808080',

                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#808080',

                ]
            }]
        };


        const columns = [
            {
                title: '供应商',
                dataIndex: 'supplier_name',
                key: 'supplier_name',
                render: (text, record) => <a onClick={this.handleClick.bind(this,record)}>{text}</a>
            },
            {
                title: '物料名称',
                dataIndex: 'item_name',
                key: 'item_name',
            },
            {
                title: '物料型号',
                dataIndex: 'item_type',
                key: 'item_type',
            },
            {
                title: '详细描述',
                dataIndex: 'desc',
                key: 'desc',
            },
            {
                title: '单位',
                dataIndex: 'unit',
                key: 'unit',
            },
            {
                title: '库存量',
                dataIndex: 'balance',
                key: 'balance',
            },
        ];

        const data = this.props.store.warehouseDashItems.map((w, i) => {
            return {
                key: i,
                id:w.id,
                supplier_name: w.supplier_name,
                item_name:w.item_name,
                item_type:w.item_type,
                desc: w.desc,
                unit:w.unit,
                init_balance:w.init_balance,
                balance: w.balance,
            }
        })

        return(
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-lg-6">
                    <div className="chart-wrapper">
                        <Doughnut data={doughnut}/>
                    </div>
                </div>

                <div className="col-xs-12 col-sm-12 col-lg-6">
                    <Table columns={columns} dataSource={data} />
                </div>
            </div>

        )
    }
}
