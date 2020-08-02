console.log('init');
const codeText = document.getElementById('code-text');
const resultContainer = document.getElementById('code-reader-results');

codeText.addEventListener('keypress', async (event) => {
  console.log(event.target.value);
  const text = event.target.value;
  const key = event.which || event.keyCode;
  // if (text.indexOf('\n') === -1) {
  //   return;
  // }
  // key 13 -> enter
  if (key !== 13) return;

  console.log(text);

  resultContainer.innerText = text.trim();
  let response = null;
  try {
    response = await decode(text);
  } catch (error) {
    console.log(error);
    alert('에러 발생');
    return;
  }

  if (!response) {
    alert('No result');
    return;
  }

  console.log(response.data);
  const { success, result } = response.data;
  if (!success) {
    alert('서버 에러 발생' + result);
    return;
  }

  const documentCode = result.documentCode
    ? `<li>도큐먼트코드: ${result.documentCode}</li>`
    : '';
  const issuingCountry = result.issuingCountry
    ? `<li>발행국가: ${result.issuingCountry}</li>`
    : '';
  const documentNumber = result.documentNumber
    ? `<li>여권번호: ${result.documentNumber}</li>`
    : '';
  const countryCode = result.countryCode
    ? `<li>출신국가: ${result.countryCode}</li>`
    : '';
  const dateOfExpiry = result.dateOfExpiry
    ? `<li>여권만료일: ${result.dateOfExpiry}</li>`
    : '';
  const personalNumber = result.personalNumber
    ? `<li>개인번호: ${result.personalNumber}</li>`
    : '';
  const dateOfBirth = result.dateOfBirth
    ? `<li>생년월일: ${result.dateOfBirth}</li>`
    : '';
  const gender = result.gender ? `<li>성별: ${result.gender}</li>` : '';
  const surname = result.surname ? `<li>성: ${result.surname}</li>` : '';
  const givenName = result.givenName
    ? `<li>이름: ${result.givenName}</li>`
    : '';
  const barcodeIssuedDate = result.barcodeIssuedDate
    ? `<li>바코드 발급일: ${result.barcodeIssuedDate}</li>`
    : '';
  console.log(result);

  const tags = `
    <ul>
    ${documentCode}
    ${issuingCountry}
    ${documentNumber}
    ${countryCode}
    ${dateOfExpiry}
    ${personalNumber}
    ${dateOfBirth}
    ${gender}
    ${surname}
    ${givenName}
    ${barcodeIssuedDate}
    </ul>`;

  // const tags = `<ul>
  //                 <li>도큐먼트코드: ${
  //                   result.documentCode ? result.documentCode : ""
  //                 }</li>
  //                 <li>이슈잉 국가: ${
  //                   result.issuingCountry ? result.issuingCountry : ""
  //                 }</li>
  //                 <li>여권번호: ${
  //                   result.documentNumber ? result.documentNumber : ""
  //                 }</li>
  //                 <li>국가코드: ${
  //                   result.countryCode ? result.countryCode : ""
  //                 }</li>
  //                 <li>만기일: ${
  //                   result.dateOfExpiry ? result.dateOfExpiry : ""
  //                 }</li>
  //                 <li>개인번호: ${
  //                   result.personalNumber ? result.personalNumber : ""
  //                 }</li>
  //                 <li>생일: ${result.dateOfBirth ? result.dateOfBirth : ""}</li>
  //                 <li>성별: ${result.gender ? result.gender : ""}</li>
  //                 <li>성: ${result.surname ? result.surname : ""}</li>
  //                 <li>이름: ${result.givenName ? result.givenName : ""}</li>
  //               </ul>`;

  document.getElementById('decoded-str').innerHTML = tags;
});

async function decode(text) {
  const response = await axios.post('/service', {
    payload: text.trim(),
  });
  return response;
}

function init() {
  codeText.focus();
}

init();
