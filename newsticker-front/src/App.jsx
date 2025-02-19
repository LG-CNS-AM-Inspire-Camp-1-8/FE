import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NewsPage from "./pages/NewsPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NewsPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
