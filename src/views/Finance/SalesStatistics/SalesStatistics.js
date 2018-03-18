import React, {Component} from 'react';
import {observer} from 'mobx-react';
import moment from 'moment';
import StatisticsTable from './StatisticsTable'
// import * as companyConfig from '../../../configs/companyConfig'


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
        let company_id = this.props.store.company_id
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
        this.props.store.fetchClients(this.props.store.company_id)
    }


    render(){
        return(
            <div>

                <StatisticsTable  store={this.props.store}/>
            </div>
        )
    }
}

// this.props.store.exportJson2Excel(this.props.store.tasks,'xls')