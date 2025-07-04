const express = require('express');
const router = express.Router();
const stockAPI = require('../services/stockAPI');

router.get('/:symbol', async (req, res) => {
  const symbol = req.params.symbol.toUpperCase();
  const data = await stockAPI.fetchStockData(symbol);

  if (!data) {
    return res.status(404).json({ error: "Invalid stock symbol or API limit reached." });
  }

  res.json({ symbol, data });
});

module.exports = router;