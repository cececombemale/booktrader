
import React, { Component } from 'react';
import { Link } from "react-router-dom";


export default class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            email: "",
            first_name:"",
            last_name:"",
        }
        this.handleChange = this.handleChange.bind(this)
        this.submitData = this.submitData.bind(this)
    }
    handleChange(e) {
        console.log(e.target.name + " and " + e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    submit(){
        console.log(this.state)
    }
    submitData() {
        try {
            fetch("http://localhost:8000/api/user/register", {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },

                //make sure to serialize your JSON body
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password,
                    first_name: this.state.first_name,
                    last_name: this.state.last_name,
                    username: this.state.username,
                })
            })
                .then((response) => {
                    console.log(response)
                });
        } catch (e) {
            console.log(e)
        }
    }
    render() {
        return (
            <div id="landing">
                <div id="loginBox">
                    <h1 id="loginTitle">Create Account</h1>
                    <div id="loginBody">
                        <input name="first_name" onChange={this.handleChange} placeholder="First Name"></input>
                        <input name="last_name" onChange={this.handleChange} placeholder="Last Name"></input>
                        <input name="email" onChange={this.handleChange} placeholder="Email"></input>
                        <input name="username" onChange={this.handleChange} placeholder="Username"></input>
                        <input name="password" onChange={this.handleChange} placeholder="Password"></input>
                        <button onClick={this.submitData}>Create Account</button>
                    </div>

                    <Link to="login"><div id="register">Login</div></Link>
                </div>
            </div>
        )
    }
}