import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import NewsPage from "./pages/NewsPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import BoardDetailPage from "./pages/BoardDetailPage";
import NewsDetailPage from "./pages/NewsDetailPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NewsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/boardDetail" element={<BoardDetailPage />} />
        <Route path="/newsDetail" element={<NewsDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
