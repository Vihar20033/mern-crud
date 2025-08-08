import React, { useEffect, useState } from "react";
import { getItems, addItem, updateItem, deleteItem } from "../api/itemApi";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const { data } = await getItems();
      setItems(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleSubmit = async () => {
    if (!input.trim()) return;
    try {
      editId ? await updateItem(editId, input) : await addItem(input);
      setInput("");
      setEditId(null);
      fetchItems();
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      fetchItems();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleEdit = (item) => {
    setInput(item.name);
    setEditId(item._id);
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.box}>
        <h2>MERN CRUD</h2>
        <div style={styles.inputArea}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter item"
            style={styles.input}
          />
          <button onClick={handleSubmit} style={styles.button}>
            {editId ? "Update" : "Add"}
          </button>
        </div>
        <ul>
          {items.map((item) => (
            <li key={item._id} style={styles.listItem}>
              {item.name}
              <div>
                <button onClick={() => handleEdit(item)} style={styles.editBtn}>
                  Edit
                </button>
                <button onClick={() => handleDelete(item._id)} style={styles.deleteBtn}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f0f0f0",
  },
  box: {
    width: "350px",
    padding: "20px",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  inputArea: {
    display: "flex",
    marginBottom: "15px",
  },
  input: {
    flex: 1,
    padding: "8px",
    marginRight: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "8px 12px",
    background: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    background: "#eee",
    padding: "10px",
    borderRadius: "4px",
    marginBottom: "8px",
  },
  editBtn: {
    marginRight: "8px",
    background: "#ffc107",
    border: "none",
    color: "#000",
    padding: "5px 10px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  deleteBtn: {
    background: "#dc3545",
    border: "none",
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default ItemList;
