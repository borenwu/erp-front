import React from 'react'
import {Modal,Button,DatePicker,message} from 'antd'
import {observer} from 'mobx-react';
import moment from 'moment';


@observer
export default class WarehouseItemStockModal extends React.Component{

    constructor(props){
        super(props)
    }

    //////////////////////////////////////////////////

    handleUpdate(){
        let item_id = this.props.store.warehouseItemById.id
        let company_id = this.props.store.company_id
        let supplier_name = this.props.store.warehouseItemById.supplier_name
        let item_name = this.refs.item_name.value
        let item_type = this.refs.item_type.value
        let desc = this.refs.desc.value
        let unit = this.refs.unit.value
        let balance = this.refs.balance.value
        let amount = this.refs.amount.value
        let maker = this.refs.maker.value

        let itemInfo = {
            item_id:item_id,
            company_id:company_id,
            supplier_name:supplier_name,
            item_name:item_name,
            item_type:item_type,
            desc:desc,
            unit:unit,
            balance:balance,
            amount:amount,
            maker:maker
        }
        this.props.store.stockItem(itemInfo)

        this.props.store.closeItemStockModal()
    }

    handleCancel(){
        this.props.store.closeItemStockModal()
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
                        <input type="text" ref="supplier_name" className="form-control" id="supplierName" disabled="true" defaultValue={this.props.store.warehouseItemById.supplier_name}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="taskName">名称</label>
                        <input type="text" ref="item_name" className="form-control" id="itemName" disabled="true" defaultValue={this.props.store.warehouseItemById.item_name}/>
                    </div>
                    <div className="form-group">
                        <label>型号</label>
                        <input type="text" ref="item_type" className="form-control" id="itemType" disabled="true" defaultValue={this.props.store.warehouseItemById.item_type}/>
                    </div>
                    <div className="form-group">
                        <label>详细描述</label>
                        <input type="text" ref="desc" className="form-control" id="itemDesc" disabled="true" defaultValue={this.props.store.warehouseItemById.desc}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="taskVolume">单位</label>
                        <input ref="unit" type="text" className="form-control" id="itemUnit" disabled="true" defaultValue={this.props.store.warehouseItemById.unit}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="taskVolume">库存量</label>
                        <input ref="balance"  className="form-control" id="itemBalance" disabled="true" defaultValue={this.props.store.warehouseItemById.balance}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="taskVolume">新进数量</label>
                        <input ref="amount" type="number"  className="form-control" id="itemAmount" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="taskMaker">记录人</label>
                        <input type="text" ref="maker" className="form-control" readOnly={true} id="taskMaker"  defaultValue={this.props.userName}/>
                    </div>
                </form>
            </Modal>
        )
    }


}