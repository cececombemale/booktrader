
import React, { Component } from 'react';
import '../App.css';
import Search from "../media/search.svg"

export default class Landing extends Component {
    render() {
        return (
            <div id="landing">
                <div>
                    <h1 id="search-title">Welcome</h1>
                    <div className="search-container">
                        <img alt="Search Icon" className="icon" src={Search}></img>
                        <input autoComplete="off" type="search" id="search" placeholder="Search... (ISBN)"></input>
                    </div>
                    <div id="subtext">
                        ( Input the ISBN and we'll find the book for you! )
                    </div>
                </div>
            </div>
        )
    }
}