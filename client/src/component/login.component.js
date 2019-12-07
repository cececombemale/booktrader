
import React, { Component } from 'react';
import { Link } from "react-router-dom";


export default class Login extends Component {
    render() {
        return (
            <div id="landing">
                <div id="loginBox">
                    <h1 id="loginTitle">Login</h1> 
                    <div id="loginBody">
                        <input placeholder="Username"></input>
                        <input placeholder="Password"></input>
                        <button>Login</button>
                    </div>

                    <Link to="register"><div id="register">Create Account</div></Link>
                </div>
            </div>
        )
    }
}