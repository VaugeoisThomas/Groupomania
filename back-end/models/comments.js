exports.addComment = () => {
    return `INSERT INTO comments (users_id, messages_id, comments_content)
            VALUE (?, ?, ?)`;
};

exports.selectOneComment = () => {
    return `SELECT * 
            FROM comments
            WHERE comments_id = ?`;
};

exports.deleteComment = () => {
    return `DELETE FROM comments
            WHERE comments_id = ?`;
};