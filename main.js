var width = 1700;
var height = 800;
function inicio(){
  document.getElementById("content").innerHTML = '';
  document.getElementById("content").innerHTML = `
  
  `;
}

function deleteDiv(month){
  document.getElementById("content").innerHTML = '';
  console.log(month)
  if(month == "Octubre del 2022"){
    document.getElementById("content").innerHTML = `<h1 class="text-center">${month}</h1>
    <div class="d-flex justify-content-center align-self-center">
    <iframe style="border: 1px solid #777;" src="https://indd.adobe.com/embed/167c0345-b2e9-48c8-8eca-5128d05f5f31?startpage=1&allowFullscreen=true" width="${width}" height="${height}" frameborder="0" allowfullscreen="" id="iFrame1"></iframe>
    </div>
    `;
  }
  else if(month == "Noviembre del 2022"){
    document.getElementById("content").innerHTML = `<h1 class="text-center">${month}</h1>
    <div class="d-flex justify-content-center align-self-center">
    <iframe style="border: 1px solid #777;" src="https://indd.adobe.com/embed/9b95b3b2-163b-48b6-beac-0c2d67f0b26e?startpage=1&allowFullscreen=true" width="${width}" height="${height}" frameborder="0" allowfullscreen="" id="iFrame1"></iframe>
    </div>
    `;
  }
  else if(month == "Diciembre del 2022"){
    document.getElementById("content").innerHTML = `<h1 class="text-center">${month}</h1>
    <div class="d-flex justify-content-center align-self-center">
    <iframe style="border: 1px solid #777;" src="https://indd.adobe.com/embed/00c9b805-9751-4876-86b5-beffab24f682?startpage=1&allowFullscreen=true" width="${width}" height="${height}" frameborder="0" allowfullscreen="" id="iFrame1"></iframe>
    </div>
    `;
  }
  else if(month=="Enero del 2023"){
    document.getElementById("content").innerHTML = `<h1 class="text-center">${month}</h1>
    <div class="d-flex justify-content-center align-self-center">
      <iframe style="border: 1px solid #777;" src="https://indd.adobe.com/embed/fac465e0-cafd-4e9d-8f88-0a805e19518c?startpage=1&allowFullscreen=true" width="${width}" height="${height}" frameborder="0" allowfullscreen="" id="iFrame1"></iframe>
    </div>
    `;
  }
}

function showPosts(){
  window.location.assign("sitios/publicaciones/publicaciones.html")
}

function loginOrSignup(){
  window.location.assign("sitios/miembros/miembros.html")
}