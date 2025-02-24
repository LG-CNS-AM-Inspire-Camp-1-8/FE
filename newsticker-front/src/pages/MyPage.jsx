import styled from "styled-components";
import profileIcon from "../assets/icons/profile.png";
import UserEditFormModal from "../components/UserEditFormModal";
import { useEffect, useState } from "react";
import api from "../api/axios.jsx";

function MyPage() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModel = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await api.get("/user", { withCredentials: true });

        const { profileImg } = response.data;

        setUser(response.data);
        setProfile(profileImg);
      } catch (error) {
        console.error("회원 정보 조회 실패:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const myNewsList = [
    {
      id: 1,
      title: "관심 뉴스 1",
      content: "삼성전자 최고 ...",
      date: "2025년 2월 19일",
      newspaper: "매일경제",
    },
    {
      id: 2,
      title: "관심 뉴스 2",
      content: "삼성전자 최고 ...",
      date: "2025년 2월 19일",
      newspaper: "아주경제",
    },
    {
      id: 3,
      title: "관심 뉴스 3",
      content: "삼성전자 최고 ...",
      date: "2025년 2월 19일",
      newspaper: "매일경제",
    },
  ];

  const changeProfile = () => {
    console.log("changeProfile");
  };

  const downloadProfile = () => {
    console.log("downloadProfile");
  };

  return (
    <Container>
      <Logo>📈 NewsTickr</Logo>
      <MyBox>
        <Profile>
          <img src={profile || profileIcon} alt="프로필 이미지 " />
          <div className="actions">
            <div onClick={changeProfile}>사진 변경</div>
            <div onClick={downloadProfile}>사진 다운로드</div>
          </div>
        </Profile>
        <Info>
          {user ? (
            <>
              <div>{user.name}</div>
              <div>{user.email}</div>
            </>
          ) : (
            <div>로그인 후 이용해 주세요.</div>
          )}

          <div onClick={openModel}> 회원 정보 수정 </div>
        </Info>
      </MyBox>
      <Mynews>
        <Title>❤️‍🔥 나의 관심 뉴스</Title>
        <NewsList>
          {myNewsList.map((news) => (
            <NewsItem key={news.id}>
              <div className="sub-header">{news.newspaper}</div>
              <h2 className="news-content">{news.content}</h2>
              <div className="content-cneter">
                <p>{news.date}</p>
                <span className="newspaper">{news.newspaper}</span>
              </div>
            </NewsItem>
          ))}
        </NewsList>
      </Mynews>
      {isModalOpen && <UserEditFormModal onClose={closeModal} />}
    </Container>
  );
}
export default MyPage;

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
`;
const Logo = styled.h1`
  margin-left: 50px;
  font-size: 44px;
  font-weight: bold;
  color: #222;
`;
const MyBox = styled.div`
  width: 90%;
  margin-left: 30px;
  height: 140px;
  padding: 40px;
  background: #a50034;
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
    width: 120px;
    height: 120px;
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
    background: #6b6b6b;
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

const NewsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-left: 50px;
  margin-top: 20px;
`;

const NewsItem = styled.div`
  background: #e3e3e3;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
  width: 90%;
  margin-left: 20px;

  .sub-header {
    font-size: 18px;
    font-weight: bold;
    color: #555;
  }

  .news-content {
    font-size: 22px;
    font-weight: bold;
    color: #333;
    margin: 10px 0;
  }

  .content-center {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    color: #777;
  }
`;
