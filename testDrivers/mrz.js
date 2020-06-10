const mrzChecksum = require("../lib/mrzChecksum");

const mrz =
  "P<CANMARTIN<<SARAH<<<<<<<<<<<<<<<<<<<<<<<<<<ZE000509<9CAN8501019F2301147<<<<<<<<<<<<<<08";
const faultyMrz =
  "G<CANMARTIN<<SARAH<<<<<<<<<<<<<<<<<<<<<<<<<<ZE000509<9CAN8501019F2301147<<<<<<<<<<<<<<08";
const maleMrz =
  "P<CANMARTIN<<SARAH<<<<<<<<<<<<<<<<<<<<<<<<<<ZE000509<9CAN8501019M2301147<<<<<<<<<<<<<<08";
const unknownMrz =
  "P<CANMARTIN<<SARAH<<<<<<<<<<<<<<<<<<<<<<<<<<ZE000509<9CAN8501019X2301147<<<<<<<<<<<<<<08";
const nationalityFailMrz =
  "P<UTOMARTIN<<SARAH<<<<<<<<<<<<<<<<<<<<<<<<<<ZE000509<9UTO8501019X2301147<<<<<<<<<<<<<<08";
try {
  const data = mrzChecksum.parse(nationalityFailMrz);
  console.log(data);
} catch (error) {
  console.log("error: " + error.name);
  //console.log(error);
}
