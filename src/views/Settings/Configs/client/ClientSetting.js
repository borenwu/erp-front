import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {Button, Input} from 'antd'
import './ClientSetting.css'
import ClientTable from './ClientTable'
import ClientModal from './ClientModal'
import ClientUpdateModal from './ClientUpdateModal'
import * as companyConfig from '../../../../configs/companyConfig'

const Search = Input.Search;

@observer
export default class ClientSetting extends Component{

    constructor(props){
        super(props)
    }

    handleSearch(value){
        console.log(value)
    }

    showClientModal() {
        this.props.store.showClientModal()
    }

    componentDidMount(){
        this.props.store.fetchClients(companyConfig.companyInfo.company_id)
    }

    render() {
        return (
            <div>
                <div className="table-operations">
                    <label style={{marginRight: 8}}>检索客户名</label>
                    <Search
                        placeholder="输入客户名称"
                        onSearch={this.handleSearch.bind(this)}
                        style={{ width: 200,marginRight: 8}}
                        enterButton
                    />
                    <Button onClick={this.showClientModal.bind(this)}>创建</Button>
                    <ClientModal
                        store={this.props.store}
                        title="Basic Modal"
                        visible={this.props.store.clientModalVisible}/>
                    <ClientUpdateModal
                        store={this.props.store}
                        title="Update Modal"
                        visible={this.props.store.clientUpdateModalVisible}
                    />
                </div>
                <ClientTable store={this.props.store}/>
            </div>
        )
    }
}