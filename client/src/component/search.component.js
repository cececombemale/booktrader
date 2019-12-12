
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
        try {
            const res = await fetch('http://localhost:8000/api/book/?format=json');
            const booklist = await res.json();
            // TODO: Add check to see if returned in good
            console.log(booklist)
            this.setState({
                booklist
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
    async handleSearch() {
        console.log("SEARCH: ", this.state.query)
        var client = new elasticsearch.Client({
            host: 'http://localhost:9200', // Change this to wherever the elasticsearch server is
        });
        const response = await client.search({
            q: this.state.query
        })
        console.log(response.hits.hits)
        let booklist = []
        for (let i = 0; i < response.hits.hits.length; i++) {
            booklist.push(response.hits.hits[i]["_source"])
        }

        this.setState({
            booklist:booklist
        } )
    // console.log(blist)
    // this.setState({
    //     booklist:blist
    // })
    console.log("DONE")
}
updateState(e) {
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
                <input onChange={this.updateState} autoComplete="off" type="search" id="search" placeholder="Search... (ISBN)"></input>
                <button onClick={this.handleSearch}>GO!</button>
            </div>
            <div id="searchBody">
                {this.state.booklist.map(item => (
                    <div id="bookItem">
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