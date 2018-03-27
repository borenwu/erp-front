import React, {Component} from 'react';
import {Table, Popconfirm, Divider} from 'antd';
import moment from 'moment';
import {observer} from 'mobx-react';

@observer
export default class TaskWastesTable extends Component{
    constructor(props){
        super(props)
    }

    onDelete(record){
        this.props.store.deleteTaskWasteById(record.id)
    }

    showUpdateModal(record) {
        this.props.store.showTaskWastesUpdateModal(record)
    }


    render(){
        const data = this.props.store.taskWastes.map((t, i) => {
            return {
                key: i,
                id:t.id,
                op_date: moment(t.op_date).format('YYYY-MM-DD'),
                waste_name: t.waste_name,
                unit: t.unit,
                amount: t.amount,
                maker: t.maker,
            }

        })

        const columns = [
            {
                title: '创建日期',
                dataIndex: 'op_date',
                key: 'op_date',
                // render: text => <a href="#">{text}</a>,
            },
            {
                title: '废料名称',
                dataIndex: 'waste_name',
                key: 'waste_name',
            },
            {
                title: '单位',
                dataIndex: 'unit',
                key: 'unit',
            },
            {
                title: '数量',
                dataIndex: 'amount',
                key: 'amount',
            },
            {
                title: '记录人',
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
            <div>
                <Table columns={columns} dataSource={data}/>
                {/*<DevTools/>*/}
            </div>
        )
    }
}
