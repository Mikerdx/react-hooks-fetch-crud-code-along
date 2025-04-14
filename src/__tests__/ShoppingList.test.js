import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import ShoppingList from "../ShoppingList";

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([
        { name: "Yogurt", category: "Dairy" },
        { name: "Pomegranate", category: "Produce" },
        { name: "Lettuce", category: "Produce" }
      ])
    })
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

test("displays all items from server", async () => {
  render(<ShoppingList />);

  await waitFor(() => {
    expect(screen.getByText(/Yogurt/i)).toBeInTheDocument();
    expect(screen.getByText(/Pomegranate/i)).toBeInTheDocument();
    expect(screen.getByText(/Lettuce/i)).toBeInTheDocument();
  });
});

test("adds new item when form submitted", async () => {
  render(<ShoppingList />);

  const nameInput = screen.getByLabelText(/name/i);
  const categorySelect = screen.getByLabelText(/category/i);
  const submitButton = screen.getByText(/add to list/i);

  fireEvent.change(nameInput, { target: { value: "Ice Cream" } });
  fireEvent.change(categorySelect, { target: { value: "Dessert" } });
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.getByText(/Ice Cream/i)).toBeInTheDocument();
  });
});
