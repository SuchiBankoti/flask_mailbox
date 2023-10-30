import React from "react";
import "./Mail.css"
import { useDispatch, useSelector } from "react-redux";
import { activateInboxId, activateSentboxId, updateMail } from "../Store/CreateSlice";
import { FaCircle, FaDumpster, FaStar } from "react-icons/fa";


export default function Mail(props) {
  const { sender, body, subject, id, read, star, receiver } = props.mail
  const{usermail}=useSelector(state=>state.mailbox)
  const dispatch = useDispatch()

  
  function update_star_status() {
    dispatch(updateMail({
      id: id,
      usermail:usermail,
      star:!star[usermail]
    }))
  }
  function delete_mail() {
    dispatch(updateMail({
      id: id,
      usermail:usermail,
      deleted:true
    }))
}

  function open_mail() {
    if (!props.sent) {
      dispatch(activateInboxId(id))
    } else {
      dispatch(activateSentboxId(id))
    }
    if (!read && !props.sent) {
      dispatch(updateMail({
        id: id,
        read: true,
      }))
    }
  }
  
    return (
      <div
        style={{ background:"pink"}}>
        <div className="mail-bar">
          <FaDumpster onClick={delete_mail}/>
          <FaCircle style={{visibility:read?"hidden":"visible", color:'skyblue',display:props.sent?"none":"block"}}/>
          <FaStar style={{color:star[usermail]?"yellow":"grey"}} onClick={update_star_status}/>
          <div>{props.sent?receiver:sender}</div>
        
                        <div onClick={open_mail} >
                        {subject}
                        </div>
        </div>
       
      </div>
    )
}