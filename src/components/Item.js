import React from "react";

function Item({ item, onUpdateItem, onDeleteItem }) {
  // Handles the "Add to Cart"/"Remove From Cart" click
  function handleAddToCartClick() {
    // Toggle the isInCart status and call the update handler
    const updatedItem = {
      ...item,
      isInCart: !item.isInCart,
    };
    onUpdateItem(updatedItem);
  }

  // Handles the "Delete" button click
  function handleDeleteClick() {
    onDeleteItem(item.id);
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button
        className={item.isInCart ? "remove" : "add"}
        onClick={handleAddToCartClick}
      >
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDeleteClick}>
        Delete
      </button>
    </li>
  );
}

export default Item;