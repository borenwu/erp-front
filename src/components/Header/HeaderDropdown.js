import React, {Component} from 'react';
import {Avatar} from 'antd';
import {
    Badge,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Dropdown
} from 'reactstrap';
import {observer} from 'mobx-react';


@observer
class HeaderDropdown extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    logout() {
        const company_id = this.props.store.company_id
        const user_name = this.props.userName
        const userInfo = {
            company_id:company_id,
            user_name:user_name
        }
        this.props.store.userLogout(userInfo)
    }

    logoutCompany(){
        this.props.store.companyLogout()
    }

    dropAccnt() {
        return (
            <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle nav>
                    <Avatar style={{backgroundColor: '#87d068', marginRight: 20}} icon="user"/>
                    <label htmlFor="" style={{marginRight: 48}}>{this.props.userName}</label>
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem onClick={this.logout.bind(this)}><i className="fa fa-lock"></i> 登出</DropdownItem>
                    <DropdownItem onClick={this.logoutCompany.bind(this)}><i className="fa fa-sign-out"></i> 完全注销</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        );
    }

    render() {
        const {...attributes} = this.props;
        return (
            this.dropAccnt()
        );
    }
}

export default HeaderDropdown;
