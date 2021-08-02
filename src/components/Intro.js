import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export const Intro = () => {
    return (
        <>
        <header>
            <title>Zomato</title>
        </header>
        <div>
            <button id = "signup" ><Link to = "/signup">Sign Up</Link></button>
            <button id = "login"><Link to = "/login">Login</Link></button>
        </div>
        </>
    )
}
