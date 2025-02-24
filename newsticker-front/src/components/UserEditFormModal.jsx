import { useState } from 'react';
import '../styles/Modal.css';

function UserEditFormModal({onClose}) {
  return(
      <div className="modal" onClick={onClose}>
          <div className="modal-content">
            <h2>게시글 작성</h2>
            <form>
                <img src='../assets/icons/profile.png'></img>
                <label className='modal_form'>회원정보</label>
                <input type='text'className = 'textname' placeholder="닉네임을 입력하세요" required />
                <label className='modal_form'>아이디</label>
                <input type="url" className = 'textname' placeholder="아이디를 입력하세요" />
                
                <button type="button" class="upload-button">회원정보 수정하기</button>
            </form>
            <button className ='closebtn' onClick={onClose}>X</button>
          </div>
      </div>
  );
}
export default BoardFormModal