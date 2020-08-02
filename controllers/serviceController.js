'use strict';

const { decrypt } = require('../lib/cipherUtil');
const httpResponse = require('../common/httpResponse');
/*
 format: VERSION [1 byte] + CODE_TYPE [1 byte] + PASSPORT INFO [MAX 12 bytes]
 1. 1차원 바코드 용 타입 1: 국적 + 여권번호
 2. 1차원 바코드 용 타입 2: 국적 + 여권번호 + 성명
 3. QR 코드 용 타입 A: 국적 + 여권번호 + 성명 + 발행일자 + 생년월일
 4. QR 코드 용 타입 B: 국적 + 여권번호 + 성명 + 발행일자 + 생년월일 + 입국일자
*/

const decryption = async (req, res, next) => {
  const decoded = req.decodedToken;
  const { payload } = req.body;
  console.log(payload);
  console.log(decoded, payload);
  try {
    const result = decrypt(payload);

    console.log(result);

    const version = result[0];
    const codeType = result[1];
    const data = result.substring(2, result.length);
    console.log(data);
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

const _createResponseByBarcodeType = (data) => {
  const country = data.substring(0, 3);
  const passportNo = data.substring(3, data.length);
  return {
    countryCode: country,
    documentNumber: passportNo,
  };
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

const _createResponseByQRcodeType = (data) => {
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
