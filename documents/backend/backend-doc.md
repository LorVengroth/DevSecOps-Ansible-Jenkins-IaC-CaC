# Backend Documentation — Product CRUD API

**Project:** DevSecOps Product CRUD  
**Component:** Spring Boot Backend  
**Status:** Completed — Development & Backend Testing  
**API Base URL:** `http://localhost:8081`

---

## 1. Technology Stack

| Technology | Version / Purpose |
|---|---|
| Java | JDK 21 |
| Spring Boot | 4.2.0 |
| Gradle | 9.9.2 |
| PostgreSQL | 17 |
| Docker | PostgreSQL Container |
| Spring Data JPA | Database Operations |
| Hibernate | ORM / Entity Mapping |
| Lombok | Reduce Boilerplate Code |
| Spring Validation | Request Validation |
| Spring Boot Actuator | Application Health Monitoring |

## 2. API Endpoints

**Base URL:** `http://localhost:8081/api/products`

| Method | Endpoint |
|---|---|
| `POST` | `/api/products` |
| `GET` | `/api/products` |
| `GET` | `/api/products/{id}` |
| `PATCH` | `/api/products/{id}` |
| `DELETE` | `/api/products/{id}` |

## 3. Database Configuration

| Property | Value |
|---|---|
| Database | PostgreSQL 17 |
| Database Name | `product_db` |
| Container Name | `product-postgres` |
| Host | `localhost` |
| Host Port | `5433` |
| Container Port | `5432` |
| Configuration File | `product-api/src/main/resources/application.yaml` |
| Docker Compose | `docker/compose.yaml` |
| Data Persistence | Docker Named Volume |

**Database Connection:** `jdbc:postgresql://localhost:5433/product_db`

### Product Entity Fields

| Field | Java Type |
|---|---|
| `id` | UUID |
| `image` | String |
| `title` | String |
| `subtitle` | String |
| `price` | BigDecimal |
| `category` | String |
| `stock` | Integer |
| `createdAt` | LocalDateTime |

**Table:** `products`

## 4. Backend Architecture

**Architecture Pattern:** Layered Architecture

```text
Next.js Frontend
       |
       v
ProductController
       |
       v
ProductService (Interface)
       |
       v
ProductServiceImpl
       |
       v
ProductRepository
       |
       v
PostgreSQL Database
```

### Source Code Paths

Base package: `devsecops.product.crud.project`

| Layer | Java File |
|---|---|
| Entity | `entity/Product.java` |
| Repository | `repository/ProductRepository.java` |
| Service Interface | `service/ProductService.java` |
| Service Implementation | `serviceimpl/ProductServiceImpl.java` |
| Controller | `controller/ProductController.java` |
| Request DTO | `dto/ProductRequest.java` |
| Response DTO | `dto/ProductResponse.java` |
| Exception | `exception/ProductNotFoundException.java` |
| Global Exception Handler | `exception/GlobalExceptionHandler.java` |

**Java Source Root:** `product-api/src/main/java/devsecops/product/crud/project/`

---

## 5. Backend Automated Testing

**Status:** Successful

### 5.1 Testing Tools

| Tool / Framework | Purpose |
|---|---|
| JUnit 5 | Test Execution |
| Mockito | Mock Dependencies |
| MockMvc | HTTP Controller Testing |
| Spring Boot Test | Spring Test Context |
| Testcontainers 2.0.5 | Temporary Docker Containers |
| PostgreSQL Testcontainer | Real Database Integration Testing |
| Gradle Test | Run Automated Tests |

### 5.2 Test Files & Paths

**Test Source Root:** `product-api/src/test/java/devsecops/product/crud/project/`

| Test Type | Test File |
|---|---|
| Application Context Test | `ProjectApplicationTests.java` |
| Service Unit Testing | `serviceimpl/ProductServiceImplTest.java` |
| Controller Testing | `controller/ProductControllerTest.java` |
| Database Integration Testing | `repository/ProductRepositoryIntegrationTest.java` |

### 5.3 Tests Implemented

| Test Class | Test Cases |
|---|---|
| `ProjectApplicationTests` | Spring Boot Application Context |
| `ProductServiceImplTest` | Create Product |
| `ProductServiceImplTest` | Get Product By ID |
| `ProductServiceImplTest` | Get All Products |
| `ProductServiceImplTest` | Update Product Price |
| `ProductServiceImplTest` | Delete Product |
| `ProductServiceImplTest` | Product Not Found |
| `ProductControllerTest` | GET All Products |
| `ProductControllerTest` | POST Product |
| `ProductControllerTest` | PATCH Product |
| `ProductControllerTest` | DELETE Product |
| `ProductControllerTest` | 404 Product Not Found |
| `ProductRepositoryIntegrationTest` | Save & Find Product |
| `ProductRepositoryIntegrationTest` | Delete Product |

**Total:** 14 Test Cases

### 5.4 Testing Dependencies

Configured in `product-api/build.gradle`.

**Spring Boot Test Dependencies:**

```groovy
testImplementation 'org.springframework.boot:spring-boot-starter-actuator-test'
testImplementation 'org.springframework.boot:spring-boot-starter-data-jpa-test'
testImplementation 'org.springframework.boot:spring-boot-starter-validation-test'
testImplementation 'org.springframework.boot:spring-boot-starter-webmvc-test'
testRuntimeOnly 'org.junit.platform:junit-platform-launcher'
```

**Testcontainers Dependencies:**

```groovy
testImplementation 'org.springframework.boot:spring-boot-testcontainers'
testImplementation 'org.testcontainers:testcontainers-junit-jupiter'
testImplementation 'org.testcontainers:testcontainers-postgresql'
```

**Additional Test Dependencies:**

```groovy
testCompileOnly 'org.projectlombok:lombok'
testAnnotationProcessor 'org.projectlombok:lombok'
```

### 5.5 Test Commands

| Purpose | Command |
|---|---|
| Run All Tests | `./gradlew.bat test` |
| Clean & Run All Tests | `./gradlew.bat clean test` |
| Run Integration Tests | `./gradlew.bat test --tests "*ProductRepositoryIntegrationTest"` |
| Verify Dependencies | `./gradlew.bat dependencies --configuration testRuntimeClasspath` |

**Test Report Path:**

`product-api/build/reports/tests/test/index.html`

### 5.6 Final Testing Result

| Metric | Result |
|---|---|
| Expected Test Cases | 14 |
| Final Gradle Build | SUCCESSFUL |
| Service Tests | Passed |
| Controller Tests | Passed |
| Database Integration Tests | Passed |
| Full Test Suite | BUILD SUCCESSFUL |
| Testing Scope | Intermediate DevSecOps Project |

**Note:** The final full-suite build completed successfully. The exact final test count should be confirmed from the latest Gradle HTML report.

---

## 6. Development & Runtime Configuration

| Component | Local Address |
|---|---|
| Spring Boot Backend | `http://localhost:8081` |
| PostgreSQL | `localhost:5433` |
| Next.js Frontend | `http://localhost:3000` |
| REST API | `http://localhost:8081/api/products` |

### Important Configuration

- Java Toolchain: JDK 21
- Backend Server Port: `8081`
- JPA `ddl-auto`: `update` (Local Development Only)
- Database Credentials: Configured via `application.yaml` with Environment Variable Support
- CORS: Configured for Local Next.js Frontend
- Product ID: UUID
- API Request/Response: DTO Pattern
- Error Handling: Global Exception Handler
- Database Persistence: Docker Volume

---

## 7. Completed Backend Work

- [x] Initialize Spring Boot Project
- [x] Configure JDK 21 and Gradle
- [x] Create PostgreSQL Database using Docker Compose
- [x] Connect Spring Boot to PostgreSQL
- [x] Create Product Entity and Database Table
- [x] Implement Layered Architecture
- [x] Implement Product CRUD REST API
- [x] Add DTO and Request Validation
- [x] Implement Exception Handling
- [x] Integrate Backend with Next.js Frontend
- [x] Implement Service Unit Tests
- [x] Implement Controller Tests
- [x] Implement PostgreSQL Integration Tests
- [x] Execute Full Backend Test Suite Successfully
- [x] Push Project to GitHub

---

## 8. DevSecOps Integration — Upcoming

| Stage | Planned Work |
|---|---|
| Dockerization | Multi-stage Dockerfile for Spring Boot |
| CI | Gradle Build & Automated Tests |
| Code Quality | SonarQube Analysis |
| Quality Gate | Block Pipeline on Quality Gate Failure |
| Dependency Security | OWASP Dependency-Check |
| Container Security | Trivy Image Scanning |
| Registry | Push Backend Image to Docker Hub |
| IaC | Ansible Provision GCP Ubuntu VMs |
| CaC | Ansible Configure Docker, NGINX and Certbot |
| CD | Deploy to Staging and Production |
| Deployment Verification | Health Check using Spring Boot Actuator |

---

**Project Phase:** Backend Development & Testing Completed  
**Next Phase:** Frontend Automated Testing → Dockerization → Jenkins DevSecOps Pipeline