console.log('init');
const codeText = document.getElementById('code-text');
const resultContainer = document.getElementById('code-reader-results');

codeText.addEventListener('keypress', async (event) => {
  console.log(event.target.value);
  const text = event.target.value;

  if (text.indexOf('\n') === -1) {
    return;
  }
  console.log('done');
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

  //const passportInfo = result.split(':');
  // documentCode,
  // issuingState,
  // documentNumber,
  // nationality,
  // expirationDate,
  // personalNumber,
  // birthDate,
  // sex,
  // firstName,
  // lastName,
  console.log(result);

  const tags = `<ul>
                  <li>도큐먼트코드: ${
                    result.documentCode ? result.documentCode : ''
                  }</li>
                  <li>이슈잉 국가: ${
                    result.issuingCountry ? result.issuingCountry : ''
                  }</li>
                  <li>여권번호: ${
                    result.documentNumber ? result.documentNumber : ''
                  }</li>
                  <li>국가코드: ${
                    result.countryCode ? result.countryCode : ''
                  }</li>
                  <li>만기일: ${
                    result.dateOfExpiry ? result.dateOfExpiry : ''
                  }</li>
                  <li>개인번호: ${
                    result.personalNumber ? result.personalNumber : ''
                  }</li>
                  <li>생일: ${result.dateOfBirth ? result.dateOfBirth : ''}</li>
                  <li>성별: ${result.gender ? result.gender : ''}</li>
                  <li>성: ${result.surname ? result.surname : ''}</li>
                  <li>이름: ${result.givenName ? result.givenName : ''}</li>
                </ul>`;

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
  console.log('sdafsdfsadfa');
}

init();
