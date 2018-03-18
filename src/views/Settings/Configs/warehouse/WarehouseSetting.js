import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Button, Input} from 'antd'
import './WarehouseSetting.css'
import WarehouseTable from './WarehouseTable'
import WarehouseModal from './WarehouseModal'
import WarehouseUpdateModal from './WarehouseUpdateModal'
// import * as companyConfig from '../../../../configs/companyConfig'

const Search = Input.Search;

@observer
export default class WarehouseSetting extends Component{

    constructor(props){
        super(props)
    }

    handleSearch(value){
        console.log(value)
    }

    showWarehouseModal() {
        this.props.store.showWarehouseModal()
    }

    componentDidMount(){
        this.props.store.fetchWarehouseItems(this.props.store.company_id)
        this.props.store.fetchSuppliers(this.props.store.company_id)
    }

    render() {
        return (
            <div>
                <div className="table-operations">
                    <label style={{marginRight: 8}}>检索供应商名</label>
                    <Search
                        placeholder="输入供应商名称"
                        onSearch={this.handleSearch.bind(this)}
                        style={{ width: 200,marginRight: 8}}
                        enterButton
                    />
                    <Button onClick={this.showWarehouseModal.bind(this)}>创建</Button>
                    <WarehouseModal
                        store={this.props.store}
                        title="Basic Modal"
                        visible={this.props.store.warehouseModalVisible}/>
                    <WarehouseUpdateModal
                        store={this.props.store}
                        title="Update Modal"
                        visible={this.props.store.warehouseUpdateModalVisible}
                    />
                </div>
                <WarehouseTable store={this.props.store}/>
            </div>
        )
    }
}