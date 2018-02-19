import React from 'react'
import {Modal,Button,DatePicker} from 'antd'
import {observer} from 'mobx-react';
import moment from 'moment';
import * as companyConfig from '../../../configs/companyConfig'

@observer
export default class TaskModal extends React.Component {
    state = {
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

    handleOk(){
        let company_id = companyConfig.companyInfo.company_id
        let client_name = this.refs.client_name.value
        let task_date = moment().format('YYYY-MM-DD')
        let due_date = this.state.dueDate
        let task_name = this.refs.task_name.value
        let volume = this.refs.volume.value
        let desc = this.refs.desc.value
        let maker = this.refs.maker.value
        let make_time = moment().format('YYYY-MM-DD h:mm:ss')

        const task = {
            company_id:company_id,
            task_date:task_date,
            due_date:due_date,
            client_name:client_name,
            task_name:task_name,
            volume:volume,
            desc:desc,
            maker:maker,
            make_time:make_time
        }

        console.log(task)
        this.props.store.createTask(task)

        // this.refs.client_name.value = ""
        // this.refs.task_name.value = ""
        // this.refs.volume.value = ""
        // this.refs.desc.value = ""
        // this.refs.maker.value = ""

        this.props.store.closeModal()
    }
    handleCancel(e){
        console.log(e);

        this.refs.client_name.value = ""
        this.refs.task_name.value = ""
        this.refs.volume.value = ""
        this.refs.desc.value = ""
        this.refs.maker.value = ""

        this.props.store.closeModal()
    }

    render() {
        return (
            <Modal
                title={this.props.title}
                visible={this.props.visible}
                onOk={this.handleOk.bind(this)}
                onCancel={this.handleCancel.bind(this)}>

                <form>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlSelect1">客户</label>
                        <select ref="client_name" className="form-control" id="exampleFormControlSelect1">
                            <option>海门日报</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="taskName">任务</label>
                        <input type="text" ref="task_name" className="form-control" id="taskName"  placeholder="任务名称"/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label>交付时间</label>
                        <DatePicker style={{width:100+'%'}} onChange={this.onChange.bind(this)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="taskVolume">印量</label>
                        <input ref="volume" type="number" className="form-control" id="taskVolume" placeholder="印量"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="taskDesc">规格明细</label>
                        <div className="row">
                            <div className="col-8">
                                <input ref="desc" type="text" className="form-control" id="taskDesc" placeholder="规格明细"/>
                            </div>
                            <div className="col-4">
                                <Button type="primary" onClick={this.showAssistantModal.bind(this)}>明细小助手</Button>
                                <Modal
                                    title="Assistant Modal"
                                    visible={this.state.assistantVisible}
                                    onOk={this.handleAssistantOk.bind(this)}
                                    onCancel={this.handleAssistantCancel.bind(this)}
                                >
                                    <p>Some contents...</p>
                                    <p>Some contents...</p>
                                    <p>Some contents...</p>
                                </Modal>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="taskMaker">制作人</label>
                        <input type="text" ref="maker" className="form-control" id="taskMaker"  placeholder="制作人"/>
                    </div>
                </form>
            </Modal>
        )
    }
}