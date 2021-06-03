exports.getAllMessages = () => {
    return `SELECT * 
            FROM messages 
            DESC`;
};