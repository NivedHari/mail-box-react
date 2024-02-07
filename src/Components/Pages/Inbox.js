import React, { useEffect} from "react";
import { useSelector,useDispatch } from "react-redux";
import InboxItem from "./InboxItem";
import { Card } from "react-bootstrap";
import { fetchMails } from "../../store/email-actions";

export const Inbox = () => {
  const dispatch = useDispatch();
  const emailId = useSelector((state) => state.auth.email);
  const emails = useSelector((state) => state.email.inbox);

  useEffect(() => {
    dispatch(fetchMails(emailId));

    const intervalId = setInterval(() => {
      dispatch(fetchMails(emailId));
    }, 2000);

    return () => clearInterval(intervalId);
  }, [emailId]);
  return (
    <Card className="m-4 p-3 ">
      <div style={{backgroundColor:"whitesmoke"}}>
        <h1
          className="font-weight-bold "
          style={{ fontSize: "40px", fontWeight: "bold", color: "black" }}
        >
          INBOX
        </h1>
      </div>

      <div className="mt-4">
        {emails.map((email) => (
          <InboxItem
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
};
