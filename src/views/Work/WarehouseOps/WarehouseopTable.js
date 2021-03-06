import React, {Component} from 'react';
import {Table, Popconfirm, Divider} from 'antd';
import moment from 'moment';
import {observer} from 'mobx-react';


@observer
export default class WarehouseopTable extends React.Component{
    constructor(props){
        super(props)
    }

    onDelete(record){
        this.props.store.deleteItemopById(record.id)
    }

    showItemopUpdateModal(record) {
        this.props.store.showItemopUpdateModal(record)
    }


    render(){
        const data = this.props.store.warehouseItemops.map((w, i) => {
            return {
                key: i,
                id:w.id,
                op_date:moment(w.op_date).format('YYYY-MM-DD'),
                item_name: w.item_name,
                item_type: w.item_type,
                unit: w.unit,
                order: w.order,
                re: w.re,
                use:w.use,
                waste:w.waste,
                reason:w.reason,
                make_time:moment(w.make_time).format('YYYY-MM-DD'),
                maker: w.maker,
                status:w.status ? '已审核' : '未审核',
                disabled:w.status
            }

        })

        const columns = [
            {
                title: '领料日期',
                dataIndex: 'op_date',
                key: 'op_date',
                // render: text => <a href="#">{text}</a>,
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
                title: '单位',
                dataIndex: 'unit',
                key: 'unit',
            },
            {
                title: '领料',
                dataIndex: 'order',
                key: 'order',
            },
            {
                title: '退库',
                dataIndex: 're',
                key: 're',
            },
            {
                title: '使用',
                dataIndex: 'use',
                key: 'use',
            },
            {
                title: '浪费',
                dataIndex: 'waste',
                key: 'waste',
            },
            {
                title: '浪费原因',
                dataIndex: 'reason',
                key: 'reason',
            },
            {
                title: '领料记录人',
                dataIndex: 'maker',
                key: 'maker',
            },
            {
                title: '领料录入时间',
                dataIndex: 'make_time',
                key: 'make_time',
            },
            {
                title: '审核状态',
                dataIndex: 'status',
                key: 'status',
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

                        <Popconfirm title="确定删除?" onConfirm={this.onDelete.bind(this,record)}>
                            <a disabled={record.disabled}>删除</a>
                        </Popconfirm>
                        <Divider type="vertical"/>
                        <a onClick={this.showItemopUpdateModal.bind(this,record)} disabled={record.disabled}>修改</a>
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