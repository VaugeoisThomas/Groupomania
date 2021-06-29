exports.getAllMessages = () => {
    return `SELECT *
            FROM messages 
            INNER JOIN users
                ON messages.users_id = users.users_id
            ORDER BY messages_id
            DESC
            `;
};

exports.deleteMessage = () => {
    return `DELETE 
            FROM messages
            WHERE messages_id = ?
            `;
};