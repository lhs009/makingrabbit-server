const mrzText = document.getElementById("mrz-text");
const qrImg = document.getElementById("qr-code");
const barImg = document.getElementById("ba-rcode");
const printBtn = document.getElementById("print-btn");

let QR_STRING = "";
let BAR_STRING = "";

mrzText.addEventListener("keypress", (event) => {
  console.log(event.target.value);
  const text = event.target.value;

  if (text.indexOf("START") < 0 || text.indexOf("END") < 0) {
    return;
  }

  console.log("done");
  console.log(text);

  const textByLines = text.split("\n");
  console.log(textByLines);

  const filtered = textByLines.filter((t) => t.indexOf("OCR Line") >= 0);
  console.log(filtered);
  const ocrLine1 = filtered[0].split(":")[1];
  const ocrLine2 = filtered[1].split(":")[1];
  const mrz = ocrLine1.trim() + ocrLine2.trim();
  console.log(mrz + ":" + mrz.length);
  createCodes(mrz);
  // this.value = '';
  // this.focus();
});

async function createCodes(mrz) {
  //axios.post('http://localhost:3000/codes', {}).then(data => {}).catch(error)
  if (!mrz || mrz === "") {
    alert("MRZ 문자열을 읽기 오류입니다");
    return;
  }

  let response = null;
  try {
    response = await axios.post("/codes", { mrz: mrz });
  } catch (error) {
    console.log(error);
    alert("에러 발생");
    return;
  }

  if (!response) {
    alert("No result");
    return;
  }

  console.log(response.data);
  const { success, qrString, barString } = response.data;
  if (!success) {
    alert("서버 에러 발생" + result);
    return;
  }

  QR_STRING = qrString;
  BAR_STRING = barString;

  const qrcode = new QRCode(document.getElementById("qr-code"), {
    text: qrString,
    width: 256,
    height: 256,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  });

  JsBarcode("#barcode-img", barString, {
    displayValue: true,
    fontSize: 30,
  });

  // console.log(`${qrString}:${barString}`);
  // console.log(response.data);
  // const { success, fileName } = response.data;
  // if (!success) {
  //   alert("서버 에러 발생" + result);
  //   return;
  // }

  // const qrFile = `images/${fileName}-qr.png`;
  // const barFile = `images/${fileName}-bar.png`;

  // addCodeImage(qrImg, qrFile);
  // addCodeImage(barImg, barFile);

  printBtn.classList.remove("invisible");
}

function addCodeImage(node, fileName) {
  const img = document.createElement("img");
  img.src = fileName; // 이미지 경로 설정 (랜덤)
  img.classList.add("rounded", "mx-auto", "d-block");
  img.style = "max-width: 100%; height: auto;";
  node.innerHTML = "";
  node.appendChild(img);
}

function _content_print() {
  var inbody = document.body.innerHTML; // 이전 body 영역 저장

  window.onbeforeprint = function () {
    // 프린트 화면 호출 전 발생하는 이벤트
    const container = document.createElement("div");
    container.classList.add("print-container");
    qrImg.classList.add("print-code");
    barImg.classList.add("print-code");
    container.appendChild(qrImg);
    container.appendChild(barImg);

    document.body.innerHTML = container.innerHTML; // 원하는 영역 지정
  };

  window.onafterprint = function () {
    // 프린트 출력 후 발생하는 이벤트
    document.body.innerHTML = inbody; // 이전 body 영역으로 복구
    location.reload(true);
  };

  window.print();
  //location.reload(true);
}

function content_print() {
  var inbody = document.body.innerHTML; // 이전 body 영역 저장
  const container = `
    <div class="print-container">
      <div class="print-code" id="print-qrcode"></div>
      <div class="print-code">
        <img id="print-barcode">
      </div>
    </div>
  `;

  window.onbeforeprint = function () {
    // 프린트 화면 호출 전 발생하는 이벤트
    document.body.innerHTML = container; // 원하는 영역 지정
    const qrcode = new QRCode(document.getElementById("print-qrcode"), {
      text: QR_STRING,
      width: 256,
      height: 256,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H,
    });

    JsBarcode("#print-barcode", BAR_STRING, {
      displayValue: true,
      fontSize: 30,
    });
  };

  window.onafterprint = function () {
    // 프린트 출력 후 발생하는 이벤트
    document.body.innerHTML = inbody; // 이전 body 영역으로 복구
    location.reload(true);
  };

  window.print();
  //location.reload(true);
}

function init() {
  mrzText.focus();
}

init();
