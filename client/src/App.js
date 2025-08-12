import React, {useEffect, useState} from 'react';
import { fetchTransactions, addTransaction, deleteTransaction } from './api';
import { IncomeExpenseBar, CategoryPie } from './components/Charts';
import Transactions from './components/Transactions';
import AddForm from './components/AddForm';

function computeSummary(items){
  const income = items.filter(i=>i.type==='income').reduce((s,i)=>s+i.amount,0);
  const expense = items.filter(i=>i.type==='expense').reduce((s,i)=>s+i.amount,0);
  const balance = income - expense;
  return { income, expense, balance };
}

export default function App(){
  const [items, setItems] = useState([]);

  useEffect(()=>{ load(); }, []);

  async function load(){
    try{
      const res = await fetchTransactions();
      setItems(res.data);
    }catch(e){ console.error(e); }
  }

  async function handleAdd(payload){
    await addTransaction(payload);
    load();
  }

  async function handleDelete(id){
    await deleteTransaction(id);
    load();
  }

  const { income, expense, balance } = computeSummary(items);

  // prepare chart data (group by month)
  const months = ['May','Jun','Jul','Aug','Sep'];
  const incomeData = months.map(m => items.filter(it=>it.date.startsWith('2025-07') && it.type==='income').length ? items.filter(it=>it.date.startsWith('2025-07') && it.type==='income').reduce((s,i)=>s+i.amount,0) : 0);
  const expenseData = months.map(m => items.filter(it=>it.date.startsWith('2025-07') && it.type==='expense').length ? items.filter(it=>it.date.startsWith('2025-07') && it.type==='expense').reduce((s,i)=>s+i.amount,0) : 0);

  const categoryMap = {};
  items.forEach(it => { categoryMap[it.category] = (categoryMap[it.category] || 0) + it.amount; });
  const catLabels = Object.keys(categoryMap);
  const catValues = Object.values(categoryMap);

  return (
    <div className="container">
      <div className="header">
        <h1>FinTrack — Personal Finance Dashboard</h1>
        <div style={{textAlign:'right'}}>
          <div style={{fontSize:14,color:'#6b7280'}}>Fresh finance theme • demo data included</div>
        </div>
      </div>

      <div className="grid">
        <div className="card summary">
          <div style={{fontSize:12,color:'#6b7280'}}>Balance</div>
          <div style={{fontSize:22,fontWeight:700}}>${balance.toFixed(2)}</div>
        </div>

        <div className="card summary">
          <div style={{fontSize:12,color:'#6b7280'}}>Income</div>
          <div style={{fontSize:22,fontWeight:700,color:'#10B981'}}>${income.toFixed(2)}</div>
        </div>

        <div className="card summary">
          <div style={{fontSize:12,color:'#6b7280'}}>Expenses</div>
          <div style={{fontSize:22,fontWeight:700,color:'#ef4444'}}>${expense.toFixed(2)}</div>
        </div>
      </div>

      <div className="charts card">
        <div style={{flex:1,minWidth:320}}>
          <h3>Monthly Income vs Expenses</h3>
          <IncomeExpenseBar labels={['May','Jun','Jul','Aug','Sep']} incomeData={incomeData} expenseData={expenseData} />
        </div>
        <div style={{width:360}}>
          <h3>By Category</h3>
          <CategoryPie labels={catLabels} values={catValues} />
        </div>
      </div>

      <div style={{display:'flex',gap:16,marginTop:16}}>
        <div style={{flex:1}}><Transactions items={items} onDelete={handleDelete} /></div>
        <div style={{width:360}}><AddForm onAdd={handleAdd} /></div>
      </div>

      <div className="screens">
        <img src="/images/fintrack_dashboard.png" alt="dashboard" />
        <img src="/images/fintrack_transactions.png" alt="transactions" />
      </div>
    </div>
  );
}
