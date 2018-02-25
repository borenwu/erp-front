import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {DatePicker,Button} from 'antd';
import moment from 'moment';
import StatisticsTable from './StatisticsTable'
import * as companyConfig from '../../../configs/companyConfig'


const {RangePicker} = DatePicker;

@observer
export default class SalesStatistics extends Component{
    state = {
        dateRange : []
    }

    onChange(date, dateString) {
        this.setState({
            dateRange:dateString
        })
    }

    searchTasksByClient(){
        let company_id = companyConfig.companyInfo.company_id
        let client_name = this.refs.client_name.value
        let startDate = this.state.dateRange[0] || moment().format('YYYY-MM-DD')
        let endDate = this.state.dateRange[1] || moment().format('YYYY-MM-DD')
        const info = {
            company_id: company_id,
            client_name:client_name,
            start_date: startDate,
            end_date: endDate
        }
        this.props.store.listTasksByClient(info)
    }


    componentDidMount(){
        this.props.store.fetchClients(companyConfig.companyInfo.company_id)
    }


    render(){
        return(
            <div>
                <div className="table-operations">

                    <form className="form-inline">
                        <label style={{marginRight: 8}}>选择客户</label>
                        <select ref="client_name" style={{marginRight: 8,width:200}} className="form-control">
                            {this.props.store.clients.map((c,i)=>  <option key={i}>{c.client_name}</option>)}
                        </select>
                        <label style={{marginRight: 8}}>检索日期</label>
                        <RangePicker style={{marginRight: 8}} placeholder={['开始日期', '结束日期']} onChange={this.onChange.bind(this)}/>
                        <Button style={{marginRight: 8}} onClick={this.searchTasksByClient.bind(this)}>查询</Button>
                        <Button style={{marginRight: 8}} onClick={this.props.store.exportJson2Excel(this.props.store.tasks,'xls')}>导出Excel</Button>
                    </form>
                </div>
                <StatisticsTable id="table-to-xls" store={this.props.store}/>
            </div>
        )
    }
}

// this.props.store.exportJson2Excel(this.props.store.tasks,'xls')