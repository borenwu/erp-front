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


    next(current) {
        this.setState({current:current+1});
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({current});
    }

    render() {
        const {current} = this.state;

        const steps = [
            {
                title: '第一步:撤销原记录',
                content: <ContentF handleNext={current => this.next(current)} current={this.state.current} {...this.props}/>,
            },
            {
                title: 'Second',
                content: <ContentS/>,
            },
        ];

        return (
            <Modal
                title={this.props.title}
                visible={this.props.visible}
                destroyOnClose={true}
                okText='确定'
                cancelText='取消'>

                <Steps current={current}>
                    {steps.map(item => <Step key={item.title} title={item.title}/>)}
                </Steps>
                <div className="steps-content">{steps[this.state.current].content}</div>
                <div className="steps-action">
                    {
                        this.state.current < steps.length - 1
                        &&
                        <Button type="primary" onClick={() => this.next(this.state.current)}>Next</Button>
                    }
                    {
                        this.state.current === steps.length - 1
                        &&
                        <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
                    }
                    {
                        this.state.current > 0
                        &&
                        <Button style={{marginLeft: 8}} onClick={() => this.prev()}>
                            Previous
                        </Button>
                    }
                </div>
            </Modal>
        )
    }
}