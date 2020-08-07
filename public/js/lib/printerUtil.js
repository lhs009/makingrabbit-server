let rotation = 3;
let issueID = 1;
let printName = 'Printer1';

function viewResult(result) {
  console.log(result);
  alert(result);
}

/*
setLabelId(issueID);
checkLabelStatus();
clearBuffer();
drawDeviceFont("1234567890",32,1115,"0",2,2,3,0,0,0);
drawTrueTypeFont("S63",60,880,"Arial",80,3,false,true,false,true);
drawDeviceFont("-",110,930,"1",2,2,3,0,1,0);
drawDeviceFont("0",80,900,"4",2,2,3,0,1,0);
draw1DBarcode("1234567890",213,1165,1,3,2,96,3,3);
drawDeviceFont("주식회사 빅솔론",359,1200,"a",2,2,3,0,1,0);
drawDeviceFont("010-0000-0000",400,1200,"0",2,2,3,0,1,0);
drawDeviceFont("031-000-0000",430,1200,"0",2,2,3,0,1,0);
drawDeviceFont("경기도 성남시 분당구
판교역로 241번길 20",459,1200,"b",1,1,3,0,1,0);
drawDeviceFont("(삼평동,미래에셋 벤처타워 7층)",492,1200,"b",1,1,3,0,1,0);
drawDeviceFont("1 / 1",630,1150,"b",2,2,3,0,1,0);
drawBitmapFile("C:\\BIXOLON mPrint Server\\BIXOLON.bmp",0,80,100,0);
drawBitmapFile("C:\\BIXOLON mPrint Server\\BIXOLON.bmp",100,60,200,0);
drawBitmapFile("C:\\BIXOLON mPrint Server\\BIXOLON.bmp",200,50,300,0);
drawBitmapFile("C:\\BIXOLON mPrint Server\\BIXOLON.bmp",300,50,350,0);
drawBlock(10,10,800,1210,"B",5);
printBuffer();
var strSubmit = getLabelData();
console.log(strSubmit);
issueID++;
requestPrint(p_name.value, strSubmit, viewResult);
*/

function _printCodes(qrString, barString) {
  let barCodeData = barString; // 바코드 데이터
  let barCodeSymbol = 1; // 바코드 타입 code 128
  let barCodeHeight = 100; // 바코드 높이
  let barPosX = 100; // X 좌표
  let barPosY = 140; // Y 좌표
  let barWidth = 3; // 바코드 길이
  let nBarWidth = 1;
  let barCodeHri = 1; // 바코드에 나오는 글자 위치 및 사이즈 (0: 프리터 안함, 1: 밑에 폰트 사이즈 1, 3: 밑에 폰트 사이즈 2)
  let barRotation = 0; // rotation 없음

  setLabelId(issueID); // label_data['id'] = 1, label_data { id: 1, functions: {} }

  checkLabelStatus(); //  프린터 상태 체크 label_func['func1'] = { checkLabelStatus: [] }
  clearBuffer(); //  프린터 버퍼 초기화 lable_func['func2'] = { clearBuffer: [] }
  drawDeviceFont('상륙허가증', 140, 30, 'a', 2, 2, 0, 0, 0, 0);
  drawDeviceFont('BARCODE PASSPORT', 90, 70, 'a', 2, 2, 0, 0, 0, 0);

  //  프린터 버퍼에 1차원 바코드 입력
  draw1DBarcode(
    barCodeData,
    barPosX,
    barPosY,
    barCodeSymbol,
    nBarWidth,
    barWidth,
    barCodeHeight,
    barRotation,
    barCodeHri
  );

  // 1) data: QR 데이터
  // 2) x: x축 좌표
  // 3) y: y축 좌표
  // 4) model: 0 , 1
  // 5) eccLevel: 에러 교정 레벨 값 (L,M,Q,H)
  // 6) size: QR 크기(1~9)
  // 7) rotation: 회전
  let qrPosX = 120;
  let qrPosY = barPosY + barCodeHeight + 80;
  let qrModel = 1; // model 2
  let qrEccLevel = 'Q';
  let qrSize = 4;
  let qrRotation = 0;
  //  프린터 버퍼에 QR 코드 입력
  drawQRCode(qrString, qrPosX, qrPosY, qrModel, qrEccLevel, qrSize, qrRotation);

  printBuffer(); // 프린터 버퍼에 있는 데이터 출력 label_func['func3'] = { printBuffer: [] }

  let strSubmit = getLabelData(); //label_data.functions = label_func

  console.log(strSubmit); // label_data = { id: 1, functions: { 'func1': { checkLabelStagus: [] }, 'func2': { clearBuffer: [] }, 'func3': { printBuffer: [] }}}

  issueID++;
  requestPrint(printName, strSubmit, viewResult);
}

function __printCodes(qrString, barString) {
  let barCodeData = barString; // 바코드 데이터
  let barCodeSymbol = 1; // 바코드 타입 code 128
  let barCodeHeight = 100; // 바코드 높이
  let barPosX = 100; // X 좌표
  let barPosY = 140; // Y 좌표
  let barWidth = 3; // 바코드 길이
  let nBarWidth = 1;
  let barCodeHri = 0; // 바코드에 나오는 글자 위치 및 사이즈 (0: 프리터 안함, 1: 밑에 폰트 사이즈 1, 3: 밑에 폰트 사이즈 2)
  let barRotation = 0; // rotation 없음

  setLabelId(issueID); // label_data['id'] = 1, label_data { id: 1, functions: {} }

  checkLabelStatus(); //  프린터 상태 체크 label_func['func1'] = { checkLabelStatus: [] }
  clearBuffer(); //  프린터 버퍼 초기화 lable_func['func2'] = { clearBuffer: [] }
  // 1. 프리터 버퍼에 상륙허가증 레이블 그리기
  drawDeviceFont('상륙허가증', 140, 30, 'a', 2, 2, 0, 0, 0, 0);
  // 2. 프린터 버퍼에 BARCODE PASSPORT 레이블 그리기
  drawDeviceFont('BARCODE PASSPORT', 90, 70, 'a', 2, 2, 0, 0, 0, 0);

  // 3. 프린터 버퍼에 1차원 바코드 그리기
  draw1DBarcode(
    barCodeData,
    barPosX,
    barPosY,
    barCodeSymbol,
    nBarWidth,
    barWidth,
    barCodeHeight,
    barRotation,
    barCodeHri
  );
  // 4. 프린터 버퍼에 TAX FREE String 삽입
  let taxFreeStringY = barPosY + barCodeHeight + 5;
  drawDeviceFont('TAX FREE', 150, taxFreeStringY, 'a', 2, 2, 0, 0, 0, 0);

  // 1) data: QR 데이터
  // 2) x: x축 좌표
  // 3) y: y축 좌표
  // 4) model: 0 , 1
  // 5) eccLevel: 에러 교정 레벨 값 (L,M,Q,H)
  // 6) size: QR 크기(1~9)
  // 7) rotation: 회전
  let qrPosX = 120;
  let qrPosY = barPosY + barCodeHeight + 80;
  let qrModel = 1; // model 2
  let qrEccLevel = 'Q';
  let qrSize = 4;
  let qrRotation = 0;
  // 5  프린터 버퍼에 QR 코드 그리기
  drawQRCode(qrString, qrPosX, qrPosY, qrModel, qrEccLevel, qrSize, qrRotation);
  // 프린터 버퍼에 있는 데이터 출력 label_func['func3'] = { printBuffer: [] }
  printBuffer();
  let strSubmit = getLabelData(); //label_data.functions = label_func
  console.log(strSubmit); // label_data = { id: 1, functions: { 'func1': { checkLabelStagus: [] }, 'func2': { clearBuffer: [] }, 'func3': { printBuffer: [] }}}

  issueID++;
  requestPrint(printName, strSubmit, viewResult);
}

// barcode 높이 100
// qrcode 높이 170
/*
[Syntax]
function drawBitmap(data, x, y, width, dither)
[Parameters]
1) data: base64로 인코딩한 이미지 데이터
2) x: x축 좌표
3) y: y축 좌표
4) width: 이미지 너비
5) dither: 디더링 사용 유무(미 설정: 0 or false, 설정: 1 or true)


*/
function _printCodes(qrString, barString, qrBase64) {
  console.log(qrBase64);
  let barCodeData = barString; // 바코드 데이터
  let barCodeSymbol = 1; // 바코드 타입 code 128
  let barCodeHeight = 100; // 바코드 높이
  //let barPosX = 100; // X 좌표
  let barPosX = 30;
  let barPosY = 140; // Y 좌표
  let barWidth = 2; // widebar
  let nBarWidth = 1; // narrowbar
  let barCodeHri = 0; // 바코드에 나오는 글자 위치 및 사이즈 (0: 프리터 안함, 1: 밑에 폰트 사이즈 1, 3: 밑에 폰트 사이즈 2)
  let barRotation = 0; // rotation 없음

  setLabelId(issueID); // label_data['id'] = 1, label_data { id: 1, functions: {} }

  checkLabelStatus(); //  프린터 상태 체크 label_func['func1'] = { checkLabelStatus: [] }
  clearBuffer(); //  프린터 버퍼 초기화 lable_func['func2'] = { clearBuffer: [] }
  // 1. 프리터 버퍼에 상륙허가증 레이블 그리기
  drawDeviceFont('상륙허가증', 140, 30, 'a', 2, 2, 0, 0, 0, 0);
  // 2. 프린터 버퍼에 BARCODE PASSPORT 레이블 그리기
  drawDeviceFont('BARCODE PASSPORT', 90, 70, 'a', 2, 2, 0, 0, 0, 0);
  // 3. 프린터 버퍼에 1차원 바코드 그리기
  //draw1DBarcode (data, x, y, symbol, narrowbar, widebar, height, rotation, hri)
  draw1DBarcode(
    barCodeData,
    barPosX,
    barPosY,
    barCodeSymbol,
    nBarWidth,
    barWidth,
    barCodeHeight,
    barRotation,
    barCodeHri
  );
  // 4. 프린터 버퍼에 TAX FREE String 삽입
  let taxFreeStringY = barPosY + barCodeHeight + 5;
  drawDeviceFont('TAX FREE', 150, taxFreeStringY, 'a', 2, 2, 0, 0, 0, 0);

  // 1) data: QR 데이터
  // 2) x: x축 좌표
  // 3) y: y축 좌표
  // 4) model: 0 , 1
  // 5) eccLevel: 에러 교정 레벨 값 (L,M,Q,H)
  // 6) size: QR 크기(1~9)
  // 7) rotation: 회전
  let qrPosX = 120;
  let qrPosY = barPosY + barCodeHeight + 70;
  let qrModel = 1; // model 2
  let qrEccLevel = 'Q';
  let qrSize = 4;
  let qrRotation = 0;
  // 5  프린터 버퍼에 QR 코드 그리기
  //drawQRCode(qrString, qrPosX, qrPosY, qrModel, qrEccLevel, qrSize, qrRotation);
  drawBitmap(qrBase64, qrPosX, qrPosY, 171, 1);

  // 프린터 버퍼에 있는 데이터 출력 label_func['func3'] = { printBuffer: [] }
  printBuffer();
  let strSubmit = getLabelData(); //label_data.functions = label_func
  console.log(strSubmit); // label_data = { id: 1, functions: { 'func1': { checkLabelStagus: [] }, 'func2': { clearBuffer: [] }, 'func3': { printBuffer: [] }}}

  issueID++;
  requestPrint(printName, strSubmit, viewResult);
}

function printCodes(qrString, barString, qrBase64) {
  console.log(qrBase64);

  setLabelId(issueID); // label_data['id'] = 1, label_data { id: 1, functions: {} }

  checkLabelStatus(); //  프린터 상태 체크 label_func['func1'] = { checkLabelStatus: [] }
  clearBuffer(); //  프린터 버퍼 초기화 lable_func['func2'] = { clearBuffer: [] }
  // 1. 프린터 버퍼에 BARCODE PASSPORT 레이블 그리기
  // drawDeviceFont (text, x, y, fontType, widthEnlarge, heightEnlarge, rotation, invert, bold, alignment)
  drawDeviceFont('BARCODE PASSPORT', 90, 40, 'a', 2, 2, 0, 0, 0, 0);
  // 2. 프린터 버퍼에 QR 코드 BASE64 이미지 데이터 그리기
  let qrPosX = 120;
  let qrPosY = 140;
  drawBitmap(qrBase64, qrPosX, qrPosY, 171, 1);
  // 3. 프린터 버퍼에 BAR 코드 BASE64 데이터 그리기
  let barCodeData = barString; // 바코드 데이터
  let barCodeSymbol = 1; // 바코드 타입 code 128
  let barCodeHeight = 100; // 바코드 높이
  let barPosX = 30; // X 좌표
  let barPosY = 380; // Y 좌표
  let barWidth = 2; // widebar
  let nBarWidth = 1; // narrowbar
  let barCodeHri = 0; // 바코드에 나오는 글자 위치 및 사이즈 (0: 프리터 안함, 1: 밑에 폰트 사이즈 1, 3: 밑에 폰트 사이즈 2)
  let barRotation = 0; // rotation 없음
  //draw1DBarcode (data, x, y, symbol, narrowbar, widebar, height, rotation, hri)
  draw1DBarcode(
    barCodeData,
    barPosX,
    barPosY,
    barCodeSymbol,
    nBarWidth,
    barWidth,
    barCodeHeight,
    barRotation,
    barCodeHri
  );
  // 4. 프린터 버퍼에 TAX FREE String BASE64 데이터 그리기
  let taxFreeStringY = barPosY + barCodeHeight - 20;
  let taxfreebase64 =
    'data:image/png;base64,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';

  drawBitmap(taxfreebase64, 130, taxFreeStringY, 200, 1);

  // 프린터 버퍼에 있는 데이터 출력 label_func['func3'] = { printBuffer: [] }
  printBuffer();
  let strSubmit = getLabelData(); //label_data.functions = label_func
  console.log(strSubmit); // label_data = { id: 1, functions: { 'func1': { checkLabelStagus: [] }, 'func2': { clearBuffer: [] }, 'func3': { printBuffer: [] }}}

  issueID++;
  requestPrint(printName, strSubmit, viewResult);
}

function printCanvas(canvas) {
  // canvas data to image(encode bas64)
  let imgData = canvas.toDataURL();
  //imageWidth = parseInt(image_input.value);
  let imageWidth = 228;
  setLabelId(issueID);
  checkLabelStatus();
  clearBuffer();

  drawBitmap(imgData, 100, 100, imageWidth, 1);

  printBuffer();
  let strSubmit = getLabelData();

  console.log(strSubmit);
  issueID++;
  requestPrint(printName, strSubmit, viewResult);
}
