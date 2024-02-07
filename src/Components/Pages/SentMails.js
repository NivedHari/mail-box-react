import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "react-bootstrap";
import SentItem from "./SentItem";
import { fetchMails } from "../../store/email-actions";

function SentMails() {
  const dispatch = useDispatch();
  const emailId = useSelector((state) => state.auth.email);
  const sentMails = useSelector((state) => state.email.sentMails);

  useEffect(() => {
    dispatch(fetchMails(emailId, "sent"));
  }, [dispatch]);
  return (
    <Card className="m-4 p-3 ">
      <div style={{ backgroundColor: "whitesmoke" }}>
        <h1
          className="font-weight-bold "
          style={{ fontSize: "40px", fontWeight: "bold", color: "black" }}
        >
          SENT MAILS
        </h1>
      </div>
      <div className="mt-4" >
        {sentMails.map((email) => (
          <SentItem
            key={email.key}
            id={email.id}
            from={email.sender}
            to={email.receiver}
            subject={email.subject}
            time={email.timestamp}
            snippet={email.message}
          />
        ))}
      </div>
    </Card>
  );
}

export default SentMails;
