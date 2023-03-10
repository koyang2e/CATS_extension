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
// 아 근데 a 태그의 href attribute 값을 그냥 들고오면 되는거라 안써도 됨.
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

function library_warn(){
document.querySelectorAll("a.btn_print").forEach(function(element) {
  if (!/^javascript:bookPrint\('(.+?\^\|)+\[금곡\].+?'\);/.test(element.getAttribute("href"))) {
    element.addEventListener("mouseover", function(event) {
      // Create a tooltip element and add the text
      var tooltip = document.createElement("div");
      tooltip.innerText = "Click to print the location";

      // Add a class to the tooltip element
      tooltip.classList.add("tooltip");

      // Set the z-index property of the tooltip element
      tooltip.style.zIndex = 9999;

      // Position the tooltip relative to the mouse cursor
      tooltip.style.position = "absolute";
      tooltip.style.left = event.pageX + "px";
      tooltip.style.top = event.pageY + "px";

      // Append the tooltip to the body
      document.body.appendChild(tooltip);

      // Remove the tooltip when the mouse cursor leaves the element
      element.addEventListener("mouseout", function(event) {
        tooltip.remove();
      });
    });
  }
});
 
}




    

function generatePrintPage(bookInfo) {
  const { title, callnumber, bookId, authors, location } = bookInfo;
  // 도서 정보를 받아서, 해당 정보를 html 파일에 채워서 반환함
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>[자료위치안내]</title>
  <style>
    * {
      word-break:break-all;
    }
    h1{
        font-size: 1.4em;
        margin-left: 10px;
    }
    body {
      font-family: 'Nanum Gothic', sans-serif;
      line-height: 1.5;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      margin-bottom: 10px;
      border-right: none;
      border-left: none;
    }
    th.info_heading {
      border-top: 2px dotted black;
      border-bottom: 2px dotted black;
      padding: 5px;
      width: 23vw;;
      font-weight: 600;
      text-align: justify;
      text-align-last: justify;
      letter-spacing: -0.6em; 
      word-break: keep-all;
      
    }
    .info_heading:after{
        content: ":";
        margin-left: 10px;
    }
    td {
    
      width: auto;

      border-top: 2px dotted black;
      border-bottom: 2px dotted black;
      padding: 10px;
      font-weight: 800;
    }
    #container344{

        font-size:15px;
    }
    @media print {
  @page {
    size: 80mm;
  }
}
  </style>
</head>
<body>
    <div id="container344">
  <h1>[자료위치안내]</h1>
  <table>
    <tr>
      <th class="info_heading">서 명</th>
      <td>${title}</td>
    </tr>
    <tr>
      <th class="info_heading">저 자</th>
      <td>${authors}</td>
    </tr>
    <tr>
      <th class="info_heading">청 구 기 호</th>
      <td>${callnumber}</td>
    </tr>
    <tr>
      <th class="info_heading">위 치</th>
      <td>${location}</td>
    </tr>
    <tr>
      <th class="info_heading">등 록 번 호</th>
      <td>${bookId}</td>
    </tr>
  </table>
</div>
</body>
</html>
  `;
}


function printContent(content) {
  const printWindow = window.open('', 'PrintWindow', 'width=800,height=600');
  printWindow.document.write(content);
  // 새로운 창에 인쇄할 도서 정보를 넣는다
  printWindow.print();
  //인쇄 창 띄움
  printWindow.document.close();
 // Clear the print window content on unload.
 // 출력 클릭할 때마다 도서 정보가 쌓이는 문제가 있었음.

  // Close the window after printing
  setTimeout(function() {
    printWindow.close();
  }, 50);
  // 인쇄가 끝나면 창을 닫는다
}

function modify_lib_selector(){
//window.addEventListener('load', function() {
  let manageCodeSelect = document.getElementById('search_managecode');
  if (manageCodeSelect) {
    // Set the default value to "BN"
    manageCodeSelect.value = "BN";
  }
//});
}


let whereami = document.getElementById("procMode");
if (whereami.value == "search"){
modifyPrintButtons();
library_warn();
//console.log("bbb")
}

else{
  //console.log("aaaa")
  modify_lib_selector();
}


