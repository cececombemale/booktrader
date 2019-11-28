
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import SearchIcon from "../media/search.svg"
export default class Search extends Component {
    render() {
        return (
            <div id="search-background">
                <div className="search-container" id="mainsearch">
                    <img className="icon" src={SearchIcon}></img>
                    <input autoComplete="off" type="search" id="search" placeholder="Search... (ISBN)"></input>
                </div>
                <div id="searchBody">
                    <div id="bookItem">
                        <div>
                            <div>
                                <div id="bookTitle">
                                    Basic Quantum Mechanics <span id="statusNew">NEW!</span>
                                </div>
                                <div>
                                    Author: <span> Kyriakos Tamvakis</span>
                                </div>
                                <div>New York, NY 10003</div>
                            </div>

                            <div id="grower"></div>

                            <div id="grower"></div>
                            <div id="right">
                                ISBN:
                                <span>
                                    3030227766
                                </span>
                                <div>
                                    Value: $40
                                </div>
                            </div>
                        </div>

                    </div>
                    <div id="bookItem">
                        <div>
                            <div>
                                <div id="bookTitle">
                                    Basic Quantum Mechanics <span id="statusNew">NEW!</span>
                                </div>
                                <div>
                                    Author: <span> Kyriakos Tamvakis</span>
                                </div>
                                <div>New York, NY 10003</div>
                            </div>

                            <div id="grower"></div>

                            <div id="grower"></div>
                            <div id="right">
                                ISBN:
                                <span>
                                    3030227766
                                </span>
                                <div>
                                    Value: $40
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}