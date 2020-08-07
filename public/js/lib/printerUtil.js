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

  drawBitmap(taxfreebase64, 120, taxFreeStringY, 180, 1);

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
