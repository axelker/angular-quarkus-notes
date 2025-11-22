FROM maven:3.9.6-eclipse-temurin-21 AS build
RUN mkdir -p /workspace
WORKDIR /workspace
COPY pom.xml /workspace
COPY src /workspace/src
RUN mvn -B -f pom.xml clean package -DskipTests

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /workspace/target/quarkus-app /app/
EXPOSE 8080
CMD ["java", "-jar", "/app/quarkus-run.jar"]