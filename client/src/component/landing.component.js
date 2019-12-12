
import React, { Component } from 'react';
import '../App.css';
import Search from "../media/search.svg"
import {Redirect } from "react-router-dom";

export default class Landing extends Component {
    constructor(props){
        super(props);
        this.state = {
            query: "",
            navigate: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(e) {
        // Update al State variables
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleSubmit(e) {
        // Handle Enter Press
        if (e.keyCode === 13) {
            this.setState({
                navigate:true
            })
        }
    }
    componentDidMount() {
        if(localStorage.getItem("token") != null){
            document.getElementById("navProfile").style.display = "flex"
            document.getElementById("navLogout").style.display = "flex"
            document.getElementById("navLogin").style.display = "none"
        }else{
            document.getElementById("navProfile").style.display = "none"
            document.getElementById("navLogout").style.display = "none"
            document.getElementById("navLogin").style.display = "flex"
        }
    }
    render() {
        // Redirect on search
        const { navigate } = this.state
        if (navigate) {
            return <Redirect to={"/search?query="+ this.state.query} push={true} />
        }
        return (
            <div id="landing">
                <div>
                    <h1 id="search-title">Welcome</h1>
                    <div className="search-container">
                        <img alt="Search Icon" className="icon" src={Search}></img>
                        <input onKeyDown={this.handleSubmit} autoComplete="off"  id="search" placeholder="Search... (ISBN)"></input>
                    </div>
                    <div id="subtext">
                        ( Input the ISBN and we'll find the book for you! )
                    </div>
                </div>
            </div>
        )
    }
}