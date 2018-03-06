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
import SalesRecord from '../../views/Finance/SalesRecord'
import SalesStatistics from '../../views/Finance/SalesStatistics'
import AccountReceivableDash from '../../views/Dash/AccountReceivableDash'
import Configs from '../../views/Settings/Configs/Configs'
import WarehouseOp from '../../views/Work/WarehouseOps'


import CompanyStore from '../../stores/CompanyStore'
import TaskStore from '../../stores/TaskStore'
import FinanceStore from '../../stores/FinanceStore'
import ConfigStore from '../../stores/ConfigStore'
import WarehouseStore from '../../stores/WarehouseStore'


const taskStore = new TaskStore()
const companyStore = new CompanyStore()
const financeStore = new FinanceStore()
const configStore = new ConfigStore()
const warehouseStore = new WarehouseStore()


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
                                <Route path="/work/itemops" name="WarehouseOps" component={()=><WarehouseOp store={warehouseStore}/>}/>
                                <Route path="/finance/SalesRecord" name="SalesRecord" component={()=><SalesRecord store={financeStore}/>}/>
                                <Route path="/finance/SalesStatistics" name="SalesStatistics" component={()=><SalesStatistics store={financeStore}/>}/>
                                <Route path="/views/AccountReceivableDash" name="AccountReceivableDash" component={()=><AccountReceivableDash store={financeStore}/>}/>
                                <Route path="/setting/Configs" name="Configs" component={()=><Configs store={configStore}/>}/>
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
