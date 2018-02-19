import {observable, action, autorun, useStrict} from 'mobx';
import {message} from 'antd'
import Axios from 'axios'
import * as ipConfig from '../configs/ipConfig'
import * as companyConfig from '../configs/companyConfig'
import * as messageConfig from '../configs/messageConfig'

const taskUrl = `${ipConfig.rootUrl}/task`;
const tasksUrl = `${ipConfig.rootUrl}/tasks`

message.config(messageConfig.messageConf);


export default class TaskStore {

    @observable clients = []
    @observable tasks = []
    @observable taskById = {}

    @observable modalVisible = false
    @observable updateModalVisible = false


    @action createTask(task) {
        Axios.post(taskUrl, task)
            .then(response => {
                this.tasks.push(response.data)
                message.success('创建成功')
            })
            .catch(error => {
                throw(error);
            });
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

    @action deleteTaskById(taskId) {
        Axios.delete(`${taskUrl}/${taskId}`)
            .then(response => {
                if (response.data.status == 200) {
                    this.tasks = this.tasks.filter(item => item.id !== taskId);
                    message.success('删除成功')
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
                let index = this.tasks.findIndex((updateTask) => updateTask.id)
                this.tasks[index] = updateTask
                message.success('修改成功')
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

    @action showUpdateModal(record) {
        this.taskById = this.tasks[record.key]
        this.updateModalVisible = true
    }


    @action closeUpdateModal() {
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
