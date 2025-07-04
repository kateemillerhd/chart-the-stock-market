const axios = require('axios');

const fetchStockData = async (symbol) => {
  try {
    const apiKey = process.env.ALPHA_VANTAGE_KEY;
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;
    const res = await axios.get(url);
    const data = res.data["Time Series (Daily)"];

    if (!data) return null;

    const chartData = Object.keys(data).slice(0, 30).reverse().map(date => ({
      date,
      close: parseFloat(data[date]["4. close"])
    }));

    return chartData;
  } catch (err) {
    console.error(err.message);
    return null;
  }
};

module.exports = { fetchStockData };