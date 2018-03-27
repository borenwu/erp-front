import React, {Component} from 'react';
import moment from 'moment';
import {observer} from 'mobx-react';
import {Table,DatePicker,Button} from 'antd';
import jQuery from '../../../jquery-plugin/jquery.table2excel'

const {RangePicker} = DatePicker;

@observer
export default class StatisticsTable extends React.Component {

    state = {
        dateRange : []
    }

    constructor(props) {
        super(props)
    }

    onChange(date, dateString) {
        this.setState({
            dateRange:dateString
        })
    }

    searchTasksByClient(){
        let company_id = this.props.store.company_id
        let client_name = this.refs.client_name.value
        let startDate = this.state.dateRange[0] || moment().format('YYYY-MM-DD')
        let endDate = this.state.dateRange[1] || moment().format('YYYY-MM-DD')
        const info = {
            company_id: company_id,
            client_name:client_name,
            start_date: startDate,
            end_date: endDate
        }
        this.props.store.listTasksByClient(info)
    }

    componentDidMount(){
        this.props.store.cleanTasks()
        this.props.store.fetchClients(this.props.store.company_id)
    }

    exportExcel(){
        jQuery("#example").table2excel({
            // 不被导出的表格行的CSS class类
            exclude: ".noExl",
            // 导出的Excel文档的名称，（没看到作用）
            name: "Excel Document Name",
            // Excel文件的名称
            filename: "myExcelTable.xls",
            fileext: ".xls"
        });
    }

    render() {
        const data = this.props.store.tasks.map((t, i) => {
            return {
                key: i,
                id: t.id,
                client_id: t.client_id,
                task_date: moment(t.task_date).format('YYYY-MM-DD'),
                client_name: t.client_name,
                task_name: t.task_name,
                volume: t.volume,
                desc: t.desc,
                checker: t.checker,
                price: t.price,
                sale: t.sale,
            }

        })

        const columns = [
            {
                title: '创建日期',
                dataIndex: 'task_date',
                key: 'task_date',
                // render: text => <a href="#">{text}</a>,
            },
            {
                title: '客户',
                dataIndex: 'client_name',
                key: 'client_name',
            },
            {
                title: '任务名称',
                dataIndex: 'task_name',
                key: 'task_name',
            },
            {
                title: '印量',
                dataIndex: 'volume',
                key: 'volume',
            },
            {
                title: '规格明细',
                dataIndex: 'desc',
                key: 'desc',
            },
            {
                title: '单价',
                dataIndex: 'price',
                key: 'price',
            },
            {
                title: '金额',
                dataIndex: 'sale',
                key: 'sale',
            },
            {
                title: '审核人',
                dataIndex: 'checker',
                key: 'checker',
            },
        ];
        return (
            <div>
                <div className="table-operations">
                    <form className="form-inline">
                        <label style={{marginRight: 8}}>选择客户</label>
                        <select ref="client_name" style={{marginRight: 8,width:200}} className="form-control">
                            {this.props.store.clients.map((c,i)=>  <option key={i}>{c.client_name}</option>)}
                        </select>
                        <label style={{marginRight: 8}}>检索日期</label>
                        <RangePicker style={{marginRight: 8}} placeholder={['开始日期', '结束日期']} onChange={this.onChange.bind(this)}/>
                        <Button style={{marginRight: 8}} onClick={this.searchTasksByClient.bind(this)}>查询</Button>
                        <Button style={{marginRight: 8}} onClick={this.exportExcel.bind(this)} >导出Excel</Button>
                    </form>
                </div>
                <Table id="example" columns={columns} dataSource={data}/>
                {/*<DevTools/>*/}
            </div>
        )
    }
}