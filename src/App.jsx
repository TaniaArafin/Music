import "./App.css";
import Content from "./Layout/Content";
import About from "./Layout/About";
import MusicDetails from "./Layout/MusicDetails";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router";
import BlogDetails from "./Layout/BlogDetails";

function App() {
  return (
    <Router>
      <Routes>
         <Route path="/" element={<Content />} />
         <Route path="/about" element={<About />} />
         <Route path="/music/:id" element={<MusicDetails />} />
         <Route path ="/blog/:id" element={<BlogDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
