import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom';
import AuthRoute from './AuthRoute';

// Styles
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import ant design
import 'antd/dist/antd.css';

// import './resource/style/style.css'
//
// // Import Main styles for this application
// import './scss/style.scss'
// // Temp fix for reactstrap
// import './scss/core/_dropdown-menu-right.scss'

// Containers
import Full from './containers/Full/'

// Views
import Login from './views/Pages/Login/'
import Register from './views/Pages/Register/'
import Page404 from './views/Pages/Page404/'
import Page500 from './views/Pages/Page500/'

// international
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

let storage=window.localStorage;
storage.setItem('testInfo', 'this is a test msg');

console.log(storage.getItem('testInfo'));

ReactDOM.render((
    <HashRouter>
        <Switch>
            <Route exact path="/login" name="Login Page" component={Login}/>
            <Route exact path="/register" name="Register Page" component={Register}/>
            <Route exact path="/404" name="Page 404" component={Page404}/>
            <Route exact path="/500" name="Page 500" component={Page500}/>
            <Route path="/" name="Home" component={Full}/>
        </Switch>
    </HashRouter>
), document.getElementById('root'));
