import React from 'react'
import {Modal} from 'antd'
import {observer} from 'mobx-react';


@observer
export default class SupplierUpdateModal extends React.Component{
    state = {

    }

    constructor(props){
        super(props)
    }

    //////////////////////////////////////////////////

    handleUpdate(){
        let supplier_id = this.props.store.supplierById.id
        let company_id = this.props.store.company_id
        let supplier_name = this.refs.supplier_name.value
        let desc = this.refs.desc.value
        let payable = Number(this.refs.payable.value)

        const supplierInfo = {
            company_id:company_id,
            supplier_id:supplier_id,
            supplier_name:supplier_name,
            desc:desc,
            payable:payable
        }

        this.props.store.updateSupplier(supplierInfo)
        this.props.store.closeSupplierUpdateModal()
    }

    handleCancel(){
        this.props.store.closeSupplierUpdateModal()
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
                        <label htmlFor="exampleFormControlSelect1">供应商</label>
                        <input type="text" ref="supplier_name" className="form-control" id="supplierName" disabled="true" defaultValue={this.props.store.supplierById.supplier_name}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="taskDesc">规格明细</label>
                        <input ref="desc" type="text" className="form-control" id="taskDesc" defaultValue={this.props.store.supplierById.desc}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="supplierPayable">应收账户余额</label>
                        <input type="text" ref="payable" className="form-control" id="supplierPayable"  defaultValue={this.props.store.supplierById.payable}/>
                    </div>
                </form>
            </Modal>
        )
    }


}