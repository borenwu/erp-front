import {observable, action, autorun, useStrict} from 'mobx';
import {message} from 'antd'
import Axios from 'axios'
import * as ipConfig from '../configs/ipConfig'
import * as companyConfig from '../configs/companyConfig'
import * as messageConfig from '../configs/messageConfig'

const clientsUrl = `${ipConfig.rootUrl}/clients`
const taskUrl = `${ipConfig.rootUrl}/task`;
const tasksUrl = `${ipConfig.rootUrl}/tasks`

message.config(messageConfig.messageConf);

export default class FinanceStore{
    @observable clients = []
    @observable tasks = []
    @observable taskById = {}

    @observable modalVisible = false
    @observable salesModalVisible = false

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


    @action updateTaskById(taskInfo) {
        Axios.put(taskUrl, taskInfo)
            .then(response => {
                let updateTask = response.data
                let index = this.tasks.findIndex((task) => task.id === updateTask.id)
                this.tasks[index] = updateTask
                message.success('修改成功')
            })
            .catch(error => {
                throw(error);
            });
    }

    @action finishTask(taskInfo){
        Axios.put(`${taskUrl}/finish`, taskInfo)
            .then(response => {
                let finishTask = response.data
                let index = this.tasks.findIndex((task) => task.id === finishTask.id)
                console.log(index)
                this.tasks[index].status = true
                message.success('任务完成')
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