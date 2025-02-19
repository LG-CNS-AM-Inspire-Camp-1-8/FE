function BoardPage() {
    return(
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
            <input type="text" placeholder="게시물을 검색해 주세요" className="search-input" />
            <button className="search-button">🔍</button>
          </div>
          
        {/* 게시글 작성 버튼 */}
        <div className="board-btn">
          <button className="board-button">게시글작성</button>
        </div>

        {/* 게시물 그리드 화면 */}
          <div className="board-grid">
            <div className="board-item highlight">
              <img src="" alt="게시물 이미지" className="board-image" />
              <div className="board-info">
                <h3>게시글 제목</h3>
                <img src="" alt="사용자 이미지" className="user-image" />
                <p>사용자이름</p>
                <span>년도월일</span>
                {/* 좋아요수, 댓글수 추가 */}
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
export default BoardPage;