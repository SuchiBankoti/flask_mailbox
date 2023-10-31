import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authMailLogin } from "../Store/CreateSlice";


export default function Login(props) {
    const [formdata, setFormdata] = useState({
        email: "",
        password: "",
    })
    const [err,setErr]=useState("")
    const dispatch = useDispatch()
    const navigate=useNavigate()
    function handleChange(e) {
        setFormdata(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    

    const user_login = () => {
        dispatch(authMailLogin(formdata))
            .then((res) => {
                if (res.payload.email) {
                    navigate("/welcome");
                } else {
                    setErr(res.payload.message)
                    
                }
            })
            .catch((error) => {
                console.error("Login error:", error);
            });
    }

    return (
        <div>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" value={formdata.email} onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" value={formdata.password} onChange={handleChange} />
                </Form.Group>
            </Form>
            <div style={{ color: "red" }}>{err}</div>
                <Button variant="primary"
                    onClick={user_login}
                >
                    Login
                </Button>

            <div onClick={props.handleLogin}>New here?<span>SignUp</span></div>
        </div>
    )
}
