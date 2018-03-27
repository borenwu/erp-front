import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Modal} from 'antd'

@observer
export default class TaskWastesModal extends Component{
    constructor(props) {
        super(props)
    }

    /////////////////////////////////////////////////////////////////////////

    handleOk(){
        let company_id = this.props.store.company_id
        let waste_name = this.refs.waste_name.value
        let unit = this.refs.unit.value
        let amount = this.refs.amount.value
        let maker = this.refs.maker.value

        const taskWaste = {
            company_id:company_id,
            waste_name:waste_name,
            unit:unit,
            amount:amount,
            maker:maker,
        }

        this.props.store.createTaskWaste(taskWaste)
        this.props.store.closeTaskWastesModal()
    }
    handleCancel(e){
        this.props.store.closeTaskWastesModal()
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
                        <label>废料名称</label>
                        <select ref="waste_name" className="form-control">
                            <option >白破</option>
                            <option >黑破</option>
                            <option >废板材</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label >单位</label>
                        <select ref="unit" className="form-control">
                            <option >公斤</option>
                            <option >块</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>数量</label>
                        <input ref="amount" type="number" className="form-control" id="taskVolume" defaultValue={0}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="taskMaker">记录人</label>
                        <input type="text" ref="maker" className="form-control" id="taskMaker"  readOnly={true} defaultValue={this.props.userName}/>
                    </div>
                </form>
            </Modal>
        )
    }
}
