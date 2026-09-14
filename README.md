# E-Commerce API

A REST API for an e-commerce application built with Node.js, Express, MongoDB, Mongoose, JWT authentication, and Stripe payments.

## Features

- User registration and login
- JWT-based authentication and role-based authorization
- Product creation, updates, deletion, listing, filtering, and lookup
- User cart management
- Order creation and administration
- Order income statistics
- User statistics for administrators
- Stripe payment endpoint
- Environment-based configuration with `dotenv`

## Tech Stack

- Node.js
- Express 5
- MongoDB with Mongoose
- JSON Web Tokens (`jsonwebtoken`)
- AES encryption for stored passwords (`crypto-js`)
- Stripe
- CORS
- Nodemon for local development

## Prerequisites

- Node.js 18 or newer
- MongoDB database
- Stripe account and secret key

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/aayush-codes0/ECOMMERECEAPI.git
cd ECOMMERECEAPI
```

### 2. Install dependencies

```bash
npm install
```

Or, if you use Yarn:

```bash
yarn install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
MONGO_URL=mongodb://127.0.0.1:27017/ecommerce
PASS_SEC=replace-with-a-long-random-encryption-secret
JWT_SEC=replace-with-a-long-random-jwt-secret
STRIPE_KEY=sk_test_your_stripe_secret_key
PORT=5000
```

Do not commit `.env` or real credentials. The repository includes [.env.example](./.env.example) as a template.

### 4. Run the API

```bash
npm start
```

The API starts on `http://localhost:5000` by default. Set `PORT` in `.env` to use a different port.

## API Overview

All request and response bodies use JSON. Protected endpoints expect a JWT in the `token` header:

```http
token: Bearer <jwt>
```

### Authentication

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | Public | Register a user |
| `POST` | `/api/auth/login` | Public | Log in and receive an access token |

### Products

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `GET` | `/api/products` | Public | List products |
| `GET` | `/api/products?new=true` | Public | Get the five newest products |
| `GET` | `/api/products?category=category-name` | Public | Filter products by category |
| `GET` | `/api/products/find/:id` | Public | Get a product by ID |
| `POST` | `/api/products` | Admin | Create a product |
| `PUT` | `/api/products/:id` | Admin | Update a product |
| `DELETE` | `/api/products/:id` | Admin | Delete a product |

Product documents support `title`, `desc`, `img`, `categories`, `size`, `color`, and `price`.

### Carts

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `POST` | `/api/carts` | Authenticated | Create a cart |
| `GET` | `/api/carts/find/:userid` | Authenticated and authorized | Get a user's cart |
| `PUT` | `/api/carts/:id` | Authenticated and authorized | Update a cart |
| `DELETE` | `/api/carts/:id` | Authenticated and authorized | Delete a cart |
| `GET` | `/api/carts` | Admin | List all carts |

### Orders

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `POST` | `/api/orders` | Authenticated | Create an order |
| `GET` | `/api/orders/find/:userid` | Authenticated and authorized | Get a user's orders |
| `GET` | `/api/orders` | Admin | List all orders |
| `GET` | `/api/orders/income` | Admin | Get monthly income statistics |
| `PUT` | `/api/orders/:id` | Admin | Update an order |
| `DELETE` | `/api/orders/:id` | Admin | Delete an order |

Order documents support `userId`, `products`, `amount`, `address`, and `status`.

### Users

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `PUT` | `/api/users/:id` | Authenticated owner or admin | Update a user |
| `DELETE` | `/api/users/:id` | Authenticated owner or admin | Delete a user |
| `GET` | `/api/users/find/:id` | Admin | Get a user by ID |
| `GET` | `/api/users?new=true` | Admin | Get the five newest users |
| `GET` | `/api/users` | Admin | List all users |
| `GET` | `/api/users/stats` | Admin | Get user registration statistics |

### Payments

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `POST` | `/api/checkout/payment` | Public | Create a Stripe charge |

The payment endpoint expects a JSON body containing the Stripe source token and amount, for example:

```json
{
  "tokenId": "tok_visa",
  "amount": 1999
}
```

Stripe amounts are sent in the smallest currency unit, such as cents for USD.

## Example Login Request

```bash
curl -X POST http://localhost:5000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"demo-user\",\"password\":\"your-password\"}"
```

Use the `accessToken` from the response in the `token` header for protected requests.

## Project Structure

```text
.
├── index.js              # Express app, middleware, database connection, and routes
├── models/               # Mongoose schemas
├── routes/               # Authentication, users, products, carts, orders, and Stripe routes
├── .env.example          # Environment variable template
├── package.json
└── yarn.lock
```

## Security Notes

- Keep all values in `.env` private.
- Use strong, unique values for `PASS_SEC` and `JWT_SEC`.
- Use Stripe test keys during development.
- Protect production deployments with HTTPS and appropriate CORS configuration.
- Validate and sanitize client input before exposing the API publicly.

## License

This project currently uses the ISC license declared in `package.json`.
