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
  let taxFreeStringY = barPosY + barCodeHeight - 10;
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
