var width = 800;
var height = 900;
function inicio(){
  console.log("Inicio")
  document.getElementById("content").innerHTML = '';
  document.getElementById("content").innerHTML = `
  <h1 class="text-center">Reportes CEMDI</h1>
  <div class="container" id="toEraseAndAddContentDiv">
      <div class="row row-cols-2">
        <div class="col-md-auto card" style="width: 18rem;">
          <img src="assets/octubre2022.png" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Octubre del 2022</h5>
            <a href="#" class="btn btn-primary" onclick="deleteDiv('Octubre del 2022')">Ver reporte</a>
          </div>
        </div>
        <div class="col-md-auto card" style="width: 18rem;">
          <img src="assets/noviembre2022.png" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Noviembre del 2022</h5>
            <a href="#" class="btn btn-primary" onclick="deleteDiv('Noviembre del 2022')">Ver reporte</a>
          </div>
        </div>
        <div class="col-md-auto card" style="width: 18rem;">
          <img src="assets/noviembre2022.png" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Diciembre del 2022</h5>
            <a href="#" class="btn btn-primary" onclick="deleteDiv('Diciembre del 2022')">Ver reporte</a>
          </div>
        </div>
        <div class="col-md-auto card" style="width: 18rem;">
          <img src="assets/enero2023.png" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Enero del 2023</h5>
            <a href="#" class="btn btn-primary" onclick="deleteDiv('Enero del 2023')">Ver reporte</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

function deleteDiv(month){
  document.getElementById("toEraseAndAddContentDiv").innerHTML = '';
  console.log(month)
  if(month == "Octubre del 2022"){
    document.getElementById("toEraseAndAddContentDiv").innerHTML = `<h1 class="text-center">${month}</h1>
    <div class="d-flex justify-content-center align-self-center">
    <iframe style="border: 1px solid #777;" src="https://indd.adobe.com/embed/167c0345-b2e9-48c8-8eca-5128d05f5f31?startpage=1&allowFullscreen=true" width="${width}" height="${height}" frameborder="0" allowfullscreen="" id="iFrame1"></iframe>
    </div>
    `;
  }
  else if(month == "Noviembre del 2022"){
    document.getElementById("toEraseAndAddContentDiv").innerHTML = `<h1 class="text-center">${month}</h1>
    <div class="d-flex justify-content-center align-self-center">
    <iframe style="border: 1px solid #777;" src="https://indd.adobe.com/embed/9b95b3b2-163b-48b6-beac-0c2d67f0b26e?startpage=1&allowFullscreen=true" width="${width}" height="${height}" frameborder="0" allowfullscreen="" id="iFrame1"></iframe>
    </div>
    `;
  }
  else if(month == "Diciembre del 2022"){
    document.getElementById("toEraseAndAddContentDiv").innerHTML = `<h1 class="text-center">${month}</h1>
    <div class="d-flex justify-content-center align-self-center">
    <iframe style="border: 1px solid #777;" src="https://indd.adobe.com/embed/00c9b805-9751-4876-86b5-beffab24f682?startpage=1&allowFullscreen=true" width="${width}" height="${height}" frameborder="0" allowfullscreen="" id="iFrame1"></iframe>
    </div>
    `;
  }
  else if(month=="Enero del 2023"){
    document.getElementById("toEraseAndAddContentDiv").innerHTML = `<h1 class="text-center">${month}</h1>
    <div class="d-flex justify-content-center align-self-center">
      <iframe style="border: 1px solid #777;" src="https://indd.adobe.com/embed/fac465e0-cafd-4e9d-8f88-0a805e19518c?startpage=1&allowFullscreen=true" width="${width}" height="${height}" frameborder="0" allowfullscreen="" id="iFrame1"></iframe>
    </div>
    `;
  }
}

// function resizeIFrameToFitContent( iFrame ) {

//   iFrame.width  = iFrame.contentWindow.document.body.scrollWidth;
//   iFrame.height = iFrame.contentWindow.document.body.scrollHeight;
// }

// window.addEventListener('DOMContentLoaded', function(e) {

//   var iFrame = document.getElementById( 'iFrame1' );
//   resizeIFrameToFitContent( iFrame );

//   // or, to resize all iframes:
//   var iframes = document.querySelectorAll("iframe");
//   for( var i = 0; i < iframes.length; i++) {
//       resizeIFrameToFitContent( iframes[i] );
//   }
// } );