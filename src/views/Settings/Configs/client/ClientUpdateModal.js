import React from 'react'
import {Modal} from 'antd'
import {observer} from 'mobx-react';


@observer
export default class ClientUpdateModal extends React.Component{
    state = {

    }

    constructor(props){
        super(props)
    }

    //////////////////////////////////////////////////

    handleUpdate(){
        let client_id = this.props.store.clientById.id
        let company_id = this.props.store.company_id
        let client_name = this.refs.client_name.value
        let desc = this.refs.desc.value
        let receivable = Number(this.refs.receivable.value)

        const clientInfo = {
            company_id:company_id,
            client_id:client_id,
            client_name:client_name,
            desc:desc,
            receivable:receivable
        }

        this.props.store.updateClient(clientInfo)
        this.props.store.closeClientUpdateModal()
    }

    handleCancel(){
        this.props.store.closeClientUpdateModal()
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
                        <label htmlFor="exampleFormControlSelect1">客户</label>
                        <input type="text" ref="client_name" className="form-control" id="taskName" disabled="true" defaultValue={this.props.store.clientById.client_name}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="taskDesc">规格明细</label>
                        <input ref="desc" type="text" className="form-control" id="taskDesc" defaultValue={this.props.store.clientById.desc}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="receivable">应收账户余额</label>
                        <input type="text" ref="receivable" className="form-control" id="clientReceivable"  defaultValue={this.props.store.clientById.receivable}/>
                    </div>
                </form>
            </Modal>
        )
    }


}