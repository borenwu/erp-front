import React, {Component} from 'react';
import {Table, Popconfirm, Divider} from 'antd';
import {observer} from 'mobx-react';

@observer
export default class SupplierTable extends Component{
    constructor(props){
        super(props)
    }

    onDelete(record){
        this.props.store.deleteWarehouseItemById(record.id)
    }

    showSupplierUpdateModal(record) {
        this.props.store.showWarehouseUpdateModal(record)
    }

    render(){
        const data = this.props.store.warehouseItems.map((w, i) => {
            return {
                key: i,
                id:w.id,
                supplier_name: w.supplier_name,
                item_name:w.item_name,
                item_type:w.item_type,
                desc: w.desc,
                unit:w.unit,
                balance: w.balance,
            }
        })

        const columns = [
            {
                title: '供应商',
                dataIndex: 'supplier_name',
                key: 'supplier_name',
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
                        <a onClick={this.showSupplierUpdateModal.bind(this,record)}>修改</a>
                    </span>
                ),
            }];
        return(
            <div>
                <Table columns={columns} dataSource={data}/>
            </div>
        )
    }

}
