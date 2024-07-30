# reflectiz-assignment

Getting Started:
Prerequisites: 
- Node.js
- npm (Node Package Manager)
- MongoDB
  
#### How to Setup

- npm install

#### it is private, so env file is included.
  
### Start the backend server:
- npm run dev

### Start the backend server via docker:
- docker-compose up --build


# Domain Analysis System

## Overview

The system provides security and identity information about domains. It scans the domains in the database at a configurable interval and gathers information from various sources such as VirusTotal and WHOIS. The system supports an asynchronous REST API with endpoints for retrieving current information about a domain and adding a domain for analysis.

## Checklist for Home Assignment Criteria

### Language and Libraries

**Requirement:** Use TypeScript on Node.js or any well-known language.  
**Implementation:** Your project is written in TypeScript on Node.js.

### Database

**Requirement:** Use any database you like.  
**Implementation:** You are using MongoDB with Mongoose.

### Input Validation and Security

**Requirement:** Pay attention to input validation and security.  
**Implementation:**
- **Input Validation:** Ensure all incoming data is validated. Example: Validate the domain name before processing.
- **Security:** Use environment variables for sensitive data (e.g., API keys), and use HTTPS for API requests.

### Edge Cases

**Requirement:** Handle edge cases such as if a site already exists or is currently being scanned.  
**Implementation:**
- **Check if Domain Exists:** Before adding a domain for analysis, check if it already exists in the database.
- **Handle Pending Scans:** If a domain is already being scanned, handle this appropriately (e.g., notify the user to check back later).

### System Division and Communication

**Requirement:** Divide the system into several services and describe how they should communicate.  
**Implementation:**
- **Service Division:**
  - **DomainService:** Handles domain-related operations (add, get, analyze).
  - **SchedulerService:** Manages scheduled scans.
  - **RequestUtils:** Handles API requests with rate limiting and retries.
  - **ApiUtils:** Handles fetching data from external APIs (VirusTotal, WHOIS, GeoIP).
- **Communication:** Services interact through direct function calls and shared database access.

### Scalable, Long-term Solution

**Requirement:** Use a scalable, long-term solution.  
**Implementation:**
- **Scalability:** Implement rate-limiting and retry mechanisms for API requests. Use a robust database (MongoDB) that supports horizontal scaling.
- **Long-term:** Use Docker for containerization, ensuring the system can be easily deployed and managed.

### Scheduling System

**Requirement:** Use any scheduling system you like.  
**Implementation:** Using `node-cron` for scheduling tasks.

### Configurable Analysis Interval

**Requirement:** The analysis interval should be global but configurable and start at once a month.  
**Implementation:** The interval is configurable via environment variables or configuration files, and set to run once a month by default.

## Design Description

### Services

**DomainService:**
- **Functions:** `getDomainInfo`, `addDomainForAnalysis`, `analyzeDomain`
- **Description:** Handles domain-related operations, including fetching data from external APIs and updating the database.

**SchedulerService:**
- **Functions:** `startScheduler`
- **Description:** Manages the scheduling of periodic domain scans using `node-cron`. The interval is configurable and set to run once a month by default.

**RequestUtils:**
- **Functions:** `requestWithRetry`, `createRateLimitedAxiosInstance`
- **Description:** Manages API requests with rate limiting and retry logic to handle API rate limits and ensure reliable data fetching.

**ApiUtils:**
- **Functions:** `fetchVirusTotalInfo`, `fetchWhoisInfo`, `fetchGeoIpInfo`, `resolveDomainToIp`
- **Description:** Handles fetching data from external APIs (VirusTotal, WHOIS, GeoIP).

### Communication

- **Internal Communication:** Services interact through direct function calls and shared access to the MongoDB database.
- **External Communication:** Uses Axios to make HTTP requests to external APIs (VirusTotal, WHOIS).

## Usage

### Prerequisites

- Docker and Docker Compose installed on your machine.
- A `.env` file with the following variables:
  MONGO_URI=mongodb://mongo:27017/domains
  VIRUSTOTAL_API_KEY=your_virustotal_api_key
  WHOIS_API_KEY=your_whois_api_key
