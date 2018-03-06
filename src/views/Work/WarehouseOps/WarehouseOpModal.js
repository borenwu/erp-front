import React from 'react'
import {Modal,Select,Button,DatePicker} from 'antd'
import {observer} from 'mobx-react';
import moment from 'moment';
import * as companyConfig from '../../../configs/companyConfig'

const { Option, OptGroup } = Select;

@observer
export default class WarehouseOpModal extends React.Component {
    state = {
        selectItemId:'',
        assistantVisible: false,
        dueDate:''
    }

    constructor(props) {
        super(props)
    }

    showAssistantModal(){
        this.setState({
            assistantVisible: true,
        });
    }
    handleAssistantOk(e){
        console.log(e);
        this.setState({
            assistantVisible: false,
        });
    }
    handleAssistantCancel(e){
        console.log(e);
        this.setState({
            assistantVisible: false,
        });
    }
    /////////////////////////////////////////////////////////////////////////

    onChange(date, dateString) {
        console.log(date, dateString);
        this.setState({dueDate:dateString})
    }

    handleSelectItem(value){
        console.log(value)
    }

    handleOk(){
        let company_id = companyConfig.companyInfo.company_id
        let item_id = this.refs.client_name.value
        let op_date = moment().format('YYYY-MM-DD')
        let item_name = this.refs.item_name.value
        let item_type = this.refs.item_type.value
        let unit = this.refs.unit.value
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
            item_name:item_name,
            item_type:item_type,
            unit:unit,
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
        this.props.store.closeItemopModal()
    }
    handleCancel(e){
        console.log(e);
        this.props.store.closeItemopModal()
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
                        <label htmlFor="itemName">物料名称</label>
                        <Select ref="item_name"  id="itemName" onSelect={this.handleSelectItem.bind(this)} defaultValue="选择物料名称...">
                            {this.props.store.warehouseItems.map((item,i)=>  <Option key={i} value={item.id}>{item.item_name}</Option>)}
                        </Select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="itemType">物料型号</label>
                        <Select ref="item_type"  id="itemType" defaultValue="选择物料型号...">
                            {this.props.store.warehouseItems.map((item,i)=>  <Option key={i} value={item.id}>{item.item_type}</Option>)}
                        </Select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="itemUnit">单位</label>
                        <input type="text" ref="unit" className="form-control" id="itemUnit"  placeholder="单位"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="itemOrder">领料</label>
                        <input ref="order" type="number" className="form-control" id="itemOrder" placeholder="领料"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="itemRe">退库</label>
                        <input ref="re" type="number" className="form-control" id="itemRe" placeholder="退库"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="itemUse">实际使用</label>
                        <input ref="use" type="number" className="form-control" id="itemUse" placeholder="实际使用"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="itemWaste">浪费</label>
                        <input ref="waste" type="number" className="form-control" id="itemWaste" placeholder="浪费"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="itemReason">浪费原因</label>
                        <input ref="reason" type="number" className="form-control" id="itemReason" placeholder="浪费原因"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="itemMaker">领料记录人</label>
                        <input ref="maker" type="text" className="form-control" id="itemMaker" placeholder="领料记录人"/>
                    </div>
                    {/*<div className="form-group">*/}
                        {/*<label htmlFor="taskDesc">规格明细</label>*/}
                        {/*<div className="row">*/}
                            {/*<div className="col-8">*/}
                                {/*<input ref="desc" type="text" className="form-control" id="taskDesc" placeholder="规格明细"/>*/}
                            {/*</div>*/}
                            {/*<div className="col-4">*/}
                                {/*<Button type="primary" onClick={this.showAssistantModal.bind(this)}>明细小助手</Button>*/}
                                {/*<Modal*/}
                                    {/*title="Assistant Modal"*/}
                                    {/*visible={this.state.assistantVisible}*/}
                                    {/*onOk={this.handleAssistantOk.bind(this)}*/}
                                    {/*onCancel={this.handleAssistantCancel.bind(this)}*/}
                                {/*>*/}
                                    {/*<p>Some contents...</p>*/}
                                    {/*<p>Some contents...</p>*/}
                                    {/*<p>Some contents...</p>*/}
                                {/*</Modal>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    {/*</div>*/}

                </form>
            </Modal>
        )
    }
}