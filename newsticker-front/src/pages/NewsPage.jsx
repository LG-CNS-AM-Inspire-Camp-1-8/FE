import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import NewsDetailModal from "../components/NewsDetailModal";
import "../styles/Page.css";
import api from "../api/axios";

import page0 from "../assets/icons/page0.png";
import page1 from "../assets/icons/page1.png";
import page2 from "../assets/icons/page2.png";
import page3 from "../assets/icons/page3.png";
import page4 from "../assets/icons/page4.png";
import page5 from "../assets/icons/page5.png";
import page6 from "../assets/icons/page6.png";
import page7 from "../assets/icons/page7.png";

function NewsPage() {
  const [selectedNews, setSelectedNews] = useState(null);
  const [newsList, setNewsList] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const defaultQuery = "nvidia"; // 기본 뉴스 키워드

  /* 뉴스 이미지 더미 */
  const images = [page0, page1, page2, page3, page4, page5, page6, page7];
  const getRandomImage = () => images[Math.floor(Math.random() * images.length)];

  // 🔹 기본 뉴스 불러오기 함수
  const fetchDefaultNews = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/news/news?query=${defaultQuery}`);
      setNewsList(response.data.items);
    } catch (error) {
      console.error("기본 뉴스 불러오기 실패:", error);
    }
    setLoading(false);
  };

  // 🔹 첫 렌더링 시 기본 뉴스 요청
  useEffect(() => {
    fetchDefaultNews();
  }, []);

  // 🔹 검색 기능 (검색창이 비어있으면 기본 뉴스 복구)
  useEffect(() => {
    if (query.trim() === "") {
      fetchDefaultNews();
      return;
    }

    setLoading(true);
    api.get(`/news/news?query=${query}`)
      .then((response) => {
        setNewsList(response.data.items);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [query]);

  // 🔹 검색창이 비었을 때 기본 뉴스로 복원하는 함수
  const resetNewsList = () => {
    setQuery(""); // 검색어 초기화
    fetchDefaultNews();
  };

  return (
    <div className="news-page">
      <NavBar onNewsSearch={setQuery} onBoardSearch={() => {}} resetNewsList={resetNewsList} />
      <div className="list">
        <h2>주요뉴스</h2>
        {!loading && newsList.length === 0 && query && <p>검색 결과가 없습니다.</p>}
        {newsList.map((news) => (
          <div key={news.link} className="item" onClick={() => setSelectedNews(news)}>
            <div className="sub-header">
              <img src={getRandomImage()} className="news-image" alt="news" />
              <div className="content">
                <p dangerouslySetInnerHTML={{ __html: news.title }} />
                <p dangerouslySetInnerHTML={{ __html: news.description }} />
                <p className="date">{news.pubDate.split(" +")[0]}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedNews && (
        <NewsDetailModal news={selectedNews} onClose={() => setSelectedNews(null)} />
      )}
    </div>
  );
}

export default NewsPage;
