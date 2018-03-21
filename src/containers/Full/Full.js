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
import SalesDash from '../../views/Dash/SalesDash'
import Configs from '../../views/Settings/Configs/Configs'
import WarehouseOp from '../../views/Work/WarehouseOps'
import WarehouseItemCheck from '../../views/Warehouse/WarehouseItemCheck'


import CompanyStore from '../../stores/CompanyStore'
import TaskStore from '../../stores/TaskStore'
import FinanceStore from '../../stores/FinanceStore'
import ConfigStore from '../../stores/ConfigStore'
import WarehouseStore from '../../stores/WarehouseStore'
import UserStore from '../../stores/UserStore'
import SalesDashStore from '../../stores/SalesDashStore'


const taskStore = new TaskStore()
// const companyStore = new CompanyStore()
const financeStore = new FinanceStore()
const configStore = new ConfigStore()
const warehouseStore = new WarehouseStore()
const userStore = new UserStore()
const salesalesDashStore = new SalesDashStore()


class Full extends Component {
    render() {
        const local=window.localStorage
        const company =JSON.parse(local.getItem("companyInfo"));
        const session=window.sessionStorage
        const userInfo=JSON.parse(session.getItem("userInfo"));

        if(userInfo){
            const auth = userInfo.auth
            const user_name = userInfo.user_name

            return (
                <div className="app">
                    <Header userName={user_name} store={userStore}/>
                    <div className="app-body">
                        <Sidebar {...this.props} auth={auth}/>
                        <main className="main">
                            <Breadcrumb />
                            <Container fluid>
                                <Switch>
                                    <Route path="/dashboard" name="Dashboard" component={Dashboard} userName={user_name}/>
                                    <Route path="/work/tasks" name="Tasks" component={()=><Tasks store={taskStore} userName={user_name}/>}/>
                                    <Route path="/work/itemops" name="WarehouseOps" component={()=><WarehouseOp store={warehouseStore} userName={user_name}/>}/>
                                    <Route path="/finance/SalesRecord" name="SalesRecord" component={()=><SalesRecord store={financeStore} userName={user_name}/>}/>
                                    <Route path="/finance/SalesStatistics" name="SalesStatistics" component={()=><SalesStatistics store={financeStore} userName={user_name}/>}/>
                                    <Route path="/warehouse/ItemCheck" name="ItemCheck" component={()=><WarehouseItemCheck store={warehouseStore} userName={user_name}/>}/>
                                    <Route path="/views/AccountReceivableDash" name="AccountReceivableDash" component={()=><AccountReceivableDash store={financeStore} userName={user_name}/>}/>
                                    <Route path="/views/SalesDash" name="SalesDash" component={()=><SalesDash store={salesalesDashStore} userName={user_name}/>}/>
                                    <Route path="/setting/Configs" name="Configs" component={()=><Configs store={configStore} userName={user_name}/>}/>
                                    <Redirect from="/" to="/dashboard"/>
                                </Switch>
                            </Container>
                        </main>
                        <Aside />
                    </div>
                    <Footer />
                </div>
            );
        }else{
            return(
                <Redirect from="/" to="/login"/>
            )
        }


    }
}

export default Full;
