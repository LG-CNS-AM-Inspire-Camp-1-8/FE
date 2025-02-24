import { Link, useLocation } from "react-router-dom";
import "../styles/Nav.css";
import { useState } from "react";
import iconIMG from '../assets/icons/chart.png'

function NavBar({onSearch}) {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  /* 검색 */
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  }

  /* 엔터실행 */
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      onSearch(searchTerm.trim()); // 검색 실행
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
            <button
              className={location.pathname === "/boardPage" ? "active" : ""}
            >
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
        <Link to="/login">
          <button className="login-btn">로그인</button>
        </Link>
      )}
    </header>
  );
}

export default NavBar;
