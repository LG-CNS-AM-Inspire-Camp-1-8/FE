import styled from "styled-components";
import profile from "../assets/icons/profile.png";

function MyPage() {
  return (
    <Container>
      <Logo>📈 NewsTickr</Logo>
      <MyBox>
        <Profile>
          <img src={profile} />
          <div className="actions">
            <div>사진 변경</div>
            <div>사진 다운로드</div>
          </div>
        </Profile>
        <Info>
          <div>김땡땡</div>
          <div>newstickr@naver.com</div>
          <div> 회원 정보 수정 </div>
        </Info>
      </MyBox>
      <Mynews>
        <Title>❤️‍🔥 나의 관심 뉴스</Title>
      </Mynews>
    </Container>
  );
}
export default MyPage;

const Container = styled.div``;
const Logo = styled.h1`
  margin-left: 50px;
  font-size: 44px;
  font-weight: bold;
  color: #222;
`;
const MyBox = styled.div`
  width: 92%;
  margin-left: 30px;
  height: 200px;
  padding: 40px;
  background: linear-gradient(to right, #c66, #cd3c3c);
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  display: flex;
  align-items: center;
  gap: 50px;
`;
const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .actions {
    margin-top: 15px;
    display: flex;
    gap: 15px;
  }

  div {
    font-size: 20px;
    color: white;
    cursor: pointer;
  }
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  color: white;
  font-size: 20px;

  div:first-child {
    font-weight: bold;
    font-size: 30px;
    margin-bottom: 5px;
  }

  div:last-child {
    background: black;
    margin-top: 10px;
    color: white;
    padding: 6px 12px;
    border-radius: 6px;
    width: fit-content;
    cursor: pointer;
  }
`;
const Mynews = styled.div``;
const Title = styled.h2`
  margin-left: 50px;
  font-size: 28px;
  font-weight: bold;
  color: #222;
`;
