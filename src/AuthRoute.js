import React from 'react';
import PropTypes from 'prop-types';
import {Redirect, Route} from 'react-router-dom';


//Mock of an Auth method, can be replaced with an async call to the backend. Must return true or false
const isAuthenticated = () => {
    // if (Meteor.user() != null) {
    //     return true
    // } else {
    //     return false
    // }
    return false
};

const PRIVATE_ROOT = '/private';
const PUBLIC_ROOT = '/login';

// 通过sessionStorage来检测用户状态，如果是空，跳转到登陆界面
// 通过localStorage来检测公司信息，如果没有公司信息，初始化
// 页面第一次加载时，写入localStorage关于服务器的信息
const AuthRoute = ({component, ...props}) => {
    // const { isPrivate } = component;
    // if (isAuthenticated()) {
    //     //User is Authenticated
    //     return <Route {...props} component={component}/>;
    // }
    // else {
    //     return <Redirect to={PUBLIC_ROOT}/>;
    // }
    return <Redirect to={PUBLIC_ROOT}/>;
}


AuthRoute.propTypes = {
    component: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func
    ])
};

export default AuthRoute;