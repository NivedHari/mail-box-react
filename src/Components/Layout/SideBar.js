import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { Nav, Card } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import InboxIcon from "@mui/icons-material/Inbox";
import SendIcon from "@mui/icons-material/Send";
import CreateIcon from "@mui/icons-material/Create";

const SideBar = () => {
  const dispatch = useDispatch();
  const inbox = useSelector((state) => state.email.inbox);

  const unreadMessages = inbox.reduce((total, mail) => {
    if (!mail.isRead) {
      return total + 1;
    } else {
      return total;
    }
  }, 0);

  const toggleHandler = () => {
    dispatch(uiActions.toggleModal());
  };

  return (
    <div className="sidebar">
      <Nav className="flex-column ">
        <button className="btn btn-danger m-4" onClick={toggleHandler}>
          <CreateIcon /> Compose
        </button>

        <Link className="link-no-style " to={"/Inbox"}>
          <div className="item">
            <InboxIcon />
            <span>Inbox</span>
          </div>
          <span className="side-badge">
            <span className="number">{unreadMessages}</span> unread
          </span>
        </Link>
        <Link className="link-no-style" to={"/sent"}>
          <div className="item">
            <SendIcon />
            <span>Sent Mail</span>
          </div>
        </Link>
      </Nav>
    </div>
  );
};

export default SideBar;
