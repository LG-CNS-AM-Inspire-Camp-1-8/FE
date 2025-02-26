# NewsTickr
AI 기반 증권 요약 및 평가 서비스


## 🖥️ 프로젝트 소개 및 배경
뉴스티커는? 증권 거래소에서 시세가 시시각각으로 변동하는 것처럼, 뉴스도 신속하고 정확하게 전달되어 실시간으로 흐른다는 의미를 갖고 있다.

1. 투자자들은 다양한 뉴스 속에서 신뢰할 수 있는 핵심 정보를 빠르게 파악하기 어려움
2. Open API를 활용해 증권 종목 뉴스를 요약·평가하는 서비스를 기획
3. 댓글 기능과 관리자 시스템을 통해 신뢰할 수 있는 금융 정보 커뮤니티를 구축

<br>

## 🕰️ 개발 기간
* 25.02.24 ~ 25.02.27

##파일구조
| NewsTickr-FrontEnd | Description |
|------------|------------|
| `nginx/` | Contains Nginx configuration files for deployment. |
| ├── `nginx.conf` | Nginx configuration file. |
| `node_modules/` | Auto-generated dependencies (not included in version control). |
| `src/` | Source code directory. |
| ├── `api/` | Contains API-related functions (e.g., fetching data). |
| ├── `assets/` | Static assets such as images, fonts, and icons. |
| ├── `components/` | Reusable React components. |
| ├── `pages/` | Page-level React components (used in React Router). |
| ├── `styles/` | Global styles and CSS files. |
| ├── `App.css` | Main CSS file for global styles. |
| ├── `App.jsx` | Root React component that serves as the entry point of the UI. |
| ├── `index.css` | Global stylesheet for base styles. |
| ├── `main.jsx` | Application entry point, rendering `App.jsx` into the DOM. |
| `.gitignore` | Specifies files and folders to be ignored by Git. |
| `Dockerfile` | Docker configuration for containerizing the application. |
| `eslint.config.js` | ESLint configuration for code linting. |
| `index.html` | Main HTML file that serves as the app’s base template. |
| `package-lock.json` | Lockfile for package dependencies. |
| `package.json` | Metadata and dependencies for the project. |
| `README.md` | Project documentation. |
| `vite.config.js` | Configuration file for Vite (build tool). |
 
### 🧑‍🤝‍🧑 맴버구성
 - 백엔드  : 곽동헌,김우영,조윤수
 - 프론트엔드 : 김지현,이다빈

### ⚙️ 기술 스택

프론트엔드: React (뉴스 목록)
백엔드: Spring Boot (뉴스 API, 댓글 관리, Open API 연동)
데이터베이스: MySQL
배포: Docker, Docker Hub, docker - compose
AI: OpenAI API (기사 요약 및 평가 )

## 📌 주요 기능
###NavBar
- 뉴스검색 (title)
- 게시글 목록 검색 (title)
- 로그아웃
#### 로그인 
- 네이버 로그인 api OAuth 

#### 마이 페이지
- 사진병경
- 사진 다운로드
- 로그인 하면 나의 이미지와 내 이메일이 보여진다
- 로그인 하면 내가 작성한 글 보이기
- 회원정보수정 가능 (내 이름, 이메일)

#### 게시글 작성 페이지
- 뉴스 요약 분석 불러오기
- 제목 , 내용 작성해서 submit
  
#### 게시글 페이지
- 게시글 작성 페이지에서 넘어온 게시물들 보이기
- 검색기능
- 초기 5개만 보여지고 더보기 버튼 누르면 이어서 게시물들이 보여짐
  
###게시글 모달페이지
- 게시글 삭제
- 주가영향분석결과
- 기사본문요약
- 내가 작성한 내용
- 댓글기능 추가
- 댓글 수정 삭제 가능
  
#### 뉴스 페이지
- 뉴스페이지 api 불러오기
- 검색기능

#### 뉴스 모달 페이지
- 주가 영향 분석 결과 api
- 기사 본문 요약 api
- 원본뉴스로 이동
- 게시글 작성 (로그인하지 않으면 로그인 확인 alert창)
