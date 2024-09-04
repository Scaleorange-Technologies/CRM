
# AssetModule_CRM

This project is a role-based CRM (Customer Relationship Management) system built with Node.js and Express. It provides a RESTful API for managing users and handling complaints. The system implements JWT-based authentication and role-based access control (RBAC) to ensure secure and appropriate access to various features.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Features](#features)
- [Technologies](#technologies)
- [API Endpoints](#api-endpoints)
- [Role Hierarchy](#role-hierarchy)
- [Error Handling](#error-handling)
- [Middleware](#middleware)
- [Authors](#authors)
- [Acknowledgments](#acknowledgments)


## Installation

1. *Prerequisites*
   - *Node.js*: This project was developed using Node.js version 18.20.4. 
   - *Express.js*: The project was developed using Express.js version 4.19.2.
   - *PostgreSQL*: This project was developed using postgreSQL version 16.3.

2. *Installation Steps*
   1. Clone the repository:
      bash
      git clone   https://github.com/Scaleorange-Technologies/AssetModule_CRM.git
       
    2. Navigate to the project directory:
      bash
      cd AssetModule_CRM
      cd Backend
      cd src
      
   3. Install the backend dependencies:
      bash
      npm install 
      
   4. Set up the PostgreSQL database and configure it in the config directory.
   

3. *Configuration*
   - Create a .env file in the backend directory and add your environment variables for database connection.
   - Ensure that your database and port is running and properly configured.

## Usage
To start the backend server, run:
```bash
npm run start
```
```
## Project Structure


AssetModule_CRM/
│
├── Backend/
│   ├── config/
│   │   ├── logger.js
│   │   └── dbConfig.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── userController.js
│   ├── middlewares/
│   │   └── middleware.js
│   ├── model/
│   │   └── userModel.js
│   ├── routes/
│   │   └── routes.js
│   ├── utils/
│   │   └── queries.js
│   ├── app.js
│   ├── .env
│   ├── README.md
│   ├── package.json
│   └── package-lock.json

```

## Features

- **User Registration & Login**: Secure registration and login with bcrypt for password hashing.
- **JWT Authentication**: Issue and verify JWT tokens for secure access.
- **Role-Based Access Control**: Access to API endpoints is restricted based on user roles.
- **Complaint Management**: Users can post complaints, and complaints can be forwarded up the role hierarchy.
- **Logging**: Application logs using a custom logger.
## Technologies

- **Node.js**: JavaScript runtime environment.
- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **PostgreSQL**: Relational database management system.
- **bcrypt**: Library for hashing passwords.
- **jsonwebtoken**: JWT implementation for authentication.
- **dotenv**: Loads environment variables from a `.env` file.

## API Endpoints

### User Routes

- **POST /register**: Register a new user.
- **POST /login**: Login a user.
- **GET /users**: Get all users (requires JWT token).
- **GET /users/:id**: Get a user by ID (requires JWT token).
- **PUT /users/:id**: Update user details (requires JWT token).
- **DELETE /users/:id**: Delete a user (requires JWT token).

### Complaint Routes

- **POST /complaints**: Post a new complaint (requires JWT token).
- **GET /complaints/v4**: Get complaints assigned to Team Leads (requires JWT token).
- **GET /complaints/v3**: Get complaints assigned to Team Managers (requires JWT token).
- **GET /complaints/v2**: Get complaints assigned to HR (requires JWT token).
- **GET /complaints/v1**: Get complaints assigned to the CEO (requires JWT token).
- **POST /complaints/forward**: Forward a complaint to the next role (requires JWT token).

## Role Hierarchy

The system defines the following role hierarchy:

- **CEO**: Role ID 1
- **HR**: Role ID 2
- **TEAM_MANAGER**: Role ID 3
- **TEAM_LEAD**: Role ID 4
- **EMPLOYEE**: Role ID 5

Complaints can be forwarded up this hierarchy, with each role being able to forward complaints to the next higher role.

## Error Handling

The API returns appropriate HTTP status codes and error messages for various scenarios, including:

- **400 Bad Request**: Invalid input data.
- **401 Unauthorized**: Missing or invalid JWT token.
- **403 Forbidden**: Insufficient permissions.
- **404 Not Found**: Resource not found.
- **500 Internal Server Error**: General server errors.

## Middleware

- **authenticateToken**: Verifies JWT tokens for protected routes. 
- **authorizeRole**:verifies roles and authorizes access 

## Authors
- Puneeth  - https://github.com/puneethk-scaleorange
- Chandrika - https://github.com/Chandrika2517
- Chandana - https://github.com/chandanascaleorange
- Srivallika- https://github.com/srivallika-scaleorange