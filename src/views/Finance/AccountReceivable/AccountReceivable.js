import React, {Component} from 'react';
import {observer} from 'mobx-react';
import moment from 'moment';
import {DatePicker,Button} from 'antd';
import AccountReceivableTable from './AccountReceivableTable'
import AccountReceivableModal from './AccountReceivableModal'
import './AccountReceivable.css'

const {RangePicker} = DatePicker;

@observer
export default class AccountReceivable extends Component{
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

    searchAccountsByClient(){
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
        this.props.store.fetchAccountsByClient(info)
    }

    showReceivableModal(){
        this.props.store.showReceivableModal()
    }

    componentDidMount(){
        this.props.store.fetchClients(this.props.store.company_id)
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
                        <Button onClick={this.searchAccountsByClient.bind(this)} style={{marginRight: 8}}>查询</Button>
                        <Button style={{marginRight: 8}} onClick={this.showReceivableModal.bind(this)}>创建销售到账记录</Button>
                    </form>


                    <AccountReceivableModal
                        {...this.props}
                        store={this.props.store}
                        title="创建应收款借方记录"
                        visible={this.props.store.accountReceivableModalVisible}/>
                </div>
                <AccountReceivableTable store={this.props.store}/>
            </div>
        )
    }
}