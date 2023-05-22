periods = 4
arrayIED = []
arrayRemittances = []
arrayInflationBC = []
google.charts.load('current', { 'packages': ['corechart'] });
let counter = 0
async function getDataIEDIndicator() {
  var config = {
    method: 'get',
    url: 'https://sheet.best/api/sheets/25cab98b-daa2-4cd3-9c62-74308a0853ca/tabs/ied',
  }
  await axios(config)
    .then((res) => {
      for (let i = res.data.length; i >= res.data.length - periods; i--) {
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
  document.getElementById("buttonDownloadIED").style.display = "inline-block"
}
async function getDataRemittancesIndicator(cityValue) {
  if(counter == 1){
    drawRemittancesIndicator(cityValue)
  }
  else if(counter == 0){
    var config = {
      method: 'get',
      url: 'https://sheet.best/api/sheets/25cab98b-daa2-4cd3-9c62-74308a0853ca/tabs/remesas',
    }
    await axios(config)
      .then((res) => {
        for (let i = res.data.length; i >= res.data.length - periods; i--) {
          arrayRemittances.push(res.data[i])
        }
        arrayRemittances.shift()
        arrayRemittances.reverse()
        google.charts.setOnLoadCallback(drawRemittancesIndicator);
        document.getElementById("remesasBajaCaliforniaTitulo").style.display = "block";
        document.getElementById("remesasBajaCaliforniaBoton").style.display = "block"
        document.getElementById("renesasEnsenadaBoton").style.display = "block"
        document.getElementById("remesasMexicaliBoton").style.display = "block"
        document.getElementById("remesasPlayasDeRosaritoBoton").style.display = "block"
        document.getElementById("remesasTecateBoton").style.display = "block"
        document.getElementById("remesasTijuanaBoton").style.display = "block"
      })
      .catch(async (err) => {
        console.log(err)
      })
  }
}
async function drawRemittancesIndicator(cityValue) {
  document.getElementById("buttonRemesas").style.display = "none"
  document.getElementById("buttonDownloadRemittances").style.display = "inline-block"
  if(cityValue == "bajaCalifornia" || counter == 0){
    counter = 1;
    var data = new google.visualization.DataTable();
    data.addColumn('string', '');
    data.addColumn('number', '');
    for (var i = 0; i < arrayRemittances.length; i++) {
      data.addRow([arrayRemittances[i].date, parseFloat(arrayRemittances[i].bajaCalifornia)]);
    }
    var options = {
      curveType: 'function',
      legend: 'none',
    };
    var chart = new google.visualization.LineChart(document.getElementById('remesasChart'));
    chart.draw(data, options);
    document.getElementById("remesasBajaCaliforniaTitulo").style.display = "block";
    document.getElementById("remesasEnsenadaTitulo").style.display = "none";
    document.getElementById("remesasMexicaliTitulo").style.display = "none";
    document.getElementById("remesasPlayasDeRosaritoTitulo").style.display = "none";
    document.getElementById("remesasTecateTitulo").style.display = "none"
    document.getElementById("remesasTijuanaTitulo").style.display = "none"
  }
  else if(cityValue == "ensenada"){
    var data = new google.visualization.DataTable();
    data.addColumn('string', '');
    data.addColumn('number', '');
    for (var i = 0; i < arrayRemittances.length; i++) {
      data.addRow([arrayRemittances[i].date, parseFloat(arrayRemittances[i].ensenada)]);
    }
    var options = {
      curveType: 'function',
      legend: 'none',
    };
    var chart = new google.visualization.LineChart(document.getElementById('remesasChart'));
    chart.draw(data, options);
    document.getElementById("remesasBajaCaliforniaTitulo").style.display = "none";
    document.getElementById("remesasEnsenadaTitulo").style.display = "block";
    document.getElementById("remesasMexicaliTitulo").style.display = "none";
    document.getElementById("remesasPlayasDeRosaritoTitulo").style.display = "none";
    document.getElementById("remesasTecateTitulo").style.display = "none"
    document.getElementById("remesasTijuanaTitulo").style.display = "none"
  }
  else if(cityValue == "mexicali"){
    var data = new google.visualization.DataTable();
    data.addColumn('string', '');
    data.addColumn('number', '');
    for (var i = 0; i < arrayRemittances.length; i++) {
      data.addRow([arrayRemittances[i].date, parseFloat(arrayRemittances[i].mexicali)]);
    }
    var options = {
      curveType: 'function',
      legend: 'none',
    };
    var chart = new google.visualization.LineChart(document.getElementById('remesasChart'));
    chart.draw(data, options);
    document.getElementById("remesasBajaCaliforniaTitulo").style.display = "none";
    document.getElementById("remesasEnsenadaTitulo").style.display = "none";
    document.getElementById("remesasMexicaliTitulo").style.display = "block";
    document.getElementById("remesasPlayasDeRosaritoTitulo").style.display = "none";
    document.getElementById("remesasTecateTitulo").style.display = "none"
    document.getElementById("remesasTijuanaTitulo").style.display = "none"
  }
  else if(cityValue == "rosarito"){
    var data = new google.visualization.DataTable();
    data.addColumn('string', '');
    data.addColumn('number', '');
    for (var i = 0; i < arrayRemittances.length; i++) {
      data.addRow([arrayRemittances[i].date, parseFloat(arrayRemittances[i].playasDeRosarito)]);
    }
    var options = {
      curveType: 'function',
      legend: 'none',
    };
    var chart = new google.visualization.LineChart(document.getElementById('remesasChart'));
    chart.draw(data, options);
    document.getElementById("remesasBajaCaliforniaTitulo").style.display = "none";
    document.getElementById("remesasEnsenadaTitulo").style.display = "none";
    document.getElementById("remesasMexicaliTitulo").style.display = "none";
    document.getElementById("remesasPlayasDeRosaritoTitulo").style.display = "block";
    document.getElementById("remesasTecateTitulo").style.display = "none"
    document.getElementById("remesasTijuanaTitulo").style.display = "none"
  }
  else if(cityValue == "tecate"){
    var data = new google.visualization.DataTable();
    data.addColumn('string', '');
    data.addColumn('number', '');
    for (var i = 0; i < arrayRemittances.length; i++) {
      data.addRow([arrayRemittances[i].date, parseFloat(arrayRemittances[i].tecate)]);
    }
    var options = {
      curveType: 'function',
      legend: 'none',
    };
    var chart = new google.visualization.LineChart(document.getElementById('remesasChart'));
    chart.draw(data, options);
    document.getElementById("remesasBajaCaliforniaTitulo").style.display = "none";
    document.getElementById("remesasEnsenadaTitulo").style.display = "none";
    document.getElementById("remesasMexicaliTitulo").style.display = "none";
    document.getElementById("remesasPlayasDeRosaritoTitulo").style.display = "none";
    document.getElementById("remesasTecateTitulo").style.display = "block"
    document.getElementById("remesasTijuanaTitulo").style.display = "none"
  }
  else if(cityValue == "tijuana"){
    var data = new google.visualization.DataTable();
    data.addColumn('string', '');
    data.addColumn('number', '');
    for (var i = 0; i < arrayRemittances.length; i++) {
      data.addRow([arrayRemittances[i].date, parseFloat(arrayRemittances[i].tijuana)]);
    }
    var options = {
      curveType: 'function',
      legend: 'none',
    };
    var chart = new google.visualization.LineChart(document.getElementById('remesasChart'));
    chart.draw(data, options);
    document.getElementById("remesasBajaCaliforniaTitulo").style.display = "none";
    document.getElementById("remesasEnsenadaTitulo").style.display = "none";
    document.getElementById("remesasMexicaliTitulo").style.display = "none";
    document.getElementById("remesasPlayasDeRosaritoTitulo").style.display = "none";
    document.getElementById("remesasTecateTitulo").style.display = "none"
    document.getElementById("remesasTijuanaTitulo").style.display = "block"
  }
  
}
async function getDataInflationBCIndicator() {
  google.charts.setOnLoadCallback(drawInflationBCIndicator)
  var config = {
    method: 'get',
    url: 'https://sheet.best/api/sheets/25cab98b-daa2-4cd3-9c62-74308a0853ca/tabs/inflacionMensualBC',
  }
  await axios(config)
    .then((res) => {
      for (let i = res.data.length; i >= res.data.length - periods; i--) {
        arrayInflationBC.push(res.data[i])
      }
      arrayInflationBC.shift()
      arrayInflationBC.reverse()
      google.charts.setOnLoadCallback(drawInflationBCIndicator);
    })
    .catch(async (err) => {
      console.log(err)
    })
}
async function drawInflationBCIndicator() {
  var data = new google.visualization.DataTable();
  data.addColumn('string', '');
  data.addColumn('number', '');
  for (var i = 0; i < arrayInflationBC.length; i++) {
    data.addRow([arrayInflationBC[i].date, (parseFloat(arrayInflationBC[i].bajaCalifornia))]);
  }
  var options = {
    curveType: 'function',
    legend: 'none',
  };
  var chart = new google.visualization.LineChart(document.getElementById('inflationBCChart'));
  chart.draw(data, options);
  document.getElementById("buttonInflationBC").style.display = "none"
  document.getElementById("buttonDownloadInflation").style.display = "inline-block"
}