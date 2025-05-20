// gateway.js
const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

app.use((req, res, next) => {
  console.log(`[Gateway] ${req.method} ${req.originalUrl}`);
  next();
});

app.use('/api/ticket', createProxyMiddleware({
  target: process.env.SERVICE_A_URL,
  changeOrigin: true,
  pathRewrite: { '^/api/ticket': '' }
}));

app.use('/api/chat', createProxyMiddleware({
  target: process.env.SERVICE_B_URL,
  changeOrigin: true,
  pathRewrite: { '^/api/chat': '' }
}));

app.listen(PORT, () => {
  console.log(`API Gateway running on http://localhost:${PORT}`);
});
