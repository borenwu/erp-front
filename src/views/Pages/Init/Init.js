import React, {Component} from 'react';
import { Steps } from 'antd';
import {observer} from 'mobx-react';
import './Init.css'
import ContentFirst from './ContentFirst'
import ContentSecond from './ContentSecond'

const Step = Steps.Step;

@observer
class Init extends Component {
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
                title: '第一步:连接到主机',
                content: <ContentFirst handleNext={current => this.next(current)} current={this.state.current} {...this.props}/>,
            },
            {
                title: '第二步:激活公司加密狗',
                content: <ContentSecond {...this.props}/>,
            },
        ];

        return (
            <div className="container">
                <div className="init-content">
                    <Steps current={current}>
                        {steps.map(item => <Step key={item.title} title={item.title}/>)}
                    </Steps>
                    <div>{steps[this.state.current].content}</div>
                </div>
            </div>
        );
    }
}

export default Init;


