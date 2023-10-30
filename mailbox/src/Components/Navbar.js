import React from "react";
import { useSelector } from "react-redux";
import "./Navbar.css";
import {FaUser} from "react-icons/fa"



export default function Navbar() {
    const{usermail}=useSelector(state=>state.mailbox)
    return (
        <div className="Navbar">
            <div className="Navbar-title">
                MailBox
            </div>
            <div className="Navbar-profile-container">
                <FaUser/>
            <div className="Navbar-mail">{usermail}</div>
            </div>
        </div>
    )
}