import React, {Component} from 'react';
import {observer} from 'mobx-react';

@observer
class DemoTest extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.store.listAllCompanies();
    }


    submitCompany(e){
        e.preventDefault()
        let company_name = this.refs.company_name.value
        let secret = this.refs.secret.value
        const input = {
            company_name:company_name,
            secret:secret
        }
        this.props.createCompany(input);
    }

    render(){
        return(
            <div>
                <h3>Companies</h3>
                <ul>
                    {this.props.store.companies.map(
                        (company,index) => <li key={index}>{company.company_name}</li>
                    )}
                </ul>

                <div>
                    <h3>Companies Form</h3>
                    <form onSubmit={this.submitCompany.bind(this)}>
                        <input type="text" name="company_name" ref='company_name'/>
                        <input type="text" name="secret" ref='secret'/>
                        <input type="submit"/>
                    </form>
                </div>
            </div>
        )
    }
}

export default DemoTest