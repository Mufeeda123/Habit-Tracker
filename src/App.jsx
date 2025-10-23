import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Settings from "./pages/Settings"

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Home" element={<Home />} />
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/Settings" element={<Settings />} />
        <Route path="/Settings/:section" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
