import React from "react";
import { Activity } from "./Activity";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { Main } from "./Main";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Restaurents } from "./Restaurents";
import { v4 as uuid } from "uuid";
import ham1 from "../resources/ham.png";
import cross from "../resources/cross.png";
import box from "../resources/box.png";
import back from "../resources/back.png";

export const User = ({ client }) => {
  let totalCost = 0;
  const [profiles, setprofiles] = useState({
    prof: "",
    hist: "",
    main: "1",
    res: "",
    bag: "0",
  });
  const [fooddata, setfooddata] = useState({ fd: [], fName: "" });
  const [addToBag, setaddToBag] = useState({ bag: [] });

  let BData = JSON.parse(localStorage.getItem("bData"));
  if (localStorage.getItem("bData") !== null) {
    BData.bag.forEach((element) => {
      totalCost = totalCost + element.netamount;
    });
  }
  const addBag = (bData) => {
    let temp = addToBag.bag;
    bData["key"] = uuid();
    temp.unshift(bData);
    setaddToBag({ ...addToBag, bag: temp });
    if (BData !== null) {
      BData.bag.unshift(bData);
      localStorage.setItem("bData", JSON.stringify(BData));
    } else localStorage.setItem("bData", JSON.stringify(addToBag));
  };

  const deleteBagItem = (key) => {
    let t = [];
    console.log(key);
    BData.bag.forEach((element) => {
      if (element.key !== key) {
        t.push(element);
      }
    });
    // console.log(t);
    setaddToBag({ ...addToBag, bag: t });
    let k = { bag: t };
    localStorage.setItem("bData", JSON.stringify(k));
  };
  let food = {};
  const logout = () => {
    localStorage.clear();
    history.push("/");
    window.location.reload();
  };
  const history = useHistory();
  let mydata = localStorage.getItem("data");
  if (mydata === null && client.profile === "") {
    history.push("/login");
  } else {
    if (client.profile !== "") {
      localStorage.clear();
      localStorage.setItem("data", JSON.stringify(client));
    }
    mydata = JSON.parse(localStorage.getItem("data"));
  }
  const ham = (e) => {
    let m = profiles.main;
    if (m !== "1") m = "1";
    else m = "0";
    setprofiles({
      ...profiles,
      prof: "",
      hist: "",
      main: m,
      res: "",
      bag: "0",
    });

    //for design
    if (m !== "1") {
      document.querySelector(".ham").style.width = "70vw";
      document.querySelector(".container-user").style.backgroundColor =
        "rgb(124, 119, 119)";
      document.querySelector(".panel").style.opacity = "0";
      document.querySelector(".panel").style.display = "none";
      document.querySelector(".ham-btn").src = cross;
    } else {
      document.querySelector(".ham-btn").src = ham1;
      document.querySelector(".ham").style.width = "0vw";
      document.querySelector(".container-user").style.backgroundColor = "white";
      setTimeout(() => {
        document.querySelector(".panel").style.opacity = "1";
        document.querySelector(".panel").style.display = "block";
      }, 500);
    }
  };

  const main = () => {
    let request = {};
    axios
      .post("https://backendfoo.herokuapp.com/main", request)
      .then((res) => {
        let foods = res.data.message;
        localStorage.setItem("food", JSON.stringify(foods));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  main();
  if (localStorage.getItem("food") !== null) {
    food = JSON.parse(localStorage.getItem("food"));
  } else {
    console.log("Loading...");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  const fooddetails = (details, foodName) => {
    setfooddata({ ...fooddata, fd: details, fName: foodName });
  };

  return (
    <div className="container-user">
      <Router>
        {localStorage.getItem("food") !== null ? (
          <>
            <header>
              <img src={ham1} className="ham-btn" onClick={ham} />
              <div className="title">My App</div>
              {profiles.main === "1" &&
              localStorage.getItem("food") !== null &&
              profiles.bag !== "1" ? (
                <>
                  <img
                    src={box}
                    className="bag-btn"
                    onClick={(e) => {
                      setprofiles({
                        prof: "",
                        hist: "",
                        main: "1",
                        res: "",
                        bag: "1",
                      });
                      document.querySelector(".panel").style.opacity = "0";
                      document.querySelector(".panel").style.display = "none";
                    }}
                  />
                  <div className="bagCount">
                    {localStorage.getItem("bData") !== null
                      ? BData.bag.length !== 0
                        ? BData.bag.length
                        : ""
                      : ""}
                  </div>
                </>
              ) : (
                ""
              )}
              {profiles.main === "1" &&
              localStorage.getItem("food") !== null &&
              profiles.bag === "1" ? (
                <>
                  {" "}
                  <img
                    src={back}
                    className="bag-btn"
                    onClick={(e) => {
                      setprofiles({
                        prof: "",
                        hist: "",
                        main: "1",
                        res: "",
                        bag: "0",
                      });
                      document.querySelector(".panel").style.opacity = "1";
                      document.querySelector(".panel").style.display = "block";
                    }}
                  />
                </>
              ) : (
                ""
              )}
            </header>
            <div className="ham">
              <ul className="ham-ele-container">
                <li>
                  <div
                    id="user-profile"
                    className="ham-ele"
                    onClick={(e) => {
                      let m = profiles.prof;
                      if (m !== "1") m = "1";
                      else m = "0";
                      setprofiles({
                        ...profiles,
                        prof: m,
                        hist: "",
                        main: "0",
                        res: "",
                        bag: "0",
                      });
                      if (m !== "1") {
                        document.querySelector(".profile").style.height =
                          "0rem";
                        document.querySelector(".profile").style.opacity = "0";
                      } else {
                        document.querySelector(".profile").style.height =
                          "max-content";
                        document.querySelector(".profile").style.opacity = "1";
                      }
                    }}
                  >
                    profile
                  </div>
                </li>
                <Activity
                  profile={
                    mydata != null
                      ? mydata.profile
                      : console.log(client.profile)
                  }
                />
                <li>
                  <div id="user-history" className="ham-ele">
                    history
                  </div>
                </li>
                <button className="btn-logout" onClick={logout}>
                  logut
                </button>
              </ul>
            </div>
          </>
        ) : (
          ""
        )}

        <div className="panel">
          <Switch>
            <Route exact path="/user">
              <div className="food-container">
                {profiles.main === "1" && localStorage.getItem("food") !== null
                  ? food.items.map((item) => {
                      return <Main item={item} fooddetails={fooddetails} />;
                    })
                  : ""}
              </div>
            </Route>
            <Route exact path="/user/food">
              <div>
                <Restaurents data={fooddata} addBag={addBag} />
              </div>
            </Route>
          </Switch>
        </div>
        {profiles.bag === "1" && localStorage.getItem("bData") !== null ? (
          <>
            <div id="bag">
              {BData.bag.map((item) => {
                return (
                  <>
                    <div className="bag-item">
                      <div className="b-item-child">
                        <div className="ref-res">Name of the Restaurent</div>
                        <div className="bag-food">{item.name}</div>
                      </div>
                      <div className="b-item-child">
                        <div className="ref-food-name">Item</div>
                        <div className="bag-food">{item.foodname}</div>
                      </div>
                      <div className="b-item-child">
                        <div className="ref-price">Price per plate</div>
                        <div className="bag-food">Rs.{item.price}/-</div>
                      </div>
                      <div className="b-item-child">
                        <div className="ref-qty">Quantity</div>
                        <div className="bag-food">{item.qty}</div>
                      </div>
                      <div className="b-item-child">
                        <div className="ref-netamount">Net amount</div>
                        <div className="bag-food">Rs.{item.netamount}/-</div>
                      </div>
                      <div>
                        <button
                          onClick={(e) => {
                            deleteBagItem(item.key);
                          }}
                          className="btn-deleteBagItem"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
            <div className="proceedToOrder">
              <div id="totalCost">Total Amount : {totalCost}</div>
              <button className="btn-proceed">proceed</button>
            </div>
          </>
        ) : (
          ""
        )}
      </Router>
    </div>
  );
};
