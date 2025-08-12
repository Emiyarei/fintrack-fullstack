import React, {useState} from 'react';

export default function AddForm({onAdd}){
  const [date, setDate] = useState('2025-07-01');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('Misc');
  const [amount, setAmount] = useState('0');

  function submit(e){
    e.preventDefault();
    const payload = { date, type, category, amount: Number(amount) };
    onAdd(payload);
  }

  return (
    <div className="card">
      <h3>Add Transaction</h3>
      <form onSubmit={submit} style={{display:'grid',gap:8,marginTop:12}}>
        <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="input" />
        <select value={type} onChange={e=>setType(e.target.value)} className="input">
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input value={category} onChange={e=>setCategory(e.target.value)} placeholder="Category" className="input" />
        <input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Amount" className="input" />
        <button className="btn" type="submit">Add</button>
      </form>
    </div>
  );
}
