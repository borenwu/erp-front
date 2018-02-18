import {observable, action, computed,useStrict} from 'mobx';
import Axios from 'axios'
import * as ipConfig from '../configs/ipConfig'
import * as companyConfig from '../configs/companyConfig'

const taskUrl = `${ipConfig.rootUrl}/task`;
const tasksUrl = `${ipConfig.rootUrl}/tasks`

export default class TaskStore{

    @observable clients = []
    @observable tasks = []
    @observable taskById = {}

    @observable modalVisible = false
    @observable updateModalVisible = false

    @action createTask(task){
        Axios.post(taskUrl, task)
            .then(response => {
                this.tasks.push(response.data)
            })
            .catch(error => {
                throw(error);
            });
    }

    @action listTasks(info){
        Axios.post(tasksUrl, info)
            .then(response => {
                this.tasks = response.data
            })
            .catch(error => {
                throw(error);
            });
    }

    @action deleteTaskById(taskInfo){
        let taskId = taskInfo.task_id
        Axios.delete(taskUrl,taskInfo)
            .then(response=>{
                if(response.data.status == 200){
                    this.tasks = this.tasks.filter(item => item.id !== taskId);
                }
            })
    }

    @action updateTaskById(taskInfo){

    }

    @action showModal(){
        this.modalVisible = true
    }

    @action closeModal(){
        this.modalVisible = false
    }

    @action showUpdateModal(task){
        this.taskById = task
        this.updateModalVisible = true
    }


    @action closeUpdateModal(){
        this.updateModalVisible = false
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