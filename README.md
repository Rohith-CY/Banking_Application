# 🏦 Banking_Application

A full-stack **Banking Management System** built using **Java, Spring Boot, Spring Security, JWT, MySQL, HTML, CSS, and JavaScript**.

The application provides a secure and simple platform for users to create accounts, log in, manage their bank accounts, perform transactions, transfer money, and view transaction history.

---

## 🚀 Features

- 🔐 **User Registration** – Create a new banking account.
- 🔑 **Secure Login** – Authenticate users using JWT-based authentication.
- 👤 **User Account Management** – View account details and account information.
- 💰 **Balance Management** – View the current account balance.
- ➕ **Deposit Money** – Add money to the account.
- ➖ **Withdraw Money** – Withdraw money from the account.
- 💸 **Fund Transfer** – Transfer money between bank accounts.
- 📜 **Transaction History** – View previous banking transactions.
- 🔒 **Spring Security** – Protect backend APIs from unauthorized access.
- 🌐 **REST API** – Frontend communicates with backend using RESTful APIs.
- 🗄️ **MySQL Database** – Store users, accounts, and transaction information.

---

## 🧠 How It Works

The system follows this basic workflow:

```text
👤 User
   ↓
🌐 Banking Web Interface
   ↓
🔑 Login / Registration
   ↓
🔐 JWT Authentication
   ↓
☕ Spring Boot REST APIs
   ↓
🛡️ Spring Security
   ↓
🗄️ MySQL Database
   ↓
💰 Account / Transactions
   ↓
📊 Banking Dashboard

🛠️ Technologies Used
Technology	Purpose
☕ Java	Backend programming language
🌱 Spring Boot	Backend application framework
🔐 Spring Security	Authentication and authorization
🎟️ JWT	Token-based authentication
🗄️ MySQL	Database management
🌐 HTML	Frontend structure
🎨 CSS	Frontend styling
⚡ JavaScript	Frontend functionality and API communication
📦 Maven	Dependency and project management
🔄 REST API	Communication between frontend and backend


📂 Project Structure
Banking_Application/
│
├── 📁 BankingApp/
│   │
│   ├── 📁 src/
│   │   ├── 📁 main/
│   │   │   ├── 📁 java/
│   │   │   │   └── 📁 com/banking/BankingApp/
│   │   │   │
│   │   │   └── 📁 resources/
│   │   │       └── application.properties
│   │   │
│   │   └── 📁 test/
│   │
│   ├── 📄 pom.xml
│   └── 📄 mvnw.cmd
│
├── 📁 frontend/

🔐 Authentication
The application uses Spring Security and JWT (JSON Web Token) for authentication.
The authentication process works as follows:
User Login
    ↓
Email + Password
    ↓
Spring Boot Backend
    ↓
Validate User
    ↓
Generate JWT Token
    ↓
Send Token to Frontend
    ↓
Frontend Stores Token
    ↓
Token Sent with Protected API Requests

🔄 REST API
The frontend communicates with the Spring Boot backend using REST APIs.
Authentication APIs
POST /api/auth/register
POST /api/auth/login
POST /api/auth/forgot-password
POST /api/auth/verify-otp
POST /api/auth/reset-password

Account APIs
GET /api/account/details
GET /api/account/balance
GET /api/account/transactions

Transaction APIs
POST /api/transaction/CREDIT
POST /api/transaction/DEBIT
POST /api/transaction/transfer

🔒 Security
The application uses several security mechanisms:
- 🔐 JWT-based authentication
- 🔑 Password encoding
- 🛡️ Spring Security
- 🚫 Protected REST APIs
- 👤 User authentication
- 🔒 Authorization using authenticated requests

🔄 Application Workflow
The complete application workflow is:
👤 Register
     ↓
🏦 Bank Account Created
     ↓
🔑 Login
     ↓
🎟️ JWT Token Generated
     ↓
🏦 Banking Dashboard
     ↓
💰 View Balance
     ↓
💸 Deposit / Withdraw / Transfer
     ↓
📜 Transaction Recorded
     ↓
🗄️ Data Stored in MySQL
     ↓
📊 Transaction History Updated

🎯 Project Goal
The main goal of this project is to develop a secure and user-friendly banking management system that demonstrates how a full-stack application can handle:

User authentication
Account management
Banking transactions
Fund transfers
Transaction history
Database persistence
REST API communication
JWT-based security


📈 Future Improvements
The project can be extended by adding:

👨‍💼 Admin dashboard
👥 Customer management
📊 Banking analytics
📧 Email notifications
📱 Mobile application
💳 Card management
🧾 PDF transaction statements
🔔 Transaction notifications
📈 Financial reports
☁️ Cloud deployment
🐳 Docker support
🔒 Additional security mechanisms


⚠️ Limitations
The current application is developed primarily as an educational/full-stack project.

Some possible limitations include:

The frontend is designed for local development.
Email functionality requires proper SMTP configuration.
Production deployment requires additional security configuration.
Payment gateway integration is not included.
Advanced banking features are not implemented.

📄 License
This project is developed for educational and project purposes.

Please check the applicable license requirements of the third-party libraries and frameworks used in this project.
