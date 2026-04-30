const express = require("express");
const app = express();

const database = {};

app.get("/generate", (req, res) => {
    const key = "DX-" + Math.random().toString(36).substring(2,10).toUpperCase();
    const expiry = Date.now() + (5 * 60 * 60 * 1000); // 5 hours

    database[key] = { expiry };

    res.json({ key });
});

app.get("/verify", (req, res) => {
    const key = req.query.key;

    if (!database[key]) return res.json({ valid: false });

    if (Date.now() > database[key].expiry) {
        return res.json({ valid: false, reason: "expired" });
    }

    res.json({ valid: true });
});

app.listen(3000, () => console.log("DX Server Running"));
