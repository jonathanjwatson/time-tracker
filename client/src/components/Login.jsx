import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
	constructor() {
        super();
        this.state = {
            user: {
				email: "",
				password: ""
			},
			token: "",
			submittedForm: false,
			redirect: false
        }
	}
	_handleChange = (e) => {
		const attributeName = e.target.name;
		const attributeValue = e.target.value;
		const user = {...this.state.user};
		user[attributeName] = attributeValue;
		this.setState({ user });
	}
	_handleSubmit = (e) => {
		e.preventDefault();
		console.log(this.state.user);
		const payload = this.state.user;
		console.log(payload);
		axios.post(`/auth/login`, payload)
		.then((res) => {
			console.log(res);
			console.log("success")
			// const submittedForm = !submittedForm
			// this.setState({submittedForm})
			let token = res.data.token;
			console.log(token);
			this.setState({token})
			if(token){
				let redirect = !this.state.redirect;
				this.setState({redirect})
			}
		})
	}
    render() {
		if (this.state.redirect){
			return <Redirect to="/dashboard" />
		  }
        return (
            <div>
				<form onSubmit={this._handleSubmit}>
					<input 
						type="text" 
						onChange={this._handleChange}
						value={this.state.user.email}
						name="email"
						placeholder="Email Address"
						required
					/>
					<input 
						type="password" 
						onChange={this._handleChange}
						value={this.state.user.password}
						name="password"
						placeholder="Password"
						required
					/>
					<input 
						type="submit"
						value="Submit" />
				</form>
            </div>
        );
    }
}

export default Login;