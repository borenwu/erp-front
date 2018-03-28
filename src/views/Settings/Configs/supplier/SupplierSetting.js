import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Button, Input} from 'antd'
import './SupplierSetting.css'
import SupplierTable from './SupplierTable'
import SupplierModal from './SupplierModal'
import SupplierUpdateModal from './SupplierUpdateModal'


const Search = Input.Search;

@observer
export default class SupplierSetting extends Component{

    constructor(props){
        super(props)
    }

    handleSearch(value){
        console.log(value)
    }

    showSupplierModal() {
        this.props.store.showSupplierModal()
    }

    componentDidMount(){
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
                    <Button onClick={this.showSupplierModal.bind(this)}>创建</Button>
                    <SupplierModal
                        store={this.props.store}
                        title="添加供应商"
                        visible={this.props.store.supplierModalVisible}/>
                    <SupplierUpdateModal
                        store={this.props.store}
                        title="修改供应商"
                        visible={this.props.store.supplierUpdateModalVisible}
                    />
                </div>
                <SupplierTable store={this.props.store}/>
            </div>
        )
    }
}