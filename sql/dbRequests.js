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

module.exports.updateProfilePic = function(userID, imageUrl) {
    return db.query(
        `UPDATE users
        SET imageUrl= $2
        WHERE id= $1 RETURNING imageUrl`,
        [userID, imageUrl || null]
    );
};

module.exports.updateUserBio = function(userID, bio) {
    return db.query(
        `UPDATE users
        SET bio= $2
        WHERE id= $1 RETURNING bio`,
        [userID, bio || null]
    );
};

module.exports.getOtherUserInfo = function(userID) {
    return db.query(`SELECT * FROM users WHERE id= $1`, [userID]);
};
module.exports.setFriendshipStatus = function(
    otherUserID,
    currentUserID,
    status
) {
    return db.query(
        `INSERT INTO friendships (receiver_id, sender_id, status) VALUES($1, $2, $3) RETURNING status`,
        [otherUserID, currentUserID, status]
    );
};

module.exports.getFriendshipStatus = function(otherUserID, currentUserID) {
    return db.query(
        `SELECT receiver_id, sender_id, status
    FROM friendships
    WHERE (receiver_id = $1 AND sender_id = $2)
    OR (receiver_id= $2 AND sender_id= $1) `,
        [otherUserID, currentUserID]
    );
};

module.exports.acceptRequest = function(otherUserID, currentUserID, status) {
    return db.query(
        `UPDATE friendships
        SET status= $3
        WHERE receiver_id=$2 AND sender_id= $1`,
        [otherUserID, currentUserID, status]
    );
};

//need query to delete freindship and one to cancel request

module.exports.endFriendship = function(otherUserID, currentUserID) {
    return db.query(
        `DELETE FROM friendships WHERE (receiver_id = $1 AND sender_id = $2) OR (sender_id = $1 and receiver_id = $2)`,
        [otherUserID, currentUserID]
    );
};

module.exports.getRelationships = function(currentUserID) {
    return db.query(
        `SELECT users.id, name, surname, imageUrl, status
    FROM friendships
    JOIN users
    ON (status = 'pending' AND receiver_id = $1 AND sender_id = users.id)
    OR (status = 'friends' AND receiver_id = $1 AND sender_id = users.id)
    OR (status = 'friends' AND sender_id = $1 AND  receiver_id= users.id)`,
        [currentUserID]
    );
};

module.exports.getUsersByIds = function(arrayOfIds) {
    return db.query(
        `SELECT id, name , surname, imageUrl FROM users WHERE id = ANY($1)`,
        [arrayOfIds]
    );
};

module.exports.updateActiveUsers = function(userID) {
    return db.query(
        `SELECT id, name, surname, imageUrl FROM users WHERE id= $1`,
        [userID]
    );
};

module.exports.saveMessage = function(sender, message) {
    return db.query(
        `INSERT INTO chat (sender_id, message) VALUES($1,$2) RETURNING id, created_at`,
        [sender, message]
    );
};

module.exports.returnRecentMessages = function() {
    return db.query(
        `SELECT users.id, users.name, users.surname, users.imageUrl, chat.id as chatid, chat.sender_id, chat.message, chat.created_at
          FROM chat
          LEFT JOIN users
          ON users.id = sender_id
          ORDER BY chatid DESC
          LIMIT 10`
    );
};
module.exports.savePrivateMessage = function(sender, receiver, message) {
    return db.query(
        `INSERT INTO private_chat (sender_id, receiver_id, message) VALUES($1,$2,$3) RETURNING sender_id, receiver_id, created_at`,
        [sender, receiver, message]
    );
};

module.exports.getPrivateMessages = function(sender, receiver) {
    return db.query(
        `SELECT  users.id, users.name, users.surname, users.imageUrl, private_chat.id as chatid, private_chat.sender_id, private_chat.receiver_id, private_chat.message, private_chat.created_at
        FROM private_chat
        JOIN users
        ON (users.id = private_chat.sender_id AND receiver_id = $2 AND sender_id = $1)
        OR (users.id= private_chat.sender_id AND sender_id = $2 AND receiver_id = $1)
        ORDER BY chatid DESC
         LIMIT 10
          `,
        [sender, receiver]
    );
};
