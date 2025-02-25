import styled from "styled-components";
import NavBar from "../components/NavBar";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/axios.jsx";

function BoardWritePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { link, description } = location.state || {};

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [sanitizedDescription, setSanitizedDescription] = useState("");
  const sanitizeText = (text) => {
    return text
      ?.replace(/\s+/g, " ") // 개행 및 공백 문자 제거
      .replace(/<[^>]*>/g, "") // HTML 태그 제거
      .trim(); // 앞뒤 공백 제거
  };
  useEffect(() => {
    if (description) {
      setSanitizedDescription(sanitizeText(description));
    }
  }, [description]);

  const fetchAnalysis = async (description) => {
    try {
      const response = await api.post("/news/analysis", {
        summary: sanitizeText(description),
      });
      const analysisResult = response.data;

      setAnalysis(analysisResult);
      console.log("감정 분석 결과:", analysisResult);
    } catch (error) {
      console.log("감정 분석 오류:", error);
    }
  };

  useEffect(() => {
    console.log("받아온 뉴스 링크:", link);
    console.log("받아온 뉴스 요약:", description);
    if (description) {
      fetchAnalysis(description);
    }
  }, [description]);

  const handleSubmit = async () => {
    const sanitizedDescription = sanitizeText(description);

    console.log("원본 요약:", description);
    console.log("개행 제거 후 :", sanitizedDescription);

    try {
      const response = await api.post("/news/post", {
        link,
        title,
        description: sanitizedDescription,
        analysis,
        content,
      });

      console.log("게시글 등록 요청:", response.data);
      alert("게시글 등록 완료!");
      navigate("/boardPage");
    } catch (error) {
      console.error("게시글 등록 오류:", error);
      alert("게시글 등록에 실패했습니다. ");
    }
  };
  return (
    <div>
      <NavBar />
      <Container>
        <Title>게시글 작성</Title>

        <Label>제목 </Label>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Label>기사 요약 🔮</Label>
        <SumBox>{sanitizedDescription}</SumBox>

        <Label>내용 📝</Label>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <SubmitButton onClick={handleSubmit}>게시글 등록</SubmitButton>
      </Container>
    </div>
  );
}

export default BoardWritePage;

const Container = styled.div`
  width: 80%;
  margin: 50px auto 0;
  margin-left: 300px;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 29px;
  margin-bottom: 20px;
  margin-top: -20px;
  text-align: center;
  margin-right: 220px;
`;

const Label = styled.label`
  font-size: 18px;
  margin-bottom: 5px;
  font-weight: 700;
  margin-left: 10px;
`;

const Input = styled.input`
  width: 80%;
  height: 20px;
  background-color: #e0e0e0;
  border: none;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 15px;
`;

const Textarea = styled.textarea`
  width: 82%;
  height: 400px;
  background-color: #e0e0e0;
  border: none;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
`;

const SubmitButton = styled.button`
  background-color: #a50034;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  align-self: center;
  height: 40px;
  font-size: 15px;
  margin-right: 230px;
`;

const SumBox = styled.div`
  background-color: #e0e0e0;
  width: 80%;
  min-height: 50px;
  padding: 10px;
  border-radius: 5px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  margin-bottom: 20px;
`;
