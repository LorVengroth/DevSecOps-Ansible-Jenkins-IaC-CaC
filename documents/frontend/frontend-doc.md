# Frontend Documentation — Product Management System

**Project:** DevSecOps Product CRUD  
**Application:** `product-ui`  
**Framework:** Next.js + React + TypeScript  
**Testing Framework:** Vitest + React Testing Library  
**Status:** CRUD Completed | 22 Automated Tests Passed

---

## 1. Project Overview

The Product Management System is a full-stack CRUD application developed as part of a DevSecOps practical project.

The frontend is built using Next.js, React, and TypeScript. It communicates with a Spring Boot REST API to manage product information stored in a PostgreSQL database.

The project will later be integrated with Docker, Jenkins, SonarQube, Trivy, Ansible, and Google Cloud for automated CI/CD and deployment.

### Technology Stack

| Technology | Purpose |
|---|---|
| Next.js | Frontend framework |
| React | User interface components |
| TypeScript | Type safety |
| Tailwind CSS | UI styling |
| Fetch API | HTTP communication |
| Vitest | Automated test runner |
| React Testing Library | Component testing |
| jest-dom | DOM assertions |
| user-event | Simulating user interactions |
| jsdom | Browser-like testing environment |

---

## 2. Frontend Features

| Feature | Status |
|---|---|
| Display product list | Completed |
| Create product | Completed |
| Update product | Completed |
| Delete product | Completed |
| Search products | Completed |
| Product form validation | Completed |
| API error handling | Completed |
| Responsive UI | Implemented |
| Automated component testing | Completed |
| API service testing | Completed |

### Product Fields

| Field | Data Type | Description |
|---|---|---|
| `id` | Identifier | Unique product ID |
| `title` | String | Product name |
| `subtitle` | String | Short product description |
| `image` | String | Product image URL |
| `price` | Number | Product price |
| `stock` | Number | Available quantity |

---

## 3. API Integration

**Service Location:**

`product-ui/src/features/serviices/product.service.ts`

### API Endpoints

| HTTP Method | Endpoint |
|---|---|
| GET | `/api/products` |
| GET | `/api/products/{id}` |
| POST | `/api/products` |
| PATCH | `/api/products/{id}` |
| DELETE | `/api/products/{id}` |

### Service Functions

| Function | HTTP Method |
|---|---|
| `getProducts()` | GET |
| `getProduct(id)` | GET |
| `createProduct(data)` | POST |
| `updateProduct(id, data)` | PATCH |
| `deleteProduct(id)` | DELETE |

**API Configuration:** `src/lib/api.ts`

- `API_URL`: Base URL for client-side API requests.
- `SERVER_API_URL`: Base URL for server-side API requests.
- `handleResponse()`: Handles HTTP responses and API errors.

---

## 4. Frontend Testing

### Testing Tools

| Tool | Purpose |
|---|---|
| Vitest | Executes automated tests |
| React Testing Library | Tests React components |
| jest-dom | Provides DOM assertions |
| user-event | Simulates user interactions |
| jsdom | Provides a simulated DOM |
| `vi.mock()` | Mocks modules and dependencies |
| `vi.stubGlobal()` | Mocks global functions |

### Testing Dependencies

```bash
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

Node.js type definitions:

```bash
npm install -D @types/node@^22
```

---

## 5. Test Files and Results

| Test File | Total Tests | Result |
|---|---:|---|
| `ProductCard.test.tsx` | 3 | Passed |
| `ProductForm.test.tsx` | 6 | Passed |
| `ProductList.test.tsx` | 6 | Passed |
| `product.service.test.ts` | 7 | Passed |
| **Total** | **22** | **100% Passed** |

### 5.1 ProductCard Testing

**Test File:**

`src/features/products/components/ProductCard.test.tsx`

**Test Cases:**
1. Display product information.
2. Display the edit link.
3. Trigger the delete callback.

**Result:** 3/3 Passed.

### 5.2 ProductForm Testing

**Test File:**

`src/features/products/components/ProductForm.test.tsx`

**Test Cases:**
1. Render the Add Product form.
2. Create a product successfully.
3. Update an existing product.
4. Reject negative prices.
5. Reject negative stock quantities.
6. Display an error when the API fails.

**Result:** 6/6 Passed.

### 5.3 ProductList Testing

**Test File:**

`src/features/products/components/ProductList.test.tsx`

**Test Cases:**
1. Display all products.
2. Display an empty-state message.
3. Filter products by title.
4. Cancel product deletion.
5. Delete a product and refresh the page.
6. Display an error when deletion fails.

**Result:** 6/6 Passed.

### 5.4 API Service Testing

**Test File:**

`src/features/serviices/product.service.test.ts`

**Test Cases:**
1. Retrieve all products using GET.
2. Retrieve a product by ID.
3. Create a product using POST.
4. Update a product using PATCH.
5. Delete a product using DELETE.
6. Handle DELETE request failures.
7. Handle GET request failures.

**Result:** 7/7 Passed.

---

## 6. Test Execution

### Run All Tests

```bash
cd product-ui
npm run test
```

### Run a Specific Test

```bash
npx vitest run src/features/products/components/ProductForm.test.tsx
```

### Verified Test Results

| Metric | Result |
|---|---|
| Test framework | Vitest 5.1.1 |
| Test files | 4 Passed |
| Total tests | 22 |
| Passed | 22 |
| Failed | 0 |
| Skipped | 0 |
| Execution time | 11.91 seconds |
| Overall status | SUCCESS |

---

## 7. Frontend Architecture

```text
Next.js Frontend
       |
       v
React Components
       |
       +-- ProductCard
       |
       +-- ProductList
       |
       +-- ProductForm
       |
       v
Product Service
       |
       v
Fetch API
       |
       v
Spring Boot REST API
       |
       v
PostgreSQL Database
```

### Important Source Files

| File | Location |
|---|---|
| Product types | `src/types/product.ts` |
| Product card | `src/features/products/components/ProductCard.tsx` |
| Product form | `src/features/products/components/ProductForm.tsx` |
| Product list | `src/features/products/components/ProductList.tsx` |
| Product API service | `src/features/serviices/product.service.ts` |
| API configuration | `src/lib/api.ts` |
| Global styles | `src/app/globals.css` |
| Root layout | `src/app/layout.tsx` |
| Main page | `src/app/page.tsx` |

---

## 8. Running the Frontend Locally

### Install Dependencies

```bash
cd product-ui
npm install
```

### Start the Development Server

```bash
npm run dev
```

Application URL:

`http://localhost:3000`

### Run Automated Tests

```bash
npm run test
```

### Build the Application

```bash
npm run build
```

**Note:** Production build verification is separate from the completed automated testing phase.

---

## 9. Testing Strategy

### Unit and Component Testing

The frontend uses isolated component tests to verify user interface behavior.

- Render React components.
- Verify product information.
- Test form validation.
- Simulate user interactions.
- Verify search functionality.
- Test delete confirmations.
- Verify error messages.

### API Service Testing

API service tests use mocked HTTP requests to verify:

- Correct HTTP methods.
- Correct API endpoints.
- Correct request payloads.
- Successful responses.
- Failed responses.

### Testing Limitations

- API requests are mocked rather than sent to the real backend.
- End-to-end testing has not been implemented.
- Code coverage has not yet been measured.
- Production deployment testing is pending.

---

## 10. Planned DevSecOps Integration

The frontend tests will later become part of the Jenkins CI/CD pipeline.

```text
GitHub Webhook
      |
      v
Jenkins Checkout
      |
      v
Frontend Tests (Vitest)
      |
      v
Backend Tests (JUnit + Testcontainers)
      |
      v
SonarQube Analysis
      |
      v
Quality Gate
      |
      v
Dependency Security Check
      |
      v
Docker Build
      |
      v
Trivy Image Scan
      |
      v
Push Images to Docker Hub
      |
      v
Deploy to Staging
      |
      v
Production Approval
      |
      v
Deploy to Production
```

**Current Status:** Frontend automated testing is completed. Dockerization, security scanning, and CI/CD integration are planned for subsequent phases.

---

## 11. Project Completion Status

| Task | Status |
|---|---|
| Next.js project setup | Completed |
| TypeScript configuration | Completed |
| Product CRUD interface | Completed |
| Spring Boot API integration | Completed |
| ProductCard testing | Completed |
| ProductForm testing | Completed |
| ProductList testing | Completed |
| API service testing | Completed |
| Frontend documentation | Prepared |
| Dockerization | Pending |
| Jenkins CI/CD | Pending |
| SonarQube analysis | Pending |
| Trivy security scanning | Pending |
| Staging deployment | Pending |
| Production deployment | Pending |

---

## 12. Final Summary

The frontend development and planned automated testing phase have been completed successfully.

**Final Testing Results:**
- 4 test files passed.
- 22 automated tests passed.
- 0 test failures.
- 100% pass rate for the implemented tests.

These results establish a tested frontend foundation for the next phase of the DevSecOps project.

**Next Phase: Dockerization of Next.js, Spring Boot, and PostgreSQL.**