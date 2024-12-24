import React, { useState, useEffect } from "react";
import axios from "axios";
import StockList from "./StockList";
import StockForm from "./StockForm";

const Dashboard = () => {
  const [stocks, setStocks] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  // Fetch portfolio data (stocks and their details) from the backend
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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-semibold text-center mb-8">Portfolio Tracker</h1>

      {/* Portfolio Overview */}
      <div className="mb-6">
        <h2 className="text-xl font-medium">Total Portfolio Value: ${totalValue}</h2>
      </div>

      {/* Stock List */}
      <StockList stocks={stocks} setStocks={setStocks} calculateTotalValue={calculateTotalValue} />

      {/* Add/Edit Stock Form */}
      <StockForm setStocks={setStocks} calculateTotalValue={calculateTotalValue} />
    </div>
  );
};

export default Dashboard;
