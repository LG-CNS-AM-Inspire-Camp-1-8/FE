import { useState } from "react";
import "../styles/Modal.css";
import api from "../api/axios";

function UserEditFormModal({ onClose }) {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");

  const handelBackgroundClick = (e) => {
    if (e.target.classList.contains("model")) {
      onClose();
    }
  };

  const handleUpdtaeUserInfo = async () => {
    try {
      const params ={
        name: nickname,
        email: email,
      }
      const response = await api.put("/user/info",params);
      console.log(response);
      if (response.status === 200) {
        alert("회원 정보가 수정되었습니다.");
        onClose();
      } else {
        alert("회원 정보 수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("회원 정보 수정 오류:", error);
      alert("오류가 발생했습니다.");
    }
  };

  return (
    <div className="modal" onClick={handelBackgroundClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>회원 정보 수정</h2>
        <form>
          <label className="modal_form">닉네임</label>
          <input
            type="text"
            className="textname"
            placeholder="닉네임을 입력하세요"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
          <label className="modal_form">아이디(이메일)</label>
          <input
            type="url"
            className="textname"
            placeholder="아이디(이메일)를 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="button"
            class="upload-button"
            onClick={handleUpdtaeUserInfo}
          >
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
