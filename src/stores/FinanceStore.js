import {observable, action, autorun, useStrict} from 'mobx';
import {message} from 'antd'
import Axios from 'axios'
import * as ipConfig from '../configs/ipConfig'
import * as companyConfig from '../configs/companyConfig'
import * as messageConfig from '../configs/messageConfig'
import $ from 'jquery'

const clientsUrl = `${ipConfig.rootUrl}/clients`
const taskUrl = `${ipConfig.rootUrl}/task`;
const tasksUrl = `${ipConfig.rootUrl}/tasks`
const tasksByClientUrl = `${ipConfig.rootUrl}/tasksByClient`

message.config(messageConfig.messageConf);

export default class FinanceStore{
    @observable clients = []
    @observable tasks = []
    @observable taskById = {}
    @observable price = 0.0
    @observable volume =  0.0
    @observable sale = 0.0

    @observable modalVisible = false
    @observable salesModalVisible = false

    computeSale(){
        this.sale = (Number(this.price) * Number(this.volume)).toFixed(2)
    }

    @action setPrice(price){
        this.price = price
        this.computeSale()
    }

    @action setVolume(volume){
        this.volume = volume
        this.computeSale()
    }

    @action cleanTasks(){
        this.tasks = []
    }

    @action fetchClients(company_id){
        let companyInfo = {
            company_id:company_id
        }
        Axios.post(clientsUrl,companyInfo)
            .then(response=>{
                this.clients = response.data
            })
    }


    @action listTasks(info) {
        Axios.post(tasksUrl, info)
            .then(response => {
                if (response.data.status == 201) {
                    message.warning('获取任务列表为空');
                }
                else {
                    this.tasks = response.data
                }

            })
            .catch(error => {
                throw(error);
            });
    }

    @action listTasksByClient(info){
        Axios.post(tasksByClientUrl, info)
            .then(response => {
                if (response.data.status == 201) {
                    message.warning('获取任务列表为空');
                }
                else {
                    this.tasks = response.data
                }

            })
            .catch(error => {
                throw(error);
            });
    }



    @action updateSale(taskInfo){
        Axios.put(`${taskUrl}/sale`,taskInfo)
            .then(response => {
                let updateTask = response.data
                let index = this.tasks.findIndex((task) => task.id === updateTask.id)
                this.tasks[index] = updateTask
                message.success('销售记录添加成功')
            })
            .catch(error => {
                throw(error);
            });
    }


    @action showModal() {
        this.modalVisible = true
    }

    @action closeModal() {
        this.modalVisible = false
    }

    @action showSalesModal(record) {
        this.taskById = this.tasks[record.key]
        this.volume = this.taskById.volume
        this.salesModalVisible = true
    }


    @action closeSalesModal() {
        this.taskById = {}
        this.salesModalVisible = false
    }

    @action exportJson2Excel(json, type) {
        //TODO 记录导出操作日志
        var log = {"type": "json2excel"};
//title
        try {
            var title = new Set();
            for (var i = 0; i < json.length; i++) {
                var r = json[i];
                this.getProFromObject(r, title);
            }
            console.log("title", title);

            var data = [];
            for (var i = 0; i < json.length; i++) {
                var r = json[i];
                var dataRow = [];
                title.forEach(function (t) {
                    var d1 = r[t];
                    var ss = t.split(".");
                    if (ss.length >= 2) {
                        var tmp = r;
                        for (var i = 0; i < ss.length; i++) {
                            var s = ss[i];
                            tmp = tmp[s];
                            if (!tmp) {
                                break;
                            }
                        }
                        d1 = tmp;
                    }
                    if (d1) {
                        if (typeof d1 == 'object') {
                            dataRow.push(JSON.stringify(d1));
                        } else {
                            dataRow.push(d1);
                        }

                    } else {
                        dataRow.push("");
                    }

                });

                data.push(dataRow);
            }
            console.log("data", data);
            this.jsonToExcelConvertor(data, 'Report', Array.from(title), type);
        } catch (err) {
            console.error(err);
            alert("导出报错：" + err.stack);
            log.error = err.stack;
            log.json =  json;
        } finally {
            // OplogsService.save(log).$promise.then(function (res) {
            //     console.log(res);
            // }).catch(function (error) {
            //     console.log(error);
            //     alert("系统错误:" + JSON.stringify(error));
            // });
        }

    }

    jsonToExcelConvertor(JSONData, FileName, ShowLabel, type) {
        type = type ? type : "xls";
        var application = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        if (type == "xls") {
            application = "application/vnd.ms-excel";
        }

        // 先转化json
        var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

        var excel = '<table>';

        // 设置表头
        var rr = '<tr>';
        for (var j = 0, l = ShowLabel.length; j < l; j++) {
            rr += '<td>' + ShowLabel[j] + '</td>';
        }


        // 换行
        excel += rr + '</tr>';

        // 设置数据
        for (var i = 0; i < arrData.length; i++) {
            var row = '<tr>';

            for (var index = 0; index < arrData[i].length; index++) {
                var value = arrData[i][index] === '.' ? '' : arrData[i][index];
                row += '<td>' + value + '</td>';
            }

            excel += row + '</tr>';
        }

        excel += '</table>';

        var excelFile = '<html xmlns:o=\'urn:schemas-microsoft-com:office:office\' xmlns:x=\'urn:schemas-microsoft-com:office:excel\' xmlns=\'http://www.w3.org/TR/REC-html40\'>';
        excelFile += '<meta http-equiv="content-type" content="' + application + '; charset=UTF-8">';
        excelFile += '<meta http-equiv="content-type" content="' + application;
        excelFile += '; charset=UTF-8">';
        excelFile += '<head>';
        excelFile += '<!--[if gte mso 9]>';
        excelFile += '<xml>';
        excelFile += '<x:ExcelWorkbook>';
        excelFile += '<x:ExcelWorksheets>';
        excelFile += '<x:ExcelWorksheet>';
        excelFile += '<x:Name>';
        excelFile += '{worksheet}';
        excelFile += '</x:Name>';
        excelFile += '<x:WorksheetOptions>';
        excelFile += '<x:DisplayGridlines/>';
        excelFile += '</x:WorksheetOptions>';
        excelFile += '</x:ExcelWorksheet>';
        excelFile += '</x:ExcelWorksheets>';
        excelFile += '</x:ExcelWorkbook>';
        excelFile += '</xml>';
        excelFile += '<![endif]-->';
        excelFile += '</head>';
        excelFile += '<body>';
        excelFile += excel;
        excelFile += '</body>';
        excelFile += '</html>';


        var uri = 'data:' + application + ';charset=utf-8,' + encodeURIComponent(excelFile);

        var link = document.createElement('a');
        link.href = uri;
        //TODO Cannot set property style of #<HTMLElement> which has only a getter
        // link.style = 'visibility:hidden';
        $(link).css("visibility", "hidden");
        // link.download = FileName + '.'+type;
        $(link).attr("download", FileName + '.' + type);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    getProFromObject(r, title, parentsPros) {
        for (var rp in r) {
            if (parentsPros) {
                title.add(parentsPros + "." + rp);
            } else {
                title.add(rp);
            }
            if (typeof r[rp] == 'object') {
                if (parentsPros) {
                    this.getProFromObject(r[rp], title, parentsPros + "." + rp);
                } else {
                    this.getProFromObject(r[rp], title, rp);
                }

            }
        }
    }

    // @action listAllCompanies(){
    //     Axios.get(apiUrl)
    //         .then(response => {
    //             this.companies = response.data
    //         })
    //         .catch(error =>{
    //             throw(error);
    //         })
    // }
}