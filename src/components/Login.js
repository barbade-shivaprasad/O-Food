import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = ({ user }) => {
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
      .post("https://backendfoo.herokuapp.com/login", request)
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
    <form onSubmit={submitHandler}>
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
      <div id="a"></div>
      <button className="btn" type="submit">
        Login
      </button>
    </form>
  );
};

export default Login;
