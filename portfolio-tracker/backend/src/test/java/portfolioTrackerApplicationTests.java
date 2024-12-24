package com.example.portfolio;

import com.example.portfolio.model.Stock;
import com.example.portfolio.repository.StockRepository;
import com.example.portfolio.service.StockService;
import com.example.portfolio.controller.StockController;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
public class PortfolioTrackerApplicationTests {

    @Autowired
    private MockMvc mockMvc;

    @Mock
    private StockRepository stockRepository;

    @Mock
    private StockService stockService;

    @InjectMocks
    private StockController stockController;

    private Stock stock;

    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders.standaloneSetup(stockController).build();
        stock = new Stock("Apple", "AAPL", 1, 150.0);
    }

    @Test
    public void testAddStock() throws Exception {
        when(stockRepository.save(any(Stock.class))).thenReturn(stock);

        mockMvc.perform(post("/api/stocks")
                        .contentType("application/json")
                        .content("{\"name\":\"Apple\", \"ticker\":\"AAPL\", \"quantity\":1, \"buyPrice\":150.0}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("Apple"))
                .andExpect(jsonPath("$.ticker").value("AAPL"));
        
        verify(stockRepository, times(1)).save(any(Stock.class));
    }

    @Test
    public void testGetAllStocks() throws Exception {
        Stock stock2 = new Stock("Tesla", "TSLA", 1, 700.0);
        List<Stock> stocks = Arrays.asList(stock, stock2);
        when(stockRepository.findAll()).thenReturn(stocks);

        mockMvc.perform(get("/api/stocks"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Apple"))
                .andExpect(jsonPath("$[1].name").value("Tesla"));
    }

    @Test
    public void testGetStockById() throws Exception {
        when(stockRepository.findById(anyLong())).thenReturn(Optional.of(stock));

        mockMvc.perform(get("/api/stocks/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Apple"))
                .andExpect(jsonPath("$.ticker").value("AAPL"));
    }

    @Test
    public void testUpdateStock() throws Exception {
        Stock updatedStock = new Stock("Apple", "AAPL", 1, 155.0);
        when(stockRepository.findById(anyLong())).thenReturn(Optional.of(stock));
        when(stockRepository.save(any(Stock.class))).thenReturn(updatedStock);

        mockMvc.perform(put("/api/stocks/1")
                        .contentType("application/json")
                        .content("{\"name\":\"Apple\", \"ticker\":\"AAPL\", \"quantity\":1, \"buyPrice\":155.0}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.buyPrice").value(155.0));

        verify(stockRepository, times(1)).save(any(Stock.class));
    }

    @Test
    public void testDeleteStock() throws Exception {
        when(stockRepository.existsById(anyLong())).thenReturn(true);

        mockMvc.perform(delete("/api/stocks/1"))
                .andExpect(status().isNoContent());

        verify(stockRepository, times(1)).deleteById(anyLong());
    }

    @Test
    public void testGetPortfolioValue() throws Exception {
        double portfolioValue = stock.getQuantity() * stock.getBuyPrice();
        when(stockService.calculatePortfolioValue()).thenReturn(portfolioValue);

        mockMvc.perform(get("/api/portfolio/value"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value(portfolioValue));
    }

    @Test
    public void testGetTopPerformingStock() throws Exception {
        when(stockService.getTopPerformingStock()).thenReturn(stock);

        mockMvc.perform(get("/api/portfolio/top-performing"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Apple"));
    }
}
