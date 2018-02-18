import {observable, action, computed, useStrict} from 'mobx';
import Axios from 'axios'
import {rootUrl} from '../configs/ipConfig'

const clientUrl = `${rootUrl}/client`;
const clientsUrl = `${rootUrl}/clients`;


export default class ClientStore {

    @observable clients = []
    @observable clientById = {}

    @action createClient(client) {
        Axios.post(clientUrl, client)
            .then(response => {
                this.clients.push(response.data)
            })
            .catch(error => {
                throw(error);
            });
    }

    @action fetchClients(company) {
        Axios.post(clientsUrl, company)
            .then(response => {
                this.clients = response.data
            })
            .catch(error => {
                throw(error);
            });
    }

    @action fetchClientById(clientId) {
        // fetch(`${clientUrl}/${clientId}`, {
        //     method: 'GET',
        //     headers: {
        //         "Content-type": "application/json"
        //     },
        // })
        //     .then((response) => {
        //         // console.log(response);
        //         response.json().then(function (data) {
        //             console.log(data)
        //             this.clientById = data
        //         }.bind(this));
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     })
        Axios.get(`${clientUrl}/${clientId}`)
            .then(response => {
                console.log(response.data)
                this.clientById = response.data

            })
            .catch(error => {
                throw(error);
            });
    }

    @action updateClientById(clientId, newClient) {
        Axios.put(`${clientUrl}/${clientId}`, newClient)
            .then(response => {
                this.clientById = response.data
            })
            .catch(error => {
                throw(error);
            });
    }

    @action deleteClientById(clientId) {
        Axios.delete(`${clientUrl}/${clientId}`)
            .then(response => {
                if(response.data.status == 200){
                    this.clients = this.clients.filter(item => item.id !== clientId);
                }
            })
            .catch(error => {
                throw(error);
            });
        console.log('delete')
    }
}