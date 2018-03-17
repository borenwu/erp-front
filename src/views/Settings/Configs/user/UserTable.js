import React, {Component} from 'react';
import {Table, Popconfirm, Divider} from 'antd';
import moment from 'moment';
import * as messageConfig from '../../../../configs/messageConfig'
import * as companyConfig from '../../../../configs/companyConfig'
import {observer} from 'mobx-react';

@observer
export default class UserTable extends Component{
    constructor(props){
        super(props)
    }

    onDelete(record){
        this.props.store.deleteUserById(record.id)
    }

    showUserUpdateModal(record) {
        this.props.store.showUserUpdateModal(record)
    }

    render(){
        const data = this.props.store.users.map((u, i) => {
            return {
                key: i,
                id:u.id,
                user_name: u.user_name,
                level: u.level,
            }
        })

        const columns = [
            {
                title: '用户名',
                dataIndex: 'user_name',
                key: 'user_name',
            },
            {
                title: '权限',
                dataIndex: 'level',
                key: 'level',
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
                        <a onClick={this.showUserUpdateModal.bind(this,record)}>修改</a>
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
