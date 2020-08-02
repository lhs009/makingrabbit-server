const { parse } = require('mrz');

/**
 *  yyyyMMdd 포맷으로 반환
 */
function getFormatDate(date) {
  var year = date.getFullYear(); //yyyy
  var month = 1 + date.getMonth(); //M
  month = month >= 10 ? month : '0' + month; //month 두자리로 저장
  var day = date.getDate(); //d
  day = day >= 10 ? day : '0' + day; //day 두자리로 저장
  return year + '' + month + '' + day; //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
}

/*
  MRZ 스트링 파싱 후 Chekcsum결과 및 암호화 할 여권 정보 데이터 스트링 리턴
*/
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

const _createQR = (data) => {
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
};

// QR 코드 용 plain data string 생성
// 버전 + 코드 타입 + 여권 정보 (: 구분자 스트링)
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

  console.log('###################################################');
  // console.log(data);
  // const converted = Object.values(data);
  // const body = converted.join("@");
  // console.log(body);
  //const str = "1AP:CAN:ZE000509:CAN:23014::850101:female:SARAH:MARTIN";
  //let body = `${documentCode}:${issuingState}:${documentNumber}:${nationality}:${expirationDate}:${personalNumber}:${birthDate}:${sex}:${firstName}:${lastName}`;
  // 발급입 추가
  let body = `${documentCode}:${issuingState}:${documentNumber}:${nationality}
              :${expirationDate}:${personalNumber}:${birthDate}:${sex}:${firstName}
              :${lastName}
              :${getFormatDate(new Date())}`;

  console.log(body);
  return '1' + 'A' + body;
};

// BAR 코드 용 plain data string 생성
// 버전 + 코드 타입 + 국적 + 여권 번호
const createBAR = ({ nationality, documentNumber }) => {
  //return "1" + "1" + nationality + documentNumber;
  // 발급일 추가
  return '1' + '1' + getFormatDate(new Date()) + nationality + documentNumber;
};

module.exports = {
  checkSumMRZ,
  createBAR,
  createQR,
};
