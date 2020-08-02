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

function printCodes(qrString, barString) {
  console.log(qrString);
  console.log(barString);
  // width 60 height 20
  //const TAXFREEBTM = 'Qk2mAQAAAAAAAD4AAAAoAAAARgAAAB4AAAABAAEAAAAAAGgBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///wD///////////wAAAD///////////wAAAD///////////wAAAD///////////wAAAD///////////wAAAD///////////wAAAD///////////wAAAD///////////wAAAD///////////wAAAD///////////wAAAD5z4PPnzwGD/wAAAD577Ofnzk+f/wAAAD577k/nzs+f/wAAAD54Dx/nzM+f/wAAAD593x/gwcGD/wAAAD58nx/nzs+f/wAAAD5+vk/nzk+f/wAAAD5+POfnzk+f/wAAADAePPPgwMGD/wAAAD///////////wAAAD///////////wAAAD///////////wAAAD///////////wAAAD///////////wAAAD///////////wAAAD///////////wAAAD///////////wAAAD///////////wAAAD///////////wAAAD///////////wAAAA=';
  const TAXFREEBTM =
    'data:image/jpeg;base64,Qk1GDgAAAAAAADYAAAAoAAAAPAAAABQAAAABABgAAAAAABAOAAAAAAAAAAAAAAAAAAAAAAAA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AGa2kDoA///btv//AABmtmYA////////////////AGa2OgAAADo6OgAA/9uQ////2///ADqQZgAA//+2////////////tv//AABm25A6////////////kNv/AAA6/7Zm////2///ADqQOgAAttuQAABmAAAAAAAAAAAA25A6tv//AABmAAAAAAAAAAAA25A6////////////////////////////////////////////////AGa2kDoA///b////OpDbZgAA//+2////////tv//AABmtmYAtv//AABmkDoA///bOpDbAAAA/7Zm////////////////tv//AABm25A6////////////kNv/AAA6/7Zm////Zrb/AAAA/7Zmtv//AABm25A6////////////tv//AABm25A6////////////////////////////////////////////////////////////AGa2kDoA///b////kNv/AAA6AAAAAAAAAAAAAAAAOgAA/9uQ////Zrb/AAAAtrZmAABmtmYA////////////////////tv//AABm25A6////////////kNv/AAA6/7ZmkNv/AAA6tmYA////tv//AABm25A6////////////tv//AABm25A6////////////////////////////////////////////////////////////AGa2kDoA///b////////AGa2ZgAA//+2tv//AABmkDoA///b////////AGa2AAAAZgAA//+2////////////////////tv//AABm25A6////////////kNv/AAA6AAAAAAAAkDoA///b////tv//AABm25A6////////////tv//AABm25A6////////////////////////////////////////////////////////////AGa2kDoA///b////////Zrb/AAAA/7ZmZrb/AAAA/7Zm////////////AGa2AAAAZgAA//+2////////////////////tv//AABmAAAAAAAAAAAA/7ZmkNv/AAA6/7Zm////AGa2kDoA///btv//AABmAAAAAAAAOgAA/9uQtv//AABmAAAAAAAAOgAA/9uQ////////////////////////////////////////////////AGa2kDoA///b////////2///ADqQtmYAAGa2ZgAA//+2////////kNv/AAA6kJA6AABmtmYA////////////////////tv//AABm25A6////////////kNv/AAA6/7Zm////Zrb/OgAA/9uQtv//AABm25A6////////////tv//AABm25A6////////////////////////////////////////////////////////////AGa2kDoA///b////////////OpDbAAAAAAAA25A6////////2///ADqQZgAA//+2OpDbOgAA/9uQ////////////////tv//AABm25A6////////////kNv/AAA6/7Zm////AGa2ZgAA//+2tv//AABm25A6////////////tv//AABm25A6////////////////////////////////////////////////////AABmAAAAAAAAAAAAAAAAZgAA//+2////tv//AABmOgAA/9uQ////////OpDbAAAA25A6////2///ADqQZgAA//+2////////////tv//AABmAAAAAAAAAAAA25A6kNv/AAA6AAAAAAAAAAAA/7Zm////tv//AABmAAAAAAAAAAAA/7Zmtv//AABmAAAAAAAAAAAA/7Zm////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////';
  let barCodeData = barString; // 바코드 데이터
  let barCodeSymbol = 1; // 바코드 타입 code 128
  let barCodeHeight = 100; // 바코드 높이
  //let barPosX = 100; // X 좌표
  let barPosX = 30;
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
  let qrPosY = barPosY + barCodeHeight + 70;
  let qrModel = 1; // model 2
  let qrEccLevel = 'Q';
  let qrSize = 4;
  let qrRotation = 0;
  // 5  프린터 버퍼에 QR 코드 그리기
  drawQRCode(qrString, qrPosX, qrPosY, qrModel, qrEccLevel, qrSize, qrRotation);
  // 6  QR 코드에 TAX FREE Bitmap string 그리기 (60 * 20)
  const temp =
    'data:image/bmp;base64,Qk0+AwAAAAAAAD4AAAAoAAAAYwAAADAAAAABAAEAAAAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///wD////////////////gAAAA////////////////4AAAAP///////////////+AAAAD////////////////gAAAA////////////////4AAAAP///////////////+AAAAD////////////////gAAAA////////////////4AAAAP///////////////+AAAAD////////////////gAAAA////////////////4AAAAP///////////////+AAAAD////////////////gAAAA////////////////4AAAAP///////////////+AAAAD////////////////gAAAA////////////////4AAAAP/OfweP5+fMDgf//+AAAAD/zz5nn+fnjA4H///gAAAA/88+cx/n55z+f///4AAAAP/PAHE/5+c8/n///+AAAAD/z4D4f+fmPP5////gAAAA/8+c/H/gYHwOB///4AAAAP/PnPx/4GA8Dgf//+AAAAD/z8n4f+fnHP5////gAAAA/8/J8T/n55z+f///4AAAAP/PwfMf5+cc/n///+AAAAD8AePjn+AgHA4H///gAAAA/AHj54/gIDwOB///4AAAAP///////////////+AAAAD////////////////gAAAA////////////////4AAAAP///////////////+AAAAD////////////////gAAAA////////////////4AAAAP///////////////+AAAAD////////////////gAAAA////////////////4AAAAP///////////////+AAAAD////////////////gAAAA////////////////4AAAAP///////////////+AAAAD////////////////gAAAA////////////////4AAAAP///////////////+AAAAD////////////////gAAAA////////////////4AAAAP///////////////+AAAAA="';
  // let insertedX = qrPosX + 90;
  // let insertedY = qrPosY + 110;
  //let insertedY = qrPosY;
  let insertedX = qrPosX + 10;
  let insertedY = qrPosY + 20;
  drawBitmap(temp, insertedX, insertedY, 191, 1);

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
