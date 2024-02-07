import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth-slice";
import MailIcon from "@mui/icons-material/Mail";

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const email = useSelector((state) => state.auth.email);
  const handleLogout = () => {
    dispatch(authActions.logout());
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg nav-bar-dark bg-dark ">
        <div className="d-flex justify-content-between w-100 align-items-center">
          <div className="d-flex align-items-center px-4">
          <MailIcon style={{ fontSize: '3rem' ,color:'white'}}/>
            <h1 style={{ color: "white" }} >
              MailBox
            </h1>
          </div>

          <div>
            <span style={{ color: "white" }}>{email}</span>
            {isAuth && (
              <button
                className="btn btn-outline-light mx-3"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
