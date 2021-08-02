import React from 'react'

export const User = ({client}) => {
    return (
        <div>
            <h2>Details</h2>
            <div className="name">{client.name}</div>
            <div className="email">{client.email}</div>
            <div className="phone">{client.phone}</div>
        </div>
    )
}
