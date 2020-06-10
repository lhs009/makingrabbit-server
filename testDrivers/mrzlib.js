const parse = require('mrz').parse;

// "I<UTOD23145890<1233<<<<<<<<<<<",
// "7408122F1204159UTO<<<<<<<<<<<6",
// "ERIKSSON<<ANNA<MARIA<<<<<<<<<<",

str =
  'P<CANMARTIN<<SARAH<<<<<<<<<<<<<<<<<<<<<<<<<<\r\nddddddZE000509<9CAN8501019F2301147<<<<<<<<<<<<<<08';

let mrzLines = [];

let gap = str.length - 88;

//if (str.length === 88) {
// mrzLines[0] = str.substring(0, 44);
// mrzLines[1] = str.substring(44, 88);
mrzLines[0] = str.substring(0, 44);
mrzLines[1] = str.substring(44 + str.length - 88, str.length);
console.log(mrzLines[0]);
console.log(mrzLines[1]);
// } else {
// }

// let mrz = [
//   'I<UTOD23145890<1233<<<<<<<<<<<7408122F120415',
//   '9UTO<<<<<<<<<<<6ERIKSSON<<ANNA<MARIA<<<<<<<x<',
// ];

var result = parse(mrzLines);
console.log(result);

const isValid = result.valid;
console.log(isValid);
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
} = result.fields;

const version = '1';

const barcodeData = version + '1' + nationality + documentNumber;
const qrcodeData =
  version +
  'A' +
  nationality +
  documentNumber +
  firstName +
  lastName +
  expirationDate +
  birthDate +
  documentCode +
  issuingState +
  personalNumber +
  sex;

console.log(barcodeData + ':' + barcodeData.length);
console.log(qrcodeData + ':' + qrcodeData.length);
