import React, {Component} from 'react';
import { Switch,Divider } from 'antd';
import {observer} from 'mobx-react';


@observer
class Init extends Component {
    constructor() {
        super();
    }

    handleInit(){
        let company_name = this.refs.company_name.value
        let secret = this.refs.secret.value
        let companyInfo = {
            company_name:company_name,
            secret:secret
        }
        this.props.store.createCompany(companyInfo)
    }

    render() {
        return (
            <div className="app flex-row align-items-center">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card-group mb-0">
                                <div className="card p-4">
                                    <div className="card-block">
                                        <h1>激活公司加密狗</h1>
                                        <p className="text-muted">请输入公司加密狗信息</p>
                                        <div className="input-group mb-3">
                                            <span className="input-group-addon"><i className="icon-user"></i></span>
                                            <input ref="company_name" type="text" className="form-control" placeholder="公司名"/>
                                        </div>
                                        <div className="input-group mb-4">
                                            <span className="input-group-addon"><i className="icon-lock"></i></span>
                                            <input ref="secret" type="password" className="form-control" placeholder="密钥"/>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <button type="button" className="btn btn-primary px-4" onClick={this.handleInit.bind(this)}>激活</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card card-inverse card-primary py-5 d-md-down-none"
                                     style={{width: 44 + '%'}}>
                                    <div className="card-block text-center">
                                        {/*<h3>选择网络模式</h3>*/}
                                        {/*<div>*/}
                                            {/*<div className="input-group">*/}
                                                {/*<label htmlFor="">网络切换</label>*/}
                                                {/*<Divider type="vertical"/>*/}
                                                {/*<Switch defaultChecked checkedChildren="云模式" unCheckedChildren="内网模式"/>*/}
                                            {/*</div>*/}
                                        {/*</div>*/}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Init;
