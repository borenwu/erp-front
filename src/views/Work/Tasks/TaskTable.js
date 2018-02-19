import React, {Component} from 'react';
import {Table, Popconfirm, Divider} from 'antd';
import moment from 'moment';
import * as messageConfig from '../../../configs/messageConfig'
import {observer} from 'mobx-react';


@observer
export default class TaskTable extends React.Component{
    constructor(props){
        super(props)
    }

    onDelete(record){
        // const dataSource = [...this.state.dataSource];
        // this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
        // console.log(record.id)
        this.props.store.deleteTaskById(record.id)
    }

    showUpdateModal(record) {
        // console.log(record)
        this.props.store.showUpdateModal(record)
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
                maker: t.maker
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
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                        操作 一
                        <Divider type="vertical"/>

                        <Popconfirm title="确定删除?" onConfirm={this.onDelete.bind(this,record)}>
                            <a>删除</a>
                        </Popconfirm>
                        <Divider type="vertical"/>
                        <a onClick={this.showUpdateModal.bind(this,record)}>修改</a>
                    </span>
                ),
            }];
        return(
            <Table columns={columns} dataSource={data}/>
        )
    }
}