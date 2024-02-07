import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { Modal, Button, Form } from "react-bootstrap";
import { EditorState } from "draft-js";
import { useRef, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { sendEmail } from "../../store/email-actions";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const ComposeMail = () => {
  const dispatch = useDispatch();
  const ModalOpen = useSelector((state) => state.ui.isModalOpen);
  const senderEmail = useSelector((state) => state.auth.email);

  const toRef = useRef();
  const subjectRef = useRef();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const closeComposeModal = () => {
    dispatch(uiActions.toggleModal());
  };

  const sendHandler = async (e) => {
    e.preventDefault();

    const enteredAddress = toRef.current.value;
    const enteredSubject = subjectRef.current.value;
    const plainTextMessage = editorState
      .getCurrentContent()
      .getPlainText("\u0001");

    const receivedData = {
      id: Math.random().toString(),
      sender: senderEmail,
      receiver: enteredAddress,
      subject: enteredSubject,
      message: plainTextMessage,
      timestamp: new Date().toLocaleString(),
      isRead: false,
      sent: false,
    };
    const sentData = {
      id: Math.random().toString(),
      sender: senderEmail,
      receiver: enteredAddress,
      subject: enteredSubject,
      message: plainTextMessage,
      timestamp: new Date().toLocaleString(),
      isRead: false,
      sent: true,
    };

    const cleanedSender = `${senderEmail.replace(/\.|@/g, "")}`;
    dispatch(sendEmail(cleanedSender, sentData));
    const cleanedReceiver = `${enteredAddress.replace(/\.|@/g, "")}`;
    dispatch(sendEmail(cleanedReceiver, receivedData));

    closeComposeModal();
  };

  return (
    <>
      <Modal show={ModalOpen} onHide={closeComposeModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="fa fa-envelope"></i> Compose New Message
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={sendHandler}>
            <Form.Group controlId="to">
              <Form.Label>To</Form.Label>
              <Form.Control type="email" ref={toRef} />
            </Form.Group>
            <Form.Group controlId="subject">
              <Form.Label>Subject</Form.Label>
              <Form.Control type="text" ref={subjectRef} />
            </Form.Group>
            <Form.Group controlId="message">
              <Form.Label>Message</Form.Label>
              <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={setEditorState}
                editorStyle={{ height: "100px" }}
              />
            </Form.Group>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeComposeModal}>
            <i className="fa fa-times"></i> Discard
          </Button>
          <Button variant="primary" onClick={sendHandler}>
            <i className="fa fa-envelope"></i> Send Message
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ComposeMail;
