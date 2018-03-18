import React from 'react'
import {Modal,Button,DatePicker} from 'antd'
import {observer} from 'mobx-react';
import moment from 'moment';
// import * as companyConfig from '../../../../configs/companyConfig'

@observer
export default class ClientModal extends React.Component {
    state = {
    }

    constructor(props) {
        super(props)
    }

    /////////////////////////////////////////////////////////////////////////

    handleOk(){
        let company_id = this.props.store.company_id
        let client_name = this.refs.client_name.value
        let desc = this.refs.desc.value
        let receivable = Number(this.refs.receivable.value)

        const clientInfo = {
            company_id:company_id,
            client_name:client_name,
            desc:desc,
            receivable:receivable
        }

        this.props.store.createClient(clientInfo)
        this.props.store.closeClientModal()
    }
    handleCancel(e){
        console.log(e);
        this.props.store.closeClientModal()
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
                        <label htmlFor="taskName">客户</label>
                        <input type="text" ref="client_name" className="form-control" id="clientName"  placeholder="客户名称"/>
                        <small id="emailHelp" className="form-text text-muted">输入客户名</small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="taskDesc">客户描述</label>
                        <input ref="desc" type="text" className="form-control" id="clientDesc" placeholder="客户描述"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="receivable">应收账户余额</label>
                        <input type="text" ref="receivable" className="form-control" id="clientReceivable"  placeholder="应收账户余额"/>
                    </div>
                </form>
            </Modal>
        )
    }
}