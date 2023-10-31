import React from "react";
import "./Mail.css";
import { useDispatch, useSelector } from "react-redux";
import { activateDeletedId, activateInboxId, activateSentboxId, activateStarredId, updateMail } from "../Store/CreateSlice";
import { FaStar, FaDumpster, FaArrowLeft } from "react-icons/fa";
import {BiSolidRightArrow} from "react-icons/bi"
import "./OpenMail.css"
import { Badge } from "react-bootstrap";


export default function OpenMail(props) {
  const { usermail, allMail,activeSentboxId, activeStarredId, activeInboxId, activeDeletedId } = useSelector((state) => state.mailbox);
  const dispatch = useDispatch();

  function getOpenMail() {
    let activeId;
    if (props.isInbox) {
      activeId = activeInboxId;
    } else if (props.isSent) {
      activeId = activeSentboxId;
    } else if (props.isStarred) {
      activeId = activeStarredId;
    } else if (props.isDeleted) {
      activeId = activeDeletedId;
    }
    return allMail.find((mail) => mail.id === activeId);
  }

  const open_mail = getOpenMail();
  const { sender, body, subject, id, star, receiver,date,time } = open_mail;

  function update_star_status() {
    dispatch(
      updateMail({
        id: id,
        usermail: usermail,
        star: !star[usermail],
      })
    );
  }

  function delete_mail() {
    dispatch(
      updateMail({
        id: id,
        usermail: usermail,
        deleted: true,
      })
    );
  }

  return (
    <div>
      {props.isInbox && <>
        <div className="mail-body">
          <div className="mail-body-top-bar">
            <div className="mail-body-subject-title">
            <button onClick={() => dispatch(activateInboxId(null))}><FaArrowLeft/></button>
              <Badge bg="secondary" text="white">{subject}</Badge></div>
          </div>
          <div className="mail-body-info-bar">
            <div>
                <div>
                     <BiSolidRightArrow /> {usermail === sender ? <div>Me</div> : <Badge bg="info" text="white">{sender}</Badge>}
                </div>
                <div>
                    to{usermail === receiver ? <div>Me</div> : <Badge bg="info" text="white">{receiver}</Badge>}
                </div>
            </div>
           
          <div className="tabs">
            <FaStar style={{ color: star[usermail] ? "yellow" : "grey" }} onClick={update_star_status} />
              <FaDumpster onClick={() => {
                delete_mail()
                dispatch(activateInboxId(null))
              }} />
            </div>
            <div>
            <p><span>{date}</span><span> </span><span>{time}</span></p>
            </div>
          </div>
          <div className="mail-body-text"  dangerouslySetInnerHTML={{ __html:body }}>
            {/* {body} */}
          </div>       
      </div>
      </>
      }
      {props.isSent &&
        <>
       
        <div className="mail-body">
          <div className="mail-body-top-bar">
            <div className="mail-body-subject-title">
            <button onClick={() => dispatch(activateSentboxId(null))}><FaArrowLeft/></button>
              <Badge bg="secondary" text="white">{subject}</Badge>
          </div>
          </div>
          <div className="mail-body-info-bar">
            <div>
                <div>
                     <BiSolidRightArrow /> {usermail === sender ? <div>Me</div> : <Badge bg="info" text="white">{sender}</Badge>}
                </div>
                <div>
                    to{usermail === receiver ? <div>Me</div> : <Badge bg="info" text="white">{receiver}</Badge>}
                </div>
            </div>
            
          <div className="tabs">
            <FaStar style={{ color: star[usermail] ? "yellow" : "grey" }} onClick={update_star_status} />
              <FaDumpster onClick={() => {
                delete_mail()
                dispatch(activateInboxId(null))
              }} />
            </div>
            <div>
            <p><span>{date}</span><span> </span><span>{time}</span></p>
            </div>
          </div>
          <div className="mail-body-text"  dangerouslySetInnerHTML={{ __html:body }}>
            {/* {body} */}
          </div>        
      </div>
        </>
      }
      {props.isStarred && <>
       
        <div className="mail-body">
          <div className="mail-body-top-bar">
            <div className="mail-body-subject-title">
            <button onClick={() => dispatch(activateStarredId(null))}><FaArrowLeft/></button>
              <Badge bg="secondary" text="white">{subject}</Badge>
          </div>
          </div>
          <div className="mail-body-info-bar">
            <div>
                <div>
                     <BiSolidRightArrow /> {usermail === sender ? <div>Me</div> : <Badge bg="info" text="white">{sender}</Badge>}
                </div>
                <div>
                    to{usermail === receiver ? <div>Me</div> : <Badge bg="info" text="white">{receiver}</Badge>}
                </div>
            </div>
            
          <div className="tabs">
            <FaStar style={{ color: star[usermail] ? "yellow" : "grey" }} onClick={update_star_status} />
              <FaDumpster onClick={() => {
                delete_mail()
                dispatch(activateInboxId(null))
              }} />
            </div>
            <div>
            <p><span>{date}</span><span> </span><span>{time}</span></p>
            </div>
          </div>
          <div className="mail-body-text"  dangerouslySetInnerHTML={{ __html:body }}>
            {/* {body} */}
          </div>       
      </div>
      </>
      }
      {props.isDeleted &&
        <>
      
        <div className="mail-body">
          <div className="mail-body-top-bar">
            <div className="mail-body-subject-title">
            <button onClick={() => dispatch(activateDeletedId(null))}><FaArrowLeft/></button>
              <Badge bg="secondary" text="white">{subject}</Badge>
          </div>
          </div>
          <div className="mail-body-info-bar">
            <div>
                <div>
                     <BiSolidRightArrow /> {usermail === sender ? <div>Me</div> : <Badge bg="info" text="white">{sender}</Badge>}
                </div>
                <div>
                    to{usermail === receiver ? <div>Me</div> : <Badge bg="info" text="white">{receiver}</Badge>}
                </div>
            </div>
            <div>
            <p><span>{date}</span><span> </span><span>{time}</span></p>
            </div>
          {/* <div className="tabs">
            <FaStar style={{ color: star[usermail] ? "yellow" : "grey" }} onClick={update_star_status} />
              <FaDumpster onClick={() => {
                delete_mail()
                dispatch(activateInboxId(null))
              }} />
           </div> */}
          </div>
          <div className="mail-body-text"  dangerouslySetInnerHTML={{ __html:body }}>
            {/* {body} */}
          </div>         
      </div>
        </>
      }
            
    </div>
  );
}
