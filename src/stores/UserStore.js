import {observable, action, autorun, useStrict} from 'mobx';
import {message} from 'antd'
import Axios from 'axios'
import * as ipConfig from '../configs/ipConfig'
import * as messageConfig from '../configs/messageConfig'
import history from '../history';

message.config(messageConfig.messageConf);

const userUrl = `${ipConfig.rootUrl}/user`

export default class UserStore{
    @observable currentUser = {}
    @observable company_id = JSON.parse(window.localStorage.getItem("companyInfo")).id

    @action userLogin(userInfo){
        Axios.post(`${userUrl}/login`,userInfo)
            .then(response =>{
                if(response.data.status == 404){
                    message.error('用户名错误，没有此用户');
                }
                if(response.data.status == 400){
                    message.error('密码错误');
                }
                if(response.data.status == 200){
                    this.currentUser = response.data.user
                    let level = this.currentUser.level
                    if(level==1){
                        this.currentUser.auth = this.currentUser.role.worker
                    }
                    if(level==2){
                        this.currentUser.auth = this.currentUser.role.accountant
                    }
                    if(level==3){
                        this.currentUser.auth = this.currentUser.role.manager
                    }
                    let userInfo = JSON.stringify(this.currentUser);
                    let storage=window.sessionStorage;
                    storage.setItem('userInfo', userInfo);
                    // let obj=JSON.parse(localStorage.getItem("userInfo"));
                    // console.log(obj.auth)
                    // console.log(obj.auth.work)
                    history.push('/')
                }
            })
    }

    @action userLogout(userInfo){
        Axios.post(`${userUrl}/logout`,userInfo)
            .then(response=>{
                if(response.data.status == 404){
                    message.error('用户名错误，没有此用户');
                }
                if(response.data.status == 200){
                    let storage=window.sessionStorage;
                    storage.removeItem('userInfo');
                    history.push('/login')
                }
            })
    }
}