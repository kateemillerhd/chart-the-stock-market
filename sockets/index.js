const stockAPI = require('../services/stockAPI');

let trackedStocks = [];

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected");
  
    socket.emit("init", trackedStocks);

    socket.on("addStock", async (symbol) => {
      const stockData = await stockAPI.fetchStockData(symbol);
      if (stockData) {
        trackedStocks.push({ symbol, data: stockData });
        io.emit("update", trackedStocks);
      }
    });

    socket.on("removeStock", (symbol) => {
      trackedStocks = trackedStocks.filter(stock => stock.symbol !== symbol);
      io.emit("update", trackedStocks);
    });
  });
};