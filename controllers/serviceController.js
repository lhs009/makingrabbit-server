"use strict";

const decryption = async (req, res) => {
  const decoded = req.decodedToken;
  const { payload } = req.body;
  console.log(decoded, payload);
  res.json({ success: true, result: payload });
};

module.exports = {
  decryption,
};
