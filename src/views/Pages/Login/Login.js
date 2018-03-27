import React, {Component} from 'react';
import {observer} from 'mobx-react';


@observer
class Login extends Component {
    constructor() {
        super();
    }

    handleIn(){
        const company_id = this.props.store.company_id
        const user_name = this.refs.user_name.value;
        const password = this.refs.password.value;
        let userInfo = {
            company_id:company_id,
            user_name:user_name,
            password:password
        }
        this.props.store.userLogin(userInfo)
    }

    onKeyup(e){
        e.keyCode === 13 && this.handler()
    }
    handler(){
        this.handleIn()
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
                                        <h1>登录窗口</h1>
                                        <p className="text-muted">使用账户登录</p>
                                        <div className="input-group mb-3">
                                            <span className="input-group-addon"><i className="icon-user"></i></span>
                                            <input ref="user_name" type="text" className="form-control" placeholder="用户名"/>
                                        </div>
                                        <div className="input-group mb-4">
                                            <span className="input-group-addon"><i className="icon-lock"></i></span>
                                            <input ref="password" type="password" className="form-control" placeholder="密码" onKeyUp={this.onKeyup.bind(this)}/>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <button type="button" className="btn btn-primary px-4" onClick={this.handleIn.bind(this)}>登陆</button>
                                            </div>
                                            {/*<div className="col-6 text-right">*/}
                                                {/*<button type="button" className="btn btn-link px-0">忘记密码?</button>*/}
                                            {/*</div>*/}
                                        </div>
                                    </div>
                                </div>
                                <div className="card card-inverse card-primary py-5 d-md-down-none"
                                     style={{width: 44 + '%'}}>
                                    <div className="card-block text-center">
                                        <div>
                                            <p>印务通云计算版, 采用云计算等先进技术, 无论是网页浏览器,桌面客户端,
                                                甚至是手机平板电脑都能使用.</p>
                                        </div>
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

export default Login;
