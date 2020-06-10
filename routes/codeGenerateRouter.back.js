'use strict';

const router = require('express').Router();
const fs = require('fs');
const bwipjs = require('bwip-js');
const qr = require('qr-image');
const httpResponse = require('../common/httpResponse');
const { checkSumMRZ } = require('../lib/mrzUtil');
const { encrypt } = require('../lib/cipherUtil');

router.get('/', async (req, res) => {
  //res.send('<h1>이라온</h1>');

  res.render('codegenerator/index', { name: '이시오이 왕왕왕' });
});

router.post('/', async (req, res, next) => {
  const mrz = req.body.mrz;
  if (!mrz || mrz.length < 88) {
    return next(httpResponse.InvalidParameters);
  }

  try {
    const { valid, qr, bar } = checkSumMRZ(mrz);
    if (!valid) {
      return next(httpResponse.InvalidParameters);
    }

    const barcodePng = await barcodeGenerator(bar);

    fs.writeFile(
      `./public/images/${bar}-bar.png`,
      barcodePng,
      'binary',
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
    const qrPng = qrcodeGenerator(qr);
    fs.writeFileSync(`./public/images/${qr}-qr.png`, qrPng, (err) => {
      if (err) {
        console.log(err);
      }
    });

    res.json({
      success: true,
      qrcode: qr,
      brcode: bar,
    });

    //res.redirect(`/codes/show/?imgUrl=${str}`);
  } catch (error) {
    console.log(error);
    next(httpResponse.InternalServerError);
  }

  //res.redirect('/codes/show');
});

router.get('/show', (req, res) => {
  const img = req.query.imgUrl;
  console.log(img);
  res.render('codegenerator/show', {
    imgUrl: img,
  });
});

const barcodeGenerator = async (data) => {
  const png = await bwipjs.toBuffer({
    bcid: 'code128', // Barcode type
    text: data, // Text to encode
    scale: 3, // 3x scaling factor
    height: 10, // Bar height, in millimeters
    includetext: true, // Show human-readable text
    textxalign: 'center', // Always good to set this
  });

  return png;
};

const qrcodeGenerator = (data) => {
  // Generate QR Code from text
  const png = qr.imageSync(data, { type: 'png' });
  return png;
};

module.exports = router;
