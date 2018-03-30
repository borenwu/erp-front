import React, {Component} from 'react';
import {Table, Popconfirm, Divider} from 'antd';
import moment from 'moment';
import {observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';

@observer
export default class WarehouseItemCheckTable extends React.Component{
    constructor(props){
        super(props)
    }

    onDelete(record){
        let status = record.disabled
        if(status == false){
            this.props.store.deleteItemopById(record.id)
        }
        else{
            let company_id = this.props.store.company_id
            let item_id = record.warehouseItem
            let op_id = record.id
            let checker = this.props.userName
            let order = record.order
            let re = record.re

            let itemInfo = {
                company_id:company_id,
                item_id:item_id,
                op_id:op_id,
                checker:checker,
                order:order,
                re:re
            }

            this.props.store.undoItemop(itemInfo)
        }

    }

    onCheck(record){
        let company_id = this.props.store.company_id
        let item_id = record.warehouseItem
        let op_id = record.id
        let checker = this.props.userName
        let order = record.order
        let re = record.re

        let itemInfo = {
            company_id:company_id,
            item_id:item_id,
            op_id:op_id,
            checker:checker,
            order:order,
            re:re
        }
        this.props.store.checkItem(itemInfo)
    }

    showItemCheckUpdateModal(record) {
        this.props.store.showItemCheckUpdateModal(record)
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
                disabled:w.status,
                warehouseItem:w.warehouseItem,
                checker:w.checker,
                check_time:moment(w.check_time).format('YYYY-MM-DD')
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
                fixed: 'left'
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
                title: '审核状态',
                dataIndex: 'status',
                key: 'status',
            },
            {
                title: '审核人',
                dataIndex: 'checker',
                key: 'checker',
            },
            {
                title: '审核时间',
                dataIndex: 'check_time',
                key: 'check_time',
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
                        {
                            record.disabled ?
                                <Popconfirm title="已审核, 确定删除?" onConfirm={this.onDelete.bind(this,record)}>
                                    <a>删除</a>
                                </Popconfirm>
                                :
                                <Popconfirm title="未审核,确定删除?" onConfirm={this.onDelete.bind(this,record)}>
                                    <a>删除</a>
                                </Popconfirm>
                        }


                        <Divider type="vertical"/>
                        <a onClick={this.showItemCheckUpdateModal.bind(this,record)} disabled={record.disabled}>修改</a>


                        <Divider type="vertical"/>
                        <Popconfirm title="审核通过，录入库存?" onConfirm={this.onCheck.bind(this,record)}>
                            <a disabled={record.disabled}>审核通过</a>
                        </Popconfirm>
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