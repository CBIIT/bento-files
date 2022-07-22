const session = require('express-session');
const {randomBytes} = require("crypto");
const MySQLStore = require('express-mysql-session')(session);

function createSession() {
    const sessionSecret = process.env.COOKIE_SECRET || randomBytes(16).toString("hex");
    return session({
        secret: sessionSecret,
        store: new MySQLStore({
          host: process.env.MYSQL_HOST,
          port: process.env.MYSQL_PORT,
          user: process.env.MYSQL_USER,
          password: process.env.MYSQL_PASSWORD,
          database: process.env.MYSQL_DATABASE,
          checkExpirationInterval: 10,
          expiration: process.env.SESSION_TIMEOUT ? parseInt(process.env.SESSION_TIMEOUT) * 1000 : 1000 * 30 * 60,  // 30 minutes
        })
    });
}

module.exports = {
    createSession
};