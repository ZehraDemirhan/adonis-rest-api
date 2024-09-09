# Project Overview

This project is a full-stack web application that demonstrates an employee and company management system with authentication and access control. It is built using AdonisJS for the backend and Vue.js for the frontend. The app leverages access tokens for authentication, and session storage is used for managing user sessions. The application includes request and response interceptors, which automatically redirect unauthenticated users to the login page when making unauthorized requests.

## Features
- **Authentication with Access Tokens**: The application uses access tokens for authentication. Tokens are stored in session storage, and the app intercepts HTTP requests to handle unauthorized access.
- **User Authentication**: Users should retrieve credentials from the backend console and use them to log in.
- **Company and Employee Management**: 
  - View, edit, and delete employees.
  - Add new companies and employees.
- **Database Seeding**: On first run, the database will be seeded with 50 companies and 300 employees for testing and demonstration.
- **Authorization Protection**: All routes are protected by authentication middleware, except for the login and registration endpoints (note: registration is currently unused).
- **Lucid ORM**: The backend uses Lucid ORM to interact with the database, returning serialized data for various endpoints.
- **Controller-Service-Repository Pattern**: The backend follows a layered architecture with controller, service, and repository layers, ensuring clean separation of concerns.
- **Frontend HTTP Client**: The frontend uses a dedicated HTTP client for making authenticated requests. A second unauthenticated HTTP client is also set up, but currently unused.
- **Vue Router**: For navigation, Vue Router is used in the frontend.
- **UI Enhancements**: Third-party libraries like Bootstrap and SweetAlert2 are utilized for a better user interface experience.

## Project Setup Instructions

1. **Navigate to the root directory of the project**.
2. **Run the following command**:
 `npm install`
  
3. **Run the backend server and set up the database**:
   `npm run dev`
   
4. **Navigate to frontend folder & run the following command**:
    `npm install`  
    
5. **Run the frontend development server**:
    `npm run dev`
