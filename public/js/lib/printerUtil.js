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
  let taxFreeStringY = barPosY + barCodeHeight - 5;
  //drawDeviceFont('TAX FREE', 150, taxFreeStringY, 'a', 2, 2, 0, 0, 0, 0);
  let taxfreebase64 =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAABICAYAAADIzHiKAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAABLASURBVHhe7Z0JuFXTF8B3kSSUoYyFSkQITcaSmcwklOmZMyU+Mn8kmSMRMnuISGYhJTxkejLlUXjKkHkWuv/9O2+d/733nH2me897777e/n3f/u7Z556zzx322nvttdbeu0lGoywWS4OkqbxaLJYGSIMT4OnTp8uRxWJpUCp0r169VNOmTVVFRYWcsVgaNw2iB66qqlLt27dXr7/+uiorK5OzFoul5AX4nXfeUbvvvruqrq528ltttZXzarFYSlyF/u2339Q666yjvvvuOzmjlDWaWyxZSroH3nrrrfOE12Kx5FOyAoyqXFlZKbkaNt10UzmyWCxQkgJ89NFHq1deeUVyWfr37y9HFosFSk6A77//fjV+/HjJ5YMxy2KxZCk5I1aTJk3kyM8XX3yh2rVrJzmLxVJSPfDGG28sR37WWmsttcwyy0jOYrFAyQhweXm5mjVrluT8YJFu1aqV5CwWC5SEAOMquuqqqyRnZrPNNlNLLrmk5CwWC5SEAE+dOlW9/fbbkjPTtm1bObJYLC71LsA///yzGjp0qOTMMP4NGx9bLI2VehdgpgfOnz9fcmbWW289tf7660vOYrG4pOpGYix71113qc8//1y1aNHC8dtus8028q6ZFVZYQf3000+SM3PooYeqO++8U3IWi8UlNQE+55xz1LXXXqt+//13OaNU8+bNVY8ePdSMGTPkTD5//vlnLNcQBq7TTjtNchaLxSUVFfqSSy5RI0eOzBNe+Pvvv9VLL72kunTpon788Uc5m+Woo46So2Dooffcc0/JWSyWXIrugT/77DPVqVMn9d9//8kZMyeccIIaO3as5GpYddVV1TfffCM5MxiweIbFYvFTdA88aNCgSOGFG264QX3//feSU+rNN99Uf/zxh+SCsTOQLJZgihLgmTNnqpdfflly0eT2wI8++qj69ddfJRdMHDXbYmmsFKxCc1vLli0dQ1QS3Mcdcsgh6t5773WOw+B6UtgkB4ulsVJwD3zQQQclFl6XhQsXRo59YcUVV5Qji8VioiABnjRpknrwwQcll4ynnnpKffvtt87UwCjOPfdc59X2vhaLmcQC/M8/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';

  drawBitmap(taxfreebase64, 140, taxFreeStringY, 180, 1);

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
