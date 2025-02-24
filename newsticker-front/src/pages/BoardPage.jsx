import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import BoardFormModal from "../components/BoardDetailModal";
import "../styles/Page.css";
import profile from "../assets/icons/profile.png";
import api from "../api/axios.jsx";

function BoardPage() {
  const [selectedBoard, setSelectedBoard] = useState(null);
  // const boardlist = [
  //   { id: 1, title: '게시글 제목1', content: '삼성전자 최고 ...', date: '2025년 2월 19일', username:'작성자이름'},
  //   { id: 2, title: '게시글 제목2', content: '삼성전자 최고 ...', date: '2025년 2월 19일', username:'작성자이름'}
  // ];

  const [boardlist, setBoardlist] = useState([]);
  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await api.get("/news/");
        console.log(response.data);
        setBoardlist(response.data);
      } catch (error) {
        console.error("게시글을 불러오는 데 실패했습니다.", error);
      }
    };

    fetchBoards();
  }, []);

  return (
    <div className="board-page">
      <NavBar />
      <div className="list">
        <h2>게시글 목록</h2>
        {boardlist.map((board) => (
          <div
            key={board.id}
            className="item"
            onClick={() => setSelectedBoard(board)}
          >
            {/* 유저 */}
            <div className="userprofile">
              <img src={profile} />
              <span className="name">{board.description}</span>
              {/* 원래 username */}
            </div>
            {/* 타이틀 */}
            <div className="sub-header">
              <span className="title">{board.title}</span>
            </div>
            {/* 날짜 */}
            <div className="content-center">
              <p className="date">{board.description}</p>
            {/* 원래 date */}
            </div>
          </div>
        ))}
      </div>
      {selectedBoard && (
        <BoardFormModal
          board={selectedBoard}
          onClose={() => setSelectedBoard(null)}
        />
      )}
    </div>
  );
}

export default BoardPage;
