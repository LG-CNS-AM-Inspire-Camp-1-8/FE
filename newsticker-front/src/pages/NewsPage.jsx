import { useState,useEffect } from "react";
import NavBar from "../components/NavBar";
import NewsDetailModal from "../components/NewsDetailModal";
import '../styles/Page.css'
import api from "../api/axios";

function NewsPage() {
  const [selectedNews, setSelectedNews] = useState(null);
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    api.get("/news/news?query=nvidia")
    .then((response) => {
      setNewsList(response.data.items);
    })
  }, []);

  
  // const newsList = [
  //   { id: 1, title: '뉴스 제목1', content: '삼성전자 최고 ...', date: '2025년 2월 19일', newspaper:'매일경제'},
  //   { id: 2, title: '뉴스 제목2', content: '삼성전자 최고 ...', date: '2025년 2월 19일', newspaper:'아주경제'},
  //   { id: 3, title: '뉴스 제목3', content: '삼성전자 최고 ...', date: '2025년 2월 19일', newspaper:'매일경제'},
  //   { id: 4, title: '뉴스 제목4', content: '삼성전자 최고 ...', date: '2025년 2월 19일', newspaper:'매일경제'},
  //   { id: 5, title: '뉴스 제목5', content: '삼성전자 최고 ...', date: '2025년 2월 19일', newspaper:'매일경제'}
  // ];
  
  return(
      <div className="news-page">
        <NavBar />
        <div className="list">
          <h2>주요뉴스</h2>
          {newsList.map((news) => (
          <div key={news.link} className="item" onClick={() => setSelectedNews(news)}>
            
            <div className="sub-header">
              {/* <span className="title">{news.title}</span> */}
              <p dangerouslySetInnerHTML={{ __html: news.title}}/>
            </div>

            {/* <h2 className="content">{decodeURIComponent(news.description)}</h2> */}
            <p dangerouslySetInnerHTML={{ __html: news.description }}/>
            {/* <iframe src={news.link} width="100%" height="100%"></iframe> */}
            <div className="content-center">
            <p className="date">{news.pubDate}</p>
            {/* <span className="user">{news.newspaper}</span> */}
            </div>

        </div>
      ))}
        </div>
        {selectedNews && <NewsDetailModal news={selectedNews} onClose={() => setSelectedNews(null)} />}
      </div>
  );
}
export default NewsPage;