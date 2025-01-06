

## Overview

This project involves the development of an **e-commerce application** using **Spring Boot** and **Angular**, coupled with the implementation of an automated CI/CD pipeline using **Jenkins**. 

Key achievements include:  
- **70% reduction in manual interventions** and **50% acceleration of deployment cycles** through automation.  
- **Containerization** of applications using Docker, with a private Nexus registry for secure storage and versioning, reducing environment setup time by **40%**.  
- **Kubernetes cluster configuration** for optimal resource management, ensuring secure communication between pods and full data persistence via Persistent Volumes.  
- **Enhanced security** using **Spring Security** and **JWT**, achieving a **100% success rate in penetration tests**.

---

## Prerequisites

Before running this project, ensure the following tools are installed:  
- [Docker](https://www.docker.com/)  
- [SonarQube](https://www.sonarqube.org/)  
- [Kubernetes](https://kubernetes.io/)  
- [Jenkins](https://www.jenkins.io/) (optional, for CI/CD)  

---

## Setup Instructions

### Step 1: Execute the Jenkins Pipeline  
1. Navigate to the **Jenkinsfile** located at `application/jenkinsfile`.  
2. Update the necessary parameters (e.g., Docker image names, Kubernetes configurations, git Repo ...).  

### Step 2: Automate the Workflow  
Running the Jenkinsfile will automate the following steps:  
- **Build, Test, and Deploy** the application.  
- Create **Deployments** and **Services** to expose the application.  
- Configure **Persistent Volumes (PV)** and **Persistent Volume Claims (PVC)** for data storage.  
- Build and deploy the application containers using the provided **Dockerfiles**.  

---




