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

//CREATE USERS_PROFIL
exports.updateUserProfil = () => {
    return `UPDATE users
            SET 
                users_email = ?,
                users_name = ?,
                users_age = ?,
                users_biography = ? 
            WHERE users_id = ?`;
};

//UPDATE USERS_NAME
exports.updateUsersName = () => {
    return `UPDATE users
            SET users_name = ?
            WHERE users_id = ?`;
};

//UPDATE USERS_AGE
exports.updateUsersAge = () => {
    return `UPDATE users
            SET users_age = ?
            WHERE users_id = ?`;
};

//UPDATE USERS_PASSWORD
exports.updateUsersPassword = () => {
    return `UPDATE users
            SET users_password = ?
            WHERE users_id = ?`;
};

//UPDATE USERS_EMAIL
exports.updateUsersEmail = () => {
    return `UPDATE users
            SET users_email = ?
            WHERE users_id = ?`;
};

//UPDATE USERS_BIOGRAPHY
exports.updateUsersBiography = () => {
    return `UPDATE users
            SET users_biography = ?
            WHERE users_id = ?`;
};

//CREATE USERS
exports.creationUser = () => {
    return `INSERT INTO users (users_email, users_password, users_name, users_age, users_biography)
            VALUE (?, ?, ?, ?, ?)`;
};

//DELETE USERS
exports.deleteUsers = () =>  {
    return `DELETE FROM users
            WHERE users_id = ?`;
};