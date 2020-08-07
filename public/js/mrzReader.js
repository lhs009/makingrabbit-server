const mrzText = document.getElementById('mrz-text');
const qrImg = document.getElementById('qr-code');
const barImg = document.getElementById('bar-code');
const printBtn = document.getElementById('print-btn');

let QR_STRING = '';
let BAR_STRING = '';

mrzText.addEventListener('keypress', (event) => {
  console.log(event.target.value);
  const text = event.target.value;

  if (text.indexOf('START') < 0 || text.indexOf('END') < 0) {
    return;
  }

  const textByLines = text.split('\n');

  const filtered = textByLines.filter((t) => t.indexOf('OCR Line') >= 0);
  const ocrLine1 = filtered[0].split(':')[1];
  const ocrLine2 = filtered[1].split(':')[1];
  const mrz = ocrLine1.trim() + ocrLine2.trim();

  createCodes(mrz);
});

async function createCodes(mrz) {
  if (!mrz || mrz === '') {
    alert('MRZ 문자열을 읽기 오류입니다');
    return;
  }

  let response = null;
  try {
    response = await axios.post('/codes', { mrz: mrz });
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
  const { success, qrString, barString } = response.data;
  if (!success) {
    alert('서버 에러 발생' + result);
    return;
  }

  QR_STRING = qrString;
  BAR_STRING = barString;

  const qrcode = new QRCode(document.getElementById('qr-code'), {
    width: 160,
    height: 160,
    colorDark: '#000000',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H,
    text: qrString,
    logo: 'images/qr100.png',
  });

  JsBarcode('#barcode-img', barString, {
    // width: 400,
    // height: 100,
    displayValue: true,
    fontSize: 30,
  });

  printBtn.classList.remove('invisible');
}

function content_print() {
  const canvas = document.querySelector('#qr-code canvas');
  const img = document.querySelector('#qr-code img');
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  console.log('canvas width: ' + canvas.width);
  printCodes(QR_STRING, BAR_STRING, canvas.toDataURL());
}

function init() {
  mrzText.focus();
}

init();
