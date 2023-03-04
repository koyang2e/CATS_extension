
function modifyPrintButtons() {
  const printButtons = document.querySelectorAll('a.btn_print');
  printButtons.forEach(function(printButton) {
    printButton.addEventListener('click', function(event) {
      event.preventDefault();
     // const bookInfo = extractBookInfoFromHref(printButton.href);
      const bookInfo = extractBookInfoFromHref(printButton.getAttribute('href'));
      const printPage = generatePrintPage(bookInfo);
      printContent(printPage);
    });
  });
}

function extractBookInfoFromHref(href) {
  const args = href.substring(href.indexOf('(') + 2, href.lastIndexOf(')') - 1).split('^|');
  // href gives coded URI. URI를 다시 한글로 바꾸기 위한 것
  /*
  const title = decodeURIComponent(args[0]);
  const callnumber = decodeURIComponent(args[1]);
  const bookId = decodeURIComponent(args[2]);
  const authors = decodeURIComponent(args[3]);
  const location = decodeURIComponent(args[4]);
  */
  const title = args[0];
  const callnumber = args[1];
  const bookId = args[2];
  const authors = args[3];
  const location = args[4];
  return { title, callnumber, bookId, authors, location };
}

function generatePrintPage(bookInfo) {
  const { title, callnumber, bookId, authors, location } = bookInfo;
  return `
<html>
  <head>
    <title>[자료위치안내]</title>
    <style>
    * {word-break: keep-all;}
      body {
        font-family: 'Nanum Gothic', sans-serif;
        font-size: 24px;
        line-height: 1.5;
      }
      .section:first-of-type{
      border-top: 2px grey solid;
      }
      .section {
        
        padding-top: 10px;
        padding-bottom: 10px;
        border-bottom: 2px grey solid;
        
      }
      h1 {
        font-size: 36px;
        font-weight: bold;
        
        
      }
      .label {
        font-weight: bold;
        margin-right: 20px;
        width: 15%;
        display: inline-block;
        text-align: justify;
     	  text-align-last: justify;
	      letter-spacing: -0.1em;
        
      }
      .value {
        font-weight: 800;
        display: inline-block;
      }
    </style>
  </head>
  <body>
    <h1>[자료위치안내]</h1>
    <div class="section">
      <span class="label">서 명:</span>
      <span class="value">${title}</span>
    </div>
    <div class="section">
      <span class="label">저 자:</span>
      <span class="value">${authors}</span>
    </div>
    <div class="section">
      <span class="label">청 구 기 호:</span>
      <span class="value">${callnumber}</span>
    </div>
    <div class="section">
      <span class="label">위 치:</span>
      <span class="value">${location}</span>
    </div>
    <div class="section">
      <span class="label">등 록 번 호:</span>
      <span class="value">${bookId}</span>
    </div>
  </body>
</html>
  `;
}


function printContent(content) {
  const printWindow = window.open('', 'PrintWindow', 'width=800,height=600');
  //printWindow.document.write(decodeURIComponent(content));
  printWindow.document.write(content);
  printWindow.print();
 // Clear the print window content on unload
  printWindow.document.close();

  // Close the window after printing
  setTimeout(function() {
    printWindow.close();
  }, 50);
}

modifyPrintButtons();