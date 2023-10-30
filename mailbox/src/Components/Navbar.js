import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Navbar.css";
import {FaUser} from "react-icons/fa"
import { getUsermail } from "../Store/CreateSlice";



export default function Navbar() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUsermail())
    },[])
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