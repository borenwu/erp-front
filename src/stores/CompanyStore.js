import {observable, action, computed, useStrict} from 'mobx';
import Axios from 'axios'
import {message} from 'antd'
import * as messageConfig from '../configs/messageConfig'
import history from '../history';

message.config(messageConfig.messageConf);


export default class CompanyStore {

    @observable companies = []

    @observable rootUrl = window.localStorage.getItem("ipConfig")
    @observable companyUrl = `${this.rootUrl}/company`;
    @observable adminUrl = `${this.rootUrl}/user/admin`

    @action createCompany(companyInfo) {
        Axios.post(this.companyUrl, companyInfo)
            .then(response => {
                if(response.status == 200) {
                    let company = JSON.stringify(response.data.company);
                    let local = window.localStorage;
                    local.setItem('companyInfo', company);

                    let companyInfo= {
                        company_id:response.data.company.id,
                    }

                    Axios.post(this.adminUrl, companyInfo)
                        .then(response => {
                            if(response.status == 200){
                                message.info('激活完成')
                                history.push('/login')
                            }
                        })
                        .catch(error => {
                            message.error('激活未完成')
                        });
                }else{
                    message.error('激活未完成')
                }
            })
    }

    @action listAllCompanies() {
        Axios.get(this.companyUrl)
            .then(response => {
                this.companies = response.data
            })
            .catch(error => {
                throw(error);
            })
    }
}