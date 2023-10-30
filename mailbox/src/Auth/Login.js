import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { authMailLogin } from "../Store/CreateSlice";


export default function Login(props) {
    const [formdata, setFormdata] = useState({
        email: "",
        password: "",
    })
    const dispatch=useDispatch()
    function handleChange(e) {
        setFormdata(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const user_login = () => {
       dispatch(authMailLogin(formdata))
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

            <Link to="/welcome">
                <Button variant="primary"
                    onClick={user_login}
                    disabled={!formdata.email || !formdata.password}
                >
                    Login
                </Button>
            </Link>

            <div onClick={props.handleLogin}>New here?<span>SignUp</span></div>
        </div>
    )
}
