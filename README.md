# User Login API with Email and OTP Authentication

## Project Overview

This project provides a secure and efficient API system for user authentication using email and One-Time Password (OTP). It allows users to log in by providing their email address, receiving an OTP, and verifying the OTP to gain access.

## Features

1. **User Registration**
   - Endpoint to register a new user with an email address.
   - Validates the email format and checks for duplicates.

2. **OTP Generation and Sending**
   - Endpoint to request an OTP.
   - Generates a secure OTP.
   - Sends the OTP to the user's registered email address.

3. **OTP Verification**
   - Endpoint to verify the OTP.
   - Authenticates the user if the OTP is valid and within the time limit.

4. **Session Management**
   - Generates and manages user sessions upon successful OTP verification.
   - Provides secure session tokens for authenticated users.

5. **Security Measures**
   - Implements rate limiting on OTP requests to prevent abuse.
   - Uses secure algorithms for OTP generation and hashing.
   - Ensures encrypted communication between client and server.

## Technical Stack

- **Backend Framework**: Express.js
- **Database**: SQLite
- **Email Service**: Nodemailer (using Gmail SMTP for this example)
- **Token Management**: JSON Web Tokens (JWT)
- **Environment Setup**: Docker (optional)

## Prerequisites

- Node.js
- npm (Node Package Manager)
- SQLite3

## Installation

1. **Clone the repository:**
    ```sh
    git clone <repository-url>
    cd user-login-api
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Set up environment variables:**
    - Create a `.env` file in the root of the project.
    - Add the following contents:
      ```env
      EMAIL_USER=your-email@gmail.com
      EMAIL_PASS=your-email-password
      ```

4. **Run the development server:**
    ```sh
    npm run dev
    ```

## API Endpoints

### User Registration

- **URL**: `POST /api/register`
- **Request Body**:
    ```json
    {
      "email": "user@example.com"
    }
    ```
- **Response**:
    ```json
    {
      "message": "Registration successful. Please verify your email."
    }
    ```

### Request OTP

- **URL**: `POST /api/request-otp`
- **Request Body**:
    ```json
    {
      "email": "user@example.com"
    }
    ```
- **Response**:
    ```json
    {
      "message": "OTP sent to your email."
    }
    ```

### Verify OTP

- **URL**: `POST /api/verify-otp`
- **Request Body**:
    ```json
    {
      "email": "user@example.com",
      "otp": "123456"
    }
    ```
- **Response**:
    ```json
    {
      "message": "Login successful.",
      "token": "jwt_token"
    }
    ```

## Testing the API

You can use Thunder Client (a VSCode extension) or Postman to test the API endpoints.

1. **User Registration**:
    - Method: `POST`
    - URL: `http://localhost:3000/api/register`
    - Body (JSON):
      ```json
      {
        "email": "user@example.com"
      }
      ```

2. **Request OTP**:
    - Method: `POST`
    - URL: `http://localhost:3000/api/request-otp`
    - Body (JSON):
      ```json
      {
        "email": "user@example.com"
      }
      ```

3. **Verify OTP**:
    - Method: `POST`
    - URL: `http://localhost:3000/api/verify-otp`
    - Body (JSON):
      ```json
      {
        "email": "user@example.com",
        "otp": "123456"
      }
      ```

## Notes

- Ensure your Gmail account allows less secure apps or use an App Password if you have 2-factor authentication enabled.
- This setup is intended for testing and development purposes. For production, use a more secure method to manage your credentials and email sending service.
- Rate limiting is implemented on the `/api/request-otp` endpoint to prevent abuse.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
