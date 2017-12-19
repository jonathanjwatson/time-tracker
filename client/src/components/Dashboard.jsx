import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie'
const cookies = new Cookies();

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            token: ""
        }
    }
    componentWillMount() {
        let token = cookies.get('token');
        this.setState({token})
    }

    _getUserData = () => {
        axios.get(`/api/users`, 
        {headers: 
            {
                'x-access-token': this.state.token
            },
        })
            .then(function(res) {
                console.log(res)
            })
    }
    render() {
        return (
            <div>
                My Dashboard
                <button onClick={this._getUserData}>Get Users</button>
            </div>
        );
    }
}

export default Dashboard;