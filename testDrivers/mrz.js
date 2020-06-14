const mrzChecksum = require('../lib/mrzChecksum');

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

const testMrz = unknownMrz;

try {
  const data = mrzChecksum.parse(testMrz);
  console.log(data);
} catch (error) {
  //console.log('error: ' + error.name);
  console.log(false);
  //console.log(error);
}
