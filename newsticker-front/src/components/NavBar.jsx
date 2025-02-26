import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Nav.css";
import { isAuthenticated } from "../api/axios";
import api from "../api/axios";

function NavBar({ onNewsSearch, onBoardSearch, resetBoardList,resetNewsList }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [auth, setAuth] = useState(false);

  const fetchAuthFromJwt = async () => {
    const isAuth = isAuthenticated();
    setAuth(isAuth);
    console.log(isAuth);
  };
  useEffect(() => {
    fetchAuthFromJwt();
  }, []);

  /* 검색 입력 처리 */
const handleSearch = (e) => {
  setSearchTerm(e.target.value);
  
  if (e.target.value.trim() === "") {
    if (location.pathname === "/boardPage") {
      resetBoardList(); // 게시판 페이지에서 검색창 비면 게시글 복구
    } else if (location.pathname === "/") {
      resetNewsList(); // 뉴스 페이지에서 검색창 비면 뉴스 복구
    }
  }
};

/* 엔터키로 검색 실행 */
const handleKeyPress = (e) => {
  if (e.key === "Enter") {
    if (searchTerm.trim() !== "") {
      if (location.pathname === "/boardPage") {
        onBoardSearch(searchTerm.trim()); // 게시글 검색 실행
      } else if (location.pathname === "/") {
        onNewsSearch(searchTerm.trim()); // 🔹 뉴스 검색 실행
      }
    } else {
      if (location.pathname === "/boardPage") {
        resetBoardList(); // 게시판 페이지에서 검색 후 엔터 → 원래 게시글 목록 복구
      } else if (location.pathname === "/") {
        resetNewsList(); // 뉴스 페이지에서 검색 후 엔터 → 원래 뉴스 목록 복구
      }
    }
  }
};

  /* 로그아웃 처리 */
  const handleLogout = async () => {
    try {
      await api.post("http://localhost:8081/NewsTickr/auth/logout");
      setAuth(false);
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("로그아웃 오류:", error);
    }
  };

  return (
    <header className="news-header">
      <div className="logo">NewsTickr</div>

      <div className="header-center">
        <nav className="nav-toggle">
          <Link to="/">
            <button className={location.pathname === "/" ? "active" : ""}>뉴스페이지</button>
          </Link>
          <Link to="/boardPage">
            <button className={location.pathname === "/boardPage" ? "active" : ""}>게시글 목록</button>
          </Link>
          <Link to="/mypage">
            <button className={location.pathname === "/mypage" ? "active" : ""}>마이페이지</button>
          </Link>
        </nav>
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder=" / 를 눌러 검색하세요"
            className="search-input"
            value={searchTerm}
            onChange={handleSearch}
            onKeyDown={handleKeyPress}
          />
        </div>
      </div>

      {location.pathname !== "/mypage" && (
        auth ? (
          <button onClick={handleLogout} className="login-btn">로그아웃</button>
        ) : (
          <Link to="/login">
            <button className="login-btn">로그인</button>
          </Link>
        )
      )}
    </header>
  );
}

export default NavBar;
