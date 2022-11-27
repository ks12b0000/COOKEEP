FROM openjdk:11
ARG JAR_FILE=*.jar
ENV TZ=Asia/Seoul
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]