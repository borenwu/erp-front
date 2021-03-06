import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {DatePicker,Button} from 'antd';
import moment from 'moment';
import SalesTable from './SalesTable'
import SalesModal from './SalesModal'
import SalesUndoModal from './SalesUndoModal'

const {RangePicker} = DatePicker;

@observer
export default class SalesRecord extends Component{
    state = {
        dateRange : []
    }

    constructor(props) {
        super(props)
    }


    showTodayTasks() {
        let company_id = this.props.store.company_id
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
        let company_id = this.props.store.company_id
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

                    <SalesModal
                        {...this.props}
                        store={this.props.store}
                        title="创建销售记录"
                        visible={this.props.store.salesModalVisible}
                    />

                    <SalesUndoModal
                        {...this.props}
                        store={this.props.store}
                        title="撤销销售记录"
                        visible={this.props.store.salesUndoModalVisible}
                    />


                </div>
                <SalesTable store={this.props.store}/>
            </div>
        )
    }
}