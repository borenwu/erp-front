import React, {Component} from 'react';
import {Table, Popconfirm, Divider} from 'antd';
import moment from 'moment';
import * as messageConfig from '../../../../configs/messageConfig'
import * as companyConfig from '../../../../configs/companyConfig'
import {observer} from 'mobx-react';

@observer
export default class ClientTable extends Component{
    constructor(props){
        super(props)
    }

    onDelete(record){
        this.props.store.deleteClientById(record.id)
    }

    showClientUpdateModal(record) {
        this.props.store.showClientUpdateModal(record)
    }

    render(){
        const data = this.props.store.clients.map((c, i) => {
            return {
                key: i,
                id:c.id,
                client_name: c.client_name,
                desc: c.desc,
                receivable: c.receivable,
            }
        })

        const columns = [
            {
                title: '客户',
                dataIndex: 'client_name',
                key: 'client_name',
            },
            {
                title: '客户描述',
                dataIndex: 'desc',
                key: 'desc',
            },
            {
                title: '应收款余额',
                dataIndex: 'receivable',
                key: 'receivable',
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
                        <a onClick={this.showClientUpdateModal.bind(this,record)}>修改</a>
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
