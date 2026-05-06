const TelegramBot = require('node-telegram-bot-api');
const db = require('./db.service');
const aiService = require('./ai.service');

function initBot() {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token) {
        console.error('TELEGRAM_BOT_TOKEN is not defined in .env');
        return;
    }

    // Create a bot that uses 'polling' to fetch new updates
    const bot = new TelegramBot(token, { polling: true });

    bot.on('message', async (msg) => {
        const chatId = msg.chat.id.toString();
        // Use username if available, else first name, else unknown
        const username = msg.from.username || msg.from.first_name || 'Bilinmeyen Kullanıcı';
        const content = msg.text || msg.caption || '';
        
        // Determine message type roughly
        let messageType = 'text';
        if (msg.photo) messageType = 'image';
        else if (msg.document) messageType = 'document';
        else if (msg.audio || msg.voice) messageType = 'audio';
        else if (!msg.text) messageType = 'other';

        try {
            // 1. Get or Create Customer
            const customer = await db.upsertCustomer(chatId, username);
            if (!customer) {
                console.error('Could not upsert customer for telegram_id:', chatId);
                return;
            }

            // Prepare a readable content for non-text messages
            let dbContent = content;
            if (messageType !== 'text') {
                dbContent = `[${messageType.toUpperCase()} Received]`;
            }

            // 2. Save incoming message
            await db.saveMessage(
                customer.id,
                'IN',
                messageType,
                dbContent,
                msg // Raw data
            );

            console.log(`Received message from ${chatId} (${username}): ${dbContent}`);

            // 3. Generate AI Response if there is any text content (text or caption)
            if (content) {
                const aiResult = await aiService.generateResponse(content);
                const aiResponseText = aiResult.replyText;
                const analysisData = aiResult.analysis;

                // 4. Send response back to Telegram
                await bot.sendMessage(chatId, aiResponseText);

                // 5. Save Outgoing Message and Analysis
                await db.saveMessage(
                    customer.id,
                    'OUT',
                    'text',
                    aiResponseText,
                    analysisData
                );
                
                console.log(`Sent AI response to ${chatId}`);
                if (analysisData) {
                    console.log(`[AI Analysis] Kategori: ${analysisData.kategori}, Duygu: ${analysisData.duygu}, Öncelik: ${analysisData.oncelik}`);
                }
            } else {
                // Handling non-text
                const defaultResponse = 'Şu anda sadece metin mesajlarını destekleyebiliyorum. Lütfen talebinizi yazarak iletiniz.';
                await bot.sendMessage(chatId, defaultResponse);
                
                await db.saveMessage(
                    customer.id,
                    'OUT',
                    'text',
                    defaultResponse,
                    null
                );
            }
        } catch (error) {
            console.error('Error handling telegram message:', error);
            try {
                await bot.sendMessage(chatId, 'Geçici bir hata oluştu, lütfen daha sonra tekrar deneyiniz.');
            } catch (sendError) {
                console.error('Error sending fallback message:', sendError.message);
            }
        }
    });

    console.log('🤖 Telegram bot initialized and listening for messages.');
}

module.exports = { initBot };
