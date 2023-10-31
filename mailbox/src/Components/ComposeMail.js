import React, { useEffect, useState } from "react";
import { Button ,Form} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { activateModal, addMail } from "../Store/CreateSlice";
import "./ComposeMail.css"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function ComposeMail() {
    const dispatch = useDispatch()
    const {usermail,activeSentModal} = useSelector(state => state.mailbox) 
    const [maildata, setMaildata] = useState({
        emailAddress: "",
        subject: "",
        body:""
    })
   
    const handleChange = (e) => {
        setMaildata(prev=>({...prev,[e.target.name]:e.target.value}))
    }
    const handlebody = (value) => {
            setMaildata(prev => ({ ...prev, body: value }));
    }
    const sendMail = () => {
        const now = new Date();
        const date = now.toLocaleDateString('en-GB'); 
        const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }); 
        dispatch(addMail({ maildata: maildata, usermail: usermail ,time:time,date:date}))
        dispatch(activateModal(true))
        setMaildata({
            emailAddress: "",
            subject: "",
            body:""
        })
    }
    useEffect(() => {
        const intervalId=setInterval(() => {
            if (activateModal) {
                dispatch(activateModal(false))
            }   
        }, 2000);
        return () => {
            clearInterval(intervalId)
        }
        
    },[])
    return (<div className="ComposeBox">
       {!activeSentModal && <div>
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

                <Form.Group controlId="formBasicSubject">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                        type="text"
                        name="subject"
                        placeholder="Enter subject"
                        value={maildata.subject}
                        onChange={handleChange}
                    />
                </Form.Group>
                    
                <Form.Group controlId="formBasicBody">
                    <Form.Label>Body</Form.Label>
                    <ReactQuill
                        theme="snow"
                        value={maildata.body}
                        onChange={handlebody}
                        style={{height:"200px"}}
                    />
                    
                </Form.Group>
            </Form>
                <Button onClick={sendMail} style={{margin:"50px 0px"}}>Send</Button>
        </div>}
           
            
        {activeSentModal && <div>
            <Button>Mail sent</Button>
        </div>}
       
    </div>)
}