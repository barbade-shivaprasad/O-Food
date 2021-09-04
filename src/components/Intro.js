import "./intro.css";
import React from "react";
import {useState} from 'react';
import axios from "axios";
import {  Link,Redirect} from "react-router-dom";

export const Intro = () => {
  
  const [authenticated, setauthenticated] = useState("")
  
  React.useEffect(() => {
    const transport = axios.create({
      withCredentials: true
    })
     transport
     .post("http://44.195.186.205:5000/authenticate")
     .then((res)=>{
       if(res.data === "authenticated")
       setauthenticated("authenticated")
     })
     .catch((err)=>{
       console.log(err);
     })
    }, []);

    if(authenticated === "authenticated")
    return <Redirect to="user"/>
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
