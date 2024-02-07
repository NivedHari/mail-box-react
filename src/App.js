import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import AuthPage from "./Components/Pages/AuthPage";
import Navbar from "./Components/Layout/Navbar";
import ComposeMail from "./Components/Modal/ComposeMail";
import SideBar from "./Components/Layout/SideBar";
import { Inbox } from "./Components/Pages/Inbox";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import EmailBody from "./Components/Pages/EmailBody";
import SentMails from "./Components/Pages/SentMails";
import SentBody from "./Components/Pages/SentBody";

function App() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const ModalOpen = useSelector((state) => state.ui.isModalOpen);
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          
          <div className={isAuth ? "page" : ""}>
            {isAuth && <SideBar />}
            {ModalOpen && <ComposeMail />}
            <Route path="/inbox" exact>
              {isAuth ? <Inbox /> : <Redirect to="/auth" />}
            </Route>
            <Route path="/sent" exact>
              {isAuth ? <SentMails/> : <Redirect to="/auth" />}
            </Route>
            {!isAuth && (
              <Route path="/auth">
                <AuthPage />
              </Route>
            )}
            <Route path="/" exact>
            {isAuth ? <Inbox /> : <Redirect to="/auth" />}
          </Route>
            <Route path="/inbox/:mailId">
                <EmailBody/>
              </Route>
            <Route path="/sent/:mailId">
                <SentBody/>
              </Route>
          </div>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

