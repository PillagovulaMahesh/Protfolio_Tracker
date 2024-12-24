import React, { useState } from "react";
import axios from "axios";

const StockForm = ({ setStocks, calculateTotalValue }) => {
  const [formData, setFormData] = useState({
    name: "",
    ticker: "",
    quantity: 1,
    buyPrice: 0,
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission (Adding a new stock)
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/stocks", formData) // Example endpoint
      .then((response) => {
        // Update stock list after adding new stock
        setStocks((prevStocks) => [...prevStocks, response.data]);
        calculateTotalValue([...stocks, response.data]);
        setFormData({ name: "", ticker: "", quantity: 1, buyPrice: 0 }); // Reset form
      })
      .catch((error) => {
        console.error("There was an error adding the stock!", error);
      });
  };

  return (
    <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-medium mb-4">Add Stock</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm">Stock Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="Apple"
          />
        </div>
        <div>
          <label className="block text-sm">Ticker</label>
          <input
            type="text"
            name="ticker"
            value={formData.ticker}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="AAPL"
          />
        </div>
        <div>
          <label className="block text-sm">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="1"
          />
        </div>
        <div>
          <label className="block text-sm">Buy Price</label>
          <input
            type="number"
            name="buyPrice"
            value={formData.buyPrice}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="150"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded mt-4">
          Add Stock
        </button>
      </form>
    </div>
  );
};

export default StockForm;
