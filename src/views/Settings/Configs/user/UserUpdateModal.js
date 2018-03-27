import React from 'react'
import {Modal} from 'antd'
import {observer} from 'mobx-react';

@observer
export default class UserUpdateModal extends React.Component{
    state = {

    }

    constructor(props){
        super(props)
    }

    //////////////////////////////////////////////////

    handleUpdate(){
        let user_id = this.props.store.userById.id
        let company_id = this.props.store.company_id
        let user_name = this.refs.user_name.value
        let level = this.refs.level.value

        const userInfo = {
            company_id:company_id,
            user_id:user_id,
            user_name:user_name,
            level:level,
        }

        this.props.store.updateUser(userInfo)
        this.props.store.closeUserUpdateModal()
    }

    handleCancel(){
        this.props.store.closeUserUpdateModal()
    }

    render(){
        return(
            <Modal
                title={this.props.title}
                visible={this.props.visible}
                onOk={this.handleUpdate.bind(this)}
                onCancel={this.handleCancel.bind(this)}
                destroyOnClose={true}
                okText='确定'
                cancelText='取消'>

                <form>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlSelect1">用户名</label>
                        <input type="text" ref="user_name" className="form-control" id="taskName" disabled="true" defaultValue={this.props.store.userById.user_name}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="userLevel">用户权限</label>
                        <select ref="level" className="form-control" defaultValue={this.props.store.userById.level}>
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