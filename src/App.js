import "./App.css";
import React from "react";
import { Signup } from "./components/Signup";
import Login from "./components/Login";
import { Intro } from "./components/Intro";
import { User } from "./components/User";
import { SignSuccess } from "./components/SignSuccess";
// const fs = require('fs');
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useState } from "react";

function App() {
  const [client, setClient] = useState({ name: "", email: "", phone: "" });

  const user = (details) => {
    setClient({
      ...client,
      name: details.name,
      email: details.email,
      phone: details.phone,
    });
  };
  // let m = fs.readFileSync('details.json','utf-8');
  // console.log(m);
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Intro />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login user={user} />
          </Route>
          <Route path="/user">
            <User client={client} />
          </Route>
          <Route path="/success">
            <SignSuccess />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
