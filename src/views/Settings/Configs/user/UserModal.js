import React from 'react'
import {Modal} from 'antd'
import {observer} from 'mobx-react';

@observer
export default class UserModal extends React.Component {
    state = {
    }

    constructor(props) {
        super(props)
    }

    /////////////////////////////////////////////////////////////////////////

    handleOk(){
        let company_id = this.props.store.company_id
        let user_name = this.refs.user_name.value
        let password = this.refs.password.value
        let level = Number(this.refs.level.value)

        const userInfo = {
            company_id:company_id,
            user_name:user_name,
            password:password,
            level:level
        }

        this.props.store.createUser(userInfo)
        this.props.store.closeUserModal()
    }
    handleCancel(e){
        this.props.store.closeUserModal()
    }



    render() {
        return (
            <Modal
                title={this.props.title}
                visible={this.props.visible}
                onOk={this.handleOk.bind(this)}
                onCancel={this.handleCancel.bind(this)}
                destroyOnClose={true}
                okText='确定'
                cancelText='取消'
            >

                <form>
                    <div className="form-group">
                        <label htmlFor="userName">用户名</label>
                        <input type="text" ref="user_name" className="form-control" id="userName"  placeholder="用户名称"/>
                        <small id="emailHelp" className="form-text text-muted">输入用户名</small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="userPassword">初始密码</label>
                        <input ref="password" type="text" className="form-control" id="userPassword" placeholder="初始密码"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="userLevel">用户权限</label>
                        <select ref="level" className="form-control">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </select>
                    </div>
                </form>
            </Modal>
        )
    }
}