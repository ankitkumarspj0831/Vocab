import React, { Component } from "react";
import "./App.css";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import Home from "./Components/home";
import Add from "./Components/add";
import Navigation from "./Components/Navigation/Navigation";

class App extends Component {
  render() {
    let routes = (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/add" component={Add} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    );
    return (
      <div className="App">
        <Navigation />
        {routes}
      </div>
    );
  }
}

export default App;
