# INDI-Backend-assignment

A comprehensive library management application has been developed, allowing the Admin to perform CRUD operations on books, enabling users to borrow books with personalized recommendations. Additionally, authentication and authorization features have been implemented.

## API documentation with swagger
You can explore the API documentation using Swagger UI. Access the documentation by navigating to:
https://indi-backend-assignment.onrender.com/api-docs/

## Functionalities
- User authentication and authorization
- Admin access to perform CRUD
- search functionality
- Personalized recommendations based on the authors of books previously borrowed by the user.

## Getting Started

These instructions will help you set up and run the this project on your local machine.

### Installation
1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/shubhamprakash911/INDI-Backend-assignment.git

2. Navigate to the project directory:
    ```bash
    cd INDI-Backend-assignment

3. Install the project dependencies:
    ```bash
    npm install

4. Create a .env file in the project root and configure the following environment variables:
    ```markdown
    PORT=5000
    MONGO_URL= your_mongo_url
    JWT_SECRET=YOUR_SECRET
    NODE_ENV=development

5. Start the server:
    ```
    npm start
    ```
