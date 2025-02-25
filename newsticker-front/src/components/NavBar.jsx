import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/Nav.css";
import iconIMG from "../assets/icons/chart.png";
import { isAuthenticated } from "../api/axios"; // 실제 위치에 맞게 경로 수정
import api from "../api/axios"; // 로그아웃 API 호출을 위한 예시

function NavBar({ onSearch }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [auth, setAuth] = useState(false);

  // 컴포넌트가 마운트될 때 로그인 상태 확인
  useEffect(() => {
    setAuth(isAuthenticated());
  }, []);

  /* 검색 입력 처리 */
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  /* 엔터키로 검색 실행 */
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      onSearch(searchTerm.trim());
    }
  };

  /* 로그아웃 처리 (API 호출이나 쿠키 제거 로직 추가) */
  const handleLogout = async () => {
    try {
      // 로그아웃 API가 있다면 호출합니다.
      await api.post("http://localhost:8081/NewsTickr/auth/logout");
      setAuth(false);
      navigate("/");
      // 페이지 새로고침 등 추가 처리를 할 수 있습니다.
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
            <button className={location.pathname === "/" ? "active" : ""}>
              뉴스페이지
            </button>
          </Link>
          <Link to="/boardPage">
            <button className={location.pathname === "/boardPage" ? "active" : ""}>
              게시글 목록
            </button>
          </Link>
          <Link to="/mypage">
            <button className={location.pathname === "/mypage" ? "active" : ""}>
              마이페이지
            </button>
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
          <button onClick={handleLogout} className="login-btn">
            로그아웃
          </button>
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
