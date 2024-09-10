# Project Overview

This project is a full-stack web application that demonstrates an employee and company management system with authentication and access control. It is built using AdonisJS for the backend and Vue.js for the frontend. The app leverages access tokens for authentication, and session storage is used for managing user sessions. The application includes request and response interceptors, which automatically redirect unauthenticated users to the login page when making unauthorized requests.

## Features
- **Logos**: 50 images related to companies will be fetched from LoremPicsum and saved to the public directory. These images will be served by the server to the frontend using static middleware provided by AdonisJS.
- **Database Seeding**: On first run, the database will be seeded with 50 companies and 300 employees for testing and demonstration.
- **Authentication with Access Tokens**: The application uses access tokens for authentication. Tokens are stored in session storage, and the app intercepts HTTP requests to handle unauthorized access.
- **User Login**: Users should retrieve credentials from the backend console and use them to log in. When the admin seeder is run, credentials will be written on the console for testing purposes.
- **Company and Employee Management**: 
  - View, edit, and delete employees.
  - Add new companies and employees.
- **Authorization Protection**: All routes are protected by authentication middleware, except for the login and registration endpoints (note: registration is currently unused).
- **Lucid ORM**: The backend uses Lucid ORM to interact with the database, returning serialized data for various endpoints.
- **Controller-Service-Repository Pattern**: The backend follows a layered architecture with controller, service, and repository layers, ensuring clean separation of concerns.
- **Frontend HTTP Client**: The frontend uses a dedicated HTTP client for making authenticated requests. A second unauthenticated HTTP client is also set up, but currently unused.
- **Vue Router**: For navigation, Vue Router is used in the frontend.
- **UI Enhancements**: Third-party libraries like Bootstrap and SweetAlert2 are utilized for a better user interface experience.
- **Avatar Generation**: An avatar for the admin is created using an API based on the admin's initials.

## Project Setup Instructions
1. **Navigate to the root directory of the project**.
2. **Install Vue.js and AdonisJS**:
   - Install Vue.js globally (if not already installed):
     ```bash
     npm install -g @vue/cli
     ```
   - Install AdonisJS CLI globally (if not already installed):
     ```bash
     npm install -g @adonisjs/cli
     ```
2. **Run the following command**:
 `npm install`
  
3. **Run the backend server and set up the database**:
   `npm run dev`
   
4. **Navigate to frontend folder & run the following command**:
    `npm install`  
    
5. **Run the frontend development server**:
    `npm run dev`

   <img width="1438" alt="Screenshot 2024-09-10 at 00 27 23" src="https://github.com/user-attachments/assets/dab6ff8a-fbe5-43f4-bf44-770235325185">
   <img width="1439" alt="Screenshot 2024-09-10 at 00 28 12" src="https://github.com/user-attachments/assets/5b64ec4b-64b0-42a7-92a4-c83f44ed197c">
  <img width="1434" alt="Screenshot 2024-09-10 at 00 30 21" src="https://github.com/user-attachments/assets/4cb2faee-59e9-4500-b6c3-a1beecd49137">

