
import React, { Component } from 'react';
import SearchIcon from "../media/search.svg"
import elasticsearch from 'elasticsearch'
export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            query : "",
            booklist:[],
        };
        this.handleSearch = this.handleSearch.bind(this)
        this.updateState = this.updateState.bind(this)  
      }
    async componentDidMount() {
        try {
            const res = await fetch('http://localhost:8000/api/book/?format=json');
            const booklist = await res.json();
            // TODO: Add check to see if returned in good
            this.setState({
                booklist
            });
        } catch (e) {
            console.log(e);
        }
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
    handleSearch(){
        console.log("SEARCH: ", this.state.query)
        var client = new elasticsearch.Client({
            host: 'localhost:9200',
            // log: 'trace',
            // apiVersion: '7.2', // use the same version of your Elasticsearch instance
          });
        try {
            const response = await client.search({
              q: 'will'
            });
            console.log(response.hits.hits)
          } catch (error) {
            console.trace(error.message)
          }
    }
    updateState(e){
        
        this.setState({
            query:e.target.value
        })
        console.log(this.state.query)
    }
    render() {
        return (
            <div id="search-background">
                <div className="search-container" id="mainsearch">
                    <img alt="Search Icon" className="icon" src={SearchIcon}></img>
                    <input onChange={this.updateState}  autoComplete="off" type="search" id="search" placeholder="Search... (ISBN)"></input>
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