
import React, { Component } from 'react';
import { Link } from "react-router-dom";


export default class Profile extends Component {
    render() {
        return (
            <div id="landing" className="profileLanding">
                <div id="profilePadder">
                    <div id="profile">
                        <div>
                            <h1 id="profileWelcome"> Welcome, Rohit!</h1>
                            <div></div>
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

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}