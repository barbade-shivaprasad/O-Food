import React from 'react'
import { Link } from 'react-router-dom'

export const SignSuccess = () => {
    return (
        <div>
            <h2>Successfully Signed Up</h2>
            <Link to = "/login"><button>Login</button></Link>
        </div>
    )
}
