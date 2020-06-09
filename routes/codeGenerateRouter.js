'use strict';

const router = require('express').Router();
const fs = require('fs');
const bwipjs = require('bwip-js');
const qr = require('qr-image');
const httpResponse = require('../common/httpResponse');

router.get('/', async (req, res) => {
  //res.send('<h1>이라온</h1>');

  res.render('codegenerator/index', { name: '이시오이 왕왕왕' });
});

router.post('/', async (req, res, next) => {
  const { codeType, country, passportNo } = req.body;
  console.log(passportNo, codeType, country);

  const str = codeType + country + passportNo;
  try {
    const barcodePng = await barcodeGenerator(str);

    fs.writeFile(
      `./public/images/${str}-bar.png`,
      barcodePng,
      'binary',
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
    const qrPng = qrcodeGenerator(str);
    fs.writeFileSync(`./public/images/${str}-qr.png`, qrPng, (err) => {
      if (err) {
        console.log(err);
      }
    });

    res.redirect(`/codes/show/?imgUrl=${str}`);
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

  // fs.writeFile('barcode.png', png, 'binary', (err) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log('The file was saved!');
  //   }
  // });

  // bwipjs.toBuffer({
  //   bcid:        'code128',       // Barcode type
  //   text:        '0123456789',    // Text to encode
  //   scale:       3,               // 3x scaling factor
  //   height:      10,              // Bar height, in millimeters
  //   includetext: true,            // Show human-readable text
  //   textxalign:  'center',        // Always good to set this
  // })
  // .then(png => {
  //   // `png` is a Buffer as in the example above
  // })
  // .catch(err => {
  //   // `err` may be a string or Error object
  // });
};

const qrcodeGenerator = (data) => {
  // Generate QR Code from text
  const png = qr.imageSync(data, { type: 'png' });
  return png;
  //  // Generate a random file name
  //  let qr_code_file_name = new Date().getTime() + '.png';
  //  fs.writeFileSync('./public/qr/' + qr_code_file_name, qr_png, (err) => {
  //      if(err){
  //          console.log(err);
  //      }

  //  })
};

module.exports = router;
