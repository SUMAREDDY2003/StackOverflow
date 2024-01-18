import React from "react";

import "./users.css";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import UserList from "./UserList";

const Users = ({ slideIn, handleSlideIn }) => {
  return (
    <div className="home-container-1">
      <LeftSidebar slideIn={slideIn} handleSlideIn={handleSlideIn} />
      <div className="home-container-2" style={{ marginTop: "30px" }}>
        <h1 style={{ fontWeight: "400" }}>Users</h1>
        <UserList />
      </div>
    </div>
  );
};

export default Users;