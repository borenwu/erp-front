import React from 'react'
import {Modal,Select,Button,DatePicker,message,Input} from 'antd'
import {observer} from 'mobx-react';
import moment from 'moment';

// import * as companyConfig from '../../../configs/companyConfig'

const { Option, OptGroup } = Select;

@observer
export default class WarehouseOpUpdateModal extends React.Component{
    state = {
        dueDate:''
    }

    constructor(props){
        super(props)
    }

    //////////////////////////////////////////////////

    handleUpdate(){
        let op_id = this.props.store.warehouseItemopById.id
        let company_id = this.props.store.company_id
        let item_id = this.props.store.warehouseItemopById.warehouseItem
        let order = this.refs.order.value
        let re = this.refs.re.value
        let use = this.refs.use.value
        let waste = this.refs.waste.value
        let reason = this.refs.reason.value
        let maker = this.refs.maker.value

        let opInfo = {
            op_id:op_id,
            company_id:company_id,
            item_id:item_id,
            order:order,
            re:re,
            use:use,
            waste:waste,
            reason:reason,
            maker:maker
        }
        this.props.store.updateItemop(opInfo)

        this.props.store.closeItemopUpdateModal()
    }

    handleCancel(){
        this.props.store.closeItemopUpdateModal()
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
                        <label htmlFor="itemType">物料型号</label>
                        <Input type="text" disabled={true} className="form-control" value={this.props.store.warehouseItemopById.item_type}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="itemType">供应商</label>
                        <Input type="text" disabled={true} className="form-control" value={this.props.store.warehouseItemopById.supplier_name}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="itemName">物料名称</label>
                        <Input type="text" disabled={true} className="form-control" value={this.props.store.warehouseItemopById.item_name}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="itemUnit">单位</label>
                        <Input type="text" disabled={true} className="form-control" value={this.props.store.warehouseItemopById.unit}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="itemOrder">领料</label>
                        <input ref="order" type="number" className="form-control"  id="itemOrder" defaultValue={this.props.store.warehouseItemopById.order}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="itemRe">退库</label>
                        <input ref="re" type="number" className="form-control" id="itemRe"  defaultValue={this.props.store.warehouseItemopById.re}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="itemUse">实际使用</label>
                        <input ref="use" type="number" className="form-control" id="itemUse"  defaultValue={this.props.store.warehouseItemopById.use}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="itemWaste">浪费</label>
                        <input ref="waste" type="number" className="form-control" id="itemWaste" defaultValue={this.props.store.warehouseItemopById.waste}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="itemReason">浪费原因</label>
                        <input ref="reason" type="text" className="form-control" id="itemReason" defaultValue={this.props.store.warehouseItemopById.reason}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="itemMaker">领料记录人</label>
                        <input ref="maker" type="text" className="form-control" id="itemMaker" readOnly={true} defaultValue={this.props.userName}/>
                    </div>
                </form>
            </Modal>
        )
    }


}