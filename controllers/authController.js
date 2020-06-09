"use strict";

const jwt = require("jsonwebtoken");
const { tokenConfig } = require("../common/config");
const httpResponse = require("../common/httpResponse");
const { UserApp } = require("../models");
const { generateToken } = require("../middlewares/authorizer");

const loginClient = async (req, res, next) => {
  // http basic 인증 방식 bearer 에서 client 인증 credentials가 있는지 확인
  // header format =>  authorization: Bearer base64('clientId:clientSecret')
  const header = req.headers["authorization"];
  const credentials = header && header.split(" ")[1];

  // http basic bearer 에서 client 인증 credentials가 있는지 확인
  if (!credentials) {
    console.log("no credentials");
    return next(httpResponse.NotAuthenticated);
  }
  // credentials에서 id password 추출
  const clientInfo = Buffer.from(credentials, "base64").toString("utf8");
  const [clientId, clientSecret] = clientInfo.split(":");
  if (!clientId || !clientSecret) {
    console.log("credentials error");
    return next(httpResponse.NotAuthenticated);
  }
  // 추출한 clientId와 clientSecret으로 DB 조회 (추후 DB 연동)

  // {
  //   "access_token":"mF_9.B5f-4.1JqM",
  //   "token_type":"Bearer",
  //   "expires_in":3600,
  //   "refresh_token":"tGzv3JOkF0XG5Qx2TlKWIA"
  // }

  console.log(clientId, clientSecret);
  // 있으면 appId로 accessToken 과 refreshToken 생성 해서 응답
  const accessToken = generateToken(
    tokenConfig.accessToken.secret,
    tokenConfig.accessToken.option,
    { appId: clientId }
  );
  const refreshToken = generateToken(
    tokenConfig.refreshToken.secret,
    tokenConfig.refreshToken.option,
    { appId: clientId }
  );

  res.json({
    success: true,
    result: {
      accessToken,
      refreshToken,
    },
  });
};

const logoutClient = async (req, res, next) => {
  // refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  // res.sendStatus(204)
  const payload = req.decodedToken;
  console.log(payload);
  res.json({ success: true, result: "logout OK" });
};

/* access token refresh */
const refresh = async (req, res, next) => {
  const { appId } = req.decodedToken;
  const token = req.body.refreshToken;

  console.log("refresh:" + appId + ":" + token);
  if (!appId || !token) {
    return next(httpResponse.ApiNotAuthenticated);
  }

  try {
    const decoded = await jwt.verify(token, tokenConfig.refreshToken.secret);
    if (appId !== decoded.appId) {
      return next(httpResponse.InvalidRefreshToken);
    }
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(httpResponse.RefreshTokenExpired);
    } else if (
      error.name === "JsonWebTokenError" ||
      error.name === "NotBeforeError"
    ) {
      return next(httpResponse.InvalidRefreshToken);
    } else {
      return next(httpResponse.InternalServerError);
    }
  }

  const accessToken = generateToken(
    tokenConfig.accessToken.secret,
    tokenConfig.accessToken.option,
    { appId }
  );

  const refreshToken = generateToken(
    tokenConfig.refreshToken.secret,
    tokenConfig.refreshToken.option,
    { appId }
  );

  res.json({
    success: true,
    result: {
      accessToken,
      refreshToken,
    },
  });
};

module.exports = {
  loginClient,
  logoutClient,
  refresh,
};
