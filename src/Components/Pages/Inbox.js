import React, { useEffect} from "react";
import { useSelector,useDispatch } from "react-redux";
import EmailItem from "./EmailItem";
import { Card } from "react-bootstrap";
import { emailActions } from "../../store/email-slice";

export const Inbox = () => {
  const dispatch = useDispatch();
  const emailId = useSelector((state) => state.auth.email);
  const cleanedMail = `${emailId.replace(/\.|@/g, "")}`;
  const emails = useSelector((state) => state.email.inbox);
  useEffect(() => {
    const fetchMails = async () => {
      try {
        const apiUrl = `https://mail-box-dd769-default-rtdb.firebaseio.com/emails/received/${cleanedMail}.json`;
        const response = await fetch(apiUrl, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch emails");
        }

        const data = await response.json();
        const emailsArray = Object.entries(data).map(([key, email]) => ({
          key, 
          ...email,
        }));
        dispatch(emailActions.setInbox({items:emailsArray}));

        console.log("Fetched emails:", data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMails();
  }, []);
  return (
    <Card className="m-4 p-3">
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
          <EmailItem
            key={email.id}
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
