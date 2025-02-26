# Step 1: Build the React app using Node.js 21
FROM node:21 AS build

# 작업 디렉터리 설정
WORKDIR /app

# package.json과 package-lock.json을 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# React 애플리케이션 빌드
COPY . .
RUN npm run build

# Step 2: Set up Nginx to serve the build files
FROM nginx:alpine

# Nginx에서 제공할 빌드된 파일을 복사
COPY --from=build /app/dist /usr/share/nginx/html

# Nginx 포트 80을 열어둠
EXPOSE 80

# Nginx 서버 실행
CMD ["nginx", "-g", "daemon off;"]
