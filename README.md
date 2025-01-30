
# software-engineering-product-hexacode
# JobSnap

JobSnap is a web-based platform designed to help students build professional profiles and generate dynamic CVs tailored to specific job roles. By allowing students to customize CV templates for targeted job types, the platform ensures that students present the most relevant information to potential employers, streamlining the recruitment process for both parties.

## 1. [Product Vision](#product-vision)
## 2. [Key Features](#key-features)
## 3. [Requirements](#requirements)
## 4. [User Stories](#user-stories)
## 5. [Backlog](#backlog)
## 6. [Architectural Description](#architectural-description)
## 7. [CI/CD Workflow and Work Environments](#cicd-workflow-and-work-environments)
## 8. [Testing & Quality Assurance](#quality-assurance-qa)
## 9. [Application Execution](#application-execution)
## 11. [Environment Configurations Summary](#environment-configurations-summary)

---

## Product Vision
**FOR**: Students who want to create professional profiles and tailor CVs for specific job roles.  
**WHO**: Face challenges with creating relevant, job-specific CVs and finding job opportunities that match their skills.  
**THE JobSnap system**: A web-based platform for building profiles and generating customized CVs.  
**THAT**: Provides tailored CV templates, job role-based field suggestions, and employer access to profiles.  
**UNLIKE**: Generalized CV builders or simple resume generators.  
**THIS PRODUCT**: Offers dynamic CV customization based on job roles, a range of professional templates, and a streamlined connection between students and employers.  

---

## Key Features
### For Students

 - [x] **User Profiles**: Create and edit profiles, including academic background, projects, skills, and experience.
 - [x] **CV Generation**: Generate CVs from templates that are dynamically customized to match specific job roles.
 - [x] **Template Customization**: Choose from a variety of CV templates designed to highlight relevant skills and experience.
 - [ ] **Job Role-based Field Suggestions**: Get suggestions on specific fields to fill based on the targeted job role.

### For Employers

 - [x] **Search and View CVs**: Search for candidates based on job role, skills, and other criteria. View CVs that match your desired candidate profile.

---

## Requirements

 - [x] **R1**: The application must support secure user registration and login for both students and employers
 - [x] **R2**: Students must be able to create, edit, and delete profile information.
 - [x] **R3**: Students must be able to generate a CV tailored to specific job roles.
 - [x] **R4**: Employers must be able to view generated CVs and search for candidates based on job role and skills.

---

## User Stories
### Student Stories:

 - [x] "As a student, I want to create a profile so that I can store my academic and professional information."
 - [x] As a student, I want to generate a CV tailored to a specific job role so that it highlights my most relevant skills."
 - [x] "As a student, I want to select from different CV templates so that I can choose a design that best represents me."

### Employer Stories:

 - [x] "As an employer, I want to search for students with specific skills so that I can find suitable candidates."
 - [x] "As an employer, I want to view CVs tailored to job roles so that I can quickly assess candidates’ qualifications."

---

## Backlog
The backlog will include tasks derived from user stories and prioritized for development. Each story should be broken down into smaller tasks for implementation and ordered based on relevance and dependencies. Our progress is tracked on [Trello](https://trello.com/b/yYTxEn3y/jobsnap).

---

# Architectural Description

## C4 Model
### Context Diagram
![IMG_5567](https://github.com/user-attachments/assets/b8f5dac9-a29c-476f-b035-5ddfa38ae671)

### Container Diagram
![IMG_5568](https://github.com/user-attachments/assets/e20fc2ed-6742-4b18-b8ea-bf6ac61f2d43)

### Component Diagram
![Screenshot 2025-01-27 220953](https://github.com/user-attachments/assets/f56c7d89-c33a-4f53-bd45-7d09f6eea5b6)

## Non-Functional Requirements and Solutions (Short)

1. **Performance**: <2s response time using Spring Boot, optimized SQL, and Redis caching.  
2. **Scalability**: Microservices, load balancer, and cloud auto-scaling.  
3. **Security**: OAuth 2.0, AES-256 encryption, input validation, HTTPS.  
4. **Availability**: 99.9% uptime with monitoring, backups, and redundancy.  
5. **Usability**: ReactJS, user testing, and interactive guides.  
6. **Portability**: Responsive design and cross-device testing.  
7. **Maintainability**: Standardized code, documentation, and automated testing.  

---

# CI/CD Workflow and Work Environments

We used GitHub to maintain an organized workflow, which helped us detect and resolve bugs and conflicts early. Each team member worked on their own branch. After completing their tasks, they created merge requests to integrate changes into the main branch. This structured approach ensured smooth collaboration and maintained code quality.
## Manual Testing

All backend and frontend tests were conducted manually. These tests included:

### Backend:
- Testing business logic through specific scenarios using predefined input data.
- Validating interactions with the Oracle database.

### Frontend:
- Verifying the user interface to ensure functionality is correct and intuitive.
- Testing the integration between frontend and backend for key workflows (e.g., signup, login, profile management).

---

# Quality Assurance (QA)

## 1. **Testing Objectives**
- Validate the main functionalities of the application (profile creation, CV generation, employer search, and viewing CVs).
- Ensure compliance with non-functional requirements: performance, security, and reliability.
- Identify and fix defects.


## 2. **Tested Artifacts and Levels of Testing**

### Artifacts:
- **Frontend**: User interface.
- **Backend**: Services and APIs.
- **Database**: Integrity and performance of queries.
- **Integration**: Communication between frontend and backend components.

### Levels:
- Unit testing.
- Integration testing.
- System testing.
- Security testing.

## 3. **Testing Process**

### Testing Stages in the SDLC:
1. **Unit Testing**: During the development of individual components.
2. **Integration Testing**: After implementing frontend-backend interactions.
3. **System Testing**: On the complete application version, in a staging environment.
4. **Security Testing**: In the final phase, to identify critical vulnerabilities.

## 4. **Testing Methods**

### a) Unit Testing
- **Goal**: Verify the correctness of individual functions in the backend.
- **Tools**: JUnit 5, Mockito, JWT (Jwts)
- 
![Screenshot 2025-01-30 152727](https://github.com/user-attachments/assets/e6f7adab-e80d-4396-b035-097fa380ae78)

### b) Integration Testing
- **Goal**: Validate interaction between frontend and backend.
- **Tools**: manual testing

### c) System Testing
- **Goal**: Simulate the complete application flow.
- **Tools**: JUnit5, Selenium WebDriver, WebDriverWait

![Screenshot 2025-01-30 152858](https://github.com/user-attachments/assets/eae381d7-43e3-49db-9898-8e44b834217a)

### d) Security Testing
- **Goal**: Identify and address critical vulnerabilities.
- **Tools**: manual testing

### e) Performance Testing
- **Goal**: Measure API response time
- **Tools**: k6

![WhatsApp Image 2025-01-30 at 14 44 13_8bcb59ce](https://github.com/user-attachments/assets/f69a95a6-8c84-4e02-bbda-4af33d99ca72)

## 5. **Testing Results**

| **Functionality**         | **Test Type**     | **Expected Result**           | **Actual Result**            | **Status**  | **Remarks**                |
|---------------------------|-------------------|--------------------------------|-----------------------------|-------------|-----------------------------|
| Profile creation          | Unit| Profile successfully created  | Profile successfully created| Passed      | -    
| Sign Up          | Unit| Signed up successfully  | Signed up successfully | Passed      | -        
| Log in          | Unit| Logged in successfully  | Logged in successfully | Passed      | -                          |
| CV generation             | System              | CV generated correctly         | CV generated correctly       | Passed      | -                           |
| Frontend API connection   | Integration       | API responds with 200 OK       | 200 OK response              | Passed      | -                           |                         |
|SQL Injection attack   |Security    |Input blocked    |Input blocked  |Passed| -
| Performance (10 users)    | Performance       | Application responds in <1s    | Application responds in 900ms| Passed      | -                           |

## 6. **Conclusions and Recommendations**

### Observations:
- All critical functionalities were successfully tested.
- No major defects were identified.
- Performance and security meet the requirements.

### Recommendations:
- Implement automated end-to-end (E2E) tests to reduce manual testing time.
- Continuously monitor security in the production environment.

---



## Application Execution

### Backend:
- Implemented in Java using the Spring Boot framework.
- Configured to connect to a local Oracle Database instance via a configuration file (`application.properties`).

### Frontend:
- Implemented in React.
- Run locally using the command:
  ```bash
  npm start

---

# Work Environments

## DEV (Development)
- **Purpose:** Initial development and testing of functionalities.
- **Setup:**
  - Backend and frontend run locally.
  - Oracle database configured locally with mock data.
- **Characteristics:**
  - Debugging enabled for rapid issue identification.
  - Detailed logging in the backend for tracking workflows.

## STAGING (Final Testing)
- **Purpose:** Simulating a production-like environment.
- **Setup:**
  - Backend and frontend continue to run locally, with testing using data closer to real-world scenarios.
  - Oracle database populated with semi-real data.
- **Characteristics:**
  - Complete manual testing to verify main functionalities and integration.

## PRODUCTION
- **Purpose:** Running the application for end-users (locally).
- **Setup:**
  - Application run locally by the team; not hosted on a public server.
  - Oracle database contains real data required for application functionality.
- **Characteristics:**
  - Minor optimizations for performance.
  - Final manual testing before running the application.

---

## Environment Configurations Summary

| **Environment** | **Purpose**           | **Database**        | **Backend**             | **Frontend**          | **Testing**                |
|------------------|-----------------------|---------------------|-------------------------|-----------------------|----------------------------|
| **Dev**          | Initial development   | Oracle local (mock) | Local (debug enabled)   | Local                | Manual & automated testing |
| **Staging**      | Production simulation | Oracle semi-real    | Local                   | Local                | Manual & automated testing    |
| **Production**   | Final user environment| Oracle real         | Local                   | Local                | Manual & automated testing    |

---


