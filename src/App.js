import { useSelector } from 'react-redux';
import './App.css';
import AuthPage from './Components/Pages/AuthPage';
import Mainpage from './Components/Pages/Mainpage';
import Navbar from './Components/Layout/Navbar';
import ComposeMail from './Components/Modal/ComposeMail';

function App() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const ModalOpen = useSelector((state) => state.ui.isModalOpen);
  return (
    <div >
      <Navbar/>
      {ModalOpen && <ComposeMail/>}
      {!isAuth && <AuthPage/>}
      {isAuth && <Mainpage />}
    </div>
  );
}

export default App;
