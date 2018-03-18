import {observable, action, computed, useStrict} from 'mobx';
import Axios from 'axios'
import * as ipConfig from '../configs/ipConfig'
import {message} from 'antd'
import * as messageConfig from '../configs/messageConfig'
import history from '../history';

message.config(messageConfig.messageConf);


const companyUrl = `${ipConfig.rootUrl}/company`;
const adminUrl = `${ipConfig.rootUrl}/user/admin`

export default class CompanyStore {

    @observable companies = []

    @action createCompany(companyInfo) {
        Axios.post(companyUrl, companyInfo)
            .then(response => {
                if(response.status == 200) {
                    let company = JSON.stringify(response.data.company);
                    let local = window.localStorage;
                    local.setItem('companyInfo', company);

                    let companyInfo= {
                        company_id:response.data.company.id,
                    }

                    Axios.post(adminUrl, companyInfo)
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
        Axios.get(companyUrl)
            .then(response => {
                this.companies = response.data
            })
            .catch(error => {
                throw(error);
            })
    }
}