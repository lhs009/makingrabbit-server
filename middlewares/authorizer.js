"use strict";

const jwt = require("jsonwebtoken");
const { tokenConfig } = require("../common/config");
const httpResponse = require("../common/httpResponse");

const authenticateToken = async (req, res, next) => {
  //let accessToken = req.headers["x-access-token"];
  const header = req.headers["authorization"];
  const accessToken = header && header.split(" ")[1];

  console.log("accessToken by isAuth: " + accessToken);
  //return next();
  if (!accessToken) {
    return next(httpResponse.NotAuthenticated);
  }

  try {
    const decoded = await jwt.verify(
      accessToken,
      tokenConfig.accessToken.secret
    );
    req.decodedToken = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(httpResponse.AccessTokenExpired);
    } else if (
      error.name === "JsonWebTokenError" ||
      error.name === "NotBeforeError"
    ) {
      return next(httpResponse.InvalidAccessToken);
    } else {
      return next(httpResponse.InternalServerError);
    }
  }
};

const generateToken = (secret, option, payload) => {
  try {
    let decoded = jwt.sign(payload, secret, option);
    return decoded;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  authenticateToken,
  generateToken,
};
