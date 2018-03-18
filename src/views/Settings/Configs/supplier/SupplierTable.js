import React, {Component} from 'react';
import {Table, Popconfirm, Divider} from 'antd';
import moment from 'moment';
// import * as messageConfig from '../../../../configs/messageConfig'
// import * as companyConfig from '../../../../configs/companyConfig'
import {observer} from 'mobx-react';

@observer
export default class SupplierTable extends Component{
    constructor(props){
        super(props)
    }

    onDelete(record){
        this.props.store.deleteSupplierById(record.id)
    }

    showSupplierUpdateModal(record) {
        this.props.store.showSupplierUpdateModal(record)
    }

    render(){
        const data = this.props.store.suppliers.map((s, i) => {
            return {
                key: i,
                id:s.id,
                supplier_name: s.supplier_name,
                desc: s.desc,
                payable: s.payable,
            }
        })

        const columns = [
            {
                title: '供应商',
                dataIndex: 'supplier_name',
                key: 'supplier_name',
            },
            {
                title: '供应商描述',
                dataIndex: 'desc',
                key: 'desc',
            },
            {
                title: '应付款余额',
                dataIndex: 'payable',
                key: 'payable',
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
