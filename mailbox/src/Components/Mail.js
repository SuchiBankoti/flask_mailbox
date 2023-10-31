import React from "react";
import "./Mail.css"
import { useDispatch, useSelector } from "react-redux";
import { activateDeletedId, activateInboxId, activateSentboxId, activateStarredId, updateMail } from "../Store/CreateSlice";
import { FaCircle, FaDumpster, FaStar } from "react-icons/fa";
import {BiSolidRightArrow} from "react-icons/bi"
import { Badge } from "react-bootstrap";


export default function Mail(props) {
  const { sender, body, subject, id, read, star, receiver,date,time } = props.mail
  
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

  
  
  return (
    <>
      {props.inbox &&
        <div
        style={{ background:read?"#f3f3f3":"#B6D0E2"}}>
          <div className="mail-bar">
            <p><span>{date}</span><span> </span><span>{time}</span></p>
          <FaDumpster onClick={delete_mail}/>
            <FaCircle style={{ visibility: read ? "hidden" : "visible", color: '#0096FF' }} />
          <FaStar style={{color:star[usermail]?"yellow":"grey"}} onClick={update_star_status}/>
            <div className="mail-tag">
              <BiSolidRightArrow /><Badge bg="info" text="white">{sender}</Badge>
            </div>
        
            <div onClick={() => {
               dispatch(updateMail({
                id: id,
                read: true,
               }))
              dispatch(activateInboxId(id))
                        }} >
                        {subject}
                        </div>
        </div>
       
      </div>
    

      }{
       props.sent && 
           <div
        style={{ background:"#f3f3f3"}}>
            <div className="mail-bar">
            <p><span>{date}</span><span> </span><span>{time}</span></p>
          <FaDumpster onClick={delete_mail}/>
            <FaCircle style={{ visibility:"hidden", color: '#0096FF' }} />
          <FaStar style={{color:star[usermail]?"yellow":"grey"}} onClick={update_star_status}/>
              <div  className="mail-tag">
                <div style={{display:"flex"}}>
                <BiSolidRightArrow /><div>Me</div>
                </div>
                <div>
                to
                <Badge bg="info" text="white">{receiver}</Badge></div>
                </div>
              <div onClick={() => {
                dispatch(activateSentboxId(id))
                        }} >
                        {subject}
                        </div>
        </div>
       
      </div>
         
      }{
        props.starred &&  <div
        style={{ background:read || usermail===sender?"#f3f3f3":"#B6D0E2"}}>
          <div className="mail-bar">
          <p><span>{date}</span><span> </span><span>{time}</span></p>
          <FaDumpster onClick={delete_mail}/>
            <FaCircle style={{ visibility: read || usermail===sender ? "hidden" : "visible", color: '#0096FF' }} />
          <FaStar style={{color:star[usermail]?"yellow":"grey"}} onClick={update_star_status}/>
            <div className="mail-tag">
             
              {usermail === sender ?
                <div>
                  <div style={{ display: "flex" }}>
                   <BiSolidRightArrow />
                  <div>Me</div>
                    </div>
                  <div>to<Badge bg="info" text="white">{receiver}</Badge></div>
                </div>
                :  <div style={{ display: "flex" }}>  <BiSolidRightArrow /> <Badge bg="info" text="white">{sender}</Badge></div>}
            </div>
            <div onClick={() => {
              if (!read && usermail !== sender) {
                dispatch(updateMail({
                  id: id,
                  read: true,
                }))
              }
              dispatch(activateStarredId(id))
                        }} >
                        {subject}
                        </div>
        </div>
       
      </div>
      }{
        props.deleted && <div
        style={{ background:read || usermail===sender?"#f3f3f3":"#B6D0E2"}}>
          <div className="mail-bar">
          <p><span>{date}</span><span> </span><span>{time}</span></p>
          <FaDumpster style={{visibility:"hidden"}}/>
            <FaCircle style={{ visibility: read || usermail===sender ? "hidden" : "visible", color: '#0096FF' }} />
            <FaStar style={{ visibility: "hidden" }} />
            <div className="mail-tag">
              {usermail === sender ?
                <div>
                  <div style={{ display: "flex" }}>
                   <BiSolidRightArrow />
                  <div>Me</div>
                    </div>
                  <div>to<Badge bg="info" text="white">{receiver}</Badge></div>
                </div>
                :  <div style={{ display: "flex" }}>  <BiSolidRightArrow /> <Badge bg="info" text="white">{sender}</Badge></div>}
            </div>
        
            <div onClick={() => {
               if (!read && usermail !== sender) {
                dispatch(updateMail({
                  id: id,
                  read: true,
                }))
              }
              dispatch(activateDeletedId(id))
                        }} >
                        {subject}
                        </div>
        </div>
       
      </div>
      }
      {/* <div
        style={{ background:read?"#f3f3f3":"#B6D0E2"}}>
        <div className="mail-bar">
          <FaDumpster onClick={delete_mail}/>
          <FaCircle style={{visibility:read?"hidden":"visible", color:'#0096FF',display:props.sent?"none":"block"}}/>
          <FaStar style={{color:star[usermail]?"yellow":"grey"}} onClick={update_star_status}/>
          <div><b>{props.sent?receiver:sender}</b></div>
        
                        <div onClick={open_mail} >
                        {subject}
                        </div>
        </div>
       
      </div> */}
      </>
    )
}