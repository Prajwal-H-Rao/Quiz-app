import React from "react";
import "../css/navbar.css";
import { Link, useNavigate } from "react-router-dom";
// import Admin from "../pages/Admin";
function Navbar(props) {
  const nav = useNavigate()
    return (
    <nav id="navbar">
      <img
        src="https://cdn3.iconfinder.com/data/icons/letters-and-numbers-1/32/letter_Q_blue-512.png"
        alt="logo"
      />
      <ul className="navbarOptions">
        <li id="Home">
          <Link to="/admin_verified" >Home</Link>  
        </li>
        <li id="upload">
          <Link to="/upload">Upload</Link>
        </li>
        <li onClick={()=>{props.setIsAuth(false);nav("/admin")}} id="logout">
        <Link id="logout">Logout</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
