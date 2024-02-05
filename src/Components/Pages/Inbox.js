import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EmailItem from "./EmailItem";

export const Inbox = () => {
  const emailId = useSelector((state) => state.auth.email);
  const cleanedMail = `${emailId.replace(/\.|@/g, "")}`;
  const [emails, setEmails] = useState([]);
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
        const emailsArray = data ? Object.values(data) : [];
        setEmails(emailsArray);
        console.log("Fetched emails:", data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMails();
  }, []);
  return (
    <div>
      <h1>INBOX</h1>
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
  );
};
