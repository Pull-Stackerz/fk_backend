const express = require("express");
require("dotenv").config(); // Load environment variables from .env file
const app = express();
const port = process.env.PORT || 3000;
const parameterExt = require("./controller/parameter.js");

// Basic route
app.get("/test", (req, res) => {
    res.send("Hello Express!");
});
app.post("/chat", parameterExt);
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
