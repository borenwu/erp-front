import React, {Component} from 'react';
import {Table} from 'antd';
import {observer} from 'mobx-react';
import AccountLogTable from './AccountLogTable'


@observer
export default class AccountReceivableDashTable extends Component {
    state = {
        data: [],
        loading: false,
    };


    constructor(props) {
        super(props)
    }

    componentDidMount(){
        this.props.store.fetchClients(this.props.store.company_id)
    }

    handleExpand(expanded, record){
        if(expanded){
            this.setState({ loading: true });
            this.props.store.fetchThisMonthSalesByClient(record)
            const data = this.props.store.accountLogData
            this.setState({
                loading: false,
                data: data,
            });
        }
        else{

        }

    }

    handleExpandChange(expandedRows){
        console.log(expandedRows)
    }

    render() {
        const expandedRowRender = (record) => {
            return <AccountLogTable record={record} store={this.props.store}/>
        };

        const columns = [
            {
                title: '客户',
                dataIndex: 'client_name',
                key: 'client_name',
                // render: (text, record) => <a onClick={this.handleClick.bind(this,record)}>{text}</a>
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
                receivable: Number(c.receivable).toFixed(2),
            }
        })



        return (
            <Table
                className="components-table-demo-nested"
                columns={columns}
                expandedRowRender={expandedRowRender}
                dataSource={data}
            />
        );
    }
}
