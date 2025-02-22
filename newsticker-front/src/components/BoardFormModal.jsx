import { useState } from 'react';
import '../styles/Modal.css';

function BoardFormModal({board,onClose}) {
  if (!board) return null
  return(
      <div className="modal" onClick={onClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>{board.title}</h2>
              <p>{board.content}</p>
              <span className="date">{board.date}</span>
              <button onClick={onClose}>X</button>
          </div>
      </div>
  );
}
export default BoardFormModal
