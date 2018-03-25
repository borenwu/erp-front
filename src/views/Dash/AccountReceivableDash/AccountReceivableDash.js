import React, {Component} from 'react';
import { Table} from 'antd';
import {observer} from 'mobx-react';
import moment from 'moment';

@observer
export default class AccountReceivableDash extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.store.fetchClients(this.props.store.company_id)
    }

    handleClick(record){
        console.log(record.client_name)
    }

    render(){
        const columns = [
            {
                title: '客户',
                dataIndex: 'client_name',
                key: 'client_name',
                render: (text, record) => <a onClick={this.handleClick.bind(this,record)}>{text}</a>
            },
            {
                title: '客户详情',
                dataIndex: 'desc',
                key: 'desc',
            },
            {
                title: '应收款余额',
                dataIndex: 'receivable',
                key: 'receivable',
            },
        ];

        const data = this.props.store.clients.map((c, i) => {
            return {
                key: i,
                id:c.id,
                client_name: c.client_name,
                desc: c.desc,
                receivable: c.receivable,
            }
        })

        return(
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-lg-6">
                    <Table columns={columns} dataSource={data} />
                </div>

                <div className="col-xs-12 col-sm-12 col-lg-6">

                </div>
            </div>
        )
    }
}