import "./intro.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link,useHistory } from "react-router-dom";

export const Intro = () => {
  
  let history = useHistory();
  if(localStorage.getItem("data")!==null)
  history.push("/user")
  return (
    <>
      <div className="container">
        <div className="btns">
          <Link to="/signup" >
            <button id="signup" className="btn-intro">Sign Up</button>
          </Link>
          <Link to="/login">
            <button id="login" className = "btn-intro">Login</button>
          </Link>
        </div>
      </div>
    </>
  );
};
