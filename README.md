# Product Management Application

This repository contains a full-stack Product Management application featuring a Spring Boot backend and an Angular frontend. The system supports authentication, product administration, and order placement with JWT-secured REST APIs.

## Project structure

```
backend/   Spring Boot application
frontend/  Angular single-page application
postman/   Postman collection for API tests
selenium/  Selenium end-to-end scripts
```

## Getting started

### Prerequisites

- Java 17+
- Maven 3.9+
- Node.js 18+
- Docker (for PostgreSQL)

### Backend setup

1. Start PostgreSQL using Docker:
   ```bash
   docker-compose up -d
   ```
2. Build and run the backend:
   ```bash
   cd backend
   mvn spring-boot:run
   ```

The service listens on `http://localhost:8080` and connects to the PostgreSQL instance defined in `docker-compose.yml`.

### Frontend setup

```bash
cd frontend
npm install
npm start
```

The Angular app is served at `http://localhost:4200`.

### Running tests

- Backend unit tests:
  ```bash
  cd backend
  mvn test
  ```
- Frontend unit tests:
  ```bash
  cd frontend
  npm test -- --watch=false
  ```
- Postman collection:
  ```bash
  newman run postman/product-management.postman_collection.json --env-var baseUrl=http://localhost:8080
  ```
- Selenium scripts (requires a running frontend & backend and ChromeDriver):
  ```bash
  python selenium/test_register_login.py
  python selenium/test_admin_add_product_order.py
  ```

### CI/CD

A GitHub Actions workflow (`.github/workflows/ci.yml`) builds the backend and frontend, executes unit tests, and runs the Postman integration tests.

## Features

- **Authentication & Authorization**: JWT-based login/register, admin & user roles.
- **Product Management**: Admins can create, update, delete, and list products.
- **Order Management**: Users can manage a cart and place orders that calculate totals and record purchase history.

## API reference

Explore the Postman collection under `postman/product-management.postman_collection.json` for example requests covering registration, authentication, product management, and order placement.
