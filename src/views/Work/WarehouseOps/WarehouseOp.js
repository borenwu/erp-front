import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {DatePicker,Button} from 'antd';
import moment from 'moment';
import WarehouseOpModal from './WarehouseOpModal'
import WarehouseUpdateModal from './WarehouseOpUpdateModal'
import WarehouseopTable from './WarehouseopTable'
import './WarehouseOp.css'
import * as companyConfig from '../../../configs/companyConfig'

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
        console.log('showWarehouseModal')
        this.props.store.showItemopModal()
    }


    showTodayItemops() {
        console.log('showTodayItemops')
        let company_id = companyConfig.companyInfo.company_id
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
        console.log('searchItemops')
        let company_id = companyConfig.companyInfo.company_id
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
                        store={this.props.store}
                        title="Basic Modal"
                        visible={this.props.store.itemopModalVisible}/>
                    {/*<UpdateModal*/}
                        {/*store={this.props.store}*/}
                        {/*title="Update Modal"*/}
                        {/*visible={this.props.store.updateModalVisible}*/}
                    {/*/>*/}
                </div>
                <WarehouseopTable store={this.props.store}/>
            </div>
        )
    }
}