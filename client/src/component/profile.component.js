import React, { Component } from 'react';
import { Redirect } from "react-router-dom"

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isbn: "",
            title: "",
            author: "",
            edition: "",
            navigate: false
        }
        this.uploadBook = this.uploadBook.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    async componentDidMount() {
        // Redirect to Login if token not found. 
        if (localStorage.getItem("token") === undefined) {
            this.setState({
                navigate: true
            })
        }

        // Use Token and get user Profile & name. 
        const res = await fetch('http://localhost:8000/api/profile', {
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
        });
        const reply = await res.json();
        
        // If token expired then logout & redirect to login.
        if(reply.detail === "Signature has expired."){
            localStorage.clear();
            this.setState({
                navigate:true
            })
        }

        // Assign name and Email. 
        this.setState({
            first_name: reply.first_name,
            email: reply.email,
        });


        // Check if logged in
        if (localStorage.getItem("token") != null && localStorage.getItem("token") !== undefined) {
            document.getElementById("navProfile").style.display = "flex"
            document.getElementById("navLogout").style.display = "flex"
            document.getElementById("navLogin").style.display = "none"
        } else {
            document.getElementById("navProfile").style.display = "none"
            document.getElementById("navLogout").style.display = "none"
            document.getElementById("navLogin").style.display = "flex"
        }
    }
    uploadBook(event) {
        event.preventDefault();

        // Attach token and upload book. 
        let formdata = new FormData(event.target);
        fetch('http://localhost:8000/api/addbook', {
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            },
            method: 'POST',
            body: formdata,
        }).then(response => {
            console.log(response)
        })
    }

    handleChange(e) {
        // Update state variables.
        console.log(e.target.name + " and " + e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {

        // Redirect to Login if token not found. 
        const { navigate } = this.state
        if (navigate) {
            return <Redirect to="/login" push={true} />
        }

        return (
            <div id="landing" className="profileLanding">
                <div id="profilePadder">
                    <div id="profile">
                        <div>
                            <h1 id="profileWelcome"> Welcome, <span className="cap">{this.state.first_name}</span>!</h1>
                            <div id="email" >( Email: <a href={"mailto:" + this.state.email}>{this.state.email}</a> )</div>
                        </div>
                        <div className="row">

                            <div id="listings">
                                <div>Your Listings:</div>
                                <div id="listingBody">
                                    <div id="listItem">
                                        <div>
                                            <div>
                                                <div id="listingTitle">
                                                    Basic Quantum Mechanics <span id="statusNew">NEW!</span>
                                                </div>
                                                <div>
                                                    Author: <span> Kyriakos Tamvakis</span>
                                                </div>
                                                <div>New York, NY 10003</div>
                                            </div>
                                            <div id="grower"></div>
                                            <div id="grower"></div>
                                            <div id="right">ISBN:<span>3030227766</span><div>Value: $40                          </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="listItem">
                                        <div>
                                            <div>
                                                <div id="listingTitle">
                                                    Basic Quantum Mechanics <span id="statusNew">NEW!</span>
                                                </div>
                                                <div>
                                                    Author: <span> Kyriakos Tamvakis</span>
                                                </div>
                                                <div>New York, NY 10003</div>
                                            </div>
                                            <div id="grower"></div>
                                            <div id="grower"></div>
                                            <div id="right">ISBN:<span>3030227766</span><div>Value: $40                          </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div id="profileBooks">
                                <div>Upload Listings:</div>
                                <div id="successWrap"><span id="success">Success!</span></div>
                                <div id="failed">Failed...</div>
                                <form id="loginBody" onSubmit={this.uploadBook}>
                                    <input className = "bookInput" name="isbn" required id="isbn" placeholder="isbn" onChange={this.handleChange}></input>
                                    <input className = "bookInput" name="title" required id="title" placeholder="title" onChange={this.handleChange}></input>
                                    <input className = "bookInput" name="author" required id="author" placeholder="author" onChange={this.handleChange}></input>
                                    <input className = "bookInput" name="edition" required id="edition" placeholder="edition" onChange={this.handleChange}></input>
                                    <button type="submit"   >Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}