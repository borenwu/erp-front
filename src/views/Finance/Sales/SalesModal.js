import React from 'react'
import {Modal,Button,DatePicker,message} from 'antd'
import {observer} from 'mobx-react';
import moment from 'moment';

import * as companyConfig from '../../../configs/companyConfig'


@observer
export default class SaleModal extends React.Component{
    state = {
    }

    constructor(props){
        super(props)
    }

    //////////////////////////////////////////////////


    handleUpdate(){
        // let task_id = this.props.store.taskById.id
        // let company_id = companyConfig.companyInfo.company_id
        // let client_name = this.props.store.taskById.client_name
        // let task_name = this.refs.task_name.value
        // let due_date = this.state.dueDate
        // let volume = this.refs.volume.value
        // let desc = this.refs.desc.value
        // let maker = this.refs.maker.value
        //
        // let taskInfo = {
        //     task_id:task_id,
        //     company_id:company_id,
        //     client_name:client_name,
        //     due_date:due_date,
        //     task_name:task_name,
        //     desc:desc,
        //     volume:volume,
        //     maker:maker
        // }
        // this.props.store.updateTaskById(taskInfo)

        this.props.store.closeSalesModal()
    }

    handleCancel(){
        this.props.store.closeSalesModal()
    }

    render(){
        return(

                <Modal
                    title={this.props.title}
                    visible={this.props.visible}
                    onOk={this.handleUpdate.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    destroyOnClose={true}>

                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlSelect1">客户</label>
                            <input type="text" ref="client_name" className="form-control" id="taskName" disabled="true" defaultValue={this.props.store.taskById.client_name}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="taskName">任务</label>
                            <input type="text" ref="task_name" className="form-control" id="taskName"  defaultValue={this.props.store.taskById.task_name}/>
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                            <label>交付时间</label>
                            <DatePicker style={{width:100+'%'}} defaultValue={moment(this.props.store.taskById.due_date, 'YYYY-MM-DD')}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="taskVolume">印量</label>
                            <input ref="volume" type="number" className="form-control" id="taskVolume" defaultValue={this.props.store.taskById.volume}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="taskDesc">规格明细</label>
                            <input ref="desc" type="text" className="form-control" id="taskDesc" defaultValue={this.props.store.taskById.desc}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="taskVolume">单价</label>
                            <input ref="price" type="number" className="form-control" id="taskVolume" defaultValue={this.props.store.taskById.price}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="taskVolume">金额</label>
                            <input ref="sale" type="number" className="form-control" id="taskVolume" defaultValue={this.props.store.taskById.sale}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="taskChecker">审核人</label>
                            <input type="text" ref="checker" className="form-control" id="taskMaker"  defaultValue={this.props.store.taskById.checker}/>
                        </div>
                    </form>

                </Modal>
        )
    }
}