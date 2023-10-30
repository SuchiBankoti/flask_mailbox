import React, { useState } from "react";
import { Button ,Form} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addMail } from "../Store/CreateSlice";
import "./ComposeMail.css"

export default function ComposeMail() {
    const dispatch = useDispatch()
    const {usermail } = useSelector(state => state.mailbox) 
    const [maildata, setMaildata] = useState({
        emailAddress: "",
        subject: "",
        body:""
    })
   
    const handleChange = (e) => {
        setMaildata(prev=>({...prev,[e.target.name]:e.target.value}))
    }
    const sendMail = () => {
        dispatch(addMail({ maildata:maildata,usermail:usermail}))
    }
    return (<div className="ComposeBox">
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>To</Form.Label>
                    <Form.Control
                        type="email"
                        name="emailAddress"
                        placeholder="Enter email"
                        value={maildata.emailAddress}
                            onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                        type="text"
                        name="subject"
                        placeholder="Enter subject"
                        value={maildata.subject}
                        onChange={handleChange}
                    />
                </Form.Group>
                    
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Body</Form.Label>
                    <Form.Control
                        type="text"
                        name="body"
                        placeholder="Enter text"
                        value={maildata.body}
                            onChange={handleChange}
                    />
                </Form.Group>
            </Form>
                <Button onClick={sendMail}>Send</Button>
            
            
       
    </div>)
}