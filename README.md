# NewsTickr
AI 기반 증권 요약 및 평가 서비스


## 🖥️ 프로젝트 소개 및 배경
뉴스티커는? 증권 거래소에서 시세가 시시각각으로 변동하는 것처럼, 뉴스도 신속하고 정확하게 전달되어 실시간으로 흐른다는 의미를 갖고 있다.

투자자들은 다양한 뉴스 속에서 신뢰할 수 있는 핵심 정보를 빠르게 파악하기 어려움
Open API를 활용해 증권 종목 뉴스를 요약·평가하는 서비스를 기획
댓글 기능과 관리자 시스템을 통해 신뢰할 수 있는 금융 정보 커뮤니티를 구축

<br>

## 🕰️ 개발 기간
* 25.02.24 ~ 25.02.27

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
#### 로그인 - <a href="https://github.com/chaehyuenwoo/SpringBoot-Project-MEGABOX/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C(Login)" >상세보기 - WIKI 이동</a>
- DB값 검증
- ID찾기, PW찾기
- 로그인 시 쿠키(Cookie) 및 세션(Session) 생성
#### 회원가입 - <a href="https://github.com/chaehyuenwoo/SpringBoot-Project-MEGABOX/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C(Member)" >상세보기 - WIKI 이동</a>
- 주소 API 연동
- ID 중복 체크
#### 마이 페이지 - <a href="https://github.com/chaehyuenwoo/SpringBoot-Project-MEGABOX/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C(Member)" >상세보기 - WIKI 이동</a>
- 주소 API 연동
- 회원정보 변경

#### 영화 예매 - <a href="https://github.com/chaehyuenwoo/SpringBoot-Project-MEGABOX/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C(%EC%98%81%ED%99%94-%EC%98%88%EB%A7%A4)" >상세보기 - WIKI 이동</a>
- 영화 선택(날짜 지정)
- 영화관 선택(대분류/소분류 선택) 및 시간 선택
- 좌석 선택
- 결제 페이지
- 예매 완료
#### 메인 페이지 - <a href="https://github.com/chaehyuenwoo/SpringBoot-Project-MEGABOX/wiki/%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%86%8C%EA%B0%9C(%EB%A9%94%EC%9D%B8-Page)" >상세보기 - WIKI 이동</a>
- YouTube API 연동
- 메인 포스터(영화) 이미지 슬라이드(CSS)
#### 1대1문의 및 공지사항 - <a href="" >상세보기 - WIKI 이동</a> 
- 글 작성, 읽기, 수정, 삭제(CRUD)

#### 관리자 페이지 
- 영화관 추가(대분류, 소분류)
- 영화 추가(상영시간 및 상영관 설정)
