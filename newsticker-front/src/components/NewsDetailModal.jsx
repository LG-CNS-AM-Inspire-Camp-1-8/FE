import { useState } from "react";
import '../styles/NewsDetailModal.css'
function NewsDetailModal({news,onClose}) {
    if (!news) return null
    return(
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>{news.title}</h2>
                <p>{news.content}</p>
                <span className="date">{news.date}</span>
                <button onClick={onClose}>X</button>
            </div>
        </div>
    );
}
export default NewsDetailModal;