import React from "react";
import axios from "axios";

const StockList = ({ stocks, setStocks, calculateTotalValue }) => {
  // Function to delete a stock
  const deleteStock = (id) => {
    axios
      .delete(`http://localhost:8080/api/stocks/${id}`) // Example endpoint
      .then(() => {
        setStocks(stocks.filter((stock) => stock.id !== id));
        calculateTotalValue(stocks.filter((stock) => stock.id !== id));
      })
      .catch((error) => {
        console.error("There was an error deleting the stock!", error);
      });
  };

  return (
    <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-medium mb-4">Your Stocks</h3>
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
          {stocks.map((stock) => (
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
  );
};

export default StockList;
