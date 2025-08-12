# FinTrack Fullstack (merged)

## Quick start

1. Install root deps:
```
npm install
```

2. Install client deps:
```
cd client
npm install
cd ..
```

3. Run development (runs server + client):
```
npm run dev
```

- Server: http://localhost:5001
- Client: http://localhost:3000

API endpoints:
- GET /api/transactions
- POST /api/transactions
- PUT /api/transactions/:id
- DELETE /api/transactions/:id

Note: This project uses an in-memory array for transactions. Data resets when the server restarts.
