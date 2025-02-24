import { useState } from "react";
import styled from "styled-components";

function ChangeImg({ onClose, handleProfileChange, handleProfileSubmit }) {
  return (
    <Container>
      <ModalContent>
        <h2>사진 변경</h2>
        <InputContainer>
          <input type="file" onChange={handleProfileChange} />
        </InputContainer>
        <Buttons>
          <button onClick={handleProfileSubmit}>변경</button>
          <button onClick={onClose}>닫기</button>
        </Buttons>
      </ModalContent>
    </Container>
  );
}

export default ChangeImg;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* 어두운 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 다른 요소들보다 위에 위치 */
`;

const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 40%;
  max-height: 80vh; /* 모달 최대 높이 */
  overflow-y: auto;
  text-align: center;
`;

const InputContainer = styled.div`
  margin-top: 20px;
  input[type="file"] {
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
  }
`;

const Buttons = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 8px;

  button {
    padding: 10px 20px;
    background: #a50034;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }

  button:hover {
    background: #b90000;
  }
`;
