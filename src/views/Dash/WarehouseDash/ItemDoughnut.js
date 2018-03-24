import React, {Component} from 'react';
import {Doughnut} from 'react-chartjs-2';
import { Table} from 'antd';



const doughnut = {
    labels: [
        'Red',
        'Green',
        'Yellow'
    ],
    datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ],
        hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ]
    }]
};

export default class ItemDoughnut extends Component{
    state = {
        data: [],
        loading: false,
        hasMore: true,
    }

    handleClick(){
        console.log('click')
    }

    render(){
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                render: text => <a onClick={this.handleClick.bind(this)}>{text}</a>,

            },
            {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
            },
            {
                title: 'Address',
                dataIndex: 'address',
                key: 'address',
            },
        ];

        // const data = this.props.store.tasks.map((t, i) => {
        //     return {
        //         key: i,
        //         id:t.id,
        //         client_id:t.client_id,
        //         task_date: moment(t.task_date).format('YYYY-MM-DD'),
        //         due_date: moment(t.due_date).format('YYYY-MM-DD'),
        //         client_name: t.client_name,
        //         task_name: t.task_name,
        //         volume: t.volume,
        //         desc: t.desc,
        //         maker: t.maker,
        //         checker:t.checker,
        //         status:t.status ? '完成' : '未完成',
        //         price:t.price,
        //         sale:t.sale,
        //         saleOpDisable:t.saleOpDisable
        //     }
        //
        // })

        // const columns = [
        //     {
        //         title: '创建日期',
        //         dataIndex: 'task_date',
        //         key: 'task_date',
        //         // render: text => <a href="#">{text}</a>,
        //     },
        //     {
        //         title: '交付日期',
        //         dataIndex: 'due_date',
        //         key: 'due_date',
        //     },
        //     {
        //         title: '客户',
        //         dataIndex: 'client_name',
        //         key: 'client_name',
        //     },
        //     {
        //         title: '任务名称',
        //         dataIndex: 'task_name',
        //         key: 'task_name',
        //     },
        //     {
        //         title: '印量',
        //         dataIndex: 'volume',
        //         key: 'volume',
        //     },
        //     {
        //         title: '规格明细',
        //         dataIndex: 'desc',
        //         key: 'desc',
        //     },
        //     {
        //         title: '制作人',
        //         dataIndex: 'maker',
        //         key: 'maker',
        //     },
        //     {
        //         title: '任务状态',
        //         dataIndex: 'status',
        //         key: 'status',
        //     },
        //     {
        //         title: '单价',
        //         dataIndex: 'price',
        //         key: 'price',
        //     },
        //     {
        //         title: '金额',
        //         dataIndex: 'sale',
        //         key: 'sale',
        //     },
        //     {
        //         title: '审核人',
        //         dataIndex: 'checker',
        //         key: 'checker',
        //     },
        //     {
        //         title: '操作',
        //         key: 'action',
        //         render: (text, record) => (
        //             <span>
        //                 操作 一
        //
        //                 {/*<Popconfirm title="确定删除?" onConfirm={this.onDelete.bind(this,record)}>*/}
        //                 {/*<a>删除</a>*/}
        //                 {/*</Popconfirm>*/}
        //                 <Divider type="vertical"/>
        //                 <button type="button" className="btn btn-primary" onClick={this.showSalesModal.bind(this,record)} disabled={record.saleOpDisable}>录入单价</button>
        //
        //                 <Divider type="vertical"/>
        //                 <button type="button" className="btn btn-danger" onClick={this.showSalesUndoModal.bind(this,record)}>撤销重录</button>
        //             </span>
        //         ),
        //     }];

        const data = [{
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        }, {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        }, {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        }];


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