import React, {Component} from 'react';
import {Button} from 'antd'

export default class ContentF extends Component{
    render(){
        return(
            <div>
                <h2>撤销此条记录,应收款记录也会随之更改</h2>
                <Button type="primary" onClick={() => this.props.next()}>撤销记录</Button>
            </div>
        )
    }
}