import React, {Component} from 'react';
import { Card } from 'antd';
import {observer} from 'mobx-react';

import PaperDoughnut from './PaperDoughnut'
import InkDoughnut from './InkDoughnut'
import PartsDoughnut from './PartsDoughnut'
import OtherDoughnut from './OtherDoughnut'


@observer
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
            tab1: <PaperDoughnut {...this.props} item_name={'纸张'}/>,
            tab2: <InkDoughnut {...this.props} item_name={'油墨'}/>,
            tab3: <PartsDoughnut {...this.props} item_name={'配件耗材'}/>,
            tab4: <OtherDoughnut {...this.props} item_name={'其他辅料'}/>,
        };

        return (
            <div className="animated fadeIn">
                <div className="row">
                    <div className="col">
                        <Card
                            style={{ width: '100%' }}
                            title="仓储信息图"
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
