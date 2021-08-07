import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./login.css";

const Admin = ({ user }) => {
  let available;

  const history = useHistory();

  const navigate = () => {
    history.push("/user");
  };

  const submitHandler = (e) => {
    e.preventDefault();

    let request = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };

    axios
      .post("http://192.168.0.4:5000/admin", request)
      .then((res) => {
        available = res.data.message;
        document.getElementById("a").innerHTML = available;

        if (available === "") {
          user(res.data.info);
          navigate();
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const change = (e) => {
    document.getElementById("a").innerHTML = "";
  };
  return (
    <div className="container-login">
    <form onSubmit={submitHandler} className="form-login">
      <div id="a"></div>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Enter your email"
        onChange={change}
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Enter password"
        onChange={change}
      />
      <button className="btn-login" type="submit">
        Login
      </button>
    </form>
      
    </div>
  );
};

export default Admin;
