let rotation = 3;
let issueID = 1;
let printName = 'Printer1';

function viewResult(result) {
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

function printCodes(qrString, barString) {
  let barCodeData = barString; // 바코드 데이터
  let barCodeSymbol = 1; // 바코드 타입 code 128
  let barCodeHeight = 100; // 바코드 높이
  let barPosX = 100; // X 좌표
  let barPosY = 140; // Y 좌표
  let barWidth = 3; // 바코드 길이
  let nBarWidth = 1;
  let barCodeHri = 1; // 바코드에 나오는 글자 위치 및 사이즈 (1: 밑에 폰트 사이즈 1, 3: 밑에 폰트 사이즈 2)
  let barRotation = 0; // rotation 없음

  setLabelId(issueID); // label_data['id'] = 1, label_data { id: 1, functions: {} }

  checkLabelStatus(); //  프린터 상태 체크 label_func['func1'] = { checkLabelStatus: [] }
  clearBuffer(); //  프린터 버퍼 초기화 lable_func['func2'] = { clearBuffer: [] }
  drawDeviceFont('상륙허가증', 100, 40, 'a', 2, 2, 0, 0, 0, 0);
  drawDeviceFont('BARCODE PASSPORT', 100, 80, 'a', 2, 2, 0, 0, 0, 0);

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

  // 1) data: 바코드 데이터
  // 2) x: x축 좌표
  // 3) y: y축 좌표
  // 4) model: 0 , 1
  // 5) eccLevel: 에러 교정 레벨 값 (L,M,Q,H)
  // 6) size: 바코드 크기(1~9)
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

function printCanvas(canvas) {
  // canvas data to image(encode bas64)
  let imgData = canvas.toDataURL();
  imageWidth = parseInt(image_input.value);
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
