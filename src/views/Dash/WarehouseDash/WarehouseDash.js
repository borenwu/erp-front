import React, {Component} from 'react';
import { Card } from 'antd';
import ItemDoughnut from './ItemDoughnut'

const tabList = [
    {
        key: 'tab1',
        tab: '纸张',
    },
    {
        key: 'tab2',
        tab: '油墨',
    },
    {
        key: 'tab3',
        tab: '配件耗材',
    },
    {
        key: 'tab4',
        tab: '其他辅料',
    }
];
const contentList = {
    tab1: <ItemDoughnut/>,
    tab2: <p>content2</p>,
    tab3: <p>content3</p>,
    tab4: <p>content4</p>,
};

export default class WarehouseDash extends Component {
    state = {
        key: 'tab1',
    }

    constructor(props){
        super(props)
    }

    onTabChange = (key, type) => {
        this.setState({ [type]: key });
    }

    render() {
        return (
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col">
                        <Card
                            style={{ width: '100%' }}
                            title="Card title"
                            extra={<a href="#">More</a>}
                            tabList={tabList}
                            onTabChange={(key) => { this.onTabChange(key, 'key'); }}
                        >
                            {contentList[this.state.key]}
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}
