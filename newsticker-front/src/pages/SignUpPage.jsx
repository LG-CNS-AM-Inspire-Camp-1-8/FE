import { useState } from "react";
import styled from "styled-components";

function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePw, setRePw] = useState("");
  const [nickname, setNickname] = useState("");

  const isPasswordMatch = rePw && password === rePw;

  return (
    <Container>
      <Logo>NewsTickr</Logo>
      <SignUpBox>
        <Title>Sign Up</Title>
        <Box>
          <Label>아이디</Label>
          <Input
            type="text"
            placeholder="아이디를 입력해주세요"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Box>

        <Box>
          <Label>비밀번호</Label>
          <Input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputContainer>
            <Input
              type="password"
              placeholder="비밀번호를 다시 입력해주세요"
              value={rePw}
              onChange={(e) => setRePw(e.target.value)}
              style={{ marginTop: "10px" }}
            />
            {rePw && <Icon>{isPasswordMatch ? "✔️" : "❌"}</Icon>}
          </InputContainer>
        </Box>
        <Box>
          <Label>닉네임</Label>
          <Input
            type="text"
            placeholder="닉네임을 입력해주세요"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </Box>
        <SignUpBtn>가입하기</SignUpBtn>
      </SignUpBox>
    </Container>
  );
}
export default SignUpPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to bottom, #d6ebf2 0%, #f0f5fa 50%, #ffffff 100%);
`;

const Logo = styled.h1`
  font-size: 44px;
  font-weight: bold;
  color: #222;
  margin-bottom: 70px;
  font-family: "Julius Sans One", serif;
  font-style: normal;
  font-weight: 1000;
`;

const SignUpBox = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 40px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 30px;
  color: #333;
`;

const Box = styled.div`
  margin-bottom: 20px;
  text-align: left;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
`;

const Input = styled.input`
  width: 93%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
`;

const SignUpBtn = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #6b6b6b;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #A50034;
  }
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Icon = styled.span`
  position: absolute;
  right: 20px;
  font-size: 13px;
  top: 40%;
`;
