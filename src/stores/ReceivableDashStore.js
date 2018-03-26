import {observable, action, computed, useStrict} from 'mobx';
import Axios from 'axios'
import {message} from 'antd'
import * as messageConfig from '../configs/messageConfig'
import moment from 'moment'

message.config(messageConfig.messageConf);

export default class ReceivableDashStore{
    @observable clients = []
    @observable clientById = {}
    @observable accountsByClient = []
    @observable accountLogData = []
    @observable salesByClient = {}

    @observable company_id = JSON.parse(window.localStorage.getItem("companyInfo")).id
    @observable rootUrl = window.localStorage.getItem("ipConfig")
    @observable clientUrl = `${this.rootUrl}/client`;
    @observable clientsUrl = `${this.rootUrl}/clients`;
    @observable clientAccountsUrl = `${this.rootUrl}/accounts/client`

    @action fetchClients(company_id){
        let companyInfo = {
            company_id:company_id
        }
        Axios.post(this.clientsUrl,companyInfo)
            .then(response=>{
                if (response.data.status === 201) {
                    message.warning('获取客户列表为空');
                }
                else {
                    this.clients = response.data
                }
            })
    }

    @action fetchThisMonthSalesByClient(record){
        let today = moment().format('YYYY-MM-DD')
        let thisMonth = moment().month()
        let startOfThisMonth = moment().month(thisMonth).startOf('month').format('YYYY-MM-DD')
        let req = {
            company_id:this.company_id,
            client_name:record.client_name,
            start_date:startOfThisMonth,
            end_date:today
        }

        Axios.post(this.clientAccountsUrl,req)
            .then(response=>{
                if (response.data.status === 201) {
                    message.warning('获取账户信息列表为空');
                    this.accountsByClient = []
                    this.accountLogData = []
                }
                else {
                    this.accountsByClient = response.data

                }
            })
    }

    @action fetchLastMonthSalesByClient(record){
        let today = moment().format('YYYY-MM-DD')
        let thisMonth = moment().month()
        let lastMonth = thisMonth - 1
        let startOfLastMonth = moment().month(lastMonth).startOf('month').format('YYYY-MM-DD')
        let endOfLastMonth = moment().month(lastMonth).endOf('month').format('YYYY-MM-DD')
        let req = {
            company_id:this.company_id,
            client_name:record.client_name,
            start_date:startOfLastMonth,
            end_date:endOfLastMonth
        }

        Axios.post(this.clientAccountsUrl,req)
            .then(response=>{
                if (response.data.status === 201) {
                    message.warning('获取账户信息列表为空');
                }
                else {
                    this.accountsByClient = response.data
                }
            })
    }

    @action reset(){
        this.accountsByClient = []
        this.accountLogData = []
    }


}