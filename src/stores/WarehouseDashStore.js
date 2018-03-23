import {observable, action, computed, useStrict} from 'mobx';
import Axios from 'axios'
import {message} from 'antd'
import * as messageConfig from '../configs/messageConfig'
import moment from 'moment'

message.config(messageConfig.messageConf);

export default class WarehouseDashStore{

}