import { useState,useEffect } from "react";
import NavBar from "../components/NavBar";
import NewsDetailModal from "../components/NewsDetailModal";
import '../styles/Page.css'
import api from "../api/axios";
import image from '../assets/icons/nvidia.jpg'

function NewsPage() {
  const [selectedNews, setSelectedNews] = useState(null);
  const [newsList, setNewsList] = useState([]);
  const [query, setQuery] = useState(""); 
  const [loading, setLoading] = useState(false);

  //보여지는 더미 뉴스들
  useEffect(() => {
    api.get("/news/news?query=nvidia")
    .then((response) => {
      setNewsList(response.data.items);
    })
  }, []);
  useEffect(() => {
    if(query === "") return; 
    setLoading(true);
    api
      .get(`/news/news?query=${query}`)
      .then((response) => {
        setNewsList(response.data.items);
      })
  }, [query]);

  
  return(
      <div className="news-page">
        <NavBar onSearch={setQuery}/>
        <div className="list">
          <h2>주요뉴스</h2>
          {!loading && newsList.length === 0 && query && <p>검색 결과가 없습니다.</p>}
          {newsList.map((news) => (
            <div key={news.link} className="item" onClick={() => setSelectedNews(news)}>
            <div className="sub-header">
              <img src={image} className="news-image"></img>
            
              <div className="content">
                <p dangerouslySetInnerHTML={{ __html: news.title}}/>
                <p dangerouslySetInnerHTML={{ __html: news.description }}/>
                <p className="date">{news.pubDate}</p>
              </div>
            </div>
        </div>
      ))}
        </div>
        {selectedNews && <NewsDetailModal news={selectedNews} onClose={() => setSelectedNews(null)} />}
      </div>
  );
}
export default NewsPage;