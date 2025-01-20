# CRM

## Project Description
This project is a Customer Relationship Management (CRM) system designed to help businesses manage their interactions with current and potential customers.

## Functionalities
- Customer Management: Add, update, delete, and view customer information.
- Sales Management: Track sales activities and manage sales pipelines.
- Reporting: Generate reports on customer interactions and sales performance.
- User Management: Manage user roles and permissions.

## APIs
- `GET /api/customers`: Retrieve a list of customers.
- `POST /api/customers`: Add a new customer.
- `PUT /api/customers/{id}`: Update customer information.
- `DELETE /api/customers/{id}`: Delete a customer.
- `GET /api/sales`: Retrieve a list of sales activities.
- `POST /api/sales`: Add a new sales activity.
- `PUT /api/sales/{id}`: Update sales activity information.
- `DELETE /api/sales/{id}`: Delete a sales activity.

## Build Instructions
1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/CRM.git
    ```
2. Navigate to the project directory:
    ```sh
    cd CRM
    ```
3. Install dependencies:
    ```sh
    npm install
    ```

## Run Instructions
1. Start the development server:
    ```sh
    npm start
    ```
2. Open your browser and navigate to `http://localhost:3000`.

## Deployment Using Docker in VM
1. Build the Docker image:
    ```sh
    docker build -t crm-app .
    ```
2. Run the Docker container:
    ```sh
    docker run -d -p 80:3000 crm-app
    ```
3. Access the application in your browser at the VM's IP address.