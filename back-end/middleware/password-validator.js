const password = require("password-validator");
const schema = new password();

schema.is().min(8).has().uppercase().has().lowercase().digits([1]);

module.exports = schema;