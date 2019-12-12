
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
    }
    async componentDidMount() {
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
                    q: this.state.query
                })
                let booklist = []
                for (let i = 0; i < response.hits.hits.length; i++) {
                    booklist.push(response.hits.hits[i]["_source"])
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
                    booklist.push(response.hits.hits[i]["_source"])
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
    render() {
        return (
            <div id="search-background">
                <div className="search-container" id="mainsearch">
                    <img alt="Search Icon" className="icon" src={SearchIcon}></img>
                    <input onKeyDown={this.handleSearch} onChange={this.updateState} autoComplete="off" type="search" id="search" placeholder="Search... (ISBN)"></input>
                </div>
                <div id="searchBody">
                    {this.state.booklist.map(item => (
                        <div id="bookItem" key={item.isbn}>
                            <div>
                                <div>
                                    <div id="bookTitle">
                                        {item.title} <span id="statusNew">NEW!</span>
                                    </div>
                                    <div>
                                        Edition: <span>{item.edition}</span>
                                    </div>
                                    <div>
                                        Author: <span> {item.author}</span>
                                    </div>
                                    <div>New York, NY 10003</div>
                                </div>

                                <div id="grower"></div>
                                <div id="grower"></div>
                                <div id="right">
                                    ISBN:
                                <span>
                                        {item.isbn}
                                    </span>
                                    <div>
                                        Value: $40
                                </div>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        )
    }
}