exports.addComment = () => {
    return `INSERT INTO comments (users_id, messages_id, content)
            VALUE (?, ?, ?)`;
};

exports.selectOneComment = () => {
    return `SELECT * 
            FROM comments
            WHERE id = ?`;
};

exports.deleteComment = () => {
    return `DELETE FROM comments
            WHERE id = ?`;
};