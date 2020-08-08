'use strict';

const { decrypt } = require('../lib/cipherUtil');
const httpResponse = require('../common/httpResponse');
/*
 format: VERSION [1 byte] + CODE_TYPE [1 byte] + PASSPORT INFO [MAX 12 bytes]
 1. 1차원 바코드 용 타입 1: 바코드 발급입 + 국적 + 여권번호
 2. QR 코드 용 타입 A: 도큐먼트 코드 + 여권 발급 국가 + 여권번호 + 국적 + 여권 만기일 + 개인번호 + 생일 + 성별 + 성 + 이름성명 + 코드 발행일자 
*/

const decryption = async (req, res, next) => {
  //const decoded = req.decodedToken;
  const { payload } = req.body;
  console.log('[DECRIPTION REQ STRING]:' + payload);
  try {
    const result = decrypt(payload);
    console.log('[DECRIPTION RESULT]:' + result);
    const version = result[0];
    const codeType = result[1];
    const data = result.substring(2, result.length);
    let resp = '';
    if (codeType === '1') {
      resp = createResponseByBarcodeType(data);
    } else if (codeType === 'A') {
      resp = createResponseByQRcodeType(data);
    } else {
      return next(httpResponse.InvalidParameters);
    }

    res.json({ success: true, result: resp });
  } catch (error) {
    next(error);
  }
};

// 바코드 발급일 추가
const createResponseByBarcodeType = (data) => {
  const barcodeIssuedDate = data.substring(0, 8);
  const country = data.substring(8, 11);
  const passportNo = data.substring(11, data.length);
  return {
    countryCode: country,
    documentNumber: passportNo,
    barcodeIssuedDate: barcodeIssuedDate,
  };
};

// 바코드 발급일 추가
const createResponseByQRcodeType = (data) => {
  // const country = data.substring(0, 3);
  // const passportNo = data.substring(3, 10);
  // const jsonParsed = JSON.parse(data);
  // console.log(jsonParsed);

  const passportInfo = data.split(':');

  return {
    documentCode: passportInfo[0] ? passportInfo[0] : '',
    issuingCountry: passportInfo[1] ? passportInfo[1] : '',
    documentNumber: passportInfo[2] ? passportInfo[2] : '',
    countryCode: passportInfo[3] ? passportInfo[3] : '',
    dateOfExpiry: passportInfo[4] ? passportInfo[4] : '',
    personalNumber: passportInfo[5] ? passportInfo[5] : '',
    dateOfBirth: passportInfo[6] ? passportInfo[6] : '',
    gender: passportInfo[7] ? passportInfo[7] : '',
    surname: passportInfo[8] ? passportInfo[8] : '',
    givenName: passportInfo[9] ? passportInfo[9] : '',
    // 발급입 추가
    barcodeIssuedDate: passportInfo[10] ? passportInfo[10] : '',
  };
};

module.exports = {
  decryption,
};
