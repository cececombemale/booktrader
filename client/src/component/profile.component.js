import React, { Component } from 'react';
import { Redirect } from "react-router-dom"

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isbn: "",
            condition: "",
            price: "",
            navigate: false,
            first_name: "",
            username: "",
            email: "",
            listings: [],
        }
        this.uploadListing = this.uploadListing.bind(this)
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
        if (reply.detail === "Signature has expired.") {
            localStorage.clear();
            this.setState({
                navigate: true
            })
        }

        // Assign name and Email. 
        this.setState({
            first_name: reply.first_name,
            email: reply.email,
            username: reply.username,
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

        let getCondition = {
            "VP": "Very Poor",
            "P": "Poor",
            "O": "Okay",
            "G": "Good",
            "LN": "Like New"
        }


        // Get listing
        try {
            fetch('http://localhost:8000/api/listing/', {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                },
                method: 'GET',
            }).then(response => response.json())
                .then(json => {
                    console.log(json)
                    let listings = []
                    let books = []
                    for (let i = 0; i < json.length; i++) {
                        if (json[i].model === "books.listing") {
                            listings.push({
                                time: json[i].fields.added_at,
                                condition: getCondition[json[i].fields.condition],
                                isbn: json[i].fields.isbn,
                                price: json[i].fields.price,
                                author: "",
                                title: "",
                                edition: "",
                            })
                        }
                        else {
                            books.push({
                                author: json[i].fields.author,
                                edition: json[i].fields.edition,
                                title: json[i].fields.title,
                                isbn: json[i].pk,
                            })
                        }
                    }
                    for (let i = 0; i < listings.length; i++) {
                        for (let k = 0; k < books.length; k++) {
                            if (listings[i].isbn === books[k].isbn) {
                                listings[i].author = books[k].author
                                listings[i].title = books[i].title
                                listings[i].edition = books[i].edition
                            }
                            if (i === listings.length - 1 && k === books.length - 1) {
                                console.log(listings)
                                console.log(books)
                                this.setState({
                                    listings: listings
                                })
                            }
                        }
                    }
                })
        } catch (e) {
            console.log("FETCH FAILED")
        }

    }
    uploadListing(event) {
        event.preventDefault();

        // Attach token and upload listing. 
        let formdata = new FormData(event.target);
        formdata.append("user", this.state.username)
        formdata.append("added_at", new Date())
        try {
            fetch('http://localhost:8000/api/listing/', {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                },
                method: 'POST',
                body: formdata,
            }).then(response => {
                console.log(response)
                if (response.status === 200) {
                    document.getElementById("successWrap").style.display = "block"

                } else {
                    document.getElementById("failed").style.display = "block"
                }
            })
        } catch (e) {
            console.log("UPLOAD FAILED")
        }

    }
    uploadBook(event) {
        event.preventDefault();

        // Attach token to upload book.
        let formdata = new FormData(event.target);
        try {
            fetch('http://localhost:8000/api/addbook', {
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                },
                method: 'POST',
                body: formdata,
            }).then(response => {
                console.log(response)
                if (response.status === 200) {
                    document.getElementById("successWrapBook").style.display = "block"

                } else {
                    document.getElementById("failedBook").style.display = "block"
                }
            })
        } catch (e) {
            console.log("UPLOAD FAILED")
        }
    }

    handleChange(e) {
        // Update state variables.
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
                                    {this.state.listings.map(item => (
                                        <div id="listItem">
                                            <div>
                                                <div>
                                                    <div id="listingTitle">
                                                        {item.title} <span id="statusNew">{item.condition}</span>
                                                    </div>
                                                    <div>
                                                        Author: <span>{item.author}</span>
                                                    </div>
                                                    <div>New York, NY 10003</div>
                                                </div>
                                                <div id="grower"></div>
                                                <div id="grower"></div>
                                                <div id="right">ISBN:<span>{item.isbn}</span><div>Value: ${item.price}                          </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div id="profileBooks">
                                <div>Upload Listings:</div>
                                <div id="successWrap"><span id="success">Success!</span></div>
                                <div id="failed">Failed...</div>
                                <form id="loginBody" onSubmit={this.uploadListing}>
                                    <input className="bookInput" name="isbn" required id="isbn" placeholder="isbn" onChange={this.handleChange}></input>
                                    {/* <input className="bookInput" name="condition" required id="condition" placeholder="condition" onChange={this.handleChange}></input> */}
                                    <select id="Condition" name="condition">
                                        <option value="VP">Very Poor</option>
                                        <option value="P">Poor</option>
                                        <option value="O">Okay</option>
                                        <option value="G">Good</option>
                                        <option value="LN">Like New</option>
                                    </select>
                                    <input className="bookInput" name="price" required id="price" placeholder="price" onChange={this.handleChange}></input>
                                    <button type="submit"   >Submit</button>
                                </form>
                                <div>Upload Book:</div>
                                <div id="successWrapBook"><span id="success">Success!</span></div>
                                <div id="failedBook">Failed...</div>
                                <form id="loginBody" onSubmit={this.uploadBook}>
                                    <input className="bookInput" name="isbn" required id="isbn" placeholder="isbn" onChange={this.handleChange}></input>
                                    <input className="bookInput" name="title" required id="title" placeholder="title" onChange={this.handleChange}></input>
                                    <input className="bookInput" name="author" required id="author" placeholder="author" onChange={this.handleChange}></input>
                                    <input className="bookInput" name="edition" required id="edition" placeholder="edition" onChange={this.handleChange}></input>
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