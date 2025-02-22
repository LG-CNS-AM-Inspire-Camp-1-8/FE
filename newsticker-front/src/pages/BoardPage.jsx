import { useState } from "react";
import NavBar from "../components/NavBar";
import BoardFormModal from '../components/BoardFormModal';
import '../styles/Page.css';
import profile from "../assets/icons/profile.png";

function BoardPage() {
  const [selectedBoard, setSelectedBoard] = useState(null);
  const boardlist = [
    { id: 1, title: '게시글 제목1', content: '삼성전자 최고 ...', date: '2025년 2월 19일', username:'작성자이름'},
    { id: 2, title: '게시글 제목2', content: '삼성전자 최고 ...', date: '2025년 2월 19일', username:'작성자이름'}
  ];
  return(
    <div className="board-page">
      <NavBar />
      <div className="list">
        <h2>게시글 작성</h2>
        {boardlist.map((board) => (
          <div key={board.id} className="item" onClick={() => setSelectedBoard(board)} >
            {/* 유저 */}
            <div className="userprofile">
              <img src={profile} />
              <span className="name">{board.username}</span>
            </div>
            {/* 타이틀 */}
            <div className="sub-header">
                <span className="title">{board.title}</span>
                <h2 className="content">{board.content}</h2>
            </div>
            {/* 날짜 */}
            <div className="content-center">
              <p className="date">{board.date}</p>
            </div>
              
          </div>
        ))}
          </div>
        {selectedBoard && <BoardFormModal board={selectedBoard} onClose={() => setSelectedBoard(null)} />}
    </div>
    
  )
}

export default BoardPage;
