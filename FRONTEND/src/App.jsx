import Home from "@/features/posts/pages/Home";
import { Routes, Route, Navigate} from "react-router-dom"
import BlogPreview from "@/features/posts/pages/BlogPreview"
import Nav from "@/components/layout/Nav";
import { useAuth } from "@/features/auth/hooks/useAuth";
import Login from "@/features/auth/pages/Login";
import EmailLogin from "@/features/auth/pages/EmailLogin";
import Register from "@/features/auth/pages/Register";
import Verify from "@/features/auth/pages/Verify";
import Me from "@/features/user/Me";
import Settings from "@/features/user/settings/Settings";
import { useSavedPosts } from "@/features/posts/hooks/useSavedPosts";
import Account from "@/features/user/settings/Account";
import Preferences from "@/features/user/settings/Preferences"
import Edit from "@/features/user/settings/Edit"
import Protected from "@/components/routing/Protected";

const App = () => {
  const {user} = useAuth()
  const posts = useSavedPosts()

  return (
      <div className="bg-neutral-100 dark:bg-neutral-950 transition-colors duration-150">
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

  );
};

export default App;
