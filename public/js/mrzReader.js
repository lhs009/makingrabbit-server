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

  console.log('done');
  console.log(text);

  const textByLines = text.split('\n');
  console.log(textByLines);

  const filtered = textByLines.filter((t) => t.indexOf('OCR Line') >= 0);
  console.log(filtered);
  const ocrLine1 = filtered[0].split(':')[1];
  const ocrLine2 = filtered[1].split(':')[1];
  const mrz = ocrLine1.trim() + ocrLine2.trim();
  console.log(mrz + ':' + mrz.length);
  createCodes(mrz);
  // this.value = '';
  // this.focus();
});

async function createCodes(mrz) {
  //axios.post('http://localhost:3000/codes', {}).then(data => {}).catch(error)
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
  const { success, qrString, barString, barFile, qrFile } = response.data;
  if (!success) {
    alert('서버 에러 발생' + result);
    return;
  }

  QR_STRING = qrString;
  BAR_STRING = barString;

  // const qrcode = new QRCode(document.getElementById('qr-code'), {
  //   text: qrString,
  //   width: 160,
  //   height: 160,
  //   colorDark: '#000000',
  //   colorLight: '#ffffff',
  //   correctLevel: QRCode.CorrectLevel.H,
  // });

  const qrcode = new QRCode(document.getElementById('qr-code'), {
    width: 200,
    height: 200,
    colorDark: '#000000',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H,
    text: qrString,
    logo: 'images/18.jpg',
  });

  // const qrcode = new QRCode(document.getElementById("qrcode"), {
  //   width: 256,
  //   height: 256,
  //   correctLevel: QRCode.CorrectLevel.H,
  //   text: "srGrOj4YzLiafxYfLFZ5EeOuLUncdqMOqV7b+uroUVf7HPWCuxOD/cTG8bvaPuICsGe/Ug2EL66AF+3RqD5dWZws5Jg",
  //   logo: "images/18.jpg"
  // });

  JsBarcode('#barcode-img', barString, {
    // width: 400,
    // height: 100,
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

  printBtn.classList.remove('invisible');
}

function addCodeImage(node, fileName) {
  const img = document.createElement('img');
  img.src = fileName; // 이미지 경로 설정 (랜덤)
  img.classList.add('rounded', 'mx-auto', 'd-block');
  img.style = 'max-width: 100%; height: auto;';
  node.innerHTML = '';
  node.appendChild(img);
}

function _content_print() {
  printCodes(QR_STRING, BAR_STRING);
}

const CanvasToBMP = {
  /**
   * Convert a canvas element to ArrayBuffer containing a BMP file
   * with support for 32-bit (alpha).
   *
   * Note that CORS requirement must be fulfilled.
   *
   * @param {HTMLCanvasElement} canvas - the canvas element to convert
   * @return {ArrayBuffer}
   */
  toArrayBuffer: function (canvas) {
    var w = canvas.width,
      h = canvas.height,
      w4 = w * 4,
      idata = canvas.getContext('2d').getImageData(0, 0, w, h),
      data32 = new Uint32Array(idata.data.buffer), // 32-bit representation of canvas
      stride = Math.floor((32 * w + 31) / 32) * 4, // row length incl. padding
      pixelArraySize = stride * h, // total bitmap size
      fileLength = 122 + pixelArraySize, // header size is known + bitmap
      file = new ArrayBuffer(fileLength), // raw byte buffer (returned)
      view = new DataView(file), // handle endian, reg. width etc.
      pos = 0,
      x,
      y = 0,
      p,
      s = 0,
      a,
      v;

    // write file header
    setU16(0x4d42); // BM
    setU32(fileLength); // total length
    pos += 4; // skip unused fields
    setU32(0x7a); // offset to pixels

    // DIB header
    setU32(108); // header size
    setU32(w);
    setU32(-h >>> 0); // negative = top-to-bottom
    setU16(1); // 1 plane
    setU16(32); // 32-bits (RGBA)
    setU32(3); // no compression (BI_BITFIELDS, 3)
    setU32(pixelArraySize); // bitmap size incl. padding (stride x height)
    setU32(2835); // pixels/meter h (~72 DPI x 39.3701 inch/m)
    setU32(2835); // pixels/meter v
    pos += 8; // skip color/important colors
    setU32(0xff0000); // red channel mask
    setU32(0xff00); // green channel mask
    setU32(0xff); // blue channel mask
    setU32(0xff000000); // alpha channel mask
    setU32(0x57696e20); // " win" color space

    // bitmap data, change order of ABGR to BGRA
    while (y < h) {
      p = 0x7a + y * stride; // offset + stride x height
      x = 0;
      while (x < w4) {
        v = data32[s++]; // get ABGR
        a = v >>> 24; // alpha channel
        view.setUint32(p + x, (v << 8) | a); // set BGRA
        x += 4;
      }
      y++;
    }

    return file;

    // helper method to move current buffer position
    function setU16(data) {
      view.setUint16(pos, data, true);
      pos += 2;
    }
    function setU32(data) {
      view.setUint32(pos, data, true);
      pos += 4;
    }
  },

  /**
   * Converts a canvas to BMP file, returns a Blob representing the
   * file. This can be used with URL.createObjectURL().
   * Note that CORS requirement must be fulfilled.
   *
   * @param {HTMLCanvasElement} canvas - the canvas element to convert
   * @return {Blob}
   */
  toBlob: function (canvas) {
    return new Blob([this.toArrayBuffer(canvas)], {
      type: 'image/bmp',
    });
  },

  /**
   * Converts the canvas to a data-URI representing a BMP file.
   * Note that CORS requirement must be fulfilled.
   *
   * @param canvas
   * @return {string}
   */
  toDataURL: function (canvas) {
    var buffer = new Uint8Array(this.toArrayBuffer(canvas)),
      bs = '',
      i = 0,
      l = buffer.length;
    while (i < l) bs += String.fromCharCode(buffer[i++]);
    return 'data:image/bmp;base64,' + btoa(bs);
  },
};

function content_print() {
  const canvas = document.querySelector('#qr-code canvas');
  const img = document.querySelector('#qr-code img');
  const ctx = canvas.getContext('2d');
  //var img = document.getElementById("scream");
  //canvas.setAttribute('style', 'display: block');
  ctx.drawImage(img, 0, 0);
  const qrbitmap = CanvasToBMP.toDataURL(canvas);
  printCodes(QR_STRING, BAR_STRING, qrbitmap);
}

function init() {
  mrzText.focus();
}

init();
