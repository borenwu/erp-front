import React, {Component} from 'react';
import {observer} from 'mobx-react';
import { Tabs } from 'antd';
import ClientSetting from './client/ClientSetting'
import SupplierSetting from './supplier/SupplierSetting'
import WarehouseSetting from './warehouse/WarehouseSetting'
import UserSetting from './user/UserSetting'

const TabPane = Tabs.TabPane;

@observer
export default class Configs extends Component{

    constructor(props){
        super(props)
    }

    handleCallback(key) {
        console.log(key);
    }

    render(){
        return(
            <div>
                <Tabs onChange={this.handleCallback.bind(this)}>
                    <TabPane tab="客户设置" key="1"><ClientSetting store={this.props.store}/></TabPane>
                    <TabPane tab="供应商设置" key="2"><SupplierSetting store={this.props.store}/></TabPane>
                    <TabPane tab="仓库物料设置" key="3"><WarehouseSetting store={this.props.store}/></TabPane>
                    <TabPane tab="用户设置" key="4"><UserSetting store={this.props.store}/></TabPane>
                </Tabs>
            </div>
        )
    }

}

{/*<SupplierSetting store={this.props.store}/>*/}