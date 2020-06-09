"use strict";

const router = require("express").Router();
const { authenticateToken } = require("../middlewares/authorizer");
const {
  loginClient,
  logoutClient,
  refresh,
} = require("../controllers/authController");

router.post("/login", loginClient);

router.delete("/logout", authenticateToken, logoutClient);

router.post("/tokens", authenticateToken, refresh);

module.exports = router;
