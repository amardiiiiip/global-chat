# Build stage
FROM maven:3.6.3-jdk-11-slim AS build
WORKDIR /home/app
COPY src /home/app/src
COPY pom.xml /home/app
RUN mvn -f /home/app/pom.xml clean package -DskipTests

# Package stage
FROM openjdk:11-jre-slim
COPY --from=build /home/app/target/global-chat-0.0.1-SNAPSHOT.jar /usr/local/lib/global-chat.jar
EXPOSE 10000
ENTRYPOINT ["java", "-jar", "/usr/local/lib/global-chat.jar"]