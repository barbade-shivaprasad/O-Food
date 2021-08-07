import React from "react";
import { Link } from "react-router-dom";


export const Activity = ({ profile }) => {
  return (
    <div className="profile">
      <div className="profile-item">{profile.name}</div>
      <div className="profile-item">{profile.email}</div>
      <div className="profile-item">{profile.phone}</div>
      <Link to="/profile/edit"><button className="edit-profile">edit</button></Link>
      
    </div>
  );
};
