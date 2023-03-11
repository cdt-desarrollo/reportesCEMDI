var width = 450;
var height = 760;

function showReport(month){
  console.log(month)
  if(month == "enero2023"){
    Swal.fire({
      html: '<iframe style="border: 1px solid #777;" src="https://indd.adobe.com/embed/fac465e0-cafd-4e9d-8f88-0a805e19518c?startpage=1&allowFullscreen=true" width="450px" height="760px" frameborder="0" allowfullscreen=""></iframe>',
      imageWidth: width,
      imageHeight: height,
      imageAlt: 'A tall image'
    })
  }
  else if(month == "febrero2023"){
    Swal.fire({
      html: '<iframe style="border: 1px solid #777;" src="https://indd.adobe.com/embed/e6dbff7a-736c-4364-bf26-54e652d75d72?startpage=1&allowFullscreen=true" width="450px" height="760px" frameborder="0" allowfullscreen=""></iframe>',
      imageWidth: width,
      imageHeight: height,
      imageAlt: 'A tall image'
    })
  }
}