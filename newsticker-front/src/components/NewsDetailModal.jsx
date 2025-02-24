import { useState } from "react";
import BoardFormModal from "../components/BoardFormModal";
import '../styles/Modal.css';

function NewsDetailModal({ news, onClose }) {
  const [showBoardModal, setShowBoardModal] = useState(false);

  if (!news) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>

        {/* 제목 + 게시글 작성 버튼 */}
        <div className="modal-header">
          <h2 className="news-title">{news.title}</h2>
        </div>

        {/* 출처 + 날짜 */}
        <div className="news-info">
          <span className="date">{news.pubDate}</span>
          <button className="circle-button" onClick={() => setShowBoardModal(true)}>게시글작성</button>
        </div>

        {/* 분석 결과 버튼 */}
        <div className="analysis-result">
          <button className="analysis-btn">감정 분석 결과 📊</button>
        </div>

        {/* 기사 요약 */}
        <h3>기사 본문 요약 📌</h3>
        <div className="news-summary">
          <p>{news.description}</p>
        </div>

        {/* 기사 본문 */}
        <div className="news-link">
          <p>{news.link}</p>
        </div>

        {/* 닫기 버튼 */}
        <button className="closebtn" onClick={onClose}>X</button>
      </div>

      {/* 게시물 작성 모달 */}
      {showBoardModal && (
        <BoardFormModal 
          board={news} 
          onClose={() => setShowBoardModal(false)} 
        />
      )}
    </div>
  );
}

export default NewsDetailModal;
