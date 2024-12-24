import React, { useState, useEffect } from "react";
import axios from "axios";

// Dummy data for demonstration (You would replace this with actual API calls)
const stockExample = {
  id: 1,
  name: "Apple",
  ticker: "AAPL",
  quantity: 1,
  buyPrice: 150.0,
};

const App = () => {
  const [stocks, setStocks] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  // Fetch portfolio data (stocks and their details) from backend
  useEffect(() => {
    axios.get("http://localhost:8080/api/stocks") // Example endpoint
      .then(response => {
        setStocks(response.data);
        calculateTotalValue(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the stock data!", error);
      });
  }, []);

  // Calculate total portfolio value based on stock quantities and prices
  const calculateTotalValue = (stocks) => {
    let total = 0;
    stocks.forEach(stock => {
      total += stock.quantity * stock.buyPrice; // Assuming real-time data would update buyPrice
    });
    setTotalValue(total);
  };

  // Function to delete a stock
  const deleteStock = (id) => {
    axios.delete(`http://localhost:8080/api/stocks/${id}`)
      .then(() => {
        setStocks(stocks.filter(stock => stock.id !== id));
        calculateTotalValue(stocks);
      })
      .catch(error => {
        console.error("There was an error deleting the stock!", error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-semibold text-center mb-8">Portfolio Tracker</h1>

      <div className="mb-6">
        <h2 className="text-xl font-medium">Total Portfolio Value: ${totalValue}</h2>
      </div>

      <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
        <table className="w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">Stock</th>
              <th className="p-2">Ticker</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Buy Price</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map(stock => (
              <tr key={stock.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{stock.name}</td>
                <td className="p-2">{stock.ticker}</td>
                <td className="p-2">{stock.quantity}</td>
                <td className="p-2">${stock.buyPrice}</td>
                <td className="p-2">
                  <button
                    onClick={() => deleteStock(stock.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit stock form */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-medium mb-4">Add/Edit Stock</h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm">Stock Name</label>
            <input type="text" className="w-full p-2 border rounded" placeholder="Apple" />
          </div>
          <div>
            <label className="block text-sm">Ticker</label>
            <input type="text" className="w-full p-2 border rounded" placeholder="AAPL" />
          </div>
          <div>
            <label className="block text-sm">Quantity</label>
            <input type="number" className="w-full p-2 border rounded" placeholder="1" />
          </div>
          <div>
            <label className="block text-sm">Buy Price</label>
            <input type="number" className="w-full p-2 border rounded" placeholder="150" />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded mt-4"
          >
            Add Stock
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
