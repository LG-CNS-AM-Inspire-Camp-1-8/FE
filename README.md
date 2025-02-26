# 📖 프로젝트 개요

이 프로젝트는 react-router-dom을 활용하여 클라이언트 사이드 라우팅을 구현한 React 웹 애플리케이션입니다. 사용자는 여러 페이지를 이동할 수 있으며, 네비게이션을 통해 로그인, 회원가입, 마이페이지, 게시판 등을 접근할 수 있습니다.

🛠️ 기술 스택

React: UI 컴포넌트 기반 웹 프레임워크

React Router: 클라이언트 사이드 라우팅 관리

CSS: 스타일링

Node.js & npm: 패키지 관리 및 실행 환경

📂 폴더 구조

📦 프로젝트 루트
<img width="160" alt="스크린샷 2025-02-26 오후 4 15 38" src="https://github.com/user-attachments/assets/e7df0fa3-5512-4c05-b55c-2496dc566c1a" />




🚀 실행 방법

1. 프로젝트 클론

git clone https://github.com/your-repository.git
cd your-repository

2. 패키지 설치

npm install

3. 개발 서버 실행

npm start

브라우저에서 http://localhost:3000으로 접속하여 확인할 수 있습니다.

🔗 라우팅 설정

현재 react-router-dom을 활용하여 다음과 같은 경로를 제공합니다:

경로 (path)

렌더링되는 컴포넌트 (element)

/

<NewsPage />

/login

<LoginPage />

/signup

<SignUpPage />

/mypage

<MyPage />

/boardPage

<BoardPage />

/boardWrite

<BoardWritePage />

📌 주요 기능

✅ 클라이언트 사이드 라우팅 (react-router-dom 사용)
✅ 여러 페이지 간 이동 (BrowserRouter 및 Route 활용)
✅ URL에 따라 동적으로 페이지 렌더링
✅ 네비게이션 바 추가 가능 (<Link> 컴포넌트 활용)

📝 추가할 기능

🔹 네비게이션 바 추가

🔹 인증 및 로그인/회원가입 기능 추가

🔹 상태 관리 라이브러리 도입 (예: Redux, Context API)

📜 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다. 자유롭게 수정 및 배포 가능합니다.
