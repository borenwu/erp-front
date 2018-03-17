import {observable, action, computed,useStrict} from 'mobx';
import Axios from 'axios'
import * as ipConfig from '../configs/ipConfig'

const local = window.localStorage
const ipInfo = JSON.parse(local.getItem("ipInfo"));
console.log(ipInfo)

const apiUrl = `${ipConfig.rootUrl}/company`;

export default class CompanyStore{

    @observable companies = []

    @action createCompany(){

    }

    @action listAllCompanies(){
        Axios.get(apiUrl)
            .then(response => {
                this.companies = response.data
            })
            .catch(error =>{
                throw(error);
            })
    }
}