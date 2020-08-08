'use strict';

const fs = require('fs');
const bwipjs = require('bwip-js');
const qr = require('qr-image');
const httpResponse = require('../common/httpResponse');
const { checkSumMRZ } = require('../lib/mrzUtil');
const { encrypt } = require('../lib/cipherUtil');

const _codeGenerator = async (req, res, next) => {
  const mrz = req.body.mrz;
  if (!mrz || mrz.length < 88) {
    return next(httpResponse.InvalidParameters);
  }

  try {
    const { valid, qr, bar } = checkSumMRZ(mrz);
    if (!valid) {
      return next(httpResponse.InvalidParameters);
    }

    const encQR = encrypt(qr).replace(/=/g, '');
    const encBAR = encrypt(bar).replace(/=/g, '');
    console.log(encQR);
    const fileName = encBAR;
    await barcodeGenerator(encBAR, fileName);
    qrcodeGenerator(encQR, fileName);

    res.json({
      success: true,
      fileName: fileName,
    });
  } catch (error) {
    console.log(error);
    next(httpResponse.InternalServerError);
  }

  //res.redirect('/codes/show');
};

const codeGenerator = async (req, res, next) => {
  const mrz = req.body.mrz;
  if (!mrz || mrz.length < 88) {
    return next(httpResponse.InvalidParameters);
  }

  try {
    const { valid, qr, bar } = checkSumMRZ(mrz);
    if (!valid) {
      return next(httpResponse.InvalidRequestData);
    }
    // base64 string = 제거
    const encQR = encrypt(qr).replace(/=/g, '');
    const encBAR = encrypt(bar).replace(/=/g, '');

    res.json({
      success: true,
      barString: encBAR,
      qrString: encQR,
    });
  } catch (error) {
    console.log(error);
    next(httpResponse.InternalServerError);
  }
};

const barcodeGenerator = async (data, fileName) => {
  const png = await bwipjs.toBuffer({
    bcid: 'code128', // Barcode type
    text: data, // Text to encode
    scale: 3, // 3x scaling factor
    height: 10, // Bar height, in millimeters
    includetext: true, // Show human-readable text
    textxalign: 'center', // Always good to set this
  });

  fs.writeFile(`./public/images/${fileName}-bar.png`, png, 'binary', (err) => {
    if (err) {
      console.log(err);
    }
  });

  return png;
};

const qrcodeGenerator = (data, fileName) => {
  // Generate QR Code from text
  const png = qr.imageSync(data, { type: 'png', size: 10 });
  fs.writeFileSync(`./public/images/${fileName}-qr.png`, png, (err) => {
    if (err) {
      console.log(err);
    }
  });
  return png;
};

module.exports = {
  codeGenerator,
  _codeGenerator,
};
