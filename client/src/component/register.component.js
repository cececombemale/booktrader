
import React, { Component } from 'react';
import { Link } from "react-router-dom";


export default class Register extends Component {
    render() {
        return (
            <div id="landing">
                <div id="loginBox">
                    <h1 id="loginTitle">Create Account</h1>
                    <div id="loginBody">
                        <input placeholder="First Name"></input>
                        <input placeholder="Last Name"></input>
                        <input placeholder="Email"></input>
                        <input placeholder="Phone"></input>
                        <input placeholder="Zip"></input>
                        <button>Create Account</button>
                    </div>

                    <Link to="login"><div id="register">Login</div></Link>
                </div>
            </div>
        )
    }
}