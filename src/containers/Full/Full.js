import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';
import Dashboard from '../../views/Dashboard/';

//Tasks
import Tasks from '../../views/Work/Tasks/'
import SalesRecord from '../../views/Finance/SalesRecord'
import SalesStatistics from '../../views/Finance/SalesStatistics'
import AccountReceivableDash from '../../views/Dash/AccountReceivableDash'
import Configs from '../../views/Settings/Configs/Configs'
import WarehouseOp from '../../views/Work/WarehouseOps'
import WarehouseItemCheck from '../../views/Warehouse/WarehouseItemCheck'
import WarehouseItemStock from '../../views/Warehouse/WarehouseItemStock'
import DemoTest from '../../views/DemoTest'

import SalesDash from '../../views/Dash/SalesDash'
import WarehouseDash from '../../views/Dash/WarehouseDash'

import TaskStore from '../../stores/TaskStore'
import FinanceStore from '../../stores/FinanceStore'
import ConfigStore from '../../stores/ConfigStore'
import WarehouseStore from '../../stores/WarehouseStore'
import UserStore from '../../stores/UserStore'
import SalesDashStore from '../../stores/SalesDashStore'
import WarehouseDashStore from '../../stores/WarehouseDashStore'


const taskStore = new TaskStore()
// const companyStore = new CompanyStore()
const financeStore = new FinanceStore()
const configStore = new ConfigStore()
const warehouseStore = new WarehouseStore()
const userStore = new UserStore()
const salesDashStore = new SalesDashStore()
const warehouseDashStore = new WarehouseDashStore()


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
                                    <Route path="/warehouse/ItemStock" name="ItemStock" component={()=><WarehouseItemStock store={warehouseStore} userName={user_name}/>}/>

                                    <Route path="/views/AccountReceivableDash" name="AccountReceivableDash" component={()=><AccountReceivableDash store={financeStore} userName={user_name}/>}/>
                                    <Route path="/views/SalesDash" name="SalesDash" component={()=><SalesDash store={salesDashStore} userName={user_name}/>}/>
                                    <Route path="/views/WarehouseDash" name="WarehouseDash" component={()=><WarehouseDash store={warehouseDashStore} userName={user_name}/>}/>

                                    <Route path="/setting/Configs" name="Configs" component={()=><Configs store={configStore} userName={user_name}/>}/>

                                    <Route path="/DemoTest" name="DemoTest" component={DemoTest}/>
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
