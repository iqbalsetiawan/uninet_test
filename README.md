# Employee Management System

This Employee Management System is a web application built with React and Firebase Firestore. It allows users to add, update, delete, and list employees in a company. It features a modern UI built with Material-UI and includes form validation and responsive feedback via alerts.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete employees.
- **Responsive UI**: Built with Material-UI for a modern and responsive design.
- **Real-time Data**: Utilizes Firebase Firestore for real-time data storage and retrieval.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your computer.
- A Firebase project and its corresponding configuration details.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/iqbalsetiawan/uninet_test
   ```

2. Navigate to the project directory:
   ```bash
   cd employee-management-system
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up your Firebase configuration:
   - Create a `.env` file in the root directory.
   - Add your Firebase project configuration as environment variables:
     ```
     REACT_APP_API_KEY=your_api_key
     REACT_APP_AUTH_DOMAIN=your_auth_domain
     REACT_APP_PROJECT_ID=your_project_id
     REACT_APP_STORAGE_BUCKET=your_storage_bucket
     REACT_APP_MESSAGING_SENDER_ID=your_messaging_sender_id
     REACT_APP_APP_ID=your_app_id
     ```

5. Start the development server:
   ```bash
   npm start
   ```

The application should now be running on [http://localhost:3000](http://localhost:3000).

## Usage

- **Adding an Employee**: Click the "Add Employee" button and fill out the form.
- **Editing an Employee**: Click the "Edit" button next to an employee's row in the table.
- **Deleting an Employee**: Click the "Delete" button next to an employee's row and confirm the action in the dialog.
- **Viewing Employees**: Simply browse the table on the main page.
