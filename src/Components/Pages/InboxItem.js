import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import DeleteIcon from "@mui/icons-material/Delete";
import { markEmailAsRead } from "../../store/email-actions";
import { deleteEmail } from "../../store/email-actions";

const ellipsisStyle = {
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  maxWidth: "450px",
};

function InboxItem({ from, subject, time, snippet, id }) {
  const dispatch = useDispatch();
  const inbox = useSelector((state) => state.email.inbox);
  const mail = inbox.find((mail) => mail.id === id);
  const emailId = useSelector((state) => state.auth.email);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const isRead = mail.isRead;
  const readHandler = () => {
    if (isRead === false) {
      dispatch(markEmailAsRead(id, mail, emailId,"received"));
    }
  };

  const deleteHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(deleteEmail(mail.key, emailId,"received"));
  };
  return (
    <Link
      to={`/inbox/${id}`}
      className="link-no-style"
      onClick={() => readHandler()}
    >
      <Card
        className="email-item my-1 pointer-card"
        style={{ cursor: "pointer" }}
      >
        <div>{!isRead && <div className="blue-dot"></div>}</div>
        <Card.Body className="hover-effect">
          <Container>
            <Row className="align-items-center">
              <Col xs={12} sm={6} md={4} lg={3}>
                <Card.Title className="m-2 p-0" style={{ marginRight: "0" }}>
                  {from}
                </Card.Title>
              </Col>
              <Col xs={12} sm={6} md={4} lg={3}>
                <Card.Text className="m-2 p-0 h5" style={ellipsisStyle}>
                  {subject}
                </Card.Text>
              </Col>
              <Col xs={12} sm={12} md={4} lg={4}>
                <Card.Text className="m-2" style={ellipsisStyle}>
                  {snippet}
                </Card.Text>
              </Col>
              <Col
                xs={12}
                sm={6}
                md={4}
                lg={2}
                className="text-end"
                onMouseEnter={() => setShowDeleteButton(true)}
                onMouseLeave={() => setShowDeleteButton(false)}
              >
                <small
                  className={`text-muted m-2  ${
                    showDeleteButton ? "d-none" : ""
                  }`}
                >
                  {time}
                </small>
                <button
                  className={`btn btn-danger p-1 ${
                    showDeleteButton ? "" : "d-none"
                  }`}
                  onClick={deleteHandler}
                >
                  <DeleteIcon />
                </button>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default InboxItem;
