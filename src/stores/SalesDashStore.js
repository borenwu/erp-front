import {observable, action, computed, useStrict} from 'mobx';
import Axios from 'axios'
import {message} from 'antd'
import * as messageConfig from '../configs/messageConfig'
import moment from 'moment'

message.config(messageConfig.messageConf);

export default class SalesDashStore{
    @observable todayTasks = []
    @observable saleToday = 0.0
    @observable saleSoFar = 0.0
    @observable saleEachDay = []
    @observable saleLineTime = ''
    @observable company_id = JSON.parse(window.localStorage.getItem("companyInfo")).id

    @observable rootUrl = window.localStorage.getItem("ipConfig")
    @observable saleTodayUrl = `${this.rootUrl}/salesdash/today`;
    @observable saleSoFarUrl = `${this.rootUrl}/salesdash/sofar`;
    @observable saleEachDayUrl = `${this.rootUrl}/salesdash/eachday`;

    @action fetchSaleToday(companyInfo){
        Axios.post(this.saleTodayUrl,companyInfo)
            .then(response=>{
                if (response.data.status === 201) {
                    message.warning('获取今日销售记录列表为空');
                }
                else {
                    this.todayTasks = response.data
                    // var arr = [{x:1}, {x:2}, {x:4}];
                    // arr.reduce(function (acc, obj) { return acc + obj.x; }, 0); // 7
                    let reducer = (acc, currentValue) => {
                        return acc + Number(currentValue.sale)
                    };
                    let sum = this.todayTasks.reduce(reducer,0);
                    this.saleToday = sum
                }
            })
    }

    @action fetchSaleSoFar(companyInfo){
        Axios.post(this.saleSoFarUrl,companyInfo)
            .then(response=>{
                if(response.data.status === 201){
                    message.warning('没有得到数据');
                }
                if(response.data.status === 200){
                    this.saleSoFar = response.data.result[0].total
                }
            })
    }

    @action fetchSaleEachDay(companyInfo){
        Axios.post(this.saleEachDayUrl,companyInfo)
            .then(response=>{
                if(response.data.status === 201){
                    message.warning('没有得到数据');
                }
                if(response.data.status === 200){
                    this.saleEachDay = response.data.result
                    let time = this.saleEachDay[0]._id
                    this.saleLineTime = moment(time).format('YYYY[年]MMM')
                }
            })
    }
}