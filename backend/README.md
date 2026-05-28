# The Nature's Way Backend

## Setup
1. Copy `.env.example` to `.env` and fill values.
2. Install deps: `npm install` (or `bun install`).
3. Run dev server: `npm run dev`.

## Scripts
- `npm run dev` - watch mode using tsx
- `npm run seed` - reset collections and load backend seed data
- `npm run build` - compile to dist
- `npm start` - start compiled server

## Auth bootstrap
Create first admin only once:
- POST `/auth/bootstrap-admin` with body `{ name, email, password }`.
- Must match `ADMIN_BOOTSTRAP_EMAIL` and `ADMIN_BOOTSTRAP_PASSWORD` in `.env`.

## API Summary
- `GET /health`
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/logout`
- `POST /auth/bootstrap-admin`
- `GET /users/me`
- `GET /products` (public)
- `GET /products/:id` (public)
- `POST /orders` (auth)
- `GET /orders/me` (auth)
- `POST /payments/razorpay/order` (auth)
- `POST /payments/razorpay/verify` (auth)
- `POST /payments/razorpay/refresh/:orderId` (auth)
- `GET /content/pages` (public)
- `GET /content/sections` (public)
- `GET /admin/products`
- `POST /admin/products`
- `PATCH /admin/products/:id`
- `DELETE /admin/products/:id`
- `GET /admin/orders`
- `GET /admin/orders/:id`
- `PATCH /admin/orders/:id/status`
- `DELETE /admin/orders/:id`
- `POST /admin/orders/:id/refresh-payment`
- `GET /admin/customers`
- `POST /admin/customers`
- `PATCH /admin/customers/:id`
- `DELETE /admin/customers/:id`
- `GET /admin/content/pages`
- `POST /admin/content/pages`
- `PATCH /admin/content/pages/:slug`
- `DELETE /admin/content/pages/:slug`
- `GET /admin/content/sections`
- `POST /admin/content/sections`
- `PATCH /admin/content/sections/:id`
- `DELETE /admin/content/sections/:id`
- `GET /admin/analytics/overview`
- `GET /admin/analytics/dashboard`
