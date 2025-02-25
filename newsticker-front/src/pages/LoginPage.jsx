import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import naverLogo from "../assets/icons/btnG_icon_square.png";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const goSignup = () => {
    navigate("/signup");
  };

  const onNaverLogin = () => {
    window.location.href = "http://localhost:8085/oauth2/authorization/naver";
  };

  return (
    <Container>
      <Logo>NewsTickr</Logo>
      <LoginBox>
        <Title>뉴스티커로 로그인</Title>
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
        </Box>
        <LoginBtn>로그인</LoginBtn>
        <NaverLoginBtn onClick={onNaverLogin}>
          <img src={naverLogo} />
          네이버 로그인
        </NaverLoginBtn>
        <SignUp>
          계정이 없으신가요?{" "}
          <a href="#" onClick={goSignup}>
            계정 생성
          </a>
        </SignUp>
      </LoginBox>
    </Container>
  );
}
export default LoginPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to bottom, #d6ebf2 0%, #f0f5fa 50%, #ffffff 100%);
`;

const Logo = styled.h1`
  font-family: "Julius Sans One", serif;
  font-style: normal;
  font-weight: 1000;
  font-size: 44px;
  font-weight: bold;
  color: #222;
  margin-bottom: 70px;
`;

const LoginBox = styled.div`
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
  font-size: 25px;
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

const LoginBtn = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #6b6b6b;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;
  margin-top: 10px;

  &:hover {
    background-color: #A50034;
  }
  img {
    width: 15px;
    margin-right: 3px;
  }
`;
const NaverLoginBtn = styled(LoginBtn)`
  background-color: #03C75A; /* 네이버 공식 색상 */
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 9px 20px;
  &:hover {
    background-color:  #03C75A;
  }
  img {
    width: 27px;
    height: 27px;
  }
`;


const SignUp = styled.p`
  margin-top: 20px;
  font-size: 14px;
  color: #555;

  a {
    color: #a50034;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;
