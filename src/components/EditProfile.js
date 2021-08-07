import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import "./signup.css"

export const Signup = (props) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    change: "",
  });

  let available;

  const history = useHistory();

  const navigate = () => {
    history.push("/success");
  };
  const submitHandler = (e) => {
    e.preventDefault();

    let request = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      phone: document.getElementById("phone").value,
      change: "1",
    };

    axios
      .post("http://192.168.0.4:5000/edit-profile", request)
      .then((res) => {
        available = res.data.message;
        document.getElementById("a").innerHTML = available;

        if (available !== "") {
          document.getElementById("email").focus();
        } else navigate();
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const change = (e) => {
    setUser({ ...user, email: e.target.value });

    let request = {
      email: document.getElementById("email").value,
      change: "0",
    };

    axios
      .post("http://192.168.0.4:5000/edit-profile", request)
      .then((res) => {
        available = res.data.message;
        document.getElementById("a").innerHTML = available;
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <div className = "container-signup">
      <form onSubmit={submitHandler} className = "form-signup">
        <input type="text" name="name" id="name" placeholder="name" required/>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          onChange={change}
          value={user.email}
          required
        />
        {/* onChange ={change} value = {user.email} */}
        <div id="a"></div>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter password"
          required
        />
        <input
          type="tel"
          id="phone"
          name="phone"
          pattern="[6-9]{1}[0-9]{9}"
          placeholder="Enter your phone number"
          required
        />
        <button className="btn-signup" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
