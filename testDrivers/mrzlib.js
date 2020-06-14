const parse = require('mrz').parse;

const MRZ_ANNA_ERIKSSON_2LINE_ID3 =
  'P<UTOERIKSSON<<ANNA<MARIA<<<<<<<<<<<<<<<<<<<' +
  'L898902C<3UTO6908061F9406236ZE184226B<<<<<14';

const MRZ_LOES_MEULENDIJK_2LINE_ID3_ZERO_CHECKDIGIT =
  'P<NLDMEULENDIJK<<LOES<ALBERTINE<<<<<<<<<<<<<' +
  'XX00000000NLD7110195F1108280123456782<<<<<02';

const MRZ_LOES_MEULENDIJK_2LINE_ID3_FILLER_CHECKDIGIT =
  'P<NLDMEULENDIJK<<LOES<ALBERTINE<<<<<<<<<<<<<' +
  'XX00000000NLD7110195F1108280123456782<<<<<<2';

const MRZ_GERARD_ROBBERT_MARTINUS_SEBASTIAAN_VAN_NIEUWENHUIZEN_2LINE_ID3 =
  'P<NLDVAN<NIEUWENHUIZEN<<GERARD<ROBBERT<MARTI' +
  'XN01BC0150NLD7112247M1108268123456782<<<<<02';

const MRZ_ERIKA_MUSTERMAN_2LINE_ID3 =
  'P<D<<MUSTERMANN<<ERIKA<<<<<<<<<<<<<<<<<<<<<<' +
  'C11T002JM4D<<9608122F1310317<<<<<<<<<<<<<<<6';

const MRZ_CHRISTIAN_MUSTERMAN_2LINE_ID3 =
  'P<D<<MUSTERMAN<<CHRISTIAN<<<<<<<<<<<<<<<<<<<' +
  '0000000000D<<8601067M1111156<<<<<<<<<<<<<<<2';

const MRZ_VZOR_SPECIMEN_2LINE_ID3 =
  'P<CZESPECIMEN<<VZOR<<<<<<<<<<<<<<<<<<<<<<<<<' +
  '99009054<4CZE6906229F16072996956220612<<<<74';

const MRZ_HAPPY_TRAVELER_2LINE_ID3 =
  'P<USATRAVELER<<HAPPY<<<<<<<<<<<<<<<<<<<<<<<<' +
  '1500000035USA5609165M0811150<<<<<<<<<<<<<<08';

const MRZ_FRANK_AMOSS_2LINE_ID3 =
  'P<USAAMOSS<<FRANK<<<<<<<<<<<<<<<<<<<<<<<<<<<' +
  '0000780043USA5001013M1511169100000000<381564';

const MRZ_LORENA_FERNANDEZ_2LINE_ID3 =
  'P<ARGFERNANDEZ<<LORENA<<<<<<<<<<<<<<<<<<<<<<' +
  '00000000A0ARG7903122F081210212300004<<<<<<86';

const MRZ_KWOK_SUM_CHNCHUNG_2LINE_ID3 =
  'P<CHNCHUNG<<KWOK<SUM<<<<<<<<<<<<<<<<<<<<<<<<' +
  'K123455994CHN8008080F1702057HK8888888<<<<<36';

const mrz =
  'P<CANMARTIN<<SARAH<<<<<<<<<<<<<<<<<<<<<<<<<<ZE000509<9CAN8501019F2301147<<<<<<<<<<<<<<08'; // true
const faultyMrz =
  'G<CANMARTIN<<SARAH<<<<<<<<<<<<<<<<<<<<<<<<<<ZE000509<9CAN8501019F2301147<<<<<<<<<<<<<<08'; // false
const maleMrz =
  'P<CANMARTIN<<SARAH<<<<<<<<<<<<<<<<<<<<<<<<<<ZE000509<9CAN8501019M2301147<<<<<<<<<<<<<<08'; // true
const unknownMrz =
  'P<CANMARTIN<<SARAH<<<<<<<<<<<<<<<<<<<<<<<<<<ZE000509<9CAN8501019X2301147<<<<<<<<<<<<<<08'; // false
const nationalityFailMrz =
  'P<UTOMARTIN<<SARAH<<<<<<<<<<<<<<<<<<<<<<<<<<ZE000509<9UTO8501019X2301147<<<<<<<<<<<<<<08'; // false
const random1 =
  'I<UTOSTEVENSON<<PETER<<<<<<<<<<<<<<<\nD231458907UTO3407127M9507122<<<<<<<2'; // false

const random2 =
  'P<UTOERIKSSON<<ANNA<MARIA<<<<<<<<<<<<<<<<<<<L898902C<3UTO6908061F9406236ZE184226B<<<<<14'; // false

let str = MRZ_ANNA_ERIKSSON_2LINE_ID3;

let mrzLines = [];

let gap = str.length - 88;

//if (str.length === 88) {
// mrzLines[0] = str.substring(0, 44);
// mrzLines[1] = str.substring(44, 88);
console.log(str.length);
mrzLines[0] = str.substring(0, 44);
mrzLines[1] = str.substring(44 + str.length - 88, str.length);
console.log(mrzLines[0]);
console.log(mrzLines[1]);
// } else {
// }

// let mrz = [
//   "I<UTOD23145890<1233<<<<<<<<<<<7408122F120415",
//   "9UTO<<<<<<<<<<<6ERIKSSON<<ANNA<MARIA<<<<<<<x<",
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
