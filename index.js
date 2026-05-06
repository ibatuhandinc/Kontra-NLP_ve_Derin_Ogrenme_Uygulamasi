const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const telegramService = require('./src/services/telegram.service');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// Health check endpoint
app.get('/', (req, res) => {
    res.send('Kontra Telegram Bot Server is Running');
});

app.listen(PORT, () => {
    console.log(`🚀 Server is listening on port ${PORT}`);
    
    // Start Telegram bot polling
    telegramService.initBot();
});
