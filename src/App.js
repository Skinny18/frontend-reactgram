import './App.css'

//Router
import{BrowserRouter, Routes, Route, Navigate} from "react-router-dom"

//Hooks
import { useAuth } from './hooks/useAuth';

//components
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

//Pages
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home/Home";
import EditProfile from './pages/EditProfile/EditProfile';
import Profile from './pages/Profile/Profile';

function App() {

  const {auth, loading} = useAuth()

  if(loading){
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
          <div className="container">
              <Routes>
                  <Route path="/profile" element={ auth ? <EditProfile/> : <Navigate to="/login"/>}/>
                  <Route path='usersdd/:id' element={auth ? <Profile/> : <Navigate to="/login"/>}/>
                  <Route path="/" element={ auth ? <Home/> : <Navigate to="/login"/>}/>
                  <Route path="/login" element={!auth ? <Login/> : <Navigate to="/"/>}/>
                  <Route path="/register" element={!auth ? <Register/> : <Navigate to="/"/>}/>
               </Routes>
          </div>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
