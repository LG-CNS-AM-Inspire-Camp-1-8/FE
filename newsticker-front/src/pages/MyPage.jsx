import styled from "styled-components";
import profileIcon from "../assets/icons/profile.png";
import UserEditFormModal from "../components/UserEditFormModal";
import { useEffect, useState } from "react";
import api from "../api/axios.jsx";
import ChangeImg from "../components/ChangeImg.jsx";
import NavBar from "../components/NavBar.jsx";
import { useNavigate } from "react-router-dom";

function MyPage() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgModal, setImgModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [myNewsList, setMyNewsList] = useState([]);
  const navigate = useNavigate();

  const openModel = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openImgModal = () => setImgModal(true);
  const closeImgModal = () => setImgModal(false);

  const goLogin = () => {
    navigate("/login");
  };

  const handleProfileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
    // const response = api.post("/user", file, { withCredentials: true ,contentType: "multipart/form-data"});
    // console.log(response);
    // if (response.data.success) {
    //   setProfile(URL.createObjectURL(file));
    // } else {
    //   console.error("파일 업로드 실패", response.data.message);
    // }
  };

  const handleProfileSubmit = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      console.log({ formData });
      try {
        const response = await api.post("/user", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response);
        if (response.status === 200) {
          setProfile(URL.createObjectURL(selectedFile));
        } else {
          console.error("파일 업로드 실패", response.data);
        }
      } catch (error) {
        console.error("파일 업로드 오류 발생", error);
      }
      closeImgModal();
    }
    fetchUserInfo();
  };
  const fetchUserInfo = async () => {
    try {
      const response = await api.get("/user/", { withCredentials: true });
      // console.log(response.data.profileImg);

      const { profileImg } = response.data;

      console.log(profileImg);
      setProfile(profileImg);
      setUser(response.data);
    } catch (error) {
      console.error("회원 정보 조회 실패:", error);
    }
  };
  useEffect(() => {
    
    const fetchMyPosts = async () => {
      try {
        const response = await api.get("/news/postList");
        setMyNewsList(response.data);
      } catch (error) {
        console.log("게시글 목록 조회 실패", error);
      }
    };

    fetchUserInfo();
    fetchMyPosts();
  }, []);

  const downloadProfile = async () => {
    try {
      // API 요청 보내기
      const response = await api.get(`/user/download/${profile}`, {
        responseType: "blob",
      });

      // Blob 객체 URL 생성
      const url = window.URL.createObjectURL(response.data);

      // 다운로드 링크 생성
      const a = document.createElement("a");
      a.href = url;
      a.download = "profile"; // 다운로드할 파일명 지정
      a.click();

      // Blob URL 해제
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("파일 다운로드 중 오류 발생:", error);
    }
  };

  return (
    <Container>
      <NavBar />
      <AllContainer>
      <Logo>NewsTickr</Logo>
      <MyBox>
        <Profile>
          <img
            src={`http://localhost:8085/user/profile/${profile}` || profileIcon}
            alt="프로필 이미지 "
          />
          <div className="actions">
            <div onClick={openImgModal}>사진 변경</div>
            <div onClick={downloadProfile}>사진 다운로드</div>
          </div>
        </Profile>
        <Info>
          {user ? (
            <>
              <div>{user.name}</div>
              <div>{user.email}</div>
              <div onClick={openModel}> 회원 정보 수정 </div>
            </>
          ) : (
            <>
              <div>로그인 후 이용해 주세요.</div>
              <div onClick={goLogin}>로그인하기</div>
            </>
          )}
        </Info>
      </MyBox>
      <Mynews>
        <Title>내가 작성한 글</Title>
        <NewsList>
          {myNewsList.map((news) => (
            <NewsItem key={news.id}>
              <h2 className="news-content">{news.title}</h2>
              <div className="content-cneter">
                <div>{news.content}</div>
                <p>{new Date(news.date).toLocaleString()}</p>
              </div>
            </NewsItem>
          ))}
        </NewsList>
      </Mynews>
      {isModalOpen && <UserEditFormModal onClose={closeModal} />}
      {imgModal && (
        <ChangeImg
          onClose={closeImgModal}
          handleProfileChange={handleProfileChange}
          handleProfileSubmit={handleProfileSubmit}
        />
      )}
      </AllContainer>
    </Container>
  );
}
export default MyPage;

const Container = styled.div`

`;
const AllContainer = styled.div`
  width: 70%;
  margin: 0 auto 50px;
`;
const Logo = styled.h1`
  font-size: 34px;
  font-weight: bold;
  color: #222;
  font-family: "Julius Sans One", serif;
  font-style: normal;
  font-weight: 1000;
`;
const MyBox = styled.div`
  height :100% ;
  padding: 40px;
  background: #a50034;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(94, 94, 94, 0.1);
  display: flex;
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
    font-size: 15px;
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
  font-size: 12px;

  div:first-child {
    font-weight: bold;
    font-size: 23px;
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
  font-size: 28px;
  color: #222;
  margin-top: 25px;
`;

const NewsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
`;

const NewsItem = styled.div`
  background: #e3e3e3;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);

  .sub-header {
    font-size: 15px;
    color: #555;
  }

  .news-content {
    font-size: 22px;
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
