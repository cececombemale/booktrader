
import React, { Component } from 'react';
import SearchIcon from "../media/search.svg"
import elasticsearch from 'elasticsearch'
export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            booklist: [],
        };
        this.handleSearch = this.handleSearch.bind(this)
        this.updateState = this.updateState.bind(this)
        this.formatDate = this.formatDate.bind(this)
    }
    async componentDidMount() {
        let getCondition = {
            "VP": "Very Poor",
            "P": "Poor",
            "O": "Okay",
            "G": "Good",
            "LN": "Like New"
        }
        // Handle redirect from landing page search
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let query = params.get('query');
        if (query != null) {
            // Search with previous landing page query
            var client = new elasticsearch.Client({
                host: 'http://localhost:9200', // Change this to wherever the elasticsearch server is
            });
            try {
                const response = await client.search({
                    q: query
                })
                let booklist = []
                for (let i = 0; i < response.hits.hits.length; i++) {
                    // get listing
                    let formData = new FormData();
                    formData.append("isbn", response.hits.hits[i]["_source"].isbn)
                    try {
                        const res = await fetch('http://localhost:8000/api/listingsfromisbn/', {

                            method: 'POST',
                            body: formData
                        });

                        let listing = await res.json();
                        console.log(listing)
                        // Get Condition Names
                        for (let k = 0; k < listing.length; k++) {
                            listing[k].fields.condition = getCondition[listing[k].fields.condition]
                        }
                        response.hits.hits[i]["_source"].listings = listing
                        booklist.push(response.hits.hits[i]["_source"])
                    } catch (e) {
                        console.log(e)
                        console.log("ISBN SEARCH FAILURE")
                    }



                }
                this.setState({
                    booklist: booklist
                })
                return
            } catch (e) {
                console.log("ERROR: SEARCH FAILED!")
                console.log("DEFAULTING...")
            }
        }


        // Get Default List of books
        try {
            const res = await fetch('http://localhost:8000/api/book/?format=json');
            const booklist = await res.json();
            for (let i = 0; i < booklist.length; i++) {
                // Get Listing
                let formData = new FormData();
                formData.append("isbn", booklist[i].isbn)
                try {
                    const res = await fetch('http://localhost:8000/api/listingsfromisbn/', {
 
                        method: 'POST',
                        body: formData
                    });

                    let listing = await res.json();
                    // Get Condition Names
                    for (let k = 0; k < listing.length; k++) {
                        listing[k].fields.condition = getCondition[listing[k].fields.condition]
                    }
                    booklist[i].listings = listing
                    this.setState({
                        booklist
                    });
                } catch (e) {
                    console.log(e)
                    console.log("ISBN SEARCH FAILURE")
                }


            }
            this.setState({
                booklist
            });

        } catch (e) {
            console.log("DEFAULT SEARCH FAILURE")
        }


        // Check if logged in
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
    async handleSearch(e) {
        let getCondition = {
            "VP": "Very Poor",
            "P": "Poor",
            "O": "Okay",
            "G": "Good",
            "LN": "Like New"
        }
        // Elastic Search
        if (e.keyCode === 13) {
            console.log("SEARCH QUERY:  ", this.state.query)
            var client = new elasticsearch.Client({
                host: 'http://localhost:9200', // Change this to wherever the elasticsearch server is
            });
            try {
                const response = await client.search({
                    q: this.state.query
                })
                let booklist = []
                for (let i = 0; i < response.hits.hits.length; i++) {
                    // get listing
                    let formData = new FormData();
                    formData.append("isbn", response.hits.hits[i]["_source"].isbn)
                    try {
                        const res = await fetch('http://localhost:8000/api/listingsfromisbn/', {
                            headers: {
                                Authorization: `JWT ${localStorage.getItem('token')}`
                            },
                            method: 'POST',
                            body: formData
                        });

                        let listing = await res.json();
                        console.log(listing)
                        // Get Condition Names
                        for (let k = 0; k < listing.length; k++) {
                            listing[k].fields.condition = getCondition[listing[k].fields.condition]
                        }
                        response.hits.hits[i]["_source"].listings = listing
                        booklist.push(response.hits.hits[i]["_source"])
                    } catch (e) {
                        console.log(e)
                        console.log("ISBN SEARCH FAILURE")
                    }
                }

                this.setState({
                    booklist: booklist
                })
            } catch (e) {
                console.log("ERROR: SEARCH FAILED!")
            }

        }
    }
    updateState(e) {
        // Update Search Query
        e.preventDefault()
        this.setState({
            query: e.target.value
        })
        console.log(this.state.query)
    }

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }
    render() {
        return (
            <div id="search-background">
                <div className="search-container" id="mainsearch">
                    <img alt="Search Icon" className="icon" src={SearchIcon}></img>
                    <input onKeyDown={this.handleSearch} onChange={this.updateState} autoComplete="off" type="search" id="search" placeholder="Search... (ISBN)"></input>
                </div>
                <div id="searchBody">
                    {this.state.booklist.map(item => (
                        <div id="bookItem" key={item.isbn} >
                            <div>
                                <div>
                                    <div id="bookTitle">
                                        {item.title}
                                    </div>
                                    <div>
                                        Edition: <span>{item.edition}</span>
                                    </div>
                                    <div>
                                        Author: <span> {item.author}</span>
                                    </div>

                                </div>

                                <div id="grower"></div>
                                <div id="grower"></div>
                                <div id="right">
                                    ISBN:
                                <span>
                                        {item.isbn}
                                    </span>

                                </div>
                            </div>
                            <div className="listingDrop">
                                {item.listings ? item.listings.map(listing => (
                                    <div className="listingChild" key={listing.fields.added_at}>
                                        <div>
                                            <span id="statusNew">{listing.fields.condition}</span>

                                            <div>
                                                User: {listing.fields.user}
                                            </div>
                                        </div>
                                        <div id="grower"></div>
                                        <div className="listingRight">
                                            Value: ${listing.fields.price}
                                            <div>{this.formatDate(listing.fields.added_at)}</div>
                                        </div>
                                    </div>
                                )) : "(EMPTY)"}
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        )
    }
}