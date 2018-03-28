import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Button, Input} from 'antd'
import './UserSetting.css'
import UserTable from './UserTable'
import UserModal from './UserModal'
import UserUpdateModal from './UserUpdateModal'


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
        this.props.store.fetchUsers(this.props.store.company_id)
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
                        title="添加新用户"
                        visible={this.props.store.userModalVisible}/>
                    <UserUpdateModal
                        store={this.props.store}
                        title="修改用户"
                        visible={this.props.store.userUpdateModalVisible}
                    />
                </div>
                <UserTable store={this.props.store}/>
            </div>
        )
    }
}