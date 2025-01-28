
# software-engineering-product-hexacode
# JobSnap
JobSnap is a web-based platform designed to help students build professional profiles and generate dynamic CVs tailored to specific job roles. By allowing students to customize CV templates for targeted job types, the platform ensures that students present the most relevant information to potential employers, streamlining the recruitment process for both parties.
## Product Vision
**FOR**: Students who want to create professional profiles and tailor CVs for specific job roles.  
**WHO**: Face challenges with creating relevant, job-specific CVs and finding job opportunities that match their skills.  
**THE JobSnap system**: A web-based platform for building profiles and generating customized CVs.  
**THAT**: Provides tailored CV templates, job role-based field suggestions, and employer access to profiles.  
**UNLIKE**: Generalized CV builders or simple resume generators.  
**THIS PRODUCT**: Offers dynamic CV customization based on job roles, a range of professional templates, and a streamlined connection between students and employers.  
## Key Features
### For Students

 - [x] **User Profiles**: Create and edit profiles, including academic background, projects, skills, and experience.
 - [x] **CV Generation**: Generate CVs from templates that are dynamically customized to match specific job roles.
 - [x] **Template Customization**: Choose from a variety of CV templates designed to highlight relevant skills and experience.
 - [ ] **Job Role-based Field Suggestions**: Get suggestions on specific fields to fill based on the targeted job role.

### For Employers

 - [x] **Search and View CVs**: Search for candidates based on job role, skills, and other criteria. View CVs that match your desired candidate profile.

## Requirements

 - [x] **R1**: The application must support secure user registration and login for both students and employers
 - [x] **R2**: Students must be able to create, edit, and delete profile information.
 - [x] **R3**: Students must be able to generate a CV tailored to specific job roles.
 - [x] **R4**: Employers must be able to view generated CVs and search for candidates based on job role and skills.

## User Stories
### Student Stories:

 - [x] "As a student, I want to create a profile so that I can store my academic and professional information."
 - [x] As a student, I want to generate a CV tailored to a specific job role so that it highlights my most relevant skills."
 - [x] "As a student, I want to select from different CV templates so that I can choose a design that best represents me."

### Employer Stories:

 - [x] "As an employer, I want to search for students with specific skills so that I can find suitable candidates."
 - [x] "As an employer, I want to view CVs tailored to job roles so that I can quickly assess candidates’ qualifications."

## Backlog
The backlog will include tasks derived from user stories and prioritized for development. Each story should be broken down into smaller tasks for implementation and ordered based on relevance and dependencies. Our progress is tracked on [Trello](https://trello.com/b/yYTxEn3y/jobsnap).

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


# CI/CD Workflow and Work Environments

We used GitHub to maintain an organized workflow, which helped us detect and resolve bugs and conflicts early. Each team member worked on their own branch. After completing their tasks, they created merge requests to integrate changes into the main branch. This structured approach ensured smooth collaboration and maintained code quality.

## Application Execution

### Backend:
- Implemented in Java using the Spring Boot framework.
- Configured to connect to a local Oracle Database instance via a configuration file (`application.properties`).

### Frontend:
- Implemented in React.
- Run locally using the command:
  ```bash
  npm start


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



## Environment Configurations Summary

| **Environment** | **Purpose**           | **Database**        | **Backend**             | **Frontend**          | **Testing**                |
|------------------|-----------------------|---------------------|-------------------------|-----------------------|----------------------------|
| **Dev**          | Initial development   | Oracle local (mock) | Local (debug enabled)   | Local                | Manual & automated testing |
| **Staging**      | Production simulation | Oracle semi-real    | Local                   | Local                | Manual & automated testing    |
| **Production**   | Final user environment| Oracle real         | Local                   | Local                | Manual & automated testing    |

---


## Manual Testing

All backend and frontend tests were conducted manually. These tests included:

### Backend:
- Testing business logic through specific scenarios using predefined input data.
- Validating interactions with the Oracle database.

### Frontend:
- Verifying the user interface to ensure functionality is correct and intuitive.
- Testing the integration between frontend and backend for key workflows (e.g., signup, login, profile management).

---
