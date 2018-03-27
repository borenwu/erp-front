import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Modal} from 'antd'

@observer
export default class TaskWastesUpdateModal extends Component{

    constructor(props){
        super(props)
    }


    //////////////////////////////////////////////////

    handleUpdate(){
        let waste_id = this.props.store.taskWasteById.id
        let company_id = this.props.store.company_id
        let amount = this.refs.amount.value
        let maker = this.refs.maker.value

        let taskWasteInfo = {
            waste_id:waste_id,
            company_id:company_id,
            amount:amount,
            maker:maker
        }
        this.props.store.updateTaskWaste(taskWasteInfo)

        this.props.store.closeTaskWastesUpdateModal()
    }

    handleCancel(){
        this.props.store.closeTaskWastesUpdateModal()
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
                        <label htmlFor="exampleFormControlSelect1">废料名称</label>
                        <input type="text" ref="client_name" className="form-control" id="taskName" disabled="true" defaultValue={this.props.store.taskWasteById.waste_name}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="taskName">单位</label>
                        <input type="text" ref="task_name" className="form-control" id="taskName" disabled="true" defaultValue={this.props.store.taskWasteById.unit}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="taskVolume">数量</label>
                        <input ref="amount" type="number" className="form-control" id="taskVolume" defaultValue={this.props.store.taskWasteById.amount}/>
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
