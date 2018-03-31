import React from 'react'
import {Modal} from 'antd'
import {observer} from 'mobx-react';

@observer
export default class WarehouseModal extends React.Component {
    state = {
    }

    constructor(props) {
        super(props)
    }

    /////////////////////////////////////////////////////////////////////////

    handleOk(){
        let company_id = this.props.store.company_id
        let supplier_name = this.refs.supplier_name.value
        let item_name = this.refs.item_name.value
        let item_type = this.refs.item_type.value
        let desc = this.refs.desc.value
        let unit = this.refs.unit.value
        let balance = Number(this.refs.balance.value)
        let constant = Number(this.refs.constant.value)

        const warehouseItemInfo = {
            company_id:company_id,
            supplier_name:supplier_name,
            item_name:item_name,
            item_type:item_type,
            desc:desc,
            unit:unit,
            balance:balance,
            constant:constant
        }

        this.props.store.createWarehouseItem(warehouseItemInfo)
        this.props.store.closeWarehouseModal()
    }
    handleCancel(e){
        this.props.store.closeWarehouseModal()
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
                        <label htmlFor="exampleFormControlSelect1">供应商</label>
                        <select ref="supplier_name" className="form-control">
                            {this.props.store.suppliers.map((s,i)=>  <option key={i}>{s.supplier_name}</option>)}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="clientDesc">物料名称</label>
                        <select ref="item_name" className="form-control">
                            <option>纸张</option>
                            <option>油墨</option>
                            <option>配件耗材</option>
                            <option>其他辅料</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="itemType">物料型号</label>
                        <input ref="item_type" type="text" className="form-control" id="itemType" placeholder="物料型号"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="itemDesc">详细描述</label>
                        <input ref="desc" type="text" className="form-control" id="itemDesc" placeholder="详细描述"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="itemUnit">单位</label>
                        <input ref="unit" type="text" className="form-control" id="itemUnit" placeholder="单位"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="itemBalance">库存量</label>
                        <input type="number" ref="balance" className="form-control" id="itemBalance"  placeholder="库存量"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="itemBalance">纸类常量参数(可选)</label>
                        <input type="number" ref="constant" className="form-control" id="itemBalance"  placeholder="纸类常量参数" defaultValue={0.0}/>
                    </div>
                </form>
            </Modal>
        )
    }
}