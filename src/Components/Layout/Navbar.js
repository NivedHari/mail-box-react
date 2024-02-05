import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";

const Navbar = () => {
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(authActions.logout());
    }
    return (
        <div>
          <nav className="navbar navbar-expand-lg fixed-top nav-bar-dark bg-dark">
            <div className="d-flex justify-content-between w-100">
              <div>
                <h1 style={{ color: 'white' }} className="px-5">
                  MailBox
                </h1>
              </div>
              <div>
                <button
                  className="btn btn-outline-light"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </nav>
        </div>
      );
};

export default Navbar;
