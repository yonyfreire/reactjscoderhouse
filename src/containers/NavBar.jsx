import React, {useState} from 'react';
import { Link } from "react-router-dom";
import CartIcon from "../components/CartIcon/CartIcon";
import Sidebar from "../components/SideBar/SideBar"

export default function NavBar() {
  const [show, setShow] = useState (false);

  const changeShowState = () => {
    setShow(!show)
  }
 

  return (
    <div>
      <div style={{ backgroundColor: "white", height: "3rem", justifyContent: "space-between", display: "flex", alignItems: "center", padding: "1rem", boxShadow: "0px -15px 20px 0px black", position:"fixed", top:"0", width:"100%", zIndex:"100" }}>
        <i onClick={changeShowState} style={{ color: "grey", cursor:"pointer", padding:"1rem"  }} className="fas fa-bars"></i>
        <Link to={"/"} style={{ color: "grey", textDecoration: "none", fontFamily: "Monoton, cursive" }}>E-commerce Yony</Link>
        <CartIcon></CartIcon>
      </div>
      <Sidebar show={show} changeShowState={changeShowState}></Sidebar>
    </div>
  )
}
