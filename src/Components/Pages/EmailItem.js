import React from "react";
import { Card } from "react-bootstrap";


const ellipsisStyle = {
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  maxWidth: '450px'
};

function EmailItem({ from, to, subject, time, snippet }) {
  return (
    <Card className="email-item">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <Card.Title className="mb-0">
            <span className="text-muted">From : </span>
            {from}
          </Card.Title>
          {/* <Card.Title className="mb-0">{to}</Card.Title> */}

          <Card.Title className="mb-2">{subject}</Card.Title>
          <Card.Text  style={ellipsisStyle}>{snippet}</Card.Text>
          <small className="text-muted ">{time}</small>
        </div>
      </Card.Body>
    </Card>
  );
}

export default EmailItem;
