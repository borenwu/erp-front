import {observable, action, autorun, useStrict} from 'mobx';
import {message} from 'antd'
import Axios from 'axios'
import * as messageConfig from '../configs/messageConfig'

message.config(messageConfig.messageConf);


export default class TaskStore {
    @observable clients = []
    @observable tasks = []
    @observable taskById = {}
    @observable taskNames = []

    @observable company_id = JSON.parse(window.localStorage.getItem("companyInfo")).id

    @observable clientModalVisible = false
    @observable modalVisible = false
    @observable updateModalVisible = false

    @observable rootUrl = window.localStorage.getItem("ipConfig")
    @observable clientsUrl = `${this.rootUrl}/clients`
    @observable clientUrl = `${this.rootUrl}/client`
    @observable taskUrl = `${this.rootUrl}/task`;
    @observable tasksUrl = `${this.rootUrl}/tasks`


    @action createClient(clientInfo){
        Axios.post(this.clientUrl,clientInfo)
            .then(response => {
                this.clients.push(response.data)
                message.success('创建成功')
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

    @action createTask(task) {
        Axios.post(this.taskUrl, task)
            .then(response => {
                this.tasks.push(response.data)
                message.success('创建成功')
            })
            .catch(error => {
                throw(error);
            });
    }

    @action listTasks(info) {
        Axios.post(this.tasksUrl, info)
            .then(response => {
                if (response.data.status === 201) {
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

    @action deleteTaskById(taskId) {
        Axios.delete(`${this.taskUrl}/${taskId}`)
            .then(response => {
                if (response.data.status === 200) {
                    this.tasks = this.tasks.filter(item => item.id !== taskId);
                    message.success('删除成功')
                }
            })
            .catch(error => {
                throw(error);
            });
    }

    @action updateTask(taskInfo) {
        Axios.put(this.taskUrl, taskInfo)
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
        Axios.put(`${this.taskUrl}/finish`, taskInfo)
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

    @action getTaskNames(){
        let companyInfo = {
            company_id:this.company_id
        }

        Axios.post(`${this.tasksUrl}/names`,companyInfo)
            .then(response=>{
                if (response.data.status === 201) {
                    message.warning('获取任务名列表为空');
                }
                else {
                    let result = response.data.result
                    this.taskNames = result
                }
            })
    }

    @action showModal() {
        this.modalVisible = true
    }

    @action closeModal() {
        this.modalVisible = false
    }

    @action showUpdateModal(record) {
        this.taskById = this.tasks[record.key]
        this.updateModalVisible = true
    }


    @action closeUpdateModal() {
        this.taskById = {}
        this.updateModalVisible = false
    }

    @action showClientModal() {
        this.clientModalVisible = true
    }

    @action closeClientModal() {
        this.clientModalVisible = false
    }
}

