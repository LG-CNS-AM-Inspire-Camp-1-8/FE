import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import BoardFormModal from "../components/BoardDetailModal";
import "../styles/Page.css";
import profile from "../assets/icons/profile.png";
import api, {getUserId} from "../api/axios.jsx";

function BoardPage() {
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [allBoards, setAllBoards] = useState([]); // 전체 게시글 목록 저장
  const [boardlist, setBoardlist] = useState([]); // 화면에 보여줄 게시글 목록
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
    console.log(user);
    // console.log({user});
  },[]);

  // 게시글 불러오기
  useEffect(() => {
    const fetchMyBoards = async () => {
      try {
        const response = await api.get("/news/", {
          withCredentials: true, // 쿠키 기반 JWT 사용
        });

        console.log("내가 작성한 게시글:", response.data);
        setAllBoards(response.data); // 전체 데이터를 저장
        setBoardlist(response.data.slice(0, 5)); // 처음 3개만 보여줌
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

  // "더보기" 버튼 클릭 시 3개씩 추가 표시
  const handleLoadMore = () => {
    const newCount = visibleCount + 3; // 3개씩 증가
    setVisibleCount(newCount);
    setBoardlist(allBoards.slice(0, newCount)); // 기존 데이터 유지하면서 추가
  };

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
                  <img src={profile} alt="profile" />
                  <span className="name">{board.userName}</span>
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
          user={user}
        />
      )}
    </div>
  );
}

export default BoardPage;
