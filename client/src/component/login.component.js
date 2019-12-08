
import React, { Component } from 'react';
import { Link , Redirect} from "react-router-dom";


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "joe",
            password: "",
            navigate:false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(e) {
        console.log(e.target.name + " and " + e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleSubmit(e) {
        console.log("username is : ",this.state.username)
        fetch('http://localhost:8000/token-auth/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            })
        })
            .then(res => res.json())
            .then(json => {
                
                if(json.token != null){
                    console.log(json)
                    localStorage.setItem('token',json.token);

                    this.setState({
                        navigate:true
                    })
                }else{
                    console.log("Login Failed")
                }
                // localStorage.setItem('token', json.token);
            });
    }
    componentDidMount() {

        if (localStorage.getItem("token") != null) {
            document.getElementById("navProfile").style.display = "flex"
            document.getElementById("navLogout").style.display = "flex"
            document.getElementById("navLogin").style.display = "none"
        } else {
            document.getElementById("navProfile").style.display = "none"
            document.getElementById("navLogout").style.display = "none"
            document.getElementById("navLogin").style.display = "flex"
        }
    }
    render() {
        const { navigate } = this.state
        if (navigate) {
            return <Redirect to="/profile" push={true} />
        }

        return (
            <div id="landing">
                <div id="loginBox">
                    <h1 id="loginTitle">Login</h1>
                    <div id="loginBody">
                        <input name="username" onChange={this.handleChange} placeholder="Username"></input>
                        <input name="password" onChange={this.handleChange} placeholder="Password"></input>
                        <button onClick={this.handleSubmit} >Login</button>
                    </div>

                    <Link to="register"><div id="register">Create Account</div></Link>
                </div>
            </div>
        )
    }
}