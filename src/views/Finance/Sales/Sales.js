import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {DatePicker,Button} from 'antd';
import moment from 'moment';
import SalesTable from './SalesTable'
import * as companyConfig from '../../../configs/companyConfig'
import SalesModal from './SalesModal'

const {RangePicker} = DatePicker;

@observer
export default class Sales extends Component{
    state = {
        dateRange : []
    }

    constructor(props) {
        super(props)
    }


    showTodayTasks() {
        let company_id = companyConfig.companyInfo.company_id
        let startDate = moment().format('YYYY-MM-DD')
        let endDate = moment().format('YYYY-MM-DD')
        const info = {
            company_id: company_id,
            start_date: startDate,
            end_date: endDate
        }
        this.props.store.listTasks(info)
    }

    searchTasks(){
        let company_id = companyConfig.companyInfo.company_id
        let startDate = this.state.dateRange[0] || moment().format('YYYY-MM-DD')
        let endDate = this.state.dateRange[1] || moment().format('YYYY-MM-DD')
        const info = {
            company_id: company_id,
            start_date: startDate,
            end_date: endDate
        }
        this.props.store.listTasks(info)
    }

    componentDidMount() {
        this.showTodayTasks()
    }

    onChange(date, dateString) {
        this.setState({
            dateRange:dateString
        })
    }


    render(){
        return(
            <div>
                <div className="table-operations">
                    <label style={{marginRight: 8}}>检索日期</label>
                    <RangePicker style={{marginRight: 8}} placeholder={['开始日期', '结束日期']} onChange={this.onChange.bind(this)}/>
                    <Button onClick={this.searchTasks.bind(this)}>查询</Button>
                    <Button onClick={this.showTodayTasks.bind(this)}>查询今日任务</Button>
                    {/*<TaskModal*/}
                        {/*store={this.props.store}*/}
                        {/*title="Basic Modal"*/}
                        {/*visible={this.props.store.modalVisible}/>*/}
                    <SalesModal
                        store={this.props.store}
                        title="Sales Modal"
                        visible={this.props.store.salesModalVisible}
                    />
                </div>
                <SalesTable store={this.props.store}/>
            </div>
        )
    }
}