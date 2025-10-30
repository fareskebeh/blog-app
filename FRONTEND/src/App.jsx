import Home from "./components/Home";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import BlogPreview from "./components/BlogPreview.jsx"
import Nav from "./components/navigation/Nav.jsx";
import { AuthProvider, useAuth } from "./hooks/useAuth.jsx";
import Login from "./authPages/Login.jsx";
import EmailLogin from "./authPages/EmailLogin.jsx";
import Register from "./authPages/Register.jsx";
import Verify from "./authPages/Verify.jsx";

const App = () => {
  const {user} = useAuth()

  return (
    <Router>
      <div className="bg-neutral-100 dark:bg-neutral-950 transition duration-150">
        <Nav />
        <Routes>
        <Route path="/" element={<Home/>} />

        <Route path="/login" element={user ? <Home/> : <Login/>} />
        <Route path="/login-with-email" element={user ? <Home/> : <EmailLogin/>} />
        <Route path="/register" element={user? <Home/> : <Register/>} />
        <Route path="/verify" element={user? <Home/> : <Verify/>}/>
        
        <Route path="/post/:id" element={<BlogPreview/>} />
      </Routes>
      </div>
    </Router>

  );
};

export default App;
