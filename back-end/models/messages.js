exports.getAllMessages = () => {
    return `SELECT messages_id 
            FROM messages 
            WHERE messages_id = 1
            `;
};