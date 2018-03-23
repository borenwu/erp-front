import {observable, action, autorun, useStrict} from 'mobx';
import {message} from 'antd'
import Axios from 'axios'
import * as messageConfig from '../configs/messageConfig'


message.config(messageConfig.messageConf);

export default class WarehouseStore {
    @observable suppliers = []
    @observable warehouseItemops = []
    @observable warehouseItemopById = {}
    @observable warehouseItems = []
    @observable warehouseItemById = {}

    @observable company_id = JSON.parse(window.localStorage.getItem("companyInfo")).id

    @observable itemopModalVisible = false
    @observable itemopUpdateModalVisible = false
    @observable itemCheckModalVisible = false
    @observable itemCheckUpdateModalVisible = false
    @observable itemCreateModalVisible = false
    @observable itemStockModalVisible = false

    @observable rootUrl = window.localStorage.getItem("ipConfig")
    @observable suppliersUrl = `${this.rootUrl}/suppliers`
    @observable itemUrl = `${this.rootUrl}/warehouse/item`;
    @observable itemsUrl = `${this.rootUrl}/warehouse/items`
    @observable itemopUrl = `${this.rootUrl}/warehouse/itemop`;
    @observable itemopsUrl = `${this.rootUrl}/warehouse/itemops`


    @action fetchItems(company_id) {
        let companyInfo = {
            company_id: company_id
        }
        Axios.post(this.itemsUrl, companyInfo)
            .then(response => {
                if (response.data.status === 201) {
                    message.warning('获取物料列表为空');
                }
                else {
                    this.warehouseItems = response.data
                }
            })
    }

    @action fetchSuppliers(company_id) {
        let companyInfo = {
            company_id: company_id
        }
        Axios.post(this.suppliersUrl, companyInfo)
            .then(response => {
                if (response.data.status === 201) {
                    message.warning('获取供应商列表为空');
                }
                else {
                    this.suppliers = response.data
                }
            })
    }

    @action stockItem(itemInfo){
        Axios.put(`${this.itemUrl}/stock`, itemInfo)
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


    @action createItemop(itemop) {
        Axios.post(this.itemopUrl, itemop)
            .then(response => {
                this.warehouseItemops.push(response.data)
                message.success('创建成功')
            })
            .catch(error => {
                throw(error);
            });
    }

    @action listItemops(info) {
        Axios.post(this.itemopsUrl, info)
            .then(response => {
                if (response.data.status === 201) {
                    message.warning('获取物料操作列表为空');
                }
                else {
                    this.warehouseItemops = response.data
                }

            })
            .catch(error => {
                throw(error);
            });
    }

    @action deleteItemopById(itemopId) {
        Axios.delete(`${this.itemopUrl}/${itemopId}`)
            .then(response => {
                if (response.data.status === 200) {
                    this.warehouseItemops = this.warehouseItemops.filter(itemop => itemop.id !== itemopId);
                    message.success('删除成功')
                }
            })
            .catch(error => {
                throw(error);
            });
    }

    @action undoItemop(itemInfo) {
        Axios.post(`${this.itemopUrl}/undo`, itemInfo)
            .then(response => {
                if (response.data.status === 200) {
                    this.warehouseItemops = this.warehouseItemops.filter(itemop => itemop.id !== itemInfo.op_id);
                    message.success('删除成功')
                }
            })
            .catch(error => {
                throw(error);
            });
    }

    @action updateItemop(itemopInfo) {
        Axios.put(this.itemopUrl, itemopInfo)
            .then(response => {
                let updateItemop = response.data
                let index = this.warehouseItemops.findIndex((itemop) => itemop.id === updateItemop.id)
                this.warehouseItemops[index] = updateItemop
                message.success('修改成功')
            })
            .catch(error => {
                throw(error);
            });
    }

    @action checkItem(itemInfo) {
        Axios.post(`${this.itemopUrl}/check`, itemInfo)
            .then(response => {
                let updateItemop = response.data
                let index = this.warehouseItemops.findIndex((itemop) => itemop.id === updateItemop.id)
                this.warehouseItemops[index] = updateItemop
                message.success('审核完成')
            })
    }

    /////////////////////////////////////////////////////////////////
    @action showItemopModal() {
        this.itemopModalVisible = true
    }

    @action closeItemopModal() {
        this.itemopModalVisible = false
    }

    @action showItemopUpdateModal(record) {
        this.warehouseItemopById = this.warehouseItemops[record.key]
        this.itemopUpdateModalVisible = true
    }


    @action closeItemopUpdateModal() {
        this.warehouseItemopById = {}
        this.itemopUpdateModalVisible = false
    }

    ///////////////////////////////////////////////////////////////////

    @action showItemCheckModal() {
        this.itemCheckModalVisible = true
    }

    @action closeItemCheckModal() {
        this.itemCheckModalVisible = false
    }

    @action showItemCheckUpdateModal(record) {
        this.warehouseItemopById = this.warehouseItemops[record.key]
        this.itemCheckUpdateModalVisible = true
    }


    @action closeItemCheckUpdateModal() {
        this.warehouseItemopById = {}
        this.itemCheckUpdateModalVisible = false
    }

    /////////////////////////////////////////////////////////////////////////
    @action showItemCreateModal(){
        this.itemCreateModalVisible = true
    }

    @action closeItemCreateModal(){
        this.itemCreateModalVisible = false
    }

    @action showItemStockModal(record){
        this.warehouseItemById = this.warehouseItems[record.key]
        this.itemStockModalVisible = true
    }

    @action closeItemStockModal(){
        this.warehouseItemById = {}
        this.itemStockModalVisible = false
    }

}