import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import BoardFormModal from "../components/BoardDetailModal";
import "../styles/Page.css";
import profile from "../assets/icons/profile.png";
import api from "../api/axios.jsx";

function BoardPage() {
  const [selectedBoard, setSelectedBoard] = useState(null);
<<<<<<< HEAD
  const [boardlist, setBoardlist] = useState([]);
=======
  const [allBoards, setAllBoards] = useState([]); // 전체 게시글 목록 저장
  const [boardlist, setBoardlist] = useState([]); // 화면에 보여줄 게시글 목록
  const [visibleCount, setVisibleCount] = useState(3); // 처음에는 3개만 표시
>>>>>>> 3c9c9d7 (더보기 버튼 추가)
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // 게시글 불러오기
  useEffect(() => {
    const fetchMyBoards = async () => {
      try {
        const response = await api.get("/news/", {
          withCredentials: true, // 쿠키 기반 JWT 사용
        });

<<<<<<< HEAD
        console.log("전체 게시글 조회:", response.data);
        setBoardlist(response.data);
=======
        console.log("내가 작성한 게시글:", response.data);
        setAllBoards(response.data); // 전체 데이터를 저장
        setBoardlist(response.data.slice(0, 3)); // 처음 3개만 보여줌
>>>>>>> 3c9c9d7 (더보기 버튼 추가)
      } catch (error) {
        console.error("게시글을 불러오는 데 실패했습니다.", error);
      }
    };

    fetchMyBoards();
  }, []);

<<<<<<< HEAD
  const handleDelete = (deletedId) => {
    setBoardlist((prev) => prev.filter((board) => board.id !== deletedId));
  };

=======
>>>>>>> 3c9c9d7 (더보기 버튼 추가)
  // 검색 기능
  useEffect(() => {
    if (query.trim() === "") return;
    setLoading(true);

<<<<<<< HEAD
    api
      .get(`/news/${query}`) // 게시글 제목 검색 API
=======
    api.get(`/news/${query}`)
>>>>>>> 3c9c9d7 (더보기 버튼 추가)
      .then((response) => {
        setBoardlist(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("게시글 검색 오류:", error);
        setLoading(false);
      });
  }, [query]);

<<<<<<< HEAD
=======
  // "더보기" 버튼 클릭 시 3개씩 추가 표시
  const handleLoadMore = () => {
    const newCount = visibleCount + 3; // 3개씩 증가
    setVisibleCount(newCount);
    setBoardlist(allBoards.slice(0, newCount)); // 기존 데이터 유지하면서 추가
  };

>>>>>>> 3c9c9d7 (더보기 버튼 추가)
  return (
    <div className="board-page">
      <NavBar onNewsSearch={() => {}} onBoardSearch={setQuery} />
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
<<<<<<< HEAD
                  <img src={profile} />
                  <span className="name">{board.userName.slice(0, 6)}</span>
=======
                  <img src={profile} alt="profile" />
                  <span className="name">{board.userName}</span>
>>>>>>> 3c9c9d7 (더보기 버튼 추가)
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
        {/* 더보기 버튼 */}
        {visibleCount < allBoards.length && (
          <div className="loadingBtn">
            <button onClick={handleLoadMore}>더보기</button>
          </div>
        )}
      </div>
      {selectedBoard && (
        <BoardFormModal
          board={selectedBoard}
          onClose={() => setSelectedBoard(null)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default BoardPage;
