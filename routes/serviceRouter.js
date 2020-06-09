"use strict";

const router = require("express").Router();
const { authenticateToken } = require("../middlewares/authorizer");
const { decryption } = require("../controllers/serviceController");

router.post("/", authenticateToken, decryption);

module.exports = router;
