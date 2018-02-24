import {observable, action, autorun, useStrict} from 'mobx';
import {message} from 'antd'
import Axios from 'axios'
import * as ipConfig from '../configs/ipConfig'
import * as companyConfig from '../configs/companyConfig'
import * as messageConfig from '../configs/messageConfig'

const clientsUrl = `${ipConfig.rootUrl}/clients`
const taskUrl = `${ipConfig.rootUrl}/task`;
const tasksUrl = `${ipConfig.rootUrl}/tasks`
const tasksByClientUrl = `${ipConfig.rootUrl}/tasksByClient`

message.config(messageConfig.messageConf);

export default class FinanceStore{
    @observable clients = []
    @observable tasks = []
    @observable taskById = {}
    @observable price = 0.0
    @observable volume =  0.0
    @observable sale = 0.0

    @observable modalVisible = false
    @observable salesModalVisible = false

    computeSale(){
        this.sale = (Number(this.price) * Number(this.volume)).toFixed(2)
    }

    @action setPrice(price){
        this.price = price
        this.computeSale()
    }

    @action setVolume(volume){
        this.volume = volume
        this.computeSale()
    }


    @action fetchClients(company_id){
        let companyInfo = {
            company_id:company_id
        }
        Axios.post(clientsUrl,companyInfo)
            .then(response=>{
                this.clients = response.data
            })
    }


    @action listTasks(info) {
        Axios.post(tasksUrl, info)
            .then(response => {
                if (response.data.status == 201) {
                    message.warning('获取任务列表为空');
                }
                else {
                    this.tasks = response.data
                }

            })
            .catch(error => {
                throw(error);
            });
    }

    @action listTasksByClient(info){
        Axios.post(tasksByClientUrl, info)
            .then(response => {
                if (response.data.status == 201) {
                    message.warning('获取任务列表为空');
                }
                else {
                    this.tasks = response.data
                }

            })
            .catch(error => {
                throw(error);
            });
    }



    @action updateSale(taskInfo){
        Axios.put(`${taskUrl}/sale`,taskInfo)
            .then(response => {
                let updateTask = response.data
                let index = this.tasks.findIndex((task) => task.id === updateTask.id)
                this.tasks[index] = updateTask
                message.success('销售记录添加成功')
            })
            .catch(error => {
                throw(error);
            });
    }


    @action showModal() {
        this.modalVisible = true
    }

    @action closeModal() {
        this.modalVisible = false
    }

    @action showSalesModal(record) {
        this.taskById = this.tasks[record.key]
        this.volume = this.taskById.volume
        this.salesModalVisible = true
    }


    @action closeSalesModal() {
        this.taskById = {}
        this.salesModalVisible = false
    }

    // @action listAllCompanies(){
    //     Axios.get(apiUrl)
    //         .then(response => {
    //             this.companies = response.data
    //         })
    //         .catch(error =>{
    //             throw(error);
    //         })
    // }
}