const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

// simple in-memory database
const database = {};

// ROOT ROUTE
app.get("/", (req, res) => {
  res.send("DX Key Server Running ✅");
});

// GENERATE KEY
app.get("/generate", (req, res) => {
  const key = "DX-" + Math.random().toString(36).substring(2, 10).toUpperCase();
  const expiry = Date.now() + (5 * 60 * 60 * 1000); // 5 hours

  database[key] = { expiry };

  res.json({ key, expires_in: "5h" });
});

// VERIFY KEY
app.get("/verify", (req, res) => {
  const key = req.query.key;

  if (!key || !database[key]) {
    return res.json({ valid: false });
  }

  if (Date.now() > database[key].expiry) {
    return res.json({ valid: false, reason: "expired" });
  }

  res.json({ valid: true });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
