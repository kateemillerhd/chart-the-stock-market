const socket = io();
const form = document.getElementById('stock-form');
const input = document.getElementById('stock-input');
const chartCtx = document.getElementById('stock-chart');.getContext('2d');
const list = document.getElementById('stock-list');

let chart;
let colors = ["#f39c12", "#3498db", "#2ecc71", "#e74c3c"];
let stockData = [];

function renderChart() {
  const labels = stockData[0]?.data.map(point => point.date) || [];
  const datasets = stockData.map((stock, i) => ({
    label: stock.symbol,
    data: stock.data.map(point => point.close),
    borderColor: colors[i % colors.length],
    fill: false
  }));

  if (chart) chart.destroy();
  chart = new Chart(chartCtx, {
    type: "line",
    data: { labels, datasets },
    options: { responsive: true }
  });
}

function renderList() {
  list.innerHTML = "";
  stockData.forEach(stock => {
    const li = document.createElement('li');
    li.textContent = stock.symbol;
    const btn = document.createElement('button');
    btn.textContent = "Remove";
    btn.onclick = () => socket.emit("removeStock", stock.symbol);
    li.appendChild(btn);
    list.appendChild(li);
  });
}

socket.on("init", (data) => {
  stockData = data;
  renderChart();
  renderList();
});

socket.on("update", (data) => {
  stockData = data;
  renderChart();
  renderList();
});

form.onsubmit = (e) => {
  e.preventDefault();
  const symbol = input.value.trim().toUpperCase();
  if (symbol) {
    socket.emit("addStock", symbol);
    input.value = '';
  }
};