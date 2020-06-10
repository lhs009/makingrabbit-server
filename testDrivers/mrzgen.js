const { generate } = require("mrz-gen");
const { parse } = require("mrz");

const code = generate({
  user: {
    firstName: "Jane",
    lastName: "Lodges",
    passportNumber: "123456789",
    countryCode: "USA",
    nationality: "USA",
    birthday: "01.02.1983",
    gender: "F",
    validUntilDay: "02.03.2028",
    personalNumber: "12345678901234",
  },
});

// Prints P<USALODGES<<JANE<<<<<<<<<<<<<<<<<<<<<<<<<<<\n1234567897USA8302010F28030211234567890123454
console.log(code);
let data = code.split("\r\n");
console.log(data);

var result = parse(data);
console.log(result);
