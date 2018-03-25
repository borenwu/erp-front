import {observable, action, computed, useStrict} from 'mobx';
import Axios from 'axios'
import {message} from 'antd'
import * as messageConfig from '../configs/messageConfig'
import moment from 'moment'

message.config(messageConfig.messageConf);

export default class ReceivableDashStore{
    @observable clients = []
    @observable clientById = {}

    @observable company_id = JSON.parse(window.localStorage.getItem("companyInfo")).id
    @observable rootUrl = window.localStorage.getItem("ipConfig")
    @observable clientUrl = `${this.rootUrl}/client`;
    @observable clientsUrl = `${this.rootUrl}/clients`;

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

}