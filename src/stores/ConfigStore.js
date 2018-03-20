import {observable, action, autorun, useStrict} from 'mobx';
import {message} from 'antd'
import Axios from 'axios'


export default class ConfigStore{

    @observable clients = []
    @observable clientById = {}
    @observable suppliers = []
    @observable supplierById = {}
    @observable warehouseItems = []
    @observable warehouseItemById = {}
    @observable users = []
    @observable userById = {}

    @observable company_id = JSON.parse(window.localStorage.getItem("companyInfo")).id

    @observable clientModalVisible = false
    @observable clientUpdateModalVisible = false
    @observable supplierModalVisible = false
    @observable supplierUpdateModalVisible = false
    @observable warehouseModalVisible = false
    @observable warehouseUpdateModalVisible = false
    @observable userModalVisible = false
    @observable userUpdateModalVisible = false

    @observable rootUrl = window.localStorage.getItem("ipConfig")
    @observable clientUrl = `${this.rootUrl}/client`
    @observable clientsUrl = `${this.rootUrl}/clients`
    @observable supplierUrl = `${this.rootUrl}/supplier`
    @observable suppliersUrl = `${this.rootUrl}/suppliers`
    @observable warehouseItemUrl = `${this.rootUrl}/warehouse/item`
    @observable warehouseItemsUrl = `${this.rootUrl}/warehouse/items`
    @observable userUrl = `${this.rootUrl}/user`
    @observable usersUrl = `${this.rootUrl}/users`

    ///////////////////////////////////////// client///////////////////////////////////////////////
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

    @action updateClient(clientInfo){
        Axios.put(this.clientUrl, clientInfo)
            .then(response => {
                let updateClient = response.data
                let index = this.clients.findIndex((client) => client.id === updateClient.id)
                this.clients[index] = updateClient
                message.success('修改成功')
            })
            .catch(error => {
                throw(error);
            });
    }

    @action deleteClientById(clientId) {
        Axios.delete(`${this.clientUrl}/${clientId}`)
            .then(response => {
                if (response.data.status === 200) {
                    this.clients = this.clients.filter(item => item.id !== clientId);
                    message.success('删除成功')
                }
            })
            .catch(error => {
                throw(error);
            });
    }

    ////////////////////////////////// supplier////////////////////////////////////////
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

    @action createSupplier(supplierInfo){
        Axios.post(this.supplierUrl,supplierInfo)
            .then(response => {
                this.suppliers.push(response.data)
                message.success('创建成功')
            })
            .catch(error => {
                throw(error);
            });
    }

    @action updateSupplier(supplierInfo){
        Axios.put(this.supplierUrl, supplierInfo)
            .then(response => {
                let updateSupplier = response.data
                let index = this.suppliers.findIndex((supplier) => supplier.id === updateSupplier.id)
                this.suppliers[index] = updateSupplier
                message.success('修改成功')
            })
            .catch(error => {
                throw(error);
            });
    }

    @action deleteSupplierById(supplierId) {
        Axios.delete(`${this.supplierUrl}/${supplierId}`)
            .then(response => {
                if (response.data.status === 200) {
                    this.suppliers = this.suppliers.filter(item => item.id !== supplierId);
                    message.success('删除成功')
                }
            })
            .catch(error => {
                throw(error);
            });
    }


    //////////////////////////////users//////////////////////////////////
    @action fetchUsers(company_id){
        let companyInfo = {
            company_id:company_id
        }
        Axios.post(this.usersUrl,companyInfo)
            .then(response=>{
                if (response.data.status === 201) {
                    message.warning('获取用户列表为空');
                }
                else {
                    this.users = response.data
                }
            })
            .catch(error => {
                throw(error);
            });
    }

    @action createUser(userInfo){
        Axios.post(this.userUrl,userInfo)
            .then(response => {
                this.users.push(response.data)
                message.success('创建成功')
            })
            .catch(error => {
                throw(error);
            });
    }

    @action updateUser(userInfo){
        Axios.put(this.userUrl, userInfo)
            .then(response => {
                let updateUser = response.data
                let index = this.users.findIndex((user) => user.id === updateUser.id)
                this.users[index] = updateUser
                message.success('修改成功')
            })
            .catch(error => {
                throw(error);
            });
    }

    @action deleteUserById(userId) {
        Axios.delete(`${this.userUrl}/${userId}`)
            .then(response => {
                console.log(response)
                if (response.data.status === 200) {
                    this.users = this.users.filter(user => user.id !== userId);
                    message.success('删除成功')
                }
            })
            .catch(error => {
                throw(error);
            });
    }

    //////////////////////////////warehouse items//////////////////////////////////
    @action fetchWarehouseItems(company_id){
        let companyInfo = {
            company_id:company_id
        }
        Axios.post(this.warehouseItemsUrl,companyInfo)
            .then(response=>{
                if (response.data.status === 201) {
                    message.warning('获取物料列表为空');
                }
                else {
                    this.warehouseItems = response.data
                }
            })
            .catch(error => {
                throw(error);
            });
    }

    @action createWarehouseItem(warehouseItemInfo){
        Axios.post(this.warehouseItemUrl,warehouseItemInfo)
            .then(response => {
                this.warehouseItems.push(response.data)
                message.success('创建成功')
            })
            .catch(error => {
                throw(error);
            });
    }

    @action updateWarehouseItem(warehouseItemInfo){
        Axios.put(this.warehouseItemUrl, warehouseItemInfo)
            .then(response => {
                let updateItem = response.data
                let index = this.warehouseItems.findIndex((item) => item.id === updateItem.id)
                this.warehouseItems[index] = updateItem
                message.success('修改成功')
            })
            .catch(error => {
                throw(error);
            });
    }

    @action deleteWarehouseItemById(itemId) {
        Axios.delete(`${this.warehouseItemUrl}/${itemId}`)
            .then(response => {
                if (response.data.status === 200) {
                    this.warehouseItems = this.warehouseItems.filter(item => item.id !== itemId);
                    message.success('删除成功')
                }
            })
            .catch(error => {
                throw(error);
            });
    }

    /////////////////////////client modal/////////////////////////////////
    @action showClientModal() {
        this.clientModalVisible = true
    }

    @action closeClientModal() {
        this.clientModalVisible = false
    }

    @action showClientUpdateModal(record) {
        this.clientById = this.clients[record.key]
        this.clientUpdateModalVisible = true
    }


    @action closeClientUpdateModal() {
        this.clientById = {}
        this.clientUpdateModalVisible = false
    }


    //////////////////////supplier modal///////////////////////////////////////////////
    @action showSupplierModal(){
        this.supplierModalVisible = true
    }

    @action closeSupplierModal(){
        this.supplierModalVisible = false
    }

    @action showSupplierUpdateModal(record) {
        this.supplierById = this.suppliers[record.key]
        this.supplierUpdateModalVisible = true
    }


    @action closeSupplierUpdateModal() {
        this.supplierById = {}
        this.supplierUpdateModalVisible = false
    }


    /////////////////////// warehouse modal////////////////////////////////////////////
    @action showWarehouseModal(){
        this.warehouseModalVisible = true
    }

    @action closeWarehouseModal(){
        this.warehouseModalVisible = false
    }

    @action showWarehouseUpdateModal(record) {
        this.warehouseItemById = this.warehouseItems[record.key]
        this.warehouseUpdateModalVisible = true
    }


    @action closeWarehouseUpdateModal() {
        this.warehouseItemById = {}
        this.warehouseUpdateModalVisible = false
    }

    /////////////////////// user modal////////////////////////////////////////////
    @action showUserModal(){
        this.userModalVisible = true
    }

    @action closeUserModal(){
        this.userModalVisible = false
    }

    @action showUserUpdateModal(record) {
        this.userById = this.users[record.key]
        this.userUpdateModalVisible = true
    }


    @action closeUserUpdateModal() {
        this.userById = {}
        this.userUpdateModalVisible = false
    }

}
