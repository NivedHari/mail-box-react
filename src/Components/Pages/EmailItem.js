import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { emailActions } from "../../store/email-slice";
import { markEmailAsRead } from "../../store/email-actions";

const ellipsisStyle = {
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  maxWidth: "450px",
};

function EmailItem({ from, to, subject, time, snippet, id }) {
  const dispatch = useDispatch();
  const inbox = useSelector((state) => state.email.inbox);
  const mail = inbox.find((mail) => mail.id === id);
  const emailId = useSelector((state) => state.auth.email);
  const isRead = mail.isRead;
  const readHandler = () => {
    if (isRead === false) {
      dispatch(markEmailAsRead(id, mail, emailId));
    }
  };
  return (
    <Link
      to={`/inbox/${id}`}
      className="link-no-style"
      onClick={() => readHandler()}
    >
      <Card
        className="email-item  p-2 pointer-card"
        style={{ cursor: "pointer" }}
      >
        <div>{!isRead && <div className="blue-dot"></div>}</div>
        <Card.Body className="hover-effect">
          <div className="d-flex justify-content-between align-items-center">
            <Card.Title className="m-2">
              <span className="text-muted">From : </span>
              {from}
            </Card.Title>
            {/* <Card.Title className="mb-0">{to}</Card.Title> */}

            <Card.Title className="m-2">{subject}</Card.Title>
            <Card.Text className="m-2" style={ellipsisStyle}>
              {snippet}
            </Card.Text>
            <small className="text-muted  m-2">{time}</small>
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default EmailItem;
