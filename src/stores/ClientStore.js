import {observable, action, computed, useStrict} from 'mobx';
import Axios from 'axios'
import {message} from 'antd'
import * as messageConfig from '../configs/messageConfig'

message.config(messageConfig.messageConf);

export default class ClientStore {

    @observable clients = []
    @observable clientById = {}
    @observable company_id = JSON.parse(window.localStorage.getItem("companyInfo")).id

    @observable rootUrl = window.localStorage.getItem("ipConfig")
    @observable clientUrl = `${this.rootUrl}/client`;
    @observable clientsUrl = `${this.rootUrl}/clients`;


    @action createClient(client) {
        Axios.post(this.clientUrl, client)
            .then(response => {
                this.clients.push(response.data)
            })
            .catch(error => {
                throw(error);
            });
    }

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

    @action fetchClientById(clientId) {
        Axios.get(`${this.clientUrl}/${clientId}`)
            .then(response => {
                console.log(response.data)
                this.clientById = response.data

            })
            .catch(error => {
                throw(error);
            });
    }

    @action updateClientById(clientId, newClient) {
        Axios.put(`${this.clientUrl}/${clientId}`, newClient)
            .then(response => {
                this.clientById = response.data
            })
            .catch(error => {
                throw(error);
            });
    }

    @action deleteClientById(clientId) {
        Axios.delete(`${this.clientUrl}/${clientId}`)
            .then(response => {
                if(response.data.status == 200){
                    this.clients = this.clients.filter(item => item.id !== clientId);
                }
            })
            .catch(error => {
                throw(error);
            });
        console.log('delete')
    }
}