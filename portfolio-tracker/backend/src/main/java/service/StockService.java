package com.portfolio.service;

import com.portfolio.model.Stock;
import com.portfolio.repository.StockRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StockService {

    private final StockRepository stockRepository;

    public StockService(StockRepository stockRepository) {
        this.stockRepository = stockRepository;
    }

    /**
     * Get all stocks in the portfolio
     * @return List of all stocks
     */
    public List<Stock> getAllStocks() {
        return stockRepository.findAll();
    }

    /**
     * Add a new stock to the portfolio
     * @param stock The stock to add
     * @return The added stock
     */
    public Stock addStock(Stock stock) {
        return stockRepository.save(stock);
    }

    /**
     * Update an existing stock in the portfolio
     * @param id The ID of the stock to update
     * @param stockDetails Updated stock details
     * @return The updated stock
     * @throws RuntimeException if stock is not found
     */
    public Stock updateStock(Long id, Stock stockDetails) {
        Stock existingStock = stockRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Stock with ID " + id + " not found"));

        existingStock.setName(stockDetails.getName());
        existingStock.setTicker(stockDetails.getTicker());
        existingStock.setQuantity(stockDetails.getQuantity());
        existingStock.setBuyPrice(stockDetails.getBuyPrice());

        return stockRepository.save(existingStock);
    }

    /**
     * Delete a stock from the portfolio
     * @param id The ID of the stock to delete
     * @throws RuntimeException if stock is not found
     */
    public void deleteStock(Long id) {
        if (!stockRepository.existsById(id)) {
            throw new RuntimeException("Stock with ID " + id + " not found");
        }
        stockRepository.deleteById(id);
    }
}
