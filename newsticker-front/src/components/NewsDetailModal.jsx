import { useState } from "react";
import BoardFormModal from "../components/BoardFormModal";
import '../styles/Modal.css';

function NewsDetailModal({ news, onClose }) {
  const [showBoardModal, setShowBoardModal] = useState(false);

  if (!news) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
            <h2>{news.title}</h2>
            <button className ='boardbtn' onClick={() => setShowBoardModal(true)}>게시물작성</button>
        </div>
        <p>{news.content}</p>
        <span className="date">{news.date}</span>
        <button className = 'closebtn' onClick={onClose}>X</button>
      </div>
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
