import React from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { Nav } from "react-bootstrap";

const SideBar = () => {
  const dispatch = useDispatch();

  const toggleHandler = () => {
    dispatch(uiActions.toggleModal());
  };

  return (
    <div className="sidebar">
      <Nav className="flex-column ">
        <button className="btn btn-primary m-4" onClick={toggleHandler}>
          Compose
        </button>
        <Nav.Link href="/Inbox">Inbox</Nav.Link>
        <Nav.Link href="/sentMail">Sent Mail</Nav.Link>
      </Nav>
    </div>
  );
};

export default SideBar;
