import React, {Component} from 'react';
import {Container, Row, Col, CardGroup, Card, CardBody, Button, Input, InputGroup, InputGroupAddon} from 'reactstrap';


class Login extends Component {


    constructor() {
        super();
    }

    handleIn(){
        const company = this.refs.company.value;
        const username = this.refs.username.value;
        const password = this.refs.password.value;

        console.log(company)
        console.log(username)
        console.log(password)

        //login process
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
                                            <span className="input-group-addon"><i className="icon-globe"></i></span>
                                            <input ref="company" type="text" className="form-control" placeholder="公司"/>
                                        </div>
                                        <div className="input-group mb-3">
                                            <span className="input-group-addon"><i className="icon-user"></i></span>
                                            <input ref="username" type="text" className="form-control" placeholder="用户名"/>
                                        </div>
                                        <div className="input-group mb-4">
                                            <span className="input-group-addon"><i className="icon-lock"></i></span>
                                            <input ref="password" type="password" className="form-control" placeholder="密码"/>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <button type="button" className="btn btn-primary px-4" onClick={this.handleIn.bind(this)}>登陆</button>
                                            </div>
                                            <div className="col-6 text-right">
                                                <button type="button" className="btn btn-link px-0">忘记密码?</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card card-inverse card-primary py-5 d-md-down-none"
                                     style={{width: 44 + '%'}}>
                                    <div className="card-block text-center">
                                        <div>
                                            <h2>注 册</h2>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                                tempor incididunt ut labore et dolore magna aliqua.</p>
                                            <a type="button" className="btn btn-primary active mt-3" href='#/register'>点击注册</a>
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
