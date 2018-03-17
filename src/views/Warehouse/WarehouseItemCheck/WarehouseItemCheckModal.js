import React from 'react'
import {Modal,Select,Button,DatePicker,Input,InputNumber} from 'antd'
import {observer} from 'mobx-react';
import moment from 'moment';
import * as companyConfig from '../../../configs/companyConfig'

const { Option, OptGroup } = Select;

@observer
export default class WarehouseItemCheckModal extends React.Component {
    state = {
        selectItemId:'',
        itemSelected:{},
        supplier_name:'',
    }

    constructor(props) {
        super(props)
    }

    /////////////////////////////////////////////////////////////////////////
    handleSelectItem(value){
        console.log(value)
        const itemSelected = this.props.store.warehouseItems.filter(item => item.id == value)[0]
        this.setState({itemSelected:itemSelected})
    }

    handleOk(){
        let company_id = companyConfig.companyInfo.company_id
        let item_id = this.state.itemSelected.id
        let op_date = moment().format('YYYY-MM-DD')
        // let item_name = this.refs.item_name.value
        // let item_type = this.refs.item_type.value
        // let unit = this.refs.unit.value
        let supplier_name = this.refs.supplier_name.value
        let order = this.refs.order.value
        let re = this.refs.re.value
        let use = this.refs.re.value
        let waste = this.refs.waste.value
        let reason = this.refs.reason.value
        let maker = this.refs.maker.value
        let make_time = moment().format('YYYY-MM-DD h:mm:ss')

        const itemop = {
            company_id:company_id,
            item_id:item_id,
            op_date:op_date,
            supplier_name:supplier_name,
            order:order,
            re:re,
            use:use,
            waste:waste,
            reason:reason,
            maker:maker,
            make_time:make_time
        }
        console.log(itemop)
        this.props.store.createItemop(itemop)
        this.props.store.closeItemCheckModal()
    }
    handleCancel(e){
        console.log(e);
        this.setState({itemSelected:{}})
        this.props.store.closeItemCheckModal()
    }

    componentDidMount(){
        this.props.store.fetchItems(companyConfig.companyInfo.company_id)
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
                        <label htmlFor="itemType">物料型号</label>
                        <Select ref="item_type"  id="itemType" defaultValue="选择物料型号..." onSelect={this.handleSelectItem.bind(this)}>
                            {this.props.store.warehouseItems.map((item,i)=>  <Option key={i} value={item.id}>{item.item_type}</Option>)}
                        </Select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="itemType">供应商</label>
                        <input type="text" ref="supplier_name"  disabled={true} className="form-control" value={this.state.itemSelected.supplier_name}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="itemName">物料名称</label>
                        <Input type="text" disabled={true} className="form-control" value={this.state.itemSelected.item_name}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="itemUnit">单位</label>
                        <Input type="text" disabled={true} className="form-control" value={this.state.itemSelected.unit}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="itemOrder">领料</label>
                        <input ref="order" type="number" className="form-control"  id="itemOrder" defaultValue={0.0}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="itemRe">退库</label>
                        <input ref="re" type="number" className="form-control" id="itemRe"  defaultValue={0.0}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="itemUse">实际使用</label>
                        <input ref="use" type="number" className="form-control" id="itemUse"  defaultValue={0.0}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="itemWaste">浪费</label>
                        <input ref="waste" type="number" className="form-control" id="itemWaste" defaultValue={0.0}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="itemReason">浪费原因</label>
                        <input ref="reason" type="text" className="form-control" id="itemReason" placeholder="浪费原因"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="itemMaker">领料记录人</label>
                        <input ref="maker" type="text" className="form-control" id="itemMaker" defaultValue={this.props.userName} readOnly={true}/>
                    </div>
                </form>
            </Modal>
        )
    }
}