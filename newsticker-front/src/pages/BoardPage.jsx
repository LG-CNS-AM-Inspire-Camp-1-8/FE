import { useState } from "react";


function BoardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const boardList = [
    { id: 1, title: '게시글 제목1', author: '작성자1', content: '게시글 내용1', date: '2025년 2월 19일' },
    { id: 2, title: '게시글 제목2', author: '작성자2', content: '게시글 내용2', date: '2025년 2월 20일' },
    { id: 3, title: '게시글 제목3', author: '작성자3', content: '게시글 내용3', date: '2025년 2월 21일' },
  ];

  return (
    <div className="board-page">
      <header>
        <h1>게시판</h1>
      </header>

      <div className="search-bar">
        <input type="text" placeholder="게시글을 검색해주세요."/>
        <button>검색🔍</button>
      </div>

      <div className="board-list">
        {boardList.map((post) => (
          <div key={post.id} className="board-item">
            <div className="board-header">
              <span className="author">{post.author}</span>
            </div>
            <h2 className="board-title">{post.title}</h2>
            <p className="board-content">{post.content}</p>
            <span className="date">{post.date}</span>
          </div>
        ))}
      </div>
      
      {isModalOpen && <BoardFormModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

export default BoardPage;
