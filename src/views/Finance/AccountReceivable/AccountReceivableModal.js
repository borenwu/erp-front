import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Modal} from 'antd'

@observer
export default class AccountReceivableModal extends Component{

    constructor(props) {
        super(props)
    }

    componentDidMount(){
        this.props.store.fetchClients(this.props.store.company_id)
    }

    handleOk(){
        let company_id = this.props.store.company_id
        let client_name = this.refs.client_name.value
        let op_name = this.refs.op_name.value
        let amount = this.refs.amount.value
        let invoice = this.refs.invoice.value
        let maker = this.refs.maker.value

        const accountInfo = {
            company_id:company_id,
            client_name:client_name,
            op_name:op_name,
            amount:amount,
            invoice:invoice,
            maker:maker
        }

        this.props.store.createReceivableCr(accountInfo)
        this.props.store.closeReceivableModal()
    }
    handleCancel(e){
        this.props.store.closeReceivableModal()
    }

    render(){
        return(
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
                        <label htmlFor="exampleFormControlSelect1">客户</label>
                        <select ref="client_name" className="form-control" id="exampleFormControlSelect1">
                            {this.props.store.clients.map((c,i)=>  <option key={i}>{c.client_name}</option>)}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="taskMaker">操作名称</label>
                        <input type="text" ref="op_name" className="form-control" id="accountOp"  readOnly={true} defaultValue={'应收款到账'}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="taskDesc">金额</label>
                        <input ref="amount" type="number" className="form-control" id="accountAmount" placeholder="金额"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="receivable">发票号</label>
                        <input type="text" ref="invoice" className="form-control" id="accountInvoice"  placeholder="发票号"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="taskMaker">记录人</label>
                        <input type="text" ref="maker" className="form-control" id="taskMaker"  readOnly={true} defaultValue={this.props.userName}/>
                    </div>
                </form>
            </Modal>
        )
    }
}