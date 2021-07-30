// SELECTION OF ALL USERS
exports.selectAllUsers = () => {
    return `SELECT *
            FROM users`;
};

// SELECTION BY USERS_ID
exports.selectUserById = () => {
    return `SELECT * 
            FROM users
            WHERE id = ?`;
};

//SELECTION BY USERS_NAME
exports.selectUserByUserName = () => {
    return `SELECT * 
            FROM users
            WHERE name = ?`;
};

//SELECTION BY USERS_NAME
exports.selectUserByEmail = () => {
    return `SELECT * 
            FROM users
            WHERE email = ?`;
};

//CREATE USERS
exports.creationUser = () => {
    return `INSERT INTO users (email, password, name, is_admin)
            VALUE (?, ?, ?, 0)`;
};

//DELETE USERS
exports.deleteUser = () => {
    return `DELETE FROM users
            WHERE id = ?`;
};

//UPDATE ACCOUNT
exports.updateData = () => {
    return `UPDATE users
            SET 
                name = ?,
                password = ?,
                email = ?,
                is_admin = 0;
            WHERE id = ?`;
};