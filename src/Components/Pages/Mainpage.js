import { useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";

const Mainpage = () => {
  const dispatch = useDispatch();
  const toggleHandler = () => {
    dispatch(uiActions.toggleModal());
  };
  return (
    <div style={{ marginTop: "4rem" }} className="container-fluid page">
      <div className="row">
        <div className="col-md-2 p-5 d-flex flex-column vh-100" style={{ backgroundColor: "whitesmoke" }}>
          <button className="btn btn-primary btn-block px-5" onClick={toggleHandler}>
            Compose
          </button>
          <div className="flex-grow-1">
            <ul className="list-group my-5">
              <li className="list-group-item active">Hello</li>
              <li className="list-group-item">Hello</li>
              <li className="list-group-item">Hello</li>
              <li className="list-group-item">Hello</li>
              <li className="list-group-item">Hello</li>
            </ul>
          </div>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};

export default Mainpage;
