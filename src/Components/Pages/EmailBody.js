import React from "react";
import { Card } from "react-bootstrap";
import { useParams,useHistory } from "react-router-dom/cjs/react-router-dom";
import { useSelector } from "react-redux";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';


function EmailBody() {
  const params = useParams();
  const history = useHistory();
  const inbox = useSelector((state) => state.email.inbox);
  const mail = inbox.find((mail) => mail.id === params.mailId);
  return (
    <Card className="m-4 p-3">
      <div>
        <button className="btn btn-outline-secondary mb-3" type="button" onClick={()=>history.push("/inbox")}>
          <KeyboardBackspaceIcon/>
        </button>
        <h1>{mail.subject}</h1>
        <h4>From: {mail.sender}</h4>
        <span>{mail.timestamp}</span>
      </div>
      <div className="mt-5">
        <p style={{ lineHeight: "2.2" }}>{mail.message}</p>
      </div>
    </Card>
  );
}

export default EmailBody;
