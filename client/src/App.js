import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from "./component/home.component"
import Add from "./component/add.component"
import Landing from "./component/landing.component"
import Login from "./component/login.component"
import Register from "./component/register.component"
import Search from "./component/search.component"
import Profile from "./component/profile.component"

import Logo from "./media/logo.svg"

function App() {
  
  return (
    <div className="App">
      <Router>
        <div id="navbar">
          <div>
            <Link to="/">
              <img id="logo" alt="logo" src={Logo}></img>
            </Link>
          </div>
          <Link to="/">
            <h1 id="title">
              BOOK
            </h1>
          </Link>
          <div id="grower">

          </div>
          <div className="navitem">
            <Link to="search">
              Search
              </Link>
          </div>
          <div className="navitem" id="navProfile">
            <Link to="profile">
              My Profile
              </Link>
          </div>
          <div className="navitem" id="navLogin">
            <Link to="login">
              Login/Register
              </Link>
          </div>
          <div className="navitem" id="navLogout">
            <Link to="/" onClick={ () => localStorage.removeItem("token")}>
              Logout
              </Link>
          </div>


        </div>
        <div id="content">
{/* Change to private Route after setting */}
          <Route exact path="/">
            <Landing />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/add">
            <Add />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/search">
            <Search />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>

        </div>
      </Router>
    </div>
  );
}

export default App;
