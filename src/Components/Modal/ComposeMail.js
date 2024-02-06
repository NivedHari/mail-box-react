import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { Modal, Button, Form } from "react-bootstrap";
import { EditorState} from "draft-js";
import { useRef, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
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

  const saveEmail = async (folder, emailId, emailData) => {
    const apiUrl = `https://mail-box-dd769-default-rtdb.firebaseio.com/emails/${folder}/${encodeURIComponent(
      emailId
    )}.json`;
    console.log(apiUrl);

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log(
        `${
          folder.charAt(0).toUpperCase() + folder.slice(1)
        } email stored successfully:`,
        responseData.name
      );
      return responseData.name;
    } else {
      console.error(
        `${
          folder.charAt(0).toUpperCase() + folder.slice(1)
        } email failed to store:`,
        response.statusText
      );
      throw new Error("Failed to store email");
    }
  };

  const sendHandler = async (e) => {
    e.preventDefault();

    const enteredAddress = toRef.current.value;
    const enteredSubject = subjectRef.current.value;
    const plainTextMessage = editorState
      .getCurrentContent()
      .getPlainText("\u0001");

    const emailData = {
      id: Math.random().toString(),
      sender: senderEmail,
      receiver: enteredAddress,
      subject: enteredSubject,
      message: plainTextMessage,
      timestamp: new Date().toLocaleString(),
      isRead: false,
    };

    console.log(emailData);

    try {
      const cleanedSender = `${senderEmail.replace(/\.|@/g, "")}`;
      const sentEmailId = await saveEmail("sent", cleanedSender, emailData);
      const cleanedReceiver = `${enteredAddress.replace(/\.|@/g, "")}`;
      const receivedEmailId = await saveEmail(
        "received",
        cleanedReceiver,
        emailData
      );

        console.log("Email sent successfully.", "Sent Email ID:", sentEmailId, "Received Email ID:", receivedEmailId);
    } catch (error) {
      console.error("Error sending email:", error.message);
      console.log(enteredAddress, emailData);
    }

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
