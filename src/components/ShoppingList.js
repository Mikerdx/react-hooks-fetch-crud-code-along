// src/ShoppingList.js
import React, { useState, useEffect } from "react";

function ShoppingList() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", category: "Produce" });

  useEffect(() => {
    fetch("http://localhost:3000/items")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newItemToAdd = {
      id: Date.now(),
      ...newItem,
    };

    // Optimistic update for now — you can adjust to send a POST request later
    setItems([...items, newItemToAdd]);

    // Reset form
    setNewItem({ name: "", category: "Produce" });
  }

  return (
    <div>
      <h1>Shopping List</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="name"
          value={newItem.name}
          onChange={handleChange}
        />

        <label htmlFor="category">Category:</label>
        <select
          id="category"
          name="category"
          value={newItem.category}
          onChange={handleChange}
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>

        <button type="submit">Add to list</button>
      </form>
      
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} ({item.category})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
