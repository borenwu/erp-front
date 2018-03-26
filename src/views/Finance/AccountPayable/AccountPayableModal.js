import React, {Component} from 'react';
import {observer} from 'mobx-react';
import moment from 'moment';
import {Modal,Button,DatePicker} from 'antd'

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
        let supplier_name = this.refs.supplier_name.value
        let op_name = this.refs.op_name.value
        let direction = this.refs.direction.value
        let amount = this.refs.amount.value
        let invoice = this.refs.invoice.value
        let maker = this.refs.maker.value

        const accountInfo = {
            company_id:company_id,
            supplier_name:supplier_name,
            op_name:op_name,
            direction:direction,
            amount:amount,
            invoice:invoice,
            maker:maker
        }

        if(direction === '借'){
            console.log(direction)
            this.props.store.createPayableDr(accountInfo)
            this.props.store.closePayableModal()
        }
        if(direction === '贷'){
            console.log(direction)
            this.props.store.createPayableCr(accountInfo)
            this.props.store.closePayableModal()
        }
    }
    handleCancel(e){
        this.props.store.closePayableModal()
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
                        <label>供应商</label>
                        <select ref="supplier_name" className="form-control" id="exampleFormControlSelect1">
                            {this.props.store.suppliers.map((s,i)=>  <option key={i}>{s.supplier_name}</option>)}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>操作名称</label>
                        <select ref="op_name" className="form-control">
                            <option>发生应付款</option>
                            <option>应付款结算</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>借/贷</label>
                        <select ref="direction" className="form-control">
                            <option>借</option>
                            <option>贷</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>金额</label>
                        <input ref="amount" type="number" className="form-control" id="accountAmount" placeholder="金额"/>
                    </div>

                    <div className="form-group">
                        <label>发票号</label>
                        <input type="text" ref="invoice" className="form-control" id="accountInvoice"  placeholder="发票号"/>
                    </div>

                    <div className="form-group">
                        <label>记录人</label>
                        <input type="text" ref="maker" className="form-control" id="taskMaker"  readOnly={true} defaultValue={this.props.userName}/>
                    </div>
                </form>
            </Modal>
        )
    }
}