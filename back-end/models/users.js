// SELECTION OF ALL USERS
exports.selectAllUsers = () => {
    return `SELECT *
            FROM users`;
};

// SELECTION BY USERS_ID
exports.selectUsersById = () => {
    return `SELECT * 
            FROM users
            WHERE users_id = ?`;
};

//SELECTION BY USERS_NAME
exports.selectUsersByUserName = () => {
    return `SELECT * 
            FROM users
            WHERE users_name = ?`;
};

//SELECTION BY USERS_NAME
exports.selectUsersByEmail = () => {
    return `SELECT * 
            FROM users
            WHERE users_email = ?`;
};

//CREATE USERS
exports.creationUser = () => {
    return `INSERT INTO users (users_email, users_password, users_name)
            VALUE (?, ?, ?)`;
};

//DELETE USERS
exports.deleteUsers = () =>  {
    return `DELETE FROM users
            WHERE users_id = ?`;
};

//UPDATE ACCOUNT
exports.updateData = () => {
    return `UPDATE users
            SET 
                users_name = ?,
                users_password = ?,
                users_email = ?,
                isAdmin = ?
            WHERE users_id = ?`;
};