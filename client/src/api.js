import axios from 'axios';
const API = '/api';
export const fetchTransactions = () => axios.get(`${API}/transactions`);
export const addTransaction = (payload) => axios.post(`${API}/transactions`, payload);
export const updateTransaction = (id, payload) => axios.put(`${API}/transactions/${id}`, payload);
export const deleteTransaction = (id) => axios.delete(`${API}/transactions/${id}`);
