import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Switch} from 'react-router-dom';
import AuthRoute from './AuthRoute';

// Styles
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import ant design
import 'antd/dist/antd.css';


// Containers
import Full from './containers/Full/'

// Views
import Login from './views/Pages/Login/'
import Register from './views/Pages/Register/'
import Page404 from './views/Pages/Page404/'
import Page500 from './views/Pages/Page500/'
import Init from './views/Pages/Init'

// route history
import history from './history';

// stores
import UserStore from './stores/UserStore'
import CompanyStore from './stores/CompanyStore'

// international
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

// init store
const userStore = new UserStore()
const companyStore = new CompanyStore()

// init company config
const local = window.localStorage
local.setItem('companyInfo', '123');


ReactDOM.render((
    <Router history={history}>
        <Switch>
            <Route exact path="/login" name="Login Page" component={()=><Login store={userStore}/>}/>
            <Route exact path="/init" name="Init Page" component={()=><Init store={companyStore}/>}/>
            <Route exact path="/register" name="Register Page" component={Register}/>
            <Route exact path="/404" name="Page 404" component={Page404}/>
            <Route exact path="/500" name="Page 500" component={Page500}/>
            <AuthRoute path="/" name="Home" component={Full}/>
        </Switch>
    </Router>
), document.getElementById('root'));
