FROM openjdk:11
ARG JAR_FILE=build/libs/*.jar
ENV TZ=Asia/Seoul
COPY ${JAR_FILE} app.jar
# ENTRYPOINT ["java","-jar","/app.jar"]
ENTRYPOINT ["java","-DSpring.profiles.active=prod","-jar","/app.jar"]