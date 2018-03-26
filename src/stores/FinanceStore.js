import {observable, action, autorun, useStrict} from 'mobx';
import {message} from 'antd'
import Axios from 'axios'
import * as messageConfig from '../configs/messageConfig'
import $ from 'jquery'

message.config(messageConfig.messageConf);

export default class FinanceStore{
    @observable clients = []
    @observable suppliers = []
    @observable tasks = []
    @observable taskById = {}
    @observable accountsByClient = []
    @observable accountsBySupplier = []
    @observable price = 0.0
    @observable volume =  0.0
    @observable sale = 0.0

    @observable company_id = JSON.parse(window.localStorage.getItem("companyInfo")).id

    @observable modalVisible = false
    @observable salesModalVisible = false
    @observable salesUndoModalVisible = false
    @observable accountReceivableModalVisible = false
    @observable accountPayableModalVisible = false

    @observable rootUrl = window.localStorage.getItem("ipConfig")
    @observable clientsUrl = `${this.rootUrl}/clients`
    @observable suppliersUrl = `${this.rootUrl}/suppliers`
    @observable taskUrl = `${this.rootUrl}/task`;
    @observable tasksUrl = `${this.rootUrl}/tasks`
    @observable tasksByClientUrl = `${this.rootUrl}/tasksByClient`
    @observable clientAccountsUrl = `${this.rootUrl}/accounts/client`
    @observable supplierAccountsUrl = `${this.rootUrl}/accounts/supplier`
    @observable receivableCrUrl = `${this.rootUrl}/accounts/receivablecr`
    @observable payableDrUrl = `${this.rootUrl}/accounts/payabledr`
    @observable payableCrUrl = `${this.rootUrl}/accounts/payablecr`


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

    @action cleanTasks(){
        this.tasks = []
    }

    @action cleanClients(){
        this.clients = []
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

    @action fetchSuppliers(company_id){
        let companyInfo = {
            company_id:company_id
        }
        Axios.post(this.suppliersUrl,companyInfo)
            .then(response=>{
                if (response.data.status === 201) {
                    message.warning('获取供应商列表为空');
                }
                else {
                    this.suppliers = response.data
                }
            })
            .catch(error => {
                throw(error);
            });
    }


    @action listTasks(info) {
        Axios.post(this.tasksUrl, info)
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
        Axios.post(this.tasksByClientUrl, info)
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
        Axios.put(`${this.taskUrl}/sale`,taskInfo)
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

    @action undoSale(taskInfo){
        Axios.put(`${this.taskUrl}/sale/undo`,taskInfo)
            .then(response=>{
                let updateTask = response.data
                let index = this.tasks.findIndex((task) => task.id === updateTask.id)
                this.tasks[index] = updateTask
                this.taskById = updateTask
                this.volume = this.taskById.volume
                this.price = 0
                this.sale = 0
                message.success('销售记录撤销成功')
            })
            .catch(error => {
                throw(error);
            });
    }

    @action fetchAccountsByClient(info){
        Axios.post(this.clientAccountsUrl,info)
            .then(response=>{
                if (response.data.status === 201) {
                    message.warning('获取账户信息列表为空');
                }
                else {
                    this.accountsByClient = response.data
                }
            })
            .catch(error => {
                throw(error);
            });
    }

    @action fetchAccountsBySupplier(info){
        Axios.post(this.supplierAccountsUrl,info)
            .then(response=>{
                if (response.data.status === 201) {
                    message.warning('获取账户信息列表为空');
                }
                else {
                    this.accountsBySupplier = response.data
                }
            })
            .catch(error => {
                throw(error);
            });
    }

    @action createReceivableCr(accountInfo){
        Axios.post(this.receivableCrUrl,accountInfo)
            .then(response=>{
                this.accountsByClient.push(response.data.account)
            })
            .catch(error => {
                throw(error);
            });
    }

    @action createPayableDr(accountInfo){
        Axios.post(this.payableDrUrl,accountInfo)
            .then(response=>{
                this.accountsBySupplier.push(response.data.account)
            })
            .catch(error => {
                throw(error);
            });
    }

    @action createPayableCr(accountInfo){
        Axios.post(this.payableCrUrl,accountInfo)
            .then(response=>{
                console.log(response)
                this.accountsBySupplier.push(response.data.account)
            })
            .catch(error => {
                throw(error);
            });
    }

    //////////////////////////////////////////////////////////////


    @action showModal() {
        this.modalVisible = true
    }

    @action closeModal() {
        this.modalVisible = false
    }

    @action showSalesModal(record) {
        this.taskById = this.tasks[record.key]
        this.volume = this.taskById.volume
        this.price = 0
        this.sale = 0
        this.salesModalVisible = true
    }


    @action closeSalesModal() {
        this.taskById = {}
        this.salesModalVisible = false
    }

    @action showSalesUndoModal(record){
        this.taskById = this.tasks[record.key]
        this.price = 0
        this.sale = 0
        this.salesUndoModalVisible = true
    }

    @action closeSalesUndoModal() {
        this.taskById = {}
        this.salesUndoModalVisible = false
    }

    @action showReceivableModal(){
        this.accountReceivableModalVisible = true
    }

    @action closeReceivableModal(){
        this.accountReceivableModalVisible = false
    }

    @action showPayableModal(){
        this.accountPayableModalVisible = true
    }

    @action closePayableModal(){
        this.accountPayableModalVisible = false
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