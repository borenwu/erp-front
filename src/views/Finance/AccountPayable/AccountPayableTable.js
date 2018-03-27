import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Table} from 'antd';
import moment from 'moment';

@observer
export default class AccountPayableTable extends Component{

    render(){
        const data = this.props.store.accountsBySupplier.map((a, i) => {
            return {
                key: i,
                id:a.id,
                op_date:moment(a.op_date).format('YYYY-MM-DD'),
                op_name: a.op_name,
                direction: a.direction,
                amount:a.amount,
                invoice:a.invoice,
                maker: a.maker,
            }
        })

        const columns = [
            {
                title: '操作日期',
                dataIndex: 'op_date',
                key: 'op_date',
                // render: text => <a href="#">{text}</a>,
            },
            {
                title: '操作名称',
                dataIndex: 'op_name',
                key: 'op_name',
            },
            {
                title: '借/贷',
                dataIndex: 'direction',
                key: 'direction',
            },
            {
                title: '金额',
                dataIndex: 'amount',
                key: 'amount',
            },
            {
                title: '发票号',
                dataIndex: 'invoice',
                key: 'invoice',
            },

            {
                title: '记录人',
                dataIndex: 'maker',
                key: 'maker',
            },
        ];


        return(
            <div>
                <Table columns={columns} dataSource={data}/>
            </div>
        )
    }
}
