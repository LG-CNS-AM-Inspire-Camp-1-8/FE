import { useState } from "react";
import "../styles/Modal.css";

function BoardFormModal({ onClose }) {
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content">
        <h2>게시글 작성</h2>
        <form>
          <label className="modal_form">제목</label>
          <input
            type="text"
            className="textname"
            placeholder="제목을 입력하세요"
            required
          />
          <label className="modal_form">기사 링크</label>
          <input
            type="url"
            className="textname"
            placeholder="기사 링크를 입력하세요"
          />

          <label className="modal_form">사진</label>
          <div class="file-input">
            <input type="file" className="fileupload" />
          </div>
          <button type="button" class="upload-button">
            업로드
          </button>
        </form>
        <button className="closebtn" onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
}
export default BoardFormModal;
