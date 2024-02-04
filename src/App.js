import { useSelector } from 'react-redux';
import './App.css';
import AuthPage from './Components/Pages/AuthPage';
import Mainpage from './Components/Pages/Mainpage';

function App() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  return (
    <div >
      {!isAuth && <AuthPage/>}
      {isAuth && <Mainpage />}
    </div>
  );
}

export default App;
