import { useState } from 'react';
import '../styles/Modal.css';

function BoardDetailModal({board,onClose}) {
  if (!board) return null
  const [isReplyVisible, setIsReplyVisible] = useState(false);
  return(
    <div className="modal" onClick={onClose}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{board.title}</h2>
        <span className="date">{board.date}</span>
        <p>작성자 이름</p>
        <p>작성시간</p>
        <p>감정 분석 결과!</p>
        <h2>기사 본문 요약</h2>
        <p>{board.content}</p>
        <p>댓글추가</p>
        <form className='form-comment'>
            <textarea placeholder='댓글을 남겨주세요'></textarea>
            <button type='button' className='submit'>등록하기</button>
        </form>
        <div class="comments">
            <div class="comment">
              <div class="content">
                <header class="top">
                  <div class="username">우연히 들어온 사람</div>
                  <div class="utility">
                    <button class="menu">삭제</button>
                  </div>
                </header>
                <p>너무 좋은 글입니다. 잘 보고 가요 !!</p>
                <ul class="bottom">
                  <li class="menu time">3 days ago</li>
                  <li class="divider"></li>
                  <button class="show-reply" onClick={() => setIsReplyVisible(!isReplyVisible)}>
                    {isReplyVisible ? "Hide Replies" : "show Replies (1)"}
                </button>
                </ul>
              </div>
            </div>
        </div>

        {/* 답글 */}
        {isReplyVisible && (
          <div className="replies">
            <div className="reply">
              <div className="content">
                <header className="top">
                  <div className="username">관리자</div>
                </header>
                <p>감사합니다!</p>
                <ul className="bottom">
                  <li className="menu time">3 days ago</li>
                </ul>
              </div>
            </div>
            <form className="form reply-form">
              <textarea placeholder="Reply"></textarea>
              <button type="button" className="submit">등록하기</button>
            </form>
          </div>
        )}
        <button className = 'closebtn' onClick={onClose}>X</button>
    </div>
</div>
  );
}
export default BoardDetailModal
