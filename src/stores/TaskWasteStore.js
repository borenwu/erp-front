import {observable, action, autorun, useStrict} from 'mobx';
import {message} from 'antd'
import Axios from 'axios'
import * as messageConfig from '../configs/messageConfig'

message.config(messageConfig.messageConf);

export default class TaskWasteStore{
    @observable taskWastes = []
    @observable taskWasteById = {}

    @observable company_id = JSON.parse(window.localStorage.getItem("companyInfo")).id

    @observable taskWastesModalVisible = false
    @observable taskWastesUpdateModalVisible = false

    @observable rootUrl = window.localStorage.getItem("ipConfig")
    @observable taskWasteUrl = `${this.rootUrl}/taskwaste`
    @observable taskWastesUrl = `${this.rootUrl}/taskwastes`


    @action createTaskWaste(taskWaste) {
        Axios.post(this.taskWasteUrl, taskWaste)
            .then(response => {
                this.taskWastes.push(response.data)
                message.success('创建成功')
            })
            .catch(error => {
                throw(error);
            });
    }

    @action listTaskWastes(info) {
        Axios.post(this.taskWastesUrl, info)
            .then(response => {
                if (response.data.status === 201) {
                    message.warning('获取任务列表为空');
                }
                else {
                    this.taskWastes = response.data
                }

            })
            .catch(error => {
                throw(error);
            });
    }

    @action deleteTaskWasteById(taskWasteId) {
        Axios.delete(`${this.taskWasteUrl}/${taskWasteId}`)
            .then(response => {
                if (response.data.status === 200) {
                    this.taskWastes = this.taskWastes.filter(item => item.id !== taskWasteId);
                    message.success('删除成功')
                }
            })
            .catch(error => {
                throw(error);
            });
    }

    @action updateTaskWaste(taskWasteInfo) {
        Axios.put(this.taskWasteUrl, taskWasteInfo)
            .then(response => {
                let updateTaskWaste = response.data
                let index = this.taskWastes.findIndex((taskWaste) => taskWaste.id === updateTaskWaste.id)
                this.taskWastes[index] = updateTaskWaste
                message.success('修改成功')
            })
            .catch(error => {
                throw(error);
            });
    }



    ////////////////////////////////////////////////////////////////////////////
    @action showTaskWastesModal() {
        this.taskWastesModalVisible = true
    }

    @action closeTaskWastesModal() {
        this.taskWastesModalVisible = false
    }

    @action showTaskWastesUpdateModal(record) {
        this.taskWasteById = this.taskWastes[record.key]
        this.taskWastesUpdateModalVisible = true
    }


    @action closeTaskWastesUpdateModal() {
        this.taskWasteById = {}
        this.taskWastesUpdateModalVisible = false
    }

}