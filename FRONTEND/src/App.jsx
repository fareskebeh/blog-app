import Home from "./components/Home";
import {BrowserRouter as Router, Routes, Route, Outlet, Navigate} from "react-router-dom"
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
import Protected from "./router/Protected.jsx";

const App = () => {
  const {user} = useAuth()
  const posts = useSavedPosts()

  return (
    <Router>
      <div className="bg-neutral-100 dark:bg-neutral-950 transition duration-150">
        <Nav user={user}/>
        <Routes>
        <Route path="/" element={<Home/>} />

        <Route path="/login" element={user ? <Navigate to="/"/> : <Login/>} />
        <Route path="/login-with-email" element={user ? <Navigate to="/"/> : <EmailLogin/>} />
        <Route path="/register" element={user? <Navigate to="/"/> : <Register/>} />
        <Route path="/verify" element={user? <Navigate to="/"/> : <Verify/>}/>
        <Route path="/me" element={<Protected><Me posts={posts} user={user}/></Protected>}/>
        <Route path="/settings" element={<Protected><Settings/></Protected>}>
          <Route index element={<Navigate to="account" replace />} />
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
