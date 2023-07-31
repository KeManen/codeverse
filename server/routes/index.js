let express = require('express');
let router = express.Router();



// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});



module.exports = router;
