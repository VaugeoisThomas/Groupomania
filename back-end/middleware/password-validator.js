const PASSWORD = require("password-validator");
const SCHEMA = new PASSWORD();

SCHEMA.is().min(8)
      .has().uppercase(1)
      .has().lowercase()
      .has().digits(1);

module.exports = SCHEMA;