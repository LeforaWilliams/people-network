const bcrypt = require("bcryptjs");
const { prmoisify } = require("util");
const genSalt = prmoisify("bcrypt.genSalt");
const hash = prmoisify("bcyrpt.hashPassword");
const compare = prmoisify("bcyrpt.compare");

genSalt().then(salt=> { //to hash password and store in DB
    return hash('monkey, salt');

}).then(hash=>{ // to check if the login is right
    return compare('monkey',hash)
})
})

// function hashPassword(plainTextPassword) {
//     return new Promise(function(resolve, reject) {
//         bcrypt.genSalt(function(err, salt) {
//             if (err) {
//                 return reject(err);
//             }
//             bcrypt.hash(plainTextPassword, salt, function(err, hash) {
//                 if (err) {
//                     return reject(err);
//                 }
//                 resolve(hash);
//             });
//         });
//     });
// }
//
// function checkPassword(textEnteredInLoginForm, hashedPasswordFromDatabase) {
//     return new Promise(function(resolve, reject) {
//         bcrypt.compare(
//             textEnteredInLoginForm,
//             hashedPasswordFromDatabase,
//             function(err, doesMatch) {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve(doesMatch);
//                 }
//             }
//         );
//     });
// }
