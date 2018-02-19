import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';
import Dashboard from '../../views/Dashboard/';
import Charts from '../../views/Charts/';
import Widgets from '../../views/Widgets/';

// Icons
import FontAwesome from '../../views/Icons/FontAwesome/';
import SimpleLineIcons from '../../views/Icons/SimpleLineIcons/';
import DemoTest from '../../views/Icons/DemoTest'

//Tasks
import Tasks from '../../views/Work/Tasks/'

import CompanyStore from '../../stores/CompanyStore'
import TaskStore from '../../stores/TaskStore'

const taskStore = new TaskStore()
const companyStore = new CompanyStore()

class Full extends Component {
    render() {
        return (
            <div className="app">
                <Header />
                <div className="app-body">
                    <Sidebar {...this.props}/>
                    <main className="main">
                        <Breadcrumb />
                        <Container fluid>
                            <Switch>
                                <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
                                <Route path="/work/tasks" name="Tasks" component={()=><Tasks store={taskStore}/>}/>
                                <Redirect from="/" to="/dashboard"/>
                            </Switch>
                        </Container>
                    </main>
                    <Aside />
                </div>
                <Footer />
            </div>
        );
    }
}

export default Full;
