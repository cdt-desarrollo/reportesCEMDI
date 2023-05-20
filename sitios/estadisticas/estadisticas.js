periods = 40
arrayIED = []
arrayRemittances = []
arrayInflationBC = []
google.charts.load('current', {'packages':['corechart']});

async function getDataIEDIndicator(){
  var config = {
    method: 'get',
    url: 'https://sheet.best/api/sheets/32aacf91-902e-4e88-8d70-e596b2f41ceb/tabs/indicador_IED',
  }
  await axios(config)
  .then((res) => {
    for(let i = res.data.length; i >= res.data.length - periods; i--){
      arrayIED.push(res.data[i])
    }
    arrayIED.shift()
    arrayIED.reverse()
    google.charts.setOnLoadCallback(drawIEDIndicator);
  })
  .catch(async (err) => {
    console.log(err)
  })
}
async function drawIEDIndicator() {
  // Crea un DataTable y agrega los datos
  var data = new google.visualization.DataTable();
  data.addColumn('string', '');
  data.addColumn('number', '');
  for (var i = 0; i < arrayIED.length; i++) {
    data.addRow([arrayIED[i].date, parseFloat(arrayIED[i].bajaCalifornia)]);
  }

  // Configuración del gráfico
  var options = {
    curveType: 'function',
    legend: 'none',
  };

  // Crea un gráfico de líneas y lo dibuja en el elemento con el ID "chart_div"
  var chart = new google.visualization.LineChart(document.getElementById('IEDChart'));
  chart.draw(data, options);
  document.getElementById("buttonIED").style.display = "none"
  document.getElementById("buttonDownloadIEDBC").style.display = "inline-block"
}
async function getDataRemittancesIndicator(){
  var config = {
    method: 'get',
    url: 'https://sheet.best/api/sheets/32aacf91-902e-4e88-8d70-e596b2f41ceb/tabs/indicador_Remesas',
  }
  await axios(config)
  .then((res) => {
    for(let i = res.data.length; i >= res.data.length - periods; i--){
      arrayRemittances.push(res.data[i])
    }
    arrayRemittances.shift()
    arrayRemittances.reverse()
    console.log(arrayRemittances)
    google.charts.setOnLoadCallback(drawRemittancesIndicator);
  })
  .catch(async (err) => {
    console.log(err)
  })
}
async function drawRemittancesIndicator() {
  // Crea un DataTable y agrega los datos
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Fecha');
  data.addColumn('number', 'Indicador');
  for (var i = 0; i < arrayRemittances.length; i++) {
    data.addRow([arrayRemittances[i].date, parseFloat(arrayRemittances[i].bajaCalifornia)]);
    // data.addRow([arrayRemittances[i].date, parseFloat(arrayRemittances[i].ensenada)]);
    // data.addRow([arrayRemittances[i].date, parseFloat(arrayRemittances[i].mexicali)]);
    // data.addRow([arrayRemittances[i].date, parseFloat(arrayRemittances[i].playasDeRosarito)]);
    // data.addRow([arrayRemittances[i].date, parseFloat(arrayRemittances[i].tecate)]);
    // data.addRow([arrayRemittances[i].date, parseFloat(arrayRemittances[i].tijuana)]);
  }

  // Configuración del gráfico
  var options = {
    curveType: 'function',
    legend: 'none',
  };

  // Crea un gráfico de líneas y lo dibuja en el elemento con el ID "chart_div"
  var chart = new google.visualization.LineChart(document.getElementById('remesasChart'));
  chart.draw(data, options);
  document.getElementById("buttonRemesas").style.display = "none"
  document.getElementById("buttonDownloadRemittancesBC").style.display = "inline-block"
}
async function getDataInflationBCIndicator(){
  var config = {
    method: 'get',
    url: 'https://sheet.best/api/sheets/32aacf91-902e-4e88-8d70-e596b2f41ceb/tabs/indicador_inflacionMensualBC',
  }
  await axios(config)
  .then((res) => {
    for(let i = res.data.length; i >= res.data.length - periods; i--){
      arrayInflationBC.push(res.data[i])
    }
    arrayInflationBC.shift()
    arrayInflationBC.reverse()
    console.log(arrayInflationBC)
    google.charts.setOnLoadCallback(drawInflationBCIndicator);
  })
  .catch(async (err) => {
    console.log(err)
  })
}
async function drawInflationBCIndicator() {
  // Crea un DataTable y agrega los datos
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Fecha');
  data.addColumn('number', 'Indicador');
  for (var i = 0; i < arrayInflationBC.length; i++) {
    data.addRow([arrayInflationBC[i].date, parseFloat(arrayInflationBC[i].bajaCalifornia)]);
    // data.addRow([arrayRemittances[i].date, parseFloat(arrayRemittances[i].ensenada)]);
    // data.addRow([arrayRemittances[i].date, parseFloat(arrayRemittances[i].mexicali)]);
    // data.addRow([arrayRemittances[i].date, parseFloat(arrayRemittances[i].playasDeRosarito)]);
    // data.addRow([arrayRemittances[i].date, parseFloat(arrayRemittances[i].tecate)]);
    // data.addRow([arrayRemittances[i].date, parseFloat(arrayRemittances[i].tijuana)]);
  }

  // Configuración del gráfico
  var options = {
    curveType: 'function',
    legend: 'none',
  };

  // Crea un gráfico de líneas y lo dibuja en el elemento con el ID "chart_div"
  var chart = new google.visualization.LineChart(document.getElementById('inflationBCChart'));
  chart.draw(data, options);
  document.getElementById("buttonInflationBC").style.display = "none"
  document.getElementById("buttonDownloadInflationBC").style.display = "inline-block"
}