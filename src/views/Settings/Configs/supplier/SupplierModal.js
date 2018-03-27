import React from 'react'
import {Modal} from 'antd'
import {observer} from 'mobx-react';

@observer
export default class SupplierModal extends React.Component {
    state = {
    }

    constructor(props) {
        super(props)
    }

    /////////////////////////////////////////////////////////////////////////

    handleOk(){
        let company_id = this.props.store.company_id
        let supplier_name = this.refs.supplier_name.value
        let desc = this.refs.desc.value
        let payable = Number(this.refs.payable.value)

        const supplierInfo = {
            company_id:company_id,
            supplier_name:supplier_name,
            desc:desc,
            payable:payable
        }

        this.props.store.createSupplier(supplierInfo)
        this.props.store.closeSupplierModal()
    }
    handleCancel(e){
        console.log(e);
        this.props.store.closeSupplierModal()
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
                        <label htmlFor="supplierName">供应商</label>
                        <input type="text" ref="supplier_name" className="form-control" id="supplierName"  placeholder="供应商名称"/>
                        <small id="emailHelp" className="form-text text-muted">输入供应商</small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="clientDesc">供应商描述</label>
                        <input ref="desc" type="text" className="form-control" id="clientDesc" placeholder="供应商描述"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="supplierPayable">应付账户余额</label>
                        <input type="text" ref="payable" className="form-control" id="supplierPayable"  placeholder="应付账户余额"/>
                    </div>
                </form>
            </Modal>
        )
    }
}