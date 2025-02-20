import styled from "styled-components";
import account from "../assets/icons/Account.png";
import image from "../assets/images/image.png";

function BoardDetailPage() {
  return (
    <Container>
      <InfoBox>
        <Title>게시글 제목입니다 게시글 제목입니다</Title>
        <Info>
          <UserInfo>
            <img src={account} alt="사용자 아이콘" />
            <span>사용자 이름</span>
            <span>2025년 02월 17일 17:00</span>
          </UserInfo>
          <Stats>
            <span>💬 3</span>
            <span>🖤 30</span>
          </Stats>
        </Info>
      </InfoBox>
      <Judgement>감정 분석 결과 !</Judgement>

      <ImageContainer>
        <img src={image} alt="분석 결과 이미지" />
      </ImageContainer>

      <Label>기사 본문 요약 📝</Label>
      <Summary>본문 요약 내용</Summary>
      <Contents>게시글 내용</Contents>
    </Container>
  );
}
export default BoardDetailPage;

const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const InfoBox = styled.div`
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 12px;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  span {
    font-size: 14px;
    color: #555;
  }
`;

const Stats = styled.div`
  display: flex;
  gap: 10px;

  span {
    font-size: 14px;
    color: #555;
  }
`;

const Judgement = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
  background-color: #a7c3ff;
  border-radius: 8px;

  padding: 15px;
`;

const ImageContainer = styled.div`
  width: 100%;
  overflow: hidden;
  border-radius: 5px;
  margin-bottom: 24px;

  img {
    width: 100%;
    height: auto;
  }
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  color: #333;
  font-size: 18px;
  margin-bottom: 8px;
`;

const Summary = styled.div`
  background-color: #9d0101;
  height: 200px;
  color: white;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 24px;
  font-size: 16px;
`;

const Contents = styled.div`
  background-color: #e5e7eb;
  height: 400px;
  padding: 20px;
  border-radius: 12px;
  font-size: 15px;
  color: #333;
  line-height: 1.6;
`;
