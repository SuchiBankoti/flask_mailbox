import React from "react";
import { useSelector } from "react-redux";
import { nanoid } from "@ant-design/pro-components";
import Mail from "./Mail";
import { Accordion } from "react-bootstrap";

export default function Starred() {
    const { allMail, usermail } = useSelector(state => state.mailbox)
    return (
        <Accordion>
             {allMail.filter(mail =>mail.star[usermail] && !mail.deleted[usermail]).map((mail,i) => {
                 return (
                     <Mail key={nanoid()} i={i} mail={mail} starred={true} />
                     
                    )
                })}
                
        </Accordion>
    )
    
}