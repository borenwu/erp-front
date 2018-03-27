import React,{Component} from 'react'
import {Button,DatePicker} from 'antd'
import {observer} from 'mobx-react';
import moment from 'moment';

@observer
export default class ContentS extends Component{

    constructor(props){
        super(props)
    }
    ///////////////////////////////////////////////////////////

    onVolumeChange(){
        let volume = this.refs.volume.value
        this.props.store.setVolume(volume)
    }

    onPriceChange(){
        let price = this.refs.price.value
        this.props.store.setPrice(price)
    }


    handleUpdate(){
        let task_id = this.props.store.taskById.id
        let company_id = this.props.store.company_id
        let client_name = this.props.store.taskById.client_name
        let price = this.refs.price.value
        let sale = this.refs.sale.value
        let checker = this.refs.checker.value


        let taskInfo = {
            task_id:task_id,
            company_id:company_id,
            client_name:client_name,
            price:price,
            sale:sale,
            checker:checker
        }
        this.props.store.updateSale(taskInfo)
        this.props.store.closeSalesUndoModal()
    }

    render(){
        return(
            <div className="undo-form" style={{marginTop: 8}}>
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
                        <input ref="volume" type="number" className="form-control" id="taskVolume" defaultValue={this.props.store.taskById.volume} onChange={this.onVolumeChange.bind(this)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="taskDesc">规格明细</label>
                        <input ref="desc" type="text" className="form-control" id="taskDesc" defaultValue={this.props.store.taskById.desc}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="taskVolume">单价</label>
                        <input ref="price" type="number" className="form-control" id="taskVolume" defaultValue={0.0} onChange={this.onPriceChange.bind(this)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="taskVolume">金额</label>
                        <input ref="sale" type="number" className="form-control" id="taskVolume"  value={this.props.store.sale} readOnly={true}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="taskChecker">审核人</label>
                        <input type="text" ref="checker" className="form-control" id="taskChecker" readOnly={true} defaultValue={this.props.userName}/>
                    </div>
                    <Button type="primary" onClick={this.handleUpdate.bind(this)}>提交</Button>
                </form>
            </div>
        )
    }
}