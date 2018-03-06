import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Button, Input} from 'antd'
import './UserSetting.css'
import UserTable from './UserTable'
import UserModal from './UserModal'
import UserUpdateModal from './UserUpdateModal'
import * as companyConfig from '../../../../configs/companyConfig'

const Search = Input.Search;

@observer
export default class UserSetting extends Component{

    constructor(props){
        super(props)
    }

    handleSearch(value){
        console.log(value)
    }

    showUserModal() {
        this.props.store.showUserModal()
    }

    componentDidMount(){
        this.props.store.fetchUsers(companyConfig.companyInfo.company_id)
    }

    render() {
        return (
            <div>
                <div className="table-operations">
                    <label style={{marginRight: 8}}>检索用户名</label>
                    <Search
                        placeholder="输入用户名称"
                        onSearch={this.handleSearch.bind(this)}
                        style={{ width: 200,marginRight: 8}}
                        enterButton
                    />
                    <Button onClick={this.showUserModal.bind(this)}>创建</Button>
                    <UserModal
                        store={this.props.store}
                        title="Basic Modal"
                        visible={this.props.store.userModalVisible}/>
                    <UserUpdateModal
                        store={this.props.store}
                        title="Update Modal"
                        visible={this.props.store.userUpdateModalVisible}
                    />
                </div>
                <UserTable store={this.props.store}/>
            </div>
        )
    }
}