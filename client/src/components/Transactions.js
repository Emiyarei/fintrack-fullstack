import React from 'react';

export default function Transactions({items, onDelete}){
  return (
    <div className="card">
      <h3>Transactions</h3>
      <table className="table" style={{marginTop:12}}>
        <thead><tr><th>Date</th><th>Type</th><th>Category</th><th>Amount</th><th></th></tr></thead>
        <tbody>
          {items.map(tx => (
            <tr key={tx.id}>
              <td>{tx.date}</td>
              <td>{tx.type}</td>
              <td>{tx.category}</td>
              <td>{tx.amount}</td>
              <td><button className="btn" onClick={()=>onDelete(tx.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
