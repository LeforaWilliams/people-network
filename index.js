const express = require("express");
const app = express();
const compression = require("compression");
const { registerUser, loginUser } = require("./sql/dbRequests.js");
const cookieSession = require("cookie-session");
const { hashPass, checkPass } = require("./encryption.js");
const csurf = require("csurf");

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

app.get("/welcome", function(req, res) {
    if (req.session.loggedIn) {
        return res.redirect("/");
    }
    res.sendFile(__dirname + "/index.html");
});

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
                req.session.firstName = req.body.name;
                req.session.lastName = req.body.lastname;
                req.session.email = req.body.email;
                req.session.loggedIn = userID.rows[0].id;

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
                        req.session.userID = userInfo.rows[0].id;
                        req.session.loggedIn = userInfo.rows[0].id;
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

/////////////////////////////////DO NOT TOUCH///////////////////////////////////
/////////////////////////////////DO NOT TOUCH///////////////////////////////////
/////////////////////////////////DO NOT TOUCH///////////////////////////////////
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
