import React, {Component} from 'react';
import {Container, Row, Col, Card, CardBody, CardFooter, Button, Input, InputGroup, InputGroupAddon} from 'reactstrap';

class Register extends Component {
    constructor() {
        super();
    }

    handleUp(){
        console.log('up')
        const company = this.refs.company.value;
        const username = this.refs.username.value;
        const password = this.refs.password.value;
        const repeatPassword = this.refs.repeatPassword.value;

        //register process
    }

    render() {
        return (
            <div className="app flex-row align-items-center">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-md-6">
                    <div className="card mx-4">
                      <div className="card-block p-4">
                        <h1>注册窗口</h1>
                        <p className="text-muted">创建一个新账户</p>
                        <div className="input-group mb-3">
                          <span className="input-group-addon"><i className="icon-globe"></i></span>
                          <input ref="company" type="text" className="form-control" placeholder="公司"/>
                        </div>
                        <div className="input-group mb-3">
                          <span className="input-group-addon"><i className="icon-user"></i></span>
                          <input ref="username" type="text" className="form-control" placeholder="用户名"/>
                        </div>
                        <div className="input-group mb-3">
                          <span className="input-group-addon"><i className="icon-lock"></i></span>
                          <input ref="password" type="password" className="form-control"
                                 placeholder="密码"/>
                        </div>
                        <div className="input-group mb-4">
                          <span className="input-group-addon"><i className="icon-lock"></i></span>
                          <input ref="repeatPassword" type="password" className="form-control"
                                 placeholder="重复密码"/>
                        </div>
                        <button type="button" className="btn btn-block btn-success" onClick={this.handleUp.bind(this)}>创建新用户</button>
                      </div>
                        {/*<div className="card-footer p-4">*/}
                        {/*<div className="row">*/}
                        {/*<div className="col-6">*/}
                        {/*<button className="btn btn-block btn-facebook" type="button"><span>facebook</span></button>*/}
                        {/*</div>*/}
                        {/*<div className="col-6">*/}
                        {/*<button className="btn btn-block btn-twitter" type="button"><span>twitter</span></button>*/}
                        {/*</div>*/}
                        {/*</div>*/}
                        {/*</div>*/}
                    </div>
                  </div>
                </div>
              </div>
            </div>
        );
    }
}

export default Register;
