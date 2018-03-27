import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {DatePicker,Button} from 'antd';
import moment from 'moment';
import TaskWastesTable from './TaskWastesTable'
import TaskWastesModal from './TaskWastesModal'
import TaskWastesUpdateModal from './TaskWastesUpdateModal'
import './TaskWastes.css'

const {RangePicker} = DatePicker;

@observer
export default class TaskWastes extends Component {
    state = {
        dateRange : []
    }

    constructor(props) {
        super(props)
    }

    showModal() {
        this.props.store.showTaskWastesModal()
    }


    showTodayTaskWastes() {
        let company_id = this.props.store.company_id
        let startDate = moment().format('YYYY-MM-DD')
        let endDate = moment().format('YYYY-MM-DD')
        const info = {
            company_id: company_id,
            start_date: startDate,
            end_date: endDate
        }
        this.props.store.listTaskWastes(info)
    }

    searchTaskWastes(){
        let company_id = this.props.store.company_id
        let startDate = this.state.dateRange[0] || moment().format('YYYY-MM-DD')
        let endDate = this.state.dateRange[1] || moment().format('YYYY-MM-DD')
        const info = {
            company_id: company_id,
            start_date: startDate,
            end_date: endDate
        }
        this.props.store.listTaskWastes(info)
    }



    componentDidMount() {
        this.showTodayTaskWastes()
    }

    onChange(date, dateString) {
        this.setState({
            dateRange:dateString
        })
    }


    render() {
        return (
            <div>
                <div className="table-operations">
                    <label style={{marginRight: 8}}>检索日期</label>
                    <RangePicker style={{marginRight: 8}} placeholder={['开始日期', '结束日期']} onChange={this.onChange.bind(this)}/>
                    <Button onClick={this.searchTaskWastes.bind(this)}>查询</Button>
                    <Button onClick={this.showTodayTaskWastes.bind(this)}>查询今日废料</Button>
                    <Button onClick={this.showModal.bind(this)}>创建</Button>
                    <TaskWastesModal
                        {...this.props}
                        store={this.props.store}
                        title="新建废料记录"
                        visible={this.props.store.taskWastesModalVisible}/>
                    <TaskWastesUpdateModal
                        {...this.props}
                        store={this.props.store}
                        title="修改废料记录"
                        visible={this.props.store.taskWastesUpdateModalVisible}
                    />
                </div>
                <TaskWastesTable store={this.props.store}/>
            </div>
        )
    }
}