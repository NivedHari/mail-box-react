import React from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { Nav, Card } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const SideBar = () => {
  const dispatch = useDispatch();

  const toggleHandler = () => {
    dispatch(uiActions.toggleModal());
  };

  return (
    <div className="sidebar">
      <Nav className="flex-column ">
        <button className="btn btn-danger m-4" onClick={toggleHandler}>
          Compose
        </button>
        <Link className="link-no-style" to={"/Inbox"}>Inbox</Link>
        <Link className="link-no-style" to={"/sentMail"}>Sent Mail</Link>
      </Nav>
    </div>
  );
};

export default SideBar;
