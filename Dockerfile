# Build stage
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /home/app
COPY src /home/app/src
COPY pom.xml /home/app
RUN mvn -f /home/app/pom.xml clean package -DskipTests

# Package stage
FROM eclipse-temurin:17-jre-slim
COPY --from=build /home/app/target/global-chat-0.0.1-SNAPSHOT.jar /usr/local/lib/global-chat.jar
EXPOSE 10000
ENTRYPOINT ["java", "-jar", "/usr/local/lib/global-chat.jar"]