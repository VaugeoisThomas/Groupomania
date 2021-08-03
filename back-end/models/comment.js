//ADD A COMMENT
exports.addComment = () => {
    return `INSERT INTO comments (users_id, messages_id, content)
            VALUE (?, ?, ?)`;
};

//GET COMMENT WITH MAX VALUE
exports.getCommentWithMaxValue = () => {
    return `SELECT * 
            FROM comments
            LIMIT 0, ?`;
};

//GET COMMENT BY USERS
exports.getCommentsByUserId = () => {
    return `SELECT *
            FROM comments
            INNER JOIN users 
            ON comments.user_id = users.id`;
}

//GET ALL COMMENTS
exports.getCommentById = () => {
    return `SELECT * 
            FROM comments
            WHERE id = ?`
}

//DELETE A COMMENT
exports.deleteComment = () => {
    return `DELETE 
            FROM comments
            WHERE id = ?`;
};