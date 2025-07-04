# chart-the-stock-market

A real-time stock tracking app built with Node.js, Express, WebSockets, and a charting library.  Users can add and remove stock by symbol, view recent trends, and see updates from other users in real time.

## Features
- View trend lines for each added stock
- Add stocks by symbol (e.g. AAPL, TSLA)
- Remove stocks from the chart
- Real-time updates via WebSockets

## Tech Stack
- Backend: Node.js + Express
- Frontend: HTML/CSS/JS
- Real-time: Socket.IO
- Charts: Chart.js
- API: Alpha Vantage (or another stock API)

## Setup Instructions
1. Clone the repository:
```bash
git clone https://github.com/kateemillerhd/chart-the-stock-market.git
cd chart-the-stock
```
2. Install dependencies:
```bash
npm install
```
3. Create a .env file:
```bash
ALPHA_VANTAGE_KEY=your_api_key_here
```
4. Start the development server:
```bash
npm run dev
```

