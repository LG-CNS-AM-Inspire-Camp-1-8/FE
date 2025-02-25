import { useState } from "react";
import BoardFormModal from "../components/BoardFormModal";
import "../styles/Modal.css";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function NewsDetailModal({ news, onClose }) {
  const [showBoardModal, setShowBoardModal] = useState(false);
  const [analysisResult,setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

const analyzeSentiment = async (newsContent) => {
  setIsAnalyzing(true);
  setAnalysisResult(null);

  try {
    const response = await api.post("/news/analysis", { summary: newsContent });
    console.log("감정 분석 응답:", response.data); // 응답 확인

    // API 응답 데이터에서 정확한 키 이름을 사용해야 함
    setAnalysisResult(response.data);
  } catch (error) {
    console.error("감정 분석 실패:", error);
  } 
};
  const navigate = useNavigate();

  if (!news) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* 제목 + 게시글 작성 버튼 */}
        <h2 className="news-title">{news.title}</h2>

        {/* 출처 + 날짜 */}
        <div className="news-info">
          <p className="date">{news.pubDate.split(" +")[0]}</p>
          <button
            className="boardGoBtn"
            onClick={() =>
              navigate("/boardWrite", {
                state: {
                  link: news.link,
                  description: news.description,
                },
              })
            }
          >
            게시글작성
          </button>
        </div>

        
      {/* 감정 분석 버튼 */}
      <div className="analysis-result">
        <button
          className="analysis-btn"
          onClick={() => analyzeSentiment(news.description)}
          disabled={isAnalyzing} // 분석 중이면 버튼 비활성화
        >
          "주가 영향 분석 결과 📊"
        </button>

        {/* 분석 결과 표시 */}
        {analysisResult && <p className="analysis-text">결과: {analysisResult}</p>}
      </div>

        {/* 기사 요약 */}
        <h3>기사 본문 요약 📌</h3>
        <div className="news-summary">
          <p>{news.description}</p>
        </div>

        {/* 기사 본문 */}
        <h3>원본 뉴스로 📌</h3>
        <div className="news-link">
          <a href={news.link} target="_blank" rel="noopener noreferrer">
            {news.link}
          </a>
        </div>

        {/* 닫기 버튼 */}
        <button className="closebtn" onClick={onClose}>
          X
        </button>
      </div>

      {/* 게시물 작성 모달 */}
      {showBoardModal && (
        <BoardFormModal board={news} onClose={() => setShowBoardModal(false)} />
      )}
    </div>
  );
}

export default NewsDetailModal;
