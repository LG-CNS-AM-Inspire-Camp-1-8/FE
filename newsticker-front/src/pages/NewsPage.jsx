import { useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import NewsDetailModal from "../components/NewsDetailModal";
import '../styles/NewsPage.css'

function NewsPage() {
  const [selectedNews, setSelectedNews] = useState(null);
  const location = useLocation();
  const newsList = [
    { id: 1, title: '뉴스 제목1', content: '삼성전자 최고 ...', date: '2025년 2월 19일', newspaper:'매일경제'},
    { id: 2, title: '뉴스 제목2', content: '삼성전자 최고 ...', date: '2025년 2월 19일', newspaper:'아주경제'},
    { id: 3, title: '뉴스 제목3', content: '삼성전자 최고 ...', date: '2025년 2월 19일', newspaper:'매일경제'},
    { id: 4, title: '뉴스 제목4', content: '삼성전자 최고 ...', date: '2025년 2월 19일', newspaper:'매일경제'},
    { id: 5, title: '뉴스 제목5', content: '삼성전자 최고 ...', date: '2025년 2월 19일', newspaper:'매일경제'}
  ];
    return(
        <div className="news-page">
          <header className="news-header">
            <div className="logo">NewsTickr</div>

            <div className="header-center">
              <nav className="nav-toggle">
                <button className={location.pathname === '/' ? "active" : ""}>뉴스페이지</button>
                <Link to="/boardPage">
                <button className={location.pathname === "/boardPage" ? "active" : ""}>게시글 목록</button>
                </Link>
              </nav>
              <div className="search-bar">
                <span className="search-icon">🔍</span>
                <input type="text" placeholder=" / 를 눌러 검색하세요" className="search-input"/>
              </div>
            </div>

            <Link to ="/login">
              <button className="login-btn">로그인</button>
            </Link>
          </header>



          <div className="news-list">
            {newsList.map((news) => (
            <div key={news.id} className="news-item" onClick={() => setSelectedNews(news)}>
              
              <div className="sub-header">
                <span className="title">{news.title}</span>
              </div>

              <h2 className="news-content">{news.content}</h2>

              <div className="content-center">
              <p className="news-date">{news.date}</p>
              <span className="newspaper">{news.newspaper}</span>
              </div>

          </div>
        ))}
          </div>
          {selectedNews && <NewsDetailModal news={selectedNews} onClose={() => setSelectedNews(null)} />}
        </div>
    );
}
export default NewsPage;