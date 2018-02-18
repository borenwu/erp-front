import React, {Component} from 'react';
import {Table, Popconfirm, Divider} from 'antd';
import moment from 'moment';
import {observer} from 'mobx-react';

@observer
export default class TaskTable extends React.Component{
    constructor(props){
        super(props)
    }

    onDelete(record){
        // const dataSource = [...this.state.dataSource];
        // this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
        console.log(record)
    }

    showUpdateModal(record) {
        console.log(record)
        this.props.store.showUpdateModal(record)
    }

    render(){
        const data = this.props.store.tasks.map((t, i) => {
            return {
                key: i,
                taskDate: moment(t.task_date).format('YYYY-MM-DD'),
                dueDate: moment(t.due_date).format('YYYY-MM-DD'),
                client: t.client_name,
                task: t.task_name,
                volume: t.volume,
                desc: t.desc,
                maker: t.maker
            }

        })

        const columns = [
            {
                title: '创建日期',
                dataIndex: 'taskDate',
                key: 'taskDate',
                // render: text => <a href="#">{text}</a>,
            },
            {
                title: '交付日期',
                dataIndex: 'dueDate',
                key: 'dueDate',
            },
            {
                title: '客户',
                dataIndex: 'client',
                key: 'client',
            },
            {
                title: '任务名称',
                dataIndex: 'task',
                key: 'task',
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
                        操作 一 {record.name}
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