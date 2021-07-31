const Password = require("Password-validator");
const Schema = new Password();

Schema.is().min(8)
      .has().uppercase(1)
      .has().lowercase()
      .has().digits(1);

module.exports = Schema;