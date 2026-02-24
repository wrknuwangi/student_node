const { useConnection } = require("./studentModel");
const express = require("express");
const Router = express.Router();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");



Router.post("/login", async (req, res) => {
    const username = req.body.userName;
    const password = req.body.password;
    const user = {
        name: username,
        password: password
    };

    const accessToken = jwt.sign(user, "ACCESS_TOKEN", {
        expiresIn: "10s",
    });

    const refreshToken = jwt.sign(user, "Refresh_TOKEN", {
        expiresIn: "24h",
    });

    res.cookie("accessToken", accessToken, { httpOnly: true });
    res.cookie("refreshToken", refreshToken, { httpOnly: true });
    res.json({ accessToken, refreshToken });


});

Router.post("/token", (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken == null) res.sendStatus(401);

    jwt.verify(refreshToken, process.env.RE_TOKEN_KEY, (err, user) => {
        if (err) res.sendStatus(403);
        const accessToken = jwt.sign({ name:user.name }, process.env.TOKEN_KEY,{
            expiresIn: "10s",
        });
        res.send({ accessToken });
    
    });
});

Router.delete("/logout", (req, res) => {
    res.clearCookie("refreshToken", { httpOnly: true });
    res.clearCookie("accessToken", { httpOnly: true });
});

module.exports = Router;

