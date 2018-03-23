import React, {Component} from 'react';
import {Button} from 'antd'
import {observer} from 'mobx-react';

@observer
export default class ContentF extends Component{
    handleUndo(){
        let taskInfo = {
            company_id:this.props.store.company_id,
            client_name:this.props.store.taskById.client_name,
            task_id:this.props.store.taskById.id,
            old_sale:this.props.store.taskById.sale,
            updater:this.props.userName
        }
        console.log(taskInfo)

        this.props.store.undoSale(taskInfo)
        this.props.handleNext(this.props.current)
    }

    handleCancel(){
        this.props.store.closeSalesUndoModal()
    }

    render(){
        return(
            <div>
                <p>撤销此条记录,应收款记录也会随之更改</p>
                <Button type="primary" onClick={this.handleUndo.bind(this)}>撤销记录</Button>
                <Button style={{marginLeft:20}} onClick={this.handleCancel.bind(this)}>取消</Button>
            </div>
        )
    }
}