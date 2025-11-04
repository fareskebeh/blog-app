import Home from "./components/Home";
import {BrowserRouter as Router, Routes, Route, Outlet} from "react-router-dom"
import BlogPreview from "./components/BlogPreview.jsx"
import Nav from "./components/navigation/Nav.jsx";
import { useAuth } from "./hooks/useAuth.jsx";
import Login from "./authPages/Login.jsx";
import EmailLogin from "./authPages/EmailLogin.jsx";
import Register from "./authPages/Register.jsx";
import Verify from "./authPages/Verify.jsx";
import Me from "./components/user/Me.jsx";
import Settings from "./components/user/settings/Settings.jsx";
import { useSavedPosts } from "./hooks/useSavedPosts.jsx";
import Account from "./components/user/settings/Account.jsx";
import Preferences from "./components/user/settings/Preferences.jsx"
import Edit from "./components/user/settings/Edit.jsx"

const App = () => {
  const {user} = useAuth()
  const posts = useSavedPosts()

  return (
    <Router>
      <div className="bg-neutral-100 dark:bg-neutral-950 transition duration-150">
        <Nav user={user}/>
        <Routes>
        <Route path="/" element={<Home/>} />

        <Route path="/login" element={user ? <Home/> : <Login/>} />
        <Route path="/login-with-email" element={user ? <Home/> : <EmailLogin/>} />
        <Route path="/register" element={user? <Home/> : <Register/>} />
        <Route path="/verify" element={user? <Home/> : <Verify/>}/>
        <Route path="/me" element={user? <Me user={user}/> : <Home/>}/>
        <Route path="/settings" element={user? <Settings user={user}/> : <Home/>}>
          <Route path="account" element={<Account/>}/>
          <Route path="edit-profile" element={<Edit/>}/>
          <Route path="preferences" element={<Preferences/>}/>
        </Route>
        
        <Route path="/post/:id" element={<BlogPreview/>} />
      </Routes>
      </div>
    </Router>

  );
};

export default App;
