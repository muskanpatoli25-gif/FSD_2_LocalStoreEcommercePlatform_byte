# VELOURA - Beauty & Ritual (Local Store E-commerce Platform)

Full stack beauty e-commerce website built for the **Arithmatrix AVIP 2026** internship (Full Stack Development, Task 3).

**Twist feature:** "Crypto Cartel" checkout, a dummy **Arith-Coin** payment with a "Blockchain Transaction Verified" animation. No real money or cryptocurrency is used.

🌐 Live Demo
- Frontend = backend: https://fsd-3-local-store-ecommerce-platfor-woad.vercel.app

## Tech Stack

- **Frontend:** React (Vite), React Router, Tailwind CSS, Context API
- **Backend:** Node.js, Express 5
- **Database:** MongoDB Atlas (Mongoose)

## Features

- Product listing with category filter and search (synced with URL params)
- Product detail page with stock status and related products
- Shopping bag (add, remove, change quantity), persisted for the session (`sessionStorage`)
- Stock limits enforced in the cart and on the server
- Checkout with delivery form validation and Arith-Coin demo payment
- Orders saved in MongoDB, stock reduced after each order
- Server recalculates prices, so the client cannot change the total
- Loading, error, empty and not-found states on every page
- Responsive design (mobile, tablet, desktop)

## Project Structure

```
.
├── backend/
│   ├── models/        Product.js, Order.js
│   ├── routes/        ProductRoutes.js, OrderRoutes.js
│   ├── seed.js        loads sample data into MongoDB
│   └── server.js
└── frontend/
    ├── public/images/
    └── src/
        ├── components/  Navbar, Footer, ProductCard, ScrollToTop
        ├── data/        products.js (sample data source for seeding)
        ├── pages/       Home, Products, ProductDetails, Cart, Checkout, About
        ├── api.js
        └── CartContext.jsx
```

## Setup

### 1. Backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/veloura
CLIENT_URL=http://localhost:5173
```

Load sample data (32 products) and start the server:

```bash
npm run seed
npm run dev
```

### 2. Frontend

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```
VITE_API_URL=http://localhost:5000/api
```

```bash
npm run dev
```


## API Endpoints

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Server status |
| GET | `/products` | All products. Optional query: `category`, `search` |
| GET | `/products/:id` | Single product (404 if not found) |
| POST | `/orders` | Create an order |

### Examples

**GET** `/products?category=Skincare&search=serum`

**GET** `/products/1`

```json
{
  "id": "1",
  "name": "Glow Hydrating Serum",
  "price": 24.99,
  "category": "Skincare",
  "image": "/images/products/glow-serum.jpeg",
  "description": "A lightweight hydrating serum...",
  "stock": 10
}
```

**POST** `/orders`

```json
{
  "customer": {
    "name": "Ayesha Khan",
    "email": "ayesha@example.com",
    "phone": "03001234567",
    "address": "House 12, Street 4",
    "city": "Hyderabad"
  },
  "items": [
    { "id": "1", "quantity": 2 },
    { "id": "9", "quantity": 1 }
  ]
}
```

Success (201):

```json
{ "message": "Order placed", "orderId": "665f...", "total": 65.97 }
```

Errors (400): `Please fill all required fields`, `Cart is empty`, `Invalid item in cart`, `<product> is out of stock`.

## Sample Data

32 products across 4 categories (Skincare, Makeup, Haircare, Fragrance), 8 each. Source: `frontend/src/data/products.js`, loaded by `npm run seed`. Every product starts with stock 10.

## Notes

- The newsletter form in the footer is a front-end demo only (emails are not saved).
- Payment is simulated. No real transactions happen.

## Author

muskanpatoli25-gif | Arithmatrix AVIP 2026
