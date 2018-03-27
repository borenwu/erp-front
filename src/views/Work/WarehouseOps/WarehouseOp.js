import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {DatePicker,Button} from 'antd';
import moment from 'moment';
import WarehouseOpModal from './WarehouseOpModal'
import WarehouseOpUpdateModal from './WarehouseOpUpdateModal'
import WarehouseopTable from './WarehouseopTable'
import './WarehouseOp.css'


const {RangePicker} = DatePicker;

@observer
export default class WarehouseOp extends Component{
    state = {
        dateRange : []
    }

    constructor(props){
        super(props)
    }

    showItemopModal() {
        this.props.store.showItemopModal()
    }


    showTodayItemops() {
        let company_id = this.props.store.company_id
        let startDate = moment().format('YYYY-MM-DD')
        let endDate = moment().format('YYYY-MM-DD')
        const info = {
            company_id: company_id,
            start_date: startDate,
            end_date: endDate
        }
        this.props.store.listItemops(info)
    }

    searchItemops(){
        let company_id = this.props.store.company_id
        let startDate = this.state.dateRange[0] || moment().format('YYYY-MM-DD')
        let endDate = this.state.dateRange[1] || moment().format('YYYY-MM-DD')
        const info = {
            company_id: company_id,
            start_date: startDate,
            end_date: endDate
        }
        this.props.store.listItemops(info)
    }



    componentDidMount() {
        this.showTodayItemops()
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
                    <Button onClick={this.searchItemops.bind(this)}>查询</Button>
                    <Button onClick={this.showTodayItemops.bind(this)}>查询今日领料记录</Button>
                    <Button onClick={this.showItemopModal.bind(this)}>创建领料记录</Button>
                    <WarehouseOpModal
                        {...this.props}
                        store={this.props.store}
                        title="创建领料记录"
                        visible={this.props.store.itemopModalVisible}/>
                    <WarehouseOpUpdateModal
                        {...this.props}
                        store={this.props.store}
                        title="修改领料记录"
                        visible={this.props.store.itemopUpdateModalVisible}
                    />
                </div>
                <WarehouseopTable store={this.props.store}/>
            </div>
        )
    }
}