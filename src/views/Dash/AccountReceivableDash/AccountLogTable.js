import React, {Component} from 'react';
import {Table,Badge} from 'antd';
import {observer} from 'mobx-react';

const genSubData = function (record,store){
    store.fetchThisMonthSalesByClient(record)
    let data = store.accountLogData
    return data;
}


@observer
export default class AccountLogTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        };
        this.columns = [
            {
                title: '操作日期',
                dataIndex: 'op_date',
                key: 'op_date',
                width: 150,
                // render: text => <a href="#">{text}</a>,
            },
            {
                title: '操作名称',
                dataIndex: 'op_name',
                key: 'op_name',
                width: 150,
            },
            {
                title: '借/贷',
                dataIndex: 'direction',
                key: 'direction',
                width: 150,
            },
            {
                title: '金额',
                dataIndex: 'amount',
                key: 'amount',
                width: 150,
            },
            {
                title: '发票号',
                dataIndex: 'invoice',
                key: 'invoice',
                width: 150,
            },

            {
                title: '记录人',
                dataIndex: 'maker',
                key: 'maker',
                width: 150,
            },
        ];
    }

    componentWillMount() {
        console.log(this.props.record)
        this.fetchData()
    }



    fetchData() {

        setTimeout(() => {
            const data = genSubData(this.props.record,this.props.store)
            this.setState({ data })
        }, 1000);
    }

    render() {
        return (
            <Table
                columns={this.columns}
                dataSource={this.state.data}
                pagination={false}
            />
        );
    }
}

