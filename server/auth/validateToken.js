const jwt = require("jsonwebtoken");

module.exports = function validateToken(req, res, next) {
    console.log("Validating token");
    const authHeader = req.headers["authentication"];
    let token;
    if (authHeader) {
        token = authHeader.split(" ")[1];
    } else {
        token = null;
    }
    if (token == null) return res.sendStatus(401);

    console.log("Token found");
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};
