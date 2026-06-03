# syntax=docker/dockerfile:1
FROM eclipse-temurin:17-jre AS builder
WORKDIR /app
COPY ./ .
RUN ./mvnw -DskipTests clean package -DskipITs

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
