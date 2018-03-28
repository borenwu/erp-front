import React from 'react'
import {Modal, Button, DatePicker, Cascader} from 'antd'
import {observer} from 'mobx-react';
import moment from 'moment';
import ClientModal from '../../Settings/Configs/client/ClientModal'

@observer
export default class TaskModal extends React.Component {
    state = {
        assistantVisible: false,
        dueDate: '',
        desc:[]
    }

    constructor(props) {
        super(props)
    }

    showClientModal() {
        this.props.store.showClientModal()
    }

    showAssistantModal() {
        this.setState({
            assistantVisible: true,
        });
    }

    handleAssistantOk(e) {
        let description = this.state.desc
        this.refs.desc.value = `${description[0]}/${description[1]}/${description[2]}`
        this.setState({
            assistantVisible: false,
        });
    }

    handleAssistantCancel(e) {
        this.setState({
            assistantVisible: false,
        });
    }

    /////////////////////////////////////////////////////////////////////////

    onChange(date, dateString) {
        this.setState({dueDate: dateString})
    }

    handleOk() {
        let company_id = this.props.store.company_id
        let client_name = this.refs.client_name.value
        let task_date = moment().format('YYYY-MM-DD')
        let due_date = this.state.dueDate
        let task_name = this.refs.task_name.value
        let volume = this.refs.volume.value
        let desc = this.refs.desc.value
        let maker = this.refs.maker.value
        let make_time = moment().format('YYYY-MM-DD h:mm:ss')

        const task = {
            company_id: company_id,
            task_date: task_date,
            due_date: due_date,
            client_name: client_name,
            task_name: task_name,
            volume: volume,
            desc: desc,
            maker: maker,
            make_time: make_time
        }

        this.props.store.createTask(task)
        this.props.store.closeModal()
    }

    handleCancel(e) {
        this.props.store.closeModal()
    }

    componentDidMount() {
        this.props.store.fetchClients(this.props.store.company_id)
    }

    onChangeAssistant(value) {
        this.setState({desc:value})
    }


    render() {
        const options = [
            {
                value: '对开',
                label: '对开',
                children: [
                    {
                        value: '4版',
                        label: '4版',
                        children: [
                            {
                                value: '双面彩色',
                                label: '双面彩色',
                            },
                            {
                                value: '单面彩色',
                                label: '单面彩色',
                            },
                            {
                                value: '套红',
                                label: '套红',
                            },
                            {
                                value: '黑白',
                                label: '黑白',
                            }
                        ],
                    },
                    {
                        value: '8版',
                        label: '8版',
                        children: [
                            {
                                value: '双面彩色',
                                label: '双面彩色',
                            },
                            {
                                value: '单面彩色',
                                label: '单面彩色',
                            },
                            {
                                value: '套红',
                                label: '套红',
                            },
                            {
                                value: '黑白',
                                label: '黑白',
                            }
                        ],
                    },
                    {
                        value: '16版',
                        label: '16版',
                        children: [
                            {
                                value: '双面彩色',
                                label: '双面彩色',
                            },
                            {
                                value: '单面彩色',
                                label: '单面彩色',
                            },
                            {
                                value: '套红',
                                label: '套红',
                            },
                            {
                                value: '黑白',
                                label: '黑白',
                            }
                        ],
                    },
                    {
                        value: '32版',
                        label: '32版',
                        children: [
                            {
                                value: '双面彩色',
                                label: '双面彩色',
                            },
                            {
                                value: '单面彩色',
                                label: '单面彩色',
                            },
                            {
                                value: '套红',
                                label: '套红',
                            },
                            {
                                value: '黑白',
                                label: '黑白',
                            }
                        ],
                    },
                    {
                        value: '64版',
                        label: '64版',
                        children: [
                            {
                                value: '双面彩色',
                                label: '双面彩色',
                            },
                            {
                                value: '单面彩色',
                                label: '单面彩色',
                            },
                            {
                                value: '套红',
                                label: '套红',
                            },
                            {
                                value: '黑白',
                                label: '黑白',
                            }
                        ],
                    }
                ],
            },
            {
                value: '四开',
                label: '四开',
                children: [
                    {
                        value: '4版',
                        label: '4版',
                        children: [
                            {
                                value: '双面彩色',
                                label: '双面彩色',
                            },
                            {
                                value: '单面彩色',
                                label: '单面彩色',
                            },
                            {
                                value: '套红',
                                label: '套红',
                            },
                            {
                                value: '黑白',
                                label: '黑白',
                            }
                        ],
                    },
                    {
                        value: '8版',
                        label: '8版',
                        children: [
                            {
                                value: '双面彩色',
                                label: '双面彩色',
                            },
                            {
                                value: '单面彩色',
                                label: '单面彩色',
                            },
                            {
                                value: '套红',
                                label: '套红',
                            },
                            {
                                value: '黑白',
                                label: '黑白',
                            }
                        ],
                    },
                    {
                        value: '16版',
                        label: '16版',
                        children: [
                            {
                                value: '双面彩色',
                                label: '双面彩色',
                            },
                            {
                                value: '单面彩色',
                                label: '单面彩色',
                            },
                            {
                                value: '套红',
                                label: '套红',
                            },
                            {
                                value: '黑白',
                                label: '黑白',
                            }
                        ],
                    },
                    {
                        value: '32版',
                        label: '32版',
                        children: [
                            {
                                value: '双面彩色',
                                label: '双面彩色',
                            },
                            {
                                value: '单面彩色',
                                label: '单面彩色',
                            },
                            {
                                value: '套红',
                                label: '套红',
                            },
                            {
                                value: '黑白',
                                label: '黑白',
                            }
                        ],
                    },
                    {
                        value: '64版',
                        label: '64版',
                        children: [
                            {
                                value: '双面彩色',
                                label: '双面彩色',
                            },
                            {
                                value: '单面彩色',
                                label: '单面彩色',
                            },
                            {
                                value: '套红',
                                label: '套红',
                            },
                            {
                                value: '黑白',
                                label: '黑白',
                            }
                        ],
                    }
                ],
            },
        ]


        return (
            <div>
                <Modal
                    title={this.props.title}
                    visible={this.props.visible}
                    onOk={this.handleOk.bind(this)}
                    onCancel={this.handleCancel.bind(this)}
                    destroyOnClose={true}
                    okText='确定'
                    cancelText='取消'
                >

                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleFormControlSelect1">客户</label>
                            <div className="row">
                                <div className="col-8">
                                    <select ref="client_name" className="form-control" id="exampleFormControlSelect1">
                                        {this.props.store.clients.map((c, i) => <option key={i}>{c.client_name}</option>)}
                                    </select>
                                </div>
                                <div className="col-4">
                                    <Button onClick={this.showClientModal.bind(this)}>添加新客户</Button>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="taskName">任务</label>
                            <input type="text" ref="task_name" className="form-control" id="taskName" placeholder="任务名称"/>
                        </div>
                        <div className="form-group">
                            <label>交付时间</label>
                            <DatePicker style={{width: 100 + '%'}} onChange={this.onChange.bind(this)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="taskVolume">印量</label>
                            <input ref="volume" type="number" className="form-control" id="taskVolume" defaultValue={0}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="taskDesc">规格明细</label>
                            <div className="row">
                                <div className="col-8">
                                    <input ref="desc" type="text" className="form-control" id="taskDesc"
                                           placeholder="规格明细"/>
                                </div>
                                <div className="col-4">
                                    <Button type="primary" onClick={this.showAssistantModal.bind(this)}>报业印刷小助手</Button>
                                    <Modal
                                        title="报业印刷小助手"
                                        visible={this.state.assistantVisible}
                                        onOk={this.handleAssistantOk.bind(this)}
                                        onCancel={this.handleAssistantCancel.bind(this)}
                                    >
                                        <Cascader options={options} style={{width: 400}} onChange={this.onChangeAssistant.bind(this)}
                                                  placeholder="请选择"/>
                                    </Modal>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="taskMaker">制作人</label>
                            <input type="text" ref="maker" className="form-control" id="taskMaker" readOnly={true}
                                   defaultValue={this.props.userName}/>
                        </div>
                    </form>
                </Modal>
                <ClientModal
                    store={this.props.store}
                    title="添加新客户"
                    visible={this.props.store.clientModalVisible}/>
            </div>

        )
    }
}