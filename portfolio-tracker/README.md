# Portfolio Tracker Application

A simple portfolio tracker application that allows users to manage their stock holdings, view portfolio metrics, and track the portfolio value based on real-time stock prices.

## Features

- **Add, View, Edit, and Delete Stock Holdings**: Users can manage their portfolio by adding, editing, or removing stocks.
- **Track Total Portfolio Value**: The app calculates and displays the total portfolio value based on real-time stock prices.
- **Dashboard**: A user-friendly dashboard to visualize key portfolio metrics such as total value, stock distribution, and performance.
- **Real-Time Data**: Integrates with free stock price APIs (e.g., Alpha Vantage, Yahoo Finance, Finnhub) to fetch real-time prices and update portfolio value dynamically.

## Tech Stack

- **Frontend**: React, Axios, TailwindCSS
- **Backend**: Spring Boot (Java), MySQL, JPA/Hibernate
- **API Integration**: Alpha Vantage/Yahoo Finance/Finnhub for real-time stock data
- **Deployment**:
  - Frontend: Vercel/Netlify
  - Backend: Heroku/AWS/Render

## Prerequisites

Before running the project locally, ensure you have the following installed:
- Node.js (>= 16.x)
- npm (>= 8.x)
- MySQL (for the backend database)
- Java 11+ (for Spring Boot)

## Setup Instructions

### 1. Backend (Spring Boot)

1. Clone the backend repository:
   ```bash
   git clone https://github.com/yourusername/portfolio-tracker-backend.git
   cd portfolio-tracker-backend
