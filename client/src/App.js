import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import './App.css';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          </div>
          </Router>
    );
  }
}

export default App;
