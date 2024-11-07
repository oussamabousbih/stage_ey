FROM openjdk:17-jdk-alpine
WORKDIR /app

# Define build-time arguments for mail credentials
ARG MAIL_USERNAME
ARG MAIL_PASSWORD

# Set environment variables in Docker image with defaults if not provided
ENV SPRING_MAIL_USERNAME=${MAIL_USERNAME}
ENV SPRING_MAIL_PASSWORD=${MAIL_PASSWORD}

# Copy the application JAR file
COPY target/Stage_Ey-0.0.1-SNAPSHOT.jar /app

# Expose the application port
EXPOSE 8080

# Run the application with Spring environment variables
CMD ["java", "-jar", "Stage_Ey-0.0.1-SNAPSHOT.jar"]
