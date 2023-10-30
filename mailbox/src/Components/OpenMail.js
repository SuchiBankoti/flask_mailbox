import React from "react";
import "./Mail.css"
import { useDispatch, useSelector } from "react-redux";
import { activateInboxId, activateSentboxId, updateMail } from "../Store/CreateSlice";
import { FaStar } from "react-icons/fa";


export default function OpenMail(props) {
  const{usermail,allMail,activeInboxId,activeSentboxId}=useSelector(state=>state.mailbox)
    const dispatch = useDispatch()
    const open_mail=props.isInbox?allMail.find(mail=>mail.id===activeInboxId):allMail.find(mail=>mail.id===activeSentboxId)
  const { sender, body, subject, id, read, star, receiver } =open_mail
    
  
  function update_star_status() {
    if (receiver === usermail) {
    dispatch(updateMail({
      id:id,
      maildata: open_mail,
      read:read,
      deleted: false,
      star:!star
    }))
  }

  }
  function close_mail() {
    dispatch(activateInboxId(null))
    dispatch(activateSentboxId(null))
  }
  return (
      <div>
      <button onClick={close_mail}>Back</button>
      <div>
                    <div>
          <FaStar style={{ color: star ? "yellow" : "grey" }} onClick={update_star_status}/>
          <div>{usermail!==receiver?receiver:sender}</div>
                        <div>
                        {subject}
                        </div>
        </div>
        <div>
          {body}
          
        </div>
            </div>
      </div>
    )
}