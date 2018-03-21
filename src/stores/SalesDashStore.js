import {observable, action, computed, useStrict} from 'mobx';
import Axios from 'axios'
import {message} from 'antd'
import * as messageConfig from '../configs/messageConfig'

message.config(messageConfig.messageConf);

export default class SalesDashStore{
    @observable todayTasks = []
    @observable todaySales = 0.0
    // @observable clientById = {}
    @observable company_id = JSON.parse(window.localStorage.getItem("companyInfo")).id

    @observable rootUrl = window.localStorage.getItem("ipConfig")
    @observable saleTodayUrl = `${this.rootUrl}/sales/today`;
    // @observable clientsUrl = `${this.rootUrl}/clients`;

    @action fetchTodaySales(companyInfo){
        Axios.post(this.saleTodayUrl,companyInfo)
            .then(response=>{
                if (response.data.status === 201) {
                    message.warning('获取客户列表为空');
                }
                else {
                    this.todayTasks = response.data
                    // var arr = [{x:1}, {x:2}, {x:4}];
                    // arr.reduce(function (acc, obj) { return acc + obj.x; }, 0); // 7
                    let reducer = (acc, currentValue) => {
                        return acc + Number(currentValue.sale)
                    };
                    let sum = this.todayTasks.reduce(reducer,0);
                    this.todaySales = sum
                }
            })
    }
}