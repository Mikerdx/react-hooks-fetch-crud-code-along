import React, { useEffect, useState } from "react";

function ShoppingList() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("All");
  const [formData, setFormData] = useState({ name: "", category: "Produce" });

  useEffect(() => {
    fetch("http://localhost:3000/items")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newItem = { ...formData };
    setItems([...items, newItem]);
  }

  const visibleItems =
    filter === "All" ? items : items.filter((item) => item.category === filter);

  return (
    <div className="ShoppingList">
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input name="name" value={formData.name} onChange={handleChange} />
        </label>
        <label>
          Category:
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="Produce">Produce</option>
            <option value="Dairy">Dairy</option>
            <option value="Dessert">Dessert</option>
          </select>
        </label>
        <button type="submit">Add to List</button>
      </form>

      <div className="Filter">
        <select name="filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">Filter by category</option>
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </div>

      <ul className="Items">
        {visibleItems.map((item, index) => (
          <li key={index}>
            <span>{item.name}</span>
            <span className="category">{item.category}</span>
            <button>Add to Cart</button>
            <button>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
