import React, { useState } from "react";
import SignUp from "./SignUp";
import Login from "./Login";

export default function AuthUser() {
    const [loginPage, setLoginPage] = useState(false)
    const handleLogin=()=>{
         setLoginPage(prev=>!prev)
    }
    return(
    <div>
            {
                loginPage ? <Login handleLogin={handleLogin}/>:<SignUp handleLogin={handleLogin}/>
        }
        </div>
        )
}