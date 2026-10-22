import "./App.css";
import Content from "./Layout/Content";
import About from "./Layout/About";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router";

function App() {
  return (
    <Router>
      <Routes>
         <Route path="/" element={<Content />} />
         <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
