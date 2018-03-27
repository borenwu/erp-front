import React, {Component} from 'react';
import {Steps, Button, message,Modal} from 'antd';
import ContentF from './ContentF'
import ContentS from './ContentS'
import './DemoTest.css'

const Step = Steps.Step;

const steps = [
    {
        title: 'First',
        content: <ContentF/>,
    },
    {
        title: 'Second',
        content: <ContentS/>,
    },
];


export default class DemoTest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            visible: false
        };
    }

    next() {
        const current = this.state.current + 1;
        this.setState({current});
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({current});
    }

    showModal () {
        this.setState({
            visible: true,
        });
    }

    handleOk (e) {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    handleCancel (e) {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    render() {
        const {current} = this.state;
        return (
            <div>
                <Button type="primary" onClick={this.showModal.bind(this)}>Open</Button>
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                >
                    <Steps current={current}>
                        {steps.map(item => <Step key={item.title} title={item.title}/>)}
                    </Steps>
                    <div className="steps-content">{steps[this.state.current].content}</div>
                    <div className="steps-action">
                        {
                            this.state.current < steps.length - 1
                            &&
                            <Button type="primary" onClick={() => this.next()}>Next</Button>
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

            </div>
        );
    }
}