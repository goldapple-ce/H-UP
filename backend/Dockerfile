FROM openjdk:17-jdk-alpine AS builder

# necessary files copy
COPY gradlew .
COPY build.gradle .
COPY settings.gradle .
COPY gradle gradle
COPY src src

# 권한 변경
RUN chmod +x ./gradlew

# 백엔드 빌드
RUN ./gradlew clean bootJar

FROM openjdk:17-jdk

# 빌드 파일 복사
COPY --from=builder build/libs/*.jar app.jar

# 포트 8081 공개
EXPOSE 8080

# 환경변수 적용 및 실행
ENTRYPOINT ["java", "-jar", "/app.jar"]

