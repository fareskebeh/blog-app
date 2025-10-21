import Home from "./components/Home";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import BlogPreview from "./components/BlogPreview.jsx"
import Nav from "./components/navigation/Nav.jsx";

const App = () => {

  return (
    <Router>
      <div className="bg-neutral-100 dark:bg-neutral-950 transition duration-150">
        <Nav/>
        <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/post/:id" element={<BlogPreview/>} />
      </Routes>
      </div>
    </Router>

  );
};

export default App;
