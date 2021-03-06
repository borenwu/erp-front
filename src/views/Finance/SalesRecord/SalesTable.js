import React, {Component} from 'react';
import {Table, Divider} from 'antd';
import moment from 'moment';
import {observer} from 'mobx-react';

@observer
export default class SalesTable extends React.Component{
    constructor(props){
        super(props)
    }

    onDelete(record){
        this.props.store.deleteTaskById(record.id)
    }

    showSalesModal(record) {
        this.props.store.showSalesModal(record)
    }

    showSalesUndoModal(record){
        this.props.store.showSalesUndoModal(record)
    }


    render(){
        const data = this.props.store.tasks.map((t, i) => {
            return {
                key: i,
                id:t.id,
                client_id:t.client_id,
                task_date: moment(t.task_date).format('YYYY-MM-DD'),
                due_date: moment(t.due_date).format('YYYY-MM-DD'),
                client_name: t.client_name,
                task_name: t.task_name,
                volume: t.volume,
                desc: t.desc,
                maker: t.maker,
                checker:t.checker,
                status:t.status ? '完成' : '未完成',
                price:t.price,
                sale:t.sale,
                saleOpDisable:t.saleOpDisable
            }

        })

        const columns = [
            {
                title: '创建日期',
                dataIndex: 'task_date',
                key: 'task_date',
                // render: text => <a href="#">{text}</a>,
            },
            {
                title: '交付日期',
                dataIndex: 'due_date',
                key: 'due_date',
            },
            {
                title: '客户',
                dataIndex: 'client_name',
                key: 'client_name',
            },
            {
                title: '任务名称',
                dataIndex: 'task_name',
                key: 'task_name',
            },
            {
                title: '印量',
                dataIndex: 'volume',
                key: 'volume',
            },
            {
                title: '规格明细',
                dataIndex: 'desc',
                key: 'desc',
            },
            {
                title: '制作人',
                dataIndex: 'maker',
                key: 'maker',
            },
            {
                title: '任务状态',
                dataIndex: 'status',
                key: 'status',
            },
            {
                title: '单价',
                dataIndex: 'price',
                key: 'price',
            },
            {
                title: '金额',
                dataIndex: 'sale',
                key: 'sale',
            },
            {
                title: '审核人',
                dataIndex: 'checker',
                key: 'checker',
            },
            {
                title: '操作',
                key: 'action',
                fixed: 'right',
                width: 294,
                render: (text, record) => (
                    <span>
                        操作 一
                        <Divider type="vertical"/>
                        <button type="button" className="btn btn-primary" onClick={this.showSalesModal.bind(this,record)} disabled={record.saleOpDisable}>录入单价</button>

                        <Divider type="vertical"/>
                        <button type="button" className="btn btn-danger" onClick={this.showSalesUndoModal.bind(this,record)}>撤销重录</button>
                    </span>
                ),
            }];
        return(
            <div>
                <Table columns={columns} dataSource={data} scroll={{ x: 1600 }}/>
                {/*<DevTools/>*/}
            </div>
        )
    }
}