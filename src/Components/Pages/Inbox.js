import React from "react";
import InboxItem from "./InboxItem";
import { Card } from "react-bootstrap";
import useEmail from "../Hooks/useEmail";
export const Inbox = () => {
  const { emails } = useEmail();

  return (
    <Card className="m-4 p-3 ">
      <div style={{ backgroundColor: "whitesmoke" }}>
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
