import "./App.css";
import React from "react";
import { Signup } from "./components/Signup";
import Login from "./components/Login";
import { Intro } from "./components/Intro";
import { User } from "./components/User";
import Admin from "./components/Admin";
import { Restaurents } from "./components/Restaurents";
// const fs = require('fs');
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useState } from "react";

function App() {
  const [client, setClient] = useState({ profile: "", selectFoodItem: [] });

  const user = (details) => {
    setClient({
      ...client,
      profile: details,
    });
  };

  const foodItem = (items) => {
    setClient({
      ...client,
      profile: items,
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
            <Signup user={user} />
          </Route>
          <Route path="/login">
            <Login user={user} />
          </Route>
          <Route path="/admin">
            <Admin user={user} />
          </Route>
          <Route path="/user">
            <User client={client} />
          </Route>

          {/* <Route exact path="/food">
                    <Restaurents />
                </Route> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
