import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Dummy transactions
let transactions = [
  { id: 1, date: '2025-07-01', type: 'income', category: 'Salary', amount: 3200 },
  { id: 2, date: '2025-07-03', type: 'expense', category: 'Groceries', amount: 120 },
  { id: 3, date: '2025-07-05', type: 'expense', category: 'Rent', amount: 900 },
  { id: 4, date: '2025-07-10', type: 'income', category: 'Freelance', amount: 600 },
  { id: 5, date: '2025-07-12', type: 'expense', category: 'Utilities', amount: 80 },
  { id: 6, date: '2025-06-28', type: 'expense', category: 'Dining', amount: 45 },
  { id: 7, date: '2025-06-20', type: 'income', category: 'Interest', amount: 25 },
  { id: 8, date: '2025-05-15', type: 'expense', category: 'Gym', amount: 40 }
];

app.get('/api/transactions', (req, res) => {
  res.json(transactions);
});

app.post('/api/transactions', (req, res) => {
  const { date, type, category, amount } = req.body;
  if (!date || !type || !category || typeof amount !== 'number') {
    return res.status(400).json({ error: 'missing fields' });
  }
  const id = Date.now();
  const tx = { id, date, type, category, amount };
  transactions.push(tx);
  res.status(201).json(tx);
});

app.put('/api/transactions/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const idx = transactions.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).json({ error: 'not found' });
  transactions[idx] = { ...transactions[idx], ...req.body };
  res.json(transactions[idx]);
});

app.delete('/api/transactions/:id', (req, res) => {
  const id = parseInt(req.params.id);
  transactions = transactions.filter(t => t.id !== id);
  res.json({ ok: true });
});

// Serve frontend build
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`FinTrack server running on port ${PORT}`));
