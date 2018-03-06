import {observable, action, autorun, useStrict} from 'mobx';
import {message} from 'antd'
import Axios from 'axios'
import * as ipConfig from '../configs/ipConfig'
import * as companyConfig from '../configs/companyConfig'
import * as messageConfig from '../configs/messageConfig'

const suppliersUrl = `${ipConfig.rootUrl}/suppliers`
const itemUrl = `${ipConfig.rootUrl}/warehouse/item`;
const itemsUrl = `${ipConfig.rootUrl}/warehouse/items`
const itemopUrl = `${ipConfig.rootUrl}/warehouse/itemop`;
const itemopsUrl = `${ipConfig.rootUrl}/warehouse/itemops`

message.config(messageConfig.messageConf);

export default class WarehouseStore{
    @observable suppliers = []
    @observable warehouseItemops = []
    @observable warehouseItemopById = {}
    @observable warehouseItems = []
    @observable warehouseItemById = {}

    @observable itemopModalVisible = false
    @observable itemopUpdateModalVisible = false


    @action fetchItems(company_id){
        let companyInfo = {
            company_id:company_id
        }
        Axios.post(itemsUrl,companyInfo)
            .then(response=>{
                if (response.data.status === 201) {
                    message.warning('获取物料列表为空');
                }
                else {
                    this.warehouseItems = response.data
                }
            })
    }

    @action fetchSuppliers(company_id){
        let companyInfo = {
            company_id:company_id
        }
        Axios.post(suppliersUrl,companyInfo)
            .then(response=>{
                if (response.data.status === 201) {
                    message.warning('获取供应商列表为空');
                }
                else {
                    this.suppliers = response.data
                }
            })
    }


    @action createItemop(itemop) {
        Axios.post(itemopUrl, itemop)
            .then(response => {
                this.warehouseItemops.push(response.data)
                message.success('创建成功')
            })
            .catch(error => {
                throw(error);
            });
    }

    @action listItemops(info) {
        Axios.post(itemopsUrl, info)
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
        Axios.delete(`${itemopUrl}/${itemopId}`)
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

    @action updateItemop(itemopInfo) {
        Axios.put(itemopUrl, itemopInfo)
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


}