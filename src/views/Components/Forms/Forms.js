import React, {Component} from 'react';
import {
    Row,
    Col,
    Button,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Card,
    CardHeader,
    CardFooter,
    CardBody,
    Form,
    FormGroup,
    FormText,
    Label,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupButton
} from 'reactstrap';

import {DatePicker} from 'antd';
import EditableTable from '../Tables/EditableTable'

// let et = new EditableTable()
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const data = [];
for (let i = 0; i < 100; i++) {
    data.push({
        key: i.toString(),
        client_name: `Edrward ${i}`,
        task_name:`Task ${i}`,
        volume: 32,
        task_date: `2018-2-3`,
        due_date:`2018-2-4`,
        desc:`test desc ${i}`,
        maker:`Tom`
    });
}


class Forms extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dateInput: ''
        };
        this.columnInfo= [
            {
                title: '客户',
                dataIndex: 'client_name',
                width: '5%',
            },
            {
                title: '任务',
                dataIndex: 'task_name',
                width: '25%',
            },
            {
                title: '数量',
                dataIndex: 'volume',
                width: '5%',
            },
            {
                title: '创建日期',
                dataIndex: 'task_date',
                width: '10%',
            },
            {
                title: '提交日期',
                dataIndex: 'due_date',
                width: '10%',
            },
            {
                title: '备注说明',
                dataIndex: 'desc',
                width: '20%',
            },
            {
                title: '创建人',
                dataIndex: 'maker',
                width: '5%',
            },
            {
                title: '操作',
                dataIndex: 'operation',
            }
        ]
    }

    handleChange(date, dateString) {
        console.log(dateString);
        this.setState({dateInput: dateString})
    }


    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12">




                        <RangePicker/>



                        <EditableTable ref='et' tableData={data} columnInfo={this.columnInfo}/>


                    </Col>
                </Row>
            </div>
        )
    }
}

export default Forms;
