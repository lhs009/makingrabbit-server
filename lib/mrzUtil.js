const { parse } = require('mrz');

const checkSumMRZ = (mrz) => {
  let parsedData = {
    valid: false,

    qr: null,
    bar: null,
  };

  if (mrz < 88) {
    return parsedData;
  }

  const mrzLines = [];
  mrzLines[0] = mrz.substring(0, 44);
  mrzLines[1] = mrz.substring(44 + mrz.length - 88, mrz.length);
  console.log(mrzLines[0]);
  console.log(mrzLines[1]);

  const result = parse(mrzLines);
  parsedData.valid = result.valid;
  parsedData.qr = createQR(result.fields);
  parsedData.bar = createBAR(result.fields);

  return parsedData;
};

const createQR = (data) => {
  const {
    documentCode,
    issuingState,
    documentNumber,
    nationality,
    expirationDate,
    personalNumber,
    birthDate,
    sex,
    firstName,
    lastName,
  } = data;

  const jsonData = JSON.stringify({
    documentCode,
    issuingState,
    documentNumber,
    nationality,
    expirationDate,
    personalNumber,
    birthDate,
    sex,
    firstName,
    lastName,
  });

  return '1' + 'A' + jsonData;

  // return (
  //   '1' +
  //   'A' +
  //   nationality +
  //   documentNumber +
  //   firstName +
  //   lastName +
  //   expirationDate +
  //   birthDate +
  //   documentCode +
  //   issuingState +
  //   personalNumber +
  //   sex
  // );
};

const createBAR = ({ nationality, documentNumber }) => {
  return '1' + '1' + nationality + documentNumber;
};

module.exports = {
  checkSumMRZ,
  createBAR,
  createQR,
};
