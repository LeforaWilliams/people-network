const express = require("express");
const app = express();
const compression = require("compression");
const {
    registerUser,
    loginUser,
    updateProfilePic,
    updateUserBio,
    getOtherUserInfo,
    getFriendshipStatus,
    setFriendshipStatus,
    acceptRequest
} = require("./sql/dbRequests.js");
const cookieSession = require("cookie-session");
const { hashPass, checkPass } = require("./encryption.js");
const csurf = require("csurf");
const s3 = require("./s3.js");
const config = require("./config.json");

// BOILERPLATE FOR IMAGE UPLOAD
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");

let diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

let uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

//END OF BOILERPLATE FOR IMAGE UPLOAD

app.disable("x-powered-by");
app.use(require("body-parser").json());
app.use(
    cookieSession({
        // adds a session object to every req.object
        secret: `Ficus elastica`,
        maxAge: 1000 * 60 * 60 * 24 * 16
    })
);

app.use(csurf());
app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use(compression());

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.use(express.static("./public"));

////////////////////////////////////////////////////////////////////////////////

app.post("/register", function(req, res) {
    console.log(req.body);
    if (
        !req.body.firstname ||
        !req.body.lastname ||
        !req.body.email ||
        !req.body.password
    ) {
        res.json({
            success: false
        });
    } else {
        hashPass(req.body.password)
            .then(function(hashedPass) {
                return registerUser(
                    req.body.firstname,
                    req.body.lastname,
                    req.body.email,
                    hashedPass
                );
            })
            .then(function(userID) {
                req.session.userID = userID.rows[0].id;
                req.session.firstname = req.body.firstname;
                req.session.lastname = req.body.lastname;
                req.session.email = req.body.email;
                req.session.loggedIn = userID.rows[0].id;
                req.session.imageUrl = null;
                req.session.bio = null;

                res.json({
                    success: true
                });
            })
            .catch(function(err) {
                console.log("ERROR IN WELCOME POST ROUTE >>>>SERVER", err);
                res.json({
                    sucess: false
                });
            });
    }
});

app.get("/login", function(req, res) {
    if (req.session.loggedIn) {
        return res.redirect("/");
    }
    res.sendFile(__dirname + "/index.html");
});

app.post("/login", function(req, res) {
    if (!req.body.email || !req.body.password) {
        res.json({
            success: false
        });
    } else {
        return loginUser(req.body.email)
            .then(function(userInfo) {
                return checkPass(
                    req.body.password,
                    userInfo.rows[0].password
                ).then(function(checkPassRes) {
                    if (checkPassRes) {
                        console.log("USER INFO AFTER LOGIN", userInfo.rows[0]);
                        req.session.userID = userInfo.rows[0].id;
                        req.session.loggedIn = userInfo.rows[0].id;
                        req.session.firstname = userInfo.rows[0].name;
                        req.session.lastname = userInfo.rows[0].surname;
                        req.session.email = userInfo.rows[0].email;
                        req.session.loggedIn = userInfo.rows[0].id;
                        req.session.imageUrl = userInfo.rows[0].imageUrl;
                        req.session.bio = userInfo.rows[0].bio;
                        res.json({
                            success: true
                        });
                    } else {
                        res.json({
                            success: false
                        });
                    }
                });
            })
            .catch(function(err) {
                console.log("Error in LOGIN CATCH ROUTE>>>>>>>>SERVER", err);
                res.json({
                    success: false
                });
            });
    }
});

app.get("/user", function(req, res) {
    res.json({
        firstname: req.session.firstname,
        lastname: req.session.lastname,
        userID: req.session.userID,
        imageUrl: req.session.imageUrl,
        bio: req.session.bio
    });
});

app.post("/picupload", uploader.single("file"), s3.upload, function(req, res) {
    updateProfilePic(req.session.userID, config.s3Url + req.file.filename)
        .then(function(imageUrl) {
            req.session.imageUrl = imageUrl.rows[0].imageurl;
            res.json({ url: imageUrl.rows[0].imageurl });
        })
        .catch(err => {
            console.log("ERROR IN PICUPLOAD CATCH ROUTE", err);
        });
});

app.post("/bioupload", (req, res) => {
    updateUserBio(req.session.userID, req.body.bio)
        .then(newBio => {
            req.session.bio = newBio.rows[0].bio;
            res.json({ newBio: newBio.rows[0].bio });
        })
        .catch(function(err) {
            console.log("ERROR IN BIOUPLOAD ROUTE CATCH", err);
        });
});

app.get("/get-user/:userId", (req, res) => {
    console.log();
    if (req.session.userID == req.params.userId) {
        return res.json({
            self: true
        });
    }
    getOtherUserInfo(req.params.userId)
        .then(otherUserInfo => {
            res.json({
                firstname: otherUserInfo.rows[0].name,
                lastname: otherUserInfo.rows[0].surname,
                profilepic: otherUserInfo.rows[0].imageurl
            });
        })
        .catch(err => {
            console.log("ERROR IN GET OTHER USER ID ROUTE-SERVER", err);
        });
});

////////////////FRIENDSHIPS//////////////////////////////
//Initially Check the status without anyone clicking any buttons

//When a user makes a request: check what the status is  and set the button accordingly

//rewrite if statents into object and loop through

//>>>> how do you know how made the request? (sender_id always makes the req ie. from the table)

//these routes are for the display of the button
app.get("/check", (req, res) => {
    console.log("ABOUT TO CHECK FRIENDHIP STATUS");
    getFriendshipStatus(req.query.otherUserID, req.session.userID).then(
        status => {
            console.log("CHECKING STATUS FROM DB", status.rows[0].status);
            // if (!status) {
            res.json({
                status: status.rows[0].status,
                sender: status.rows[0].sender_id, //return from DB
                receiver: status.rows[0].receiver_id //RETURN FROM DB
            });
        }
    );
});

//     if (status === "pending") {
//         return app.post("/check", (req, res) => {
//             console.log("THESE TWO ARE PENDING", status);
//             res.json({
//                 status: "pending",
//                 sender: req.session.userID,
//                 receiver: req.body.userID
//             });
//         });
//     }
//     if (status === "friends") {
//         return app.post("/check", (req, res) => {
//             console.log("THESE TWO ARE FRIENDS", status);
//             res.json({
//                 status: "freinds",
//                 sender: req.session.userID,
//                 receiver: req.body.userID
//             });
//         });
//     }
// })
// .catch(err => {
//     console.log("ERROR IN CHECK STATUS ROUTE-SERVER", err);
//     res.setStatus(500);
// });
// });

//Make a freind Request
app.post("/make-request", (req, res) => {
    console.log("REQUEST HAS BEEN MADE");
    setFriendshipStatus(req.body.userID, req.session.userID, "pending")
        .then(() => {
            res.json({
                status: "pending",
                sender: req.session.userID,
                receiver: req.body.userID
            });
        })
        .catch(err => {
            console.log("ERROR IN MAKE REQUEST ROUTE-SERVER", err);
            res.setStatus(500);
        });
});

//Accept friend request
app.post("/accept-request", (req, res) => {
    acceptRequest(req.body.userID, req.session.userID, "friends")
        .then(() => {
            res.json({
                status: "friends",
                sender: req.session.userID,
                receiver: req.body.userID
            });
        })
        .catch(err => {
            console.log("ERROR IN ACCEPT REQUEST ROUTE-SERVER", err);
            res.setStatus(500);
        });
});

////////////////FRIENDSHIPS//////////////////////////////

app.get("/welcome", function(req, res) {
    if (req.session.loggedIn) {
        return res.redirect("/");
    }
    res.sendFile(__dirname + "/index.html");
});

/////////////////////////////////DO NOT TOUCH/////////////////////////////////// /////////////////////////////////DO NOT TOUCH/////////////////////////////////// /////////////////////////////////DO NOT TOUCH///////////////////////////////////
app.get("*", function(req, res) {
    if (!req.session.loggedIn) {
        console.log("IN STAR ROUTE", req.url);
        return res.redirect("/welcome");
    }
    res.sendFile(__dirname + "/index.html");
});
/////////////////////////////////DO NOT TOUCH///////////////////////////////////
/////////////////////////////////DO NOT TOUCH///////////////////////////////////
/////////////////////////////////DO NOT TOUCH///////////////////////////////////

app.listen(8080, function() {
    console.log("I'm listening.");
});
