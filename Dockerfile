# Utilisez une image de base Java 17
FROM eclipse-temurin:17-jdk-jammy AS build

# Créez un répertoire pour l'application
WORKDIR /workspace/app

# Copiez maven executable et le pom.xml
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# résolvez les dépendances maven
RUN chmod +x ./mvnw
RUN ./mvnw dependency:go-offline

# Copiez le reste du code source de l'application
COPY src src

# compilez l'application
RUN ./mvnw package -DskipTests
RUN mkdir -p target/dependency && (cd target/dependency; jar -xf ../*.jar)

# Stage 2: create specific docker image
FROM eclipse-temurin:17-jdk-jammy

ARG DEPENDENCY=/workspace/app/target/dependency

# Copies the project dependencies
COPY --from=build ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY --from=build ${DEPENDENCY}/META-INF /app/META-INF
COPY --from=build ${DEPENDENCY}/BOOT-INF/classes /app

ENTRYPOINT ["java","-cp","app:app/lib/*","my_restaurant.MyRestaurantApplication"]

