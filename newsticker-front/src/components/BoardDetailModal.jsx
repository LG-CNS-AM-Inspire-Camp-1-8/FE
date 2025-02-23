import { useState } from 'react';
import '../styles/Modal.css';

function BoardDetailModal({board,onClose}) {
  if (!board) return null
  return(
    <div className="modal" onClick={onClose}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{board.title}</h2>
        <span className="date">{board.date}</span>
        <p>작성자 이름</p>
        <p>작성시간</p>
        <p>감정 분석 결과!</p>
        <h1>기사 본문 요약</h1>
        <p>{board.content}</p>
        <button className = 'closebtn' onClick={onClose}>X</button>
    </div>
</div>
  );
}
export default BoardDetailModal
