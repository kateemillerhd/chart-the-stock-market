const stockAPI = require('../services/stockAPI');

let trackedStocks = [];

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected");
  
    socket.emit("init", trackedStocks);

    socket.on("addStock", async (symbol) => {
      console.log("Requested to add stock:", symbol);
      
      const stockData = await stockAPI.fetchStockData(symbol);
      
      if (stockData) {
        trackedStocks.push({ symbol, data: stockData });
        io.emit("update", trackedStocks);
      } else {
        console.log("Invalid stock or failed to fetch:", symbol);
        socket.emit("errorMessage", `Could not fetch data for "${symbol}". Please check the symbol and try again.`);
      }
    });

    socket.on("removeStock", (symbol) => {
      trackedStocks = trackedStocks.filter(stock => stock.symbol !== symbol);
      io.emit("update", trackedStocks);
    });
  });
};