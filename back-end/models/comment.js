//ADD A COMMENT
exports.addComment = () => {
    return `INSERT INTO comments (user_id, message_id, content)
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

exports.getCommentByMessages = () => {
    return `SELECT comments.id AS comment_id, comments.content AS comment_content, comments.user_id AS comment_user_id, messages.id AS msg_id
            FROM comments
            INNER JOIN messages
            ON comments.message_id = messages.id`;
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