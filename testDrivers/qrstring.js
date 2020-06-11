// const data = {
//   documentCode: "P",
//   issuingState: "CAN",
//   documentNumber: "ZE000509",
//   nationality: "CAN",
//   expirationDate: "230114",
//   personalNumber: "",
//   birthDate: "850101",
//   sex: "female",
//   firstName: "SARAH",
//   lastName: "MARTIN",
// };

const data = {};

const converted = Object.values(data);
const body = converted.join(":");
const str = "1" + "A" + body;

console.log(str);
//const str = "1AP:CAN:ZE000509:CAN:23014::850101:female:SARAH:MARTIN";
const version = str[0];
const codeType = str[1];
const temp = str.substring(2, str.length);
const seperated = temp.split(":");
const composited = seperated.join(":");
console.log(`${version}${codeType}${temp}`);
console.log(composited === temp);
