import React from 'react'
import {Modal,Select,Input,Button,Card} from 'antd'
import {observer} from 'mobx-react';
import moment from 'moment';


const { Option} = Select;

@observer
export default class WarehouseItemCheckModal extends React.Component {
    state = {
        paperVisible: false,
        selectItemId:'',
        itemSelected:{},
        supplier_name:'',
    }

    showAssistantModal() {
        this.setState({
            paperVisible: true,
        });
    }

    handleAssistantOk(e) {
        let paperOrder = this.props.store.paperOrder
        let paperReturn = this.props.store.paperReturn
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        let orderTotal = paperOrder.reduce(reducer)
        let returnTotal = paperReturn.reduce(reducer)

        this.refs.order.value = orderTotal
        this.refs.re.value = returnTotal
        this.refs.use.value = (Number(orderTotal) - Number(returnTotal)).toFixed(2)
        this.setState({
            paperVisible: false,
        });
        this.props.store.resetPaperArrays()
    }

    handleAssistantCancel(e) {
        this.setState({
            paperVisible: false,
        });
        this.props.store.resetPaperArrays()
    }

    handleOrderAdd(){
        let constant = this.state.itemSelected.constant || 0
        let orderFi = (Number(this.refs.orderFi.value) / 100).toFixed(2)
        let weight = (Number(constant) * orderFi * orderFi).toFixed(2)

        this.props.store.addPaperOrder(weight)
    }

    handleOrderRemove(index){
        this.props.store.removePaperOrder(index)
    }

    handleReturnAdd(){
        let constant = this.state.itemSelected.constant || 0
        let returnFi = (Number(this.refs.returnFi.value) / 100).toFixed(2)
        let weight = (Number(constant) * returnFi * returnFi).toFixed(2)

        this.props.store.addPaperReturn(weight)
    }

    handleReturnRemove(index){
        this.props.store.removePaperReturn(index)
    }

    /////////////////////////////////////////////////////////////////////////
    handleSelectItem(value){
        console.log(value)
        const itemSelected = this.props.store.warehouseItems.filter(item => item.id === value)[0]
        this.setState({itemSelected:itemSelected})
    }

    handleOk(){
        let company_id = this.props.store.company_id
        let item_id = this.state.itemSelected.id
        let op_date = moment().format('YYYY-MM-DD')
        let supplier_name = this.refs.supplier_name.value
        let order = this.refs.order.value
        let re = this.refs.re.value
        let use = this.refs.use.value
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
        this.props.store.createItemop(itemop)
        this.props.store.closeItemCheckModal()
    }
    handleCancel(e){
        this.setState({itemSelected:{}})
        this.props.store.closeItemCheckModal()
    }


    componentDidMount(){
        this.props.store.fetchItems(this.props.store.company_id)
    }

    render() {
        const gridStyle = {
            width: '50%',
            textAlign: 'center',
        };


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
                        <div className="row">
                            <div className="col-8">
                                <input ref="order" type="number" className="form-control"  id="itemOrder" defaultValue={0.0}/>
                            </div>
                            <div className="col-4">
                                <Button type="primary" onClick={this.showAssistantModal.bind(this)}>报业印刷小助手</Button>
                                <Modal
                                    title="新闻纸领料计算器"
                                    visible={this.state.paperVisible}
                                    onOk={this.handleAssistantOk.bind(this)}
                                    onCancel={this.handleAssistantCancel.bind(this)}
                                    width={1040}
                                >
                                    <Card title={this.state.itemSelected.item_type}>
                                        <Card.Grid style={gridStyle}>
                                            <div className="row">
                                                <form className="form-inline">
                                                    <div className="form-group mx-sm-3 mb-2">
                                                        <label>领</label>
                                                    </div>
                                                    <div className="form-group mx-sm-3 mb-2">
                                                        <input type="number" ref="orderFi" className="form-control" placeholder="直径" defaultValue={0}/>
                                                    </div>
                                                    <div className="form-group mx-sm-3 mb-2">
                                                        <Button type="primary" shape="circle" icon="plus" onClick={this.handleOrderAdd.bind(this)}/>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="row">
                                                <ul className="list-group">
                                                    {
                                                        this.props.store.paperOrder.map((order,index)=>{
                                                            return(<li key={index} className="list-group-item">{order} KG  <Button type="primary" onClick={this.handleOrderRemove.bind(this,index)} shape="circle" icon="minus"/></li>)
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        </Card.Grid>

                                        <Card.Grid style={gridStyle}>
                                            <div className="row">
                                                <form className="form-inline">
                                                    <div className="form-group mx-sm-3 mb-2">
                                                        <label>退</label>
                                                    </div>
                                                    <div className="form-group mx-sm-3 mb-2">
                                                        <input type="number" ref="returnFi" className="form-control" placeholder="直径" />
                                                    </div>
                                                    <div className="form-group mx-sm-3 mb-2">
                                                        <Button type="primary" shape="circle" icon="plus" onClick={this.handleReturnAdd.bind(this)} />
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="row">
                                                <ul className="list-group">
                                                    {
                                                        this.props.store.paperReturn.map((returnData,index)=>{
                                                            return(<li key={index} className="list-group-item">{returnData} KG  <Button type="primary" onClick={this.handleReturnRemove.bind(this,index)} shape="circle" icon="minus"/></li>)
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        </Card.Grid>
                                    </Card>
                                </Modal>
                            </div>
                        </div>
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
                        <input ref="maker" type="text" className="form-control" id="itemMaker" readOnly={true} defaultValue={this.props.userName}/>
                    </div>
                </form>
            </Modal>
        )
    }
}