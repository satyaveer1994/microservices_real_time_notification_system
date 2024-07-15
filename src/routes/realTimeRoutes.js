const express = require("express");
const router = express.Router();
const { handleConnection } = require("../controllers/realTimeController");

router.get("/connect", handleConnection);

module.exports = router;
