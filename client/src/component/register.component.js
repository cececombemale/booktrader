
import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            email: "",
            first_name: "",
            last_name: "",
            navigate: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.submitData = this.submitData.bind(this)
        this.buttonCheck = this.buttonCheck.bind(this)
    }
    componentDidMount() {
        // Check if logged in
        if (localStorage.getItem("token") != null) {
            this.setState({
                navigate: true
            })
            document.getElementById("navProfile").style.display = "flex"
            document.getElementById("navLogout").style.display = "flex"
            document.getElementById("navLogin").style.display = "none"
        } else {
            document.getElementById("navProfile").style.display = "none"
            document.getElementById("navLogout").style.display = "none"
            document.getElementById("navLogin").style.display = "flex"
        }
    }
    handleChange(e) {
        // Update state variables
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    submitData() {
        // Check if register is correctedly filled here.
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
                .then(res => res.json())
                .then(json => {
                    if(json.token != null){
                        localStorage.setItem('token', json.token);

                    }
                    if (json.token != null) {
                        this.setState({
                            navigate: true
                        })
                    }else{
                        this.setState({
                            navigate: false
                        })
                    }
                });

        } catch (e) {
            console.log("Login Failed")
            // Don't Redirect it login failed
            this.setState({
                navigate: false
            })
        }
    }
    buttonCheck(e) {
        // Handle Enter Press
        if (e.keyCode === 13) {
            this.submitData()
        }
    }
    render() {
        // Redirect if logged in
        const { navigate } = this.state
        if (navigate) {
            return <Redirect to="/profile" push={true} />
        }

        return (
            <div id="landing">
                <div id="loginBox">
                    <h1 id="loginTitle">Create Account</h1>
                    <div id="loginBody">
                        <input required name="first_name" onChange={this.handleChange} placeholder="First Name"></input>
                        <input required name="last_name" onChange={this.handleChange} placeholder="Last Name"></input>
                        <input required name="email" onChange={this.handleChange} placeholder="Email"></input>
                        <input required name="username" onChange={this.handleChange} placeholder="Username"></input>
                        <input onKeyDown={this.buttonCheck} required type="password" name="password" onChange={this.handleChange} placeholder="Password"></input>
                        <button onClick={this.submitData}>Create Account</button>
                    </div>

                    <Link to="login"><div id="register">Login</div></Link>
                </div>
            </div>
        )
    }
}