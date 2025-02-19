import { useState } from "react";

function NewsPage() {
    const [activeTab, setActiveTab] = useState('main');
  
    return (
      <div className="news-page">
        <header className="header">
        {/* 토글 */}
          <nav className="nav-bar">
            <button
              className={`nav-button ${activeTab === 'main' ? 'active' : ''}`}
              onClick={() => setActiveTab('main')}
            >
              메인페이지
            </button>
            <button
              className={`nav-button ${activeTab === 'posts' ? 'active' : ''}`}
              onClick={() => setActiveTab('posts')}
            >
              게시글 목록
            </button>
          </nav>
        </header>

        {/* 검색창 */}
        <main className="main-content">
          <div className="search-bar">
            <input type="text" placeholder="관심 종목을 입력해 주세요" className="search-input" />
            <button className="search-button">🔍</button>
          </div>

        {/* 뉴스 그리드 화면 */}
          <div className="news-grid">
            <div className="news-item highlight">
              <img src="" alt="뉴스 이미지" className="news-image" />
              <div className="news-info">
                <h3>뉴스이름</h3>
                <p>뉴스 내용..</p>
                <span>시간 | 신문사</span>
              </div>
            </div>
          </div>
        </main>

        {/* 사이드 바 */}
        <aside className="sidebar">
          <ul>
            <li>관심</li>
            <li>메모</li>
            <li>최근 본</li>
            <li>마이페이지</li>
          </ul>
        </aside>
      </div>
    );
  }

export default NewsPage;
