import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import BoardFormModal from "../components/BoardDetailModal";
import "../styles/Page.css";
import api, {getUserId} from "../api/axios.jsx";
import BoardDetailModal from "../components/BoardDetailModal";

function BoardPage() {
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [allBoards, setAllBoards] = useState([]); 
  const [boardlist, setBoardlist] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [ user, setUser ] = useState(null);
  const fetchUserFromJwt = async () => {
    const userInfo = getUserId();
    setUser(userInfo);
  };

  useEffect(() => {
    fetchUserFromJwt();
    // console.log({user});
  },[]);

  // 게시글 불러오기
  useEffect(() => {
    const fetchMyBoards = async () => {
      try {
        const response = await api.get("/news/", { withCredentials: true });
        console.log("내가 작성한 게시글:", response.data);
        setAllBoards(response.data);
        setBoardlist(response.data.slice(0, 5));
      } catch (error) {
        console.error("게시글을 불러오는 데 실패했습니다.", error);
      }
    };

    fetchMyBoards();
  }, []);

  // 검색 기능
  useEffect(() => {
    if (query.trim() === "") return;
    setLoading(true);

    api.get(`/news/${query}`)
      .then((response) => {
        setBoardlist(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("게시글 검색 오류:", error);
        setLoading(false);
      });
  }, [query]);

  // "더보기" 버튼 클릭 시 5개씩 추가 표시
  const handleLoadMore = () => {
    const newCount = visibleCount + 5;
    setVisibleCount(newCount);
    setBoardlist(allBoards.slice(0, newCount));
  };

  const handleDelete = (deletedId) => {
    setBoardlist((prev) => prev.filter((board) => board.id !== deletedId));
  };
  
  // 검색어가 비어 있을 때 원래 게시글 목록 복원
  const resetBoardList = () => {
    setBoardlist(allBoards.slice(0, visibleCount));
  };

  return (
    <div className="board-page">
      <NavBar onNewsSearch={() => {}} onBoardSearch={setQuery} resetBoardList={resetBoardList} />
      <div className="list">
        <h2>게시글 목록</h2>
        {boardlist.length === 0 ? (
          <p>작성한 게시글이 없습니다.</p>
        ) : (
          boardlist.map((board) => (
            <div key={board.id} className="item" onClick={() => setSelectedBoard(board)}>
              <div className="boardContent">
                <div className="userprofile">
                  <img src={`http://localhost:8085/user/profile/${board.profileImg}`} alt="profile" />
                  <span className="name">{board.userName}</span>
                </div>
                <div className="board-title">
                  <p>{board.title}</p>
                  <p>{board.description}</p>
                  <p>{new Date(board.date).toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))
        )}
        {boardlist.length >= 5 && visibleCount < allBoards.length && (
          <div className="loadingBtn">
            <button onClick={handleLoadMore}>더보기</button>
          </div>
        )}

      </div>
      {selectedBoard && (
          <BoardDetailModal board={selectedBoard} onClose={() => setSelectedBoard(null)} user={user} onDelete={handleDelete}/>
      )}
    </div>
  );
}

export default BoardPage;
