import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import BoardFormModal from "../components/BoardDetailModal";
import "../styles/Page.css";
import profile from "../assets/icons/profile.png";
import api from "../api/axios.jsx";

function BoardPage() {
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [boardlist, setBoardlist] = useState([]);

  useEffect(() => {
    const fetchMyBoards = async () => {
      try {
        const response = await api.get("/news/", {
          withCredentials: true, // 쿠키 기반 JWT 사용
        });

        console.log("내가 작성한 게시글:", response.data);
        setBoardlist(response.data);
      } catch (error) {
        console.error("게시글을 불러오는 데 실패했습니다.", error);
      }
    };

    fetchMyBoards();
  }, []);

  return (
    <div className="board-page">
      <NavBar />
      <div className="list">
        <h2>게시글 목록</h2>
        {boardlist.length === 0 ? (
          <p>작성한 게시글이 없습니다.</p>
        ) : (
          boardlist.map((board) => (
            <div
              key={board.id}
              className="item"
              onClick={() => setSelectedBoard(board)}
            >

              <div className="boardContent">
                {/* 유저 */}
                <div className="userprofile">
                  <img src={profile} />
                  <span className="name">{board.userName.slice(0,6)}</span>
                </div>
                {/* 타이틀 */}
                <div className="board-title">
                  <p>{board.title}</p>
                  {/* 날짜 */}
                  <p>{board.description}</p>
                  <p>{new Date(board.date).toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))
        )}
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
