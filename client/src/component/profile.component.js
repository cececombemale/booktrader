
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
        if (localStorage.getItem("token") == null) {
            this.setState({
                navigate: true
            })
        }

        try {
            const res = await fetch('http://localhost:8000/api/profile', {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                }
            });
            const reply = await res.json();
            console.log(reply)
            // TODO: Add check to see if returned in good
            this.setState({
                username: reply.username,
                email: reply.email,
            });
        } catch (e) {
            console.log(e);
        }


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
    uploadBook(event) {
        event.preventDefault();
        console.log("HELLO")
        console.log(this.state.isbn,"empty")

        let formdata = new FormData(event.target);
        fetch('http://localhost:8000/api/addbook', {
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            },
            method: 'POST',
            body:formdata,
        }).then(response => {
            console.log(response)
        })
    }
    handleChange(e) {
        console.log(e.target.name + " and " + e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    
    render() {
        const { navigate } = this.state

        if (navigate) {
            return <Redirect to="/login" push={true} />
        }

        return (
            <div id="landing" className="profileLanding">
                <div id="profilePadder">
                    <div id="profile">
                        <div>
                            <h1 id="profileWelcome"> Welcome, <span className="cap">{this.state.username}</span>!</h1>
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
                                <form onSubmit={this.uploadBook}>
                                    <input name="isbn" required id="isbn" placeholder="isbn" onChange={this.handleChange}></input>
                                    <input name="title" required id="title" placeholder="title" onChange={this.handleChange}></input>
                                    <input name="author" require id="author" placeholder="author" onChange={this.handleChange}></input>
                                    <input name="edition" require id="edition" placeholder="edition" onChange={this.handleChange}></input>
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