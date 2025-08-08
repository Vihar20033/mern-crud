import axios from "axios";

const API = axios.create({ baseURL: 'http://localhost:5000/api/items' });

export const getItems = () => API.get('/');
export const addItem = (name) => API.post('/', { name });
export const updateItem = (id, name) => API.put(`/${id}`, { name }); 
export const deleteItem = (id) => API.delete(`/${id}`);              
