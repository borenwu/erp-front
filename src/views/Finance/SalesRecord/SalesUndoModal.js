import React from 'react'
import {Modal, Steps, Button, message,} from 'antd'
import {observer} from 'mobx-react';
import moment from 'moment';
import ContentF from './ContentF'
import ContentS from './ContentS'

const confirm = Modal.confirm;
const Step = Steps.Step;


@observer
export default class SalesUndoModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
        };
    }

    onClose(){
        this.setState({current:0})
    }

    next(current) {
        this.setState({current:current+1});
    }


    prev() {
        const current = this.state.current - 1;
        this.setState({current});
    }

    handleCancel(){
        if(this.state.current == 0){
            this.props.store.closeSalesUndoModal()
        }
    }

    render() {
        const {current} = this.state;

        const steps = [
            {
                title: '第一步:撤销原记录',
                content: <ContentF handleNext={current => this.next(current)} current={this.state.current} {...this.props}/>,
            },
            {
                title: '第二步:录入新记录',
                content: <ContentS {...this.props}/>,
            },
        ];

        return (
            <Modal
                title={this.props.title}
                visible={this.props.visible}
                destroyOnClose={true}
                okText='确定'
                cancelText='取消'
                footer={null}
                onCancel={this.handleCancel.bind(this)}
                afterClose={this.onClose.bind(this)}
            >

                <Steps current={current}>
                    {steps.map(item => <Step key={item.title} title={item.title}/>)}
                </Steps>
                <div>{steps[this.state.current].content}</div>
            </Modal>
        )
    }
}