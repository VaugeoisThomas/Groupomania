//SELECTION OF ALL MESSAGES
exports.getAllMessages = () => {
    return `SELECT messages.id AS msg_id, content, user_id, created_at, users.id, name, is_admin
            FROM messages
            INNER JOIN users
            ON messages.user_id = users.id`;
};

//DELETION OF ONE MESSAGE
exports.deleteMessage = () => {
    return `DELETE 
            FROM messages
            WHERE id = ?`;
};

//CREATION OF ONE MESSAGE
exports.addMessage = () => {
    return `INSERT INTO messages (content, user_id, created_at)
            VALUES (?, ?, NOW())`;
};

//SELECTION BY MESSAGES_ID
exports.selectMessageById = () => {
    return `SELECT * 
            FROM messages
            WHERE id = ?`;
};