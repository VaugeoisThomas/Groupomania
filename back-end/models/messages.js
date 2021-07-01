//SELECTION OF ALL MESSAGES
exports.getAllMessages = () => {
    return `SELECT *
            FROM messages 
            INNER JOIN users
                ON messages.users_id = users.users_id
            ORDER BY messages_id
            DESC`;
};

//DELETION OF ONE MESSAGE
exports.deleteMessage = () => {
    return `DELETE 
            FROM messages
            WHERE messages_id = ?`;
};

//CREATION OF ONE MESSAGE
exports.addMessage = () => {
    return `INSERT INTO messages (messages_text, users_id, createdAt)
            VALUES (?, ? , NOW())`;
};

//SELECTION BY MESSAGES_ID
exports.selectMessageById = () => {
    return `SELECT * 
            FROM messages
            WHERE messages_id = ?`;
};