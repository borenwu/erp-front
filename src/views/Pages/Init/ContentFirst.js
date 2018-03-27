import React, {Component} from 'react';

export default class ContentF extends Component {

    handleRootUrl(){
        let rootUrl = this.refs.rootUrl.value
        const local = window.localStorage
        local.setItem('ipConfig', rootUrl);
        this.props.handleNext(this.props.current)
    }


    render() {
        return (
            <div>
                <div className="app flex-row align-items-center">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <div className="card-group mb-0">
                                    <div className="card card-inverse card-primary py-5 d-md-down-none"
                                         style={{width: 44 + '%'}}>
                                        <div className="card-block text-center">
                                            <h3>选择网络模式</h3>
                                            <div>
                                                <div className="input-group mb-3">
                                                    <span className="input-group-addon"><i
                                                        className="icon-share"></i></span>
                                                    <input ref="rootUrl" type="text" className="form-control"
                                                           placeholder="主机地址"/>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-6">
                                                    <button type="button" className="btn btn-primary px-4" onClick={this.handleRootUrl.bind(this)}>
                                                        连接
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}