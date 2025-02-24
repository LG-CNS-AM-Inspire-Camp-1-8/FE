import { useState } from "react";
import "../styles/Modal.css";

function UserEditFormModal({ onClose }) {
  const handelBackgroundClick = (e) => {
    if (e.target.classList.contains("model")) {
      onClose();
    }
  };
  return (
    <div className="modal" onClick={handelBackgroundClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>회원 정보 수정</h2>
        <form>
          <img src="../assets/icons/profile.png"></img>
          <label className="modal_form">회원정보</label>
          <input
            type="text"
            className="textname"
            placeholder="닉네임을 입력하세요"
            required
          />
          <label className="modal_form">아이디</label>
          <input
            type="url"
            className="textname"
            placeholder="아이디를 입력하세요"
          />

          <button type="button" class="upload-button">
            회원정보 수정하기
          </button>
        </form>
        <button className="closebtn" onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
}
export default UserEditFormModal;
