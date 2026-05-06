const pool = require('../config/db.config');

// Upsert customer (insert if not exists, update last_activity if exists)
async function upsertCustomer(telegramId, name = null) {
    try {
        // We use INSERT ... ON DUPLICATE KEY UPDATE in MySQL
        const query = `
            INSERT INTO customers (telegram_id, name) 
            VALUES (?, ?)
            ON DUPLICATE KEY UPDATE 
                name = COALESCE(?, name),
                last_activity = CURRENT_TIMESTAMP
        `;
        await pool.execute(query, [telegramId, name, name]);

        // Fetch the user to return the id
        const [rows] = await pool.execute('SELECT * FROM customers WHERE telegram_id = ?', [telegramId]);
        return rows[0];
    } catch (error) {
        console.error('Error in upsertCustomer:', error.message);
        return null;
    }
}

// Save a message
async function saveMessage(customerId, direction, messageType, content, rawData = null) {
    try {
        const query = `
            INSERT INTO messages (customer_id, direction, message_type, content, raw_data)
            VALUES (?, ?, ?, ?, ?)
        `;
        const [result] = await pool.execute(query, [
            customerId,
            direction,
            messageType,
            content,
            rawData ? JSON.stringify(rawData) : null
        ]);
        
        // Update customer's last_activity
        await pool.execute('UPDATE customers SET last_activity = CURRENT_TIMESTAMP WHERE id = ?', [customerId]);
        
        return result.insertId;
    } catch (error) {
        console.error('Error in saveMessage:', error.message);
        return null;
    }
}

module.exports = {
    upsertCustomer,
    saveMessage
};