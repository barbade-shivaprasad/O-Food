import React from 'react';
import { useState } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';

export const EditProfile = ( {client} ) => {

  const [user, setUser] = useState({
    name: client.name,
    email: client.email,
    password: client.password,
    phone: client.phone,
    change: "",
  });

  let available;
  let history=useHistory();

  const submitHandler = (e) => {
    e.preventDefault();

    let request = {
      name: document.getElementById("e-name").value,
      email: document.getElementById("e-email").value,
      password: document.getElementById("e-password").value,
      phone: document.getElementById("e-phone").value,
      oldPassword: document.getElementById("e-old-password").value,
      id:client.id,
      change: "1",
    };

    axios
      .post("http://3.211.227.96:5000/editprofile", request)
      .then((res) => {
        available = res.data.message;
        document.getElementById("a").innerHTML = available;
        if (available !== "") {
          document.getElementById("e-old-password").focus();
        } else{
          let profile1 = {};
          delete request['change'];
          delete request['password'];
          delete request['oldPassword'];
          profile1.profile=request;
          localStorage.setItem("data",JSON.stringify(profile1));
          history.push("/user");
          window.location.reload();
        };
      })
      .catch((err) => {
        console.log("err", err);
      });
  };


  const change = (e) => {
    setUser({ ...user, email: e.target.value });
    let request = {
      email: document.getElementById("e-email").value,
      id: client.id,
      change: "0",
    };

    axios
      .post("http://3.211.227.96:5000/signup", request)
      .then((res) => {
        available = res.data.message;
        document.getElementById("a").innerHTML = available;
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  let val = 0
  const editPassword=(e)=>{

    if(val!=0)
    {
      val=0;
      document.querySelector(".editPasswords").style.display="none";
    }
    else{
      val=1;
      document.querySelector(".editPasswords").style.display="block";
    }
  }

  return (
    <form  className="editForm" onSubmit={submitHandler}>
    <input type="text" name="name" id="e-name" onChange={e=>{setUser({ ...user, name: e.target.value });}} value={user.name} required/>
        <input
          type="email"
          name="email"
          id="e-email"
          value={user.email}
    
          onChange={change}
          required
        />
        {/* onChange ={change} value = {user.email} */}
        <div id="a"></div>
         <span className="checkbox"><input type="checkbox" onChange={editPassword}/>Check the box to edit password</span>
        <div className="editPasswords" style={{display:"none"}}>
        <input
          type="text"
          name="password"
          id="e-old-password"
          placeholder="Enter Old passsword"
          onChange={e=>{document.getElementById("a").innerHTML=""}}
        />
        <input
          type="text"
          name="password"
          id="e-password"
          placeholder="Enter new password"
        /></div>
        <input
          type="tel"
          id="e-phone"
          name="phone"
          pattern="[6-9]{1}[0-9]{9}"
          onChange={e=>{setUser({ ...user, phone: e.target.value });}}
          required
          value={user.phone}
        />
        <button className="btn-edit" type="submit" >
          Edit
        </button>
        
    </form>
  )
}
