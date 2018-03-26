import React, {Component} from 'react';
import {observer} from 'mobx-react';
import moment from 'moment';
import {DatePicker,Button} from 'antd';
import AccountPayableTable from './AccountPayableTable'
import AccountPayableModal from './AccountPayableModal'
import './AccountPayable.css'

const {RangePicker} = DatePicker;

@observer
export default class AccountPayable extends Component{
    state = {
        dateRange : []
    }

    constructor(props){
        super(props)
    }

    onChange(date, dateString) {
        this.setState({
            dateRange:dateString
        })
    }

    searchAccountsBySupplier(){
        let company_id = this.props.store.company_id
        let supplier_name = this.refs.supplier_name.value
        let startDate = this.state.dateRange[0] || moment().format('YYYY-MM-DD')
        let endDate = this.state.dateRange[1] || moment().format('YYYY-MM-DD')
        const info = {
            company_id: company_id,
            supplier_name:supplier_name,
            start_date: startDate,
            end_date: endDate
        }
        this.props.store.fetchAccountsBySupplier(info)
    }

    showPayableModal(){
        this.props.store.showPayableModal()
    }

    componentDidMount(){
        this.props.store.fetchSuppliers(this.props.store.company_id)
    }

    render(){
        return(
            <div>
                <div className="table-operations">
                    <form className="form-inline">
                        <label style={{marginRight: 8}}>选择供应商</label>
                        <select ref="supplier_name" style={{marginRight: 8,width:200}} className="form-control">
                            {this.props.store.suppliers.map((s,i)=>  <option key={i}>{s.supplier_name}</option>)}
                        </select>
                        <label style={{marginRight: 8}}>检索日期</label>
                        <RangePicker style={{marginRight: 8}} placeholder={['开始日期', '结束日期']} onChange={this.onChange.bind(this)}/>
                        <Button onClick={this.searchAccountsBySupplier.bind(this)} style={{marginRight: 8}}>查询</Button>
                        <Button style={{marginRight: 8}} onClick={this.showPayableModal.bind(this)}>创建应付款记录</Button>
                    </form>


                    <AccountPayableModal
                        {...this.props}
                        store={this.props.store}
                        title="创建应付款记录"
                        visible={this.props.store.accountPayableModalVisible}/>
                </div>
                <AccountPayableTable store={this.props.store}/>
            </div>
        )
    }
}