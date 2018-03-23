import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {DatePicker,Button} from 'antd';
import moment from 'moment';
import WarehouseItemStockModal from './WarehouseItemStockModal'
import WarehouseItemCreateModal from './WarehouseItemCreateModal'
import WarehouseItemTable from './WarehouseItemTable'


@observer
export default class WarehouseItemStock extends Component{
    constructor(props) {
        super(props)
    }

    showItemCreateModal(){
        this.props.store.showItemCreateModal()
    }

    componentDidMount() {
        this.props.store.fetchItems(this.props.store.company_id)
        this.props.store.fetchSuppliers(this.props.store.company_id)
    }

    render(){
        return(
            <div>
                <div className="table-operations">
                    <Button onClick={this.showItemCreateModal.bind(this)}>新建物料</Button>
                    <WarehouseItemCreateModal
                        {...this.props}
                        store={this.props.store}
                        title="新建物料"
                        visible={this.props.store.itemCreateModalVisible}/>

                    <WarehouseItemStockModal
                        {...this.props}
                        store={this.props.store}
                        title="物料进货"
                        visible={this.props.store.itemStockModalVisible}/>

                </div>
                <WarehouseItemTable store={this.props.store}/>
            </div>
        )
    }
}