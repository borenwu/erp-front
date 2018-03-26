import React, {Component} from 'react';
import { Table} from 'antd';
import {observer} from 'mobx-react';
import moment from 'moment';
import AccountReceivableDashTable from './AccountReceivableDashTable'
import './AccountReceivableDash.css'


@observer
export default class AccountReceivableDash extends Component{
    constructor(props){
        super(props)
    }



    handleClick(record){
        this.props.store.fetchThisMonthSalesByClient(record)
    }


    render(){

        return(
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-lg-12">
                    {/*<Table columns={columns} dataSource={data} />*/}
                    <AccountReceivableDashTable {...this.props}/>
                </div>

            </div>
        )
    }
}