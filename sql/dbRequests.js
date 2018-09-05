const spicedPg = require("spiced-pg");
// const { password } = require("./secrets.json");
let dbUrl;
if (process.env.DATABASE_URL) {
    dbUrl = process.env.DATABASE_URL;
} else {
    const secret = require("../secrets.json");
    dbUrl = `postgres:postgres:${secret.password}@localhost:5432/socialnetwork`;
}

const db = spicedPg(dbUrl);

module.exports.registerUser = function registerUser(
    name,
    surname,
    email,
    password
) {
    return db.query(
        "INSERT INTO users (name,surname,email,password) VALUES($1,$2,$3,$4) RETURNING id",
        [name, surname, email, password]
    );
    //
};

module.exports.loginUser = function loginUser(email) {
    return db.query("SELECT * FROM users WHERE email= $1", [email]);
};
