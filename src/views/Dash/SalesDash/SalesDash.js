import React, {Component} from 'react';
import {observer} from 'mobx-react';
import moment from 'moment';
import {
    Badge,
    Row,
    Col,
    Progress,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Button,
    ButtonToolbar,
    ButtonGroup,
    ButtonDropdown,
    Label,
    Input,
} from 'reactstrap';

@observer
export default class SalesDash extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        let companyInfo = {
            company_id: this.props.store.company_id
        }
        this.props.store.fetchTodaySales(companyInfo)
    }

    render() {
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" sm="12" lg="6">
                        <Card>
                            <CardBody className="pb-0">
                                <h4 className="mb-0">{this.props.store.todaySales}</h4>
                                <p>今日已录入销售额</p>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col xs="12" sm="12" lg="6">
                        <Card>
                            <CardBody className="pb-0">
                                <h4 className="mb-0">9.823</h4>
                                <p>当月累计销售额</p>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col xs="12" sm="12" lg="12">
                        <Card>
                            <CardBody className="pb-0">
                                <h4 className="mb-0">9.823</h4>
                                <p>今日已录入销售的任务统计</p>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Card>
                            <CardBody>
                                <Row>
                                    <Col sm="5">
                                        <CardTitle className="mb-0">当月销售</CardTitle>
                                        <div className="small text-muted">November 2015</div>
                                    </Col>
                                    {/*<Col sm="7" className="d-none d-sm-inline-block">*/}
                                    {/*<Button color="primary" className="float-right"><i className="icon-cloud-download"></i></Button>*/}
                                    {/*<ButtonToolbar className="float-right" aria-label="Toolbar with button groups">*/}
                                    {/*<ButtonGroup className="mr-3" data-toggle="buttons" aria-label="First group">*/}
                                    {/*<Label htmlFor="option1" className="btn btn-outline-secondary">*/}
                                    {/*<Input type="radio" name="options" id="option1"/> Day*/}
                                    {/*</Label>*/}
                                    {/*<Label htmlFor="option2" className="btn btn-outline-secondary active">*/}
                                    {/*<Input type="radio" name="options" id="option2" defaultChecked/> Month*/}
                                    {/*</Label>*/}
                                    {/*<Label htmlFor="option3" className="btn btn-outline-secondary">*/}
                                    {/*<Input type="radio" name="options" id="option3"/> Year*/}
                                    {/*</Label>*/}
                                    {/*</ButtonGroup>*/}
                                    {/*</ButtonToolbar>*/}
                                    {/*</Col>*/}
                                </Row>
                                {/*<div className="chart-wrapper" style={{height: 300 + 'px', marginTop: 40 + 'px'}}>*/}
                                {/*<Line data={mainChart} options={mainChartOpts} height={300}/>*/}
                                {/*</div>*/}
                            </CardBody>
                            <CardFooter>
                                <ul>
                                    <li>
                                        <div className="text-muted">Visits</div>
                                        <strong>29.703 Users (40%)</strong>
                                        <Progress className="progress-xs mt-2" color="success" value="40"/>
                                    </li>
                                    <li className="d-none d-md-table-cell">
                                        <div className="text-muted">Unique</div>
                                        <strong>24.093 Users (20%)</strong>
                                        <Progress className="progress-xs mt-2" color="info" value="20"/>
                                    </li>
                                    <li>
                                        <div className="text-muted">Pageviews</div>
                                        <strong>78.706 Views (60%)</strong>
                                        <Progress className="progress-xs mt-2" color="warning" value="60"/>
                                    </li>
                                    <li className="d-none d-md-table-cell">
                                        <div className="text-muted">New Users</div>
                                        <strong>22.123 Users (80%)</strong>
                                        <Progress className="progress-xs mt-2" color="danger" value="80"/>
                                    </li>
                                    <li className="d-none d-md-table-cell">
                                        <div className="text-muted">Bounce Rate</div>
                                        <strong>Average 40.15%</strong>
                                        <Progress className="progress-xs mt-2" color="primary" value="40"/>
                                    </li>
                                </ul>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}