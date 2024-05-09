# 리액트 애플리케이션을 빌드하기 위한 베이스 이미지
FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

# 소스 코드 복사
COPY  . .

RUN npm run build

FROM nginx:alpine

COPY --from=0 /app/dist /usr/share/nginx/html

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
