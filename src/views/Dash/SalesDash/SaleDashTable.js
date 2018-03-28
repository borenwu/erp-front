import React, {Component} from 'react';
import {Table, Popconfirm, Divider} from 'antd';
import {observer} from 'mobx-react';
import moment from 'moment'

@observer
export default class SaleDashTable extends Component{

    render(){
        const data = this.props.store.todayTasks.map((t, i) => {
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
                checker:t.checker,
                price:t.price,
                sale:t.sale,
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
        ];

        return(
            <div>
                <Table columns={columns} dataSource={data}/>
            </div>
        )
    }
}