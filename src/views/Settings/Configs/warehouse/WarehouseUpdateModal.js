import React from 'react'
import {Modal,Button,DatePicker,message} from 'antd'
import {observer} from 'mobx-react';
import moment from 'moment';

import * as companyConfig from '../../../../configs/companyConfig'

@observer
export default class SupplierUpdateModal extends React.Component{
    state = {

    }

    constructor(props){
        super(props)
    }

    //////////////////////////////////////////////////

    handleUpdate(){
        let company_id = companyConfig.companyInfo.company_id
        let item_id = this.props.store.warehouseItemById.id
        let supplier_name = this.props.store.warehouseItemById.supplier_name
        let item_name = this.refs.item_name.value
        let item_type = this.refs.item_type.value
        let desc = this.refs.desc.value
        let unit = this.refs.unit.value
        let balance = Number(this.refs.balance.value)

        const warehouseItemInfo = {
            company_id:company_id,
            supplier_name:supplier_name,
            item_id:item_id,
            item_name:item_name,
            item_type:item_type,
            desc:desc,
            unit:unit,
            balance:balance
        }

        this.props.store.updateWarehouseItem(warehouseItemInfo)
        this.props.store.closeWarehouseUpdateModal()
    }

    handleCancel(){
        this.props.store.closeWarehouseUpdateModal()
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
                        <label>供应商</label>
                        <input type="text" ref="client_name" className="form-control" id="taskName" disabled="true" defaultValue={this.props.store.warehouseItemById.supplier_name}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="clientDesc">物料名称</label>
                        <select ref="item_name" defaultValue={this.props.store.warehouseItemById.item_name} className="form-control">
                            <option>纸张</option>
                            <option>油墨</option>
                            <option>配件耗材</option>
                            <option>其他辅料</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="itemType">物料型号</label>
                        <input ref="item_type" type="text" className="form-control" id="itemType" defaultValue={this.props.store.warehouseItemById.item_type}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="itemDesc">详细描述</label>
                        <input ref="desc" type="text" className="form-control" id="itemDesc" defaultValue={this.props.store.warehouseItemById.desc}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="itemUnit">单位</label>
                        <input ref="unit" type="text" className="form-control" id="itemUnit" defaultValue={this.props.store.warehouseItemById.unit}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="itemBalance">库存量</label>
                        <input type="balance" ref="balance" className="form-control" id="itemBalance"  defaultValue={this.props.store.warehouseItemById.balance}/>
                    </div>

                </form>
            </Modal>
        )
    }


}