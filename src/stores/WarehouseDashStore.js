import {observable, action, computed, useStrict} from 'mobx';
import Axios from 'axios'
import {message} from 'antd'
import * as messageConfig from '../configs/messageConfig'
import moment from 'moment'

message.config(messageConfig.messageConf);

export default class WarehouseDashStore{
    @observable warehouseDashItems = []
    @observable warehouseDashItemById = {}
    @observable empty = 0.0
    @observable now = 0.0
    @observable taskWastes = []

    @observable company_id = JSON.parse(window.localStorage.getItem("companyInfo")).id
    @observable rootUrl = window.localStorage.getItem("ipConfig")
    @observable dashItemsUrl = `${this.rootUrl}/warehousedash/items`;
    @observable ratioUrl = `${this.rootUrl}/warehousedash/ratio`;
    @observable taskWastesUrl = `${this.rootUrl}/taskwastes`


    @action fetchDashItems(itemInfo) {
        Axios.post(this.dashItemsUrl, itemInfo)
            .then(response => {
                if(response.data.status === 404){
                    message.error('获取物料列表时出错！')
                }
                if (response.data.status === 201) {
                    message.warning('获取物料列表为空');
                }
                if(response.data.status === 200) {
                    this.warehouseDashItems = response.data.warehouseItems
                }
            })
            .catch(error => {
                throw(error);
            });
    }

    @action handleRatio(record){
        this.warehouseDashItemById = this.warehouseDashItems[record.key]
        let itemInfo = {
            company_id:this.company_id,
            item_id:this.warehouseDashItemById.id
        }
        Axios.post(this.ratioUrl,itemInfo)
            .then(response=>{
                this.empty = Number(response.data.ratio.total) - Number(response.data.ratio.now)
                this.now = Number(response.data.ratio.now)
            })
            .catch(error => {
                throw(error);
            });
    }

    @action fetchTaskWastesForMonth(){
        let today = moment().format('YYYY-MM-DD')
        let month = moment().month()
        let startOfMonth = moment().month(month).startOf('month').format('YYYY-MM-DD')

        let data = {
            company_id:this.company_id,
            start_date:startOfMonth,
            end_date:today
        }
        console.log(data)

        Axios.post(this.taskWastesUrl,data)
            .then(response=>{
                if (response.data.status === 201) {
                    this.taskWastes = []
                    message.warning('获取废料列表为空');
                }
                else {
                    this.taskWastes = response.data
                }
            })
    }

    @action reset(){
        this.now = 0.0
        this.empty = 0.0
        this.warehouseDashItems = []
        this.warehouseDashItemById = {}
    }
}