periods = 15
arrayIED = []
arrayRemittances = []
arrayInflacionIPC = []
arrayInflacionMensual = []
arrayInflacionAnual = []
google.charts.load('current', { 'packages': ['corechart'] });
let counter = 0
async function getDataRemittancesIndicator(cityValue) {
  if(counter == 1){
    drawRemittancesIndicator(cityValue)
  }
  else if(counter == 0){
    document.getElementById("spinnerRemittances").style.display = "inline-block"
    var config = {
      method: 'get',
      url: 'https://sheet.best/api/sheets/25cab98b-daa2-4cd3-9c62-74308a0853ca/tabs/indicador_remesas',
    }
    await axios(config)
      .then((res) => {
        for (let i = res.data.length; i >= res.data.length - periods; i--) {
          arrayRemittances.push(res.data[i])
        }
        arrayRemittances.shift()
        arrayRemittances.reverse()
        google.charts.setOnLoadCallback(drawRemittancesIndicator);
      })
      .catch(async (err) => {
        console.log(err)
      })
  }
}
async function drawRemittancesIndicator(cityValue) {
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
      title: 'Remesas - Baja California',
      hAxis: {title: 'Periodos'},
      vAxis: {title: 'Dolares en Millones'},
      curveType: 'function',
      legend: 'none',
    };
    var chart = new google.visualization.LineChart(document.getElementById('remesasChart'));
    document.getElementById("spinnerRemittances").style.display = "none"
    chart.draw(data, options);
  }
  else if(cityValue == "ensenada"){
    var data = new google.visualization.DataTable();
    data.addColumn('string', '');
    data.addColumn('number', '');
    for (var i = 0; i < arrayRemittances.length; i++) {
      data.addRow([arrayRemittances[i].date, parseFloat(arrayRemittances[i].ensenada)]);
    }
    var options = {
      title: 'Remesas - Ensenada',
      hAxis: {title: 'Periodos'},
      vAxis: {title: 'Dolares en Millones'},
      curveType: 'function',
      legend: 'none',
    };
    var chart = new google.visualization.LineChart(document.getElementById('remesasChart'));
    chart.draw(data, options);
  }
  else if(cityValue == "mexicali"){
    var data = new google.visualization.DataTable();
    data.addColumn('string', '');
    data.addColumn('number', '');
    for (var i = 0; i < arrayRemittances.length; i++) {
      data.addRow([arrayRemittances[i].date, parseFloat(arrayRemittances[i].mexicali)]);
    }
    var options = {
      title: 'Remesas - Mexicali',
      hAxis: {title: 'Periodos'},
      vAxis: {title: 'Dolares en Millones'},
      curveType: 'function',
      legend: 'none',
    };
    var chart = new google.visualization.LineChart(document.getElementById('remesasChart'));
    chart.draw(data, options);
  }
  else if(cityValue == "rosarito"){
    var data = new google.visualization.DataTable();
    data.addColumn('string', '');
    data.addColumn('number', '');
    for (var i = 0; i < arrayRemittances.length; i++) {
      data.addRow([arrayRemittances[i].date, parseFloat(arrayRemittances[i].playasDeRosarito)]);
    }
    var options = {
      title: 'Remesas - Rosarito',
      hAxis: {title: 'Periodos'},
      vAxis: {title: 'Dolares en Millones'},
      curveType: 'function',
      legend: 'none',
    };
    var chart = new google.visualization.LineChart(document.getElementById('remesasChart'));
    chart.draw(data, options);
  }
  else if(cityValue == "tecate"){
    var data = new google.visualization.DataTable();
    data.addColumn('string', '');
    data.addColumn('number', '');
    for (var i = 0; i < arrayRemittances.length; i++) {
      data.addRow([arrayRemittances[i].date, parseFloat(arrayRemittances[i].tecate)]);
    }
    var options = {
      title: 'Remesas - Tecate',
      hAxis: {title: 'Periodos'},
      vAxis: {title: 'Dolares en Millones'},
      curveType: 'function',
      legend: 'none',
    };
    var chart = new google.visualization.LineChart(document.getElementById('remesasChart'));
    chart.draw(data, options);
  }
  else if(cityValue == "tijuana"){
    var data = new google.visualization.DataTable();
    data.addColumn('string', '');
    data.addColumn('number', '');
    for (var i = 0; i < arrayRemittances.length; i++) {
      data.addRow([arrayRemittances[i].date, parseFloat(arrayRemittances[i].tijuana)]);
    }
    var options = {
      title: 'Remesas - Tijuana',
      hAxis: {title: 'Periodos'},
      vAxis: {title: 'Dolares en Millones'},
      curveType: 'function',
      legend: 'none',
    };
    var chart = new google.visualization.LineChart(document.getElementById('remesasChart'));
    chart.draw(data, options);
  }
}
async function getDataIEDIndicator() {
  document.getElementById("buttonIED").style.display = "none"
  document.getElementById("spinnerIED").style.display = "inline-block"
  var config = {
    method: 'get',
    url: 'https://sheet.best/api/sheets/25cab98b-daa2-4cd3-9c62-74308a0853ca/tabs/indicador_IED',
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
  document.getElementById("spinnerIED").style.display = "none"
  chart.draw(data, options);
  document.getElementById("buttonDownloadIED").style.display = "inline-block"
}
function displayTypeOfInflation(type) {
  if(type == "IPC"){
    document.getElementById("indicePreciosConsumidor").style.display = "block"
    document.getElementById("inflacionMensual").style.display = "none"
    document.getElementById("inflacionAnual").style.display = "none"
  }
  else if(type == "inflacionMensual"){
    document.getElementById("indicePreciosConsumidor").style.display = "none"
    document.getElementById("inflacionMensual").style.display = "block"
    document.getElementById("inflacionAnual").style.display = "none"
  }
  else if(type == "inflacionAnual"){
    document.getElementById("indicePreciosConsumidor").style.display = "none"
    document.getElementById("inflacionMensual").style.display = "none"
    document.getElementById("inflacionAnual").style.display = "block"
  }
}
function writeTypeOfInflation(typeInflation) {
  // document.getElementById("spinner").style.display = "block"
  if(typeInflation.includes("IPC")){
    getDataInflationIndicator(typeInflation)
  }
  else if(typeInflation.includes("InflacionMensual")){
    getDataInflationIndicator(typeInflation)
  }
  else if(typeInflation.includes("InflacionAnual")){
    getDataInflationIndicator(typeInflation)
  }
}
async function getDataInflationIndicator(typeInflation) {
  if(typeInflation.includes("IPC")){
    arrayInflacionIPC = []
    var config = {
      method: 'get',
      url: 'https://sheet.best/api/sheets/25cab98b-daa2-4cd3-9c62-74308a0853ca/tabs/indicador_inflacionIndice',
    }
    await axios(config)
    .then((res) => {
      for (let i = res.data.length; i >= res.data.length - periods; i--) {
        arrayInflacionIPC.push(res.data[i])
      }
      arrayInflacionIPC.shift()
      arrayInflacionIPC.reverse()
      google.charts.setOnLoadCallback(drawInflationIndicator(arrayInflacionIPC, typeInflation));
    })
    .catch(async (err) => {
      console.log(err)
    })
  }
  else if(typeInflation.includes("InflacionMensual")){
    arrayInflacionMensual = []
    var config = {
      method: 'get',
      url: 'https://sheet.best/api/sheets/25cab98b-daa2-4cd3-9c62-74308a0853ca/tabs/indicador_inflacionMensual',
    }
    await axios(config)
    .then((res) => {
      for (let i = res.data.length; i >= res.data.length - periods; i--) {
        arrayInflacionMensual.push(res.data[i])
      }
      arrayInflacionMensual.shift()
      arrayInflacionMensual.reverse()
      google.charts.setOnLoadCallback(drawInflationIndicator(arrayInflacionMensual, typeInflation));
    })
    .catch(async (err) => {
      console.log(err)
    })
  }
  else if(typeInflation.includes("InflacionAnual")){
    arrayInflacionAnual = []
    var config = {
      method: 'get',
      url: 'https://sheet.best/api/sheets/25cab98b-daa2-4cd3-9c62-74308a0853ca/tabs/indicador_inflacionAnual',
    }
    await axios(config)
    .then((res) => {
      for (let i = res.data.length; i >= res.data.length - periods; i--) {
        arrayInflacionAnual.push(res.data[i])
      }
      arrayInflacionAnual.shift()
      arrayInflacionAnual.reverse()
      google.charts.setOnLoadCallback(drawInflationIndicator(arrayInflacionAnual, typeInflation));
    })
    .catch(async (err) => {
      console.log(err)
    })
  } 
}
async function drawInflationIndicator(array, value) {
  console.log(value)
  // document.getElementById("spinner").style.display = "none"
  if(value == "bajaCaliforniaIPC"){
    var data = new google.visualization.DataTable();
    data.addColumn('string', '');
    data.addColumn('number', '');
    for (var i = 0; i < array.length; i++) {
      data.addRow([array[i].date, (parseFloat(array[i].bajaCalifornia))]);
    }
    var options = {
      title: 'Indice del Consumidor - Baja California',
      hAxis: {title: 'Periodos'},
      vAxis: {title: 'Porcentaje'},
      curveType: 'function',
      legend: 'none',
    };
    var chart = new google.visualization.LineChart(document.getElementById('inflacionGrafica'));
    chart.draw(data, options);
  }
  else if(value == "tijuanaIPC"){
    var data = new google.visualization.DataTable();
    data.addColumn('string', '');
    data.addColumn('number', '');
    for (var i = 0; i < array.length; i++) {
      data.addRow([array[i].date, (parseFloat(array[i].tijuana))]);
    }
    var options = {
      title: 'Indice del Consumidor - Tijuana',
      hAxis: {title: 'Periodos'},
      vAxis: {title: 'Porcentaje'},
      curveType: 'function',
      legend: 'none',
    };
    var chart = new google.visualization.LineChart(document.getElementById('inflacionGrafica'));
    chart.draw(data, options);
  }
  else if(value == "mexicaliIPC"){
    var data = new google.visualization.DataTable();
    data.addColumn('string', '');
    data.addColumn('number', '');
    for (var i = 0; i < array.length; i++) {
      data.addRow([array[i].date, (parseFloat(array[i].mexicali))]);
    }
    var options = {
      title: 'Indice del Consumidor - Mexicali',
      hAxis: {title: 'Periodos'},
      vAxis: {title: 'Porcentaje'},
      curveType: 'function',
      legend: 'none',
    };
    var chart = new google.visualization.LineChart(document.getElementById('inflacionGrafica'));
    chart.draw(data, options);
  }
  else if(value == "bajaCaliforniaInflacionMensual"){
    var data = new google.visualization.DataTable();
    data.addColumn('string', '');
    data.addColumn('number', '');
    for (var i = 0; i < array.length; i++) {
      data.addRow([array[i].date, (parseFloat(array[i].bajaCalifornia))]);
    }
    var options = {
      title: 'Inflación Mensual - Baja California',
      hAxis: {title: 'Periodos'},
      vAxis: {title: 'Porcentaje'},
      curveType: 'function',
      legend: 'none',
    };
    var chart = new google.visualization.LineChart(document.getElementById('inflacionGrafica'));
    chart.draw(data, options);
  }
  else if(value == "tijuanaInflacionMensual"){
    var data = new google.visualization.DataTable();
    data.addColumn('string', '');
    data.addColumn('number', '');
    for (var i = 0; i < array.length; i++) {
      data.addRow([array[i].date, (parseFloat(array[i].tijuana))]);
    }
    var options = {
      title: 'Inflación Mensual - Tijuana',
      hAxis: {title: 'Periodos'},
      vAxis: {title: 'Porcentaje'},
      curveType: 'function',
      legend: 'none',
    };
    var chart = new google.visualization.LineChart(document.getElementById('inflacionGrafica'));
    chart.draw(data, options);
  }
  else if(value == "mexicaliInflacionMensual"){
    var data = new google.visualization.DataTable();
    data.addColumn('string', '');
    data.addColumn('number', '');
    for (var i = 0; i < array.length; i++) {
      data.addRow([array[i].date, (parseFloat(array[i].mexicali))]);
    }
    var options = {
      title: 'Inflación Mensual - Mexicali',
      hAxis: {title: 'Periodos'},
      vAxis: {title: 'Porcentaje'},
      curveType: 'function',
      legend: 'none',
    };
    var chart = new google.visualization.LineChart(document.getElementById('inflacionGrafica'));
    chart.draw(data, options);
  }
  else if(value == "bajaCaliforniaInflacionAnual"){
    var data = new google.visualization.DataTable();
    data.addColumn('string', '');
    data.addColumn('number', '');
    for (var i = 0; i < array.length; i++) {
      data.addRow([array[i].date, (parseFloat(array[i].bajaCalifornia))]);
    }
    var options = {
      title: 'Inflación Anual - Baja California',
      hAxis: {title: 'Periodos'},
      vAxis: {title: 'Porcentaje'},
      curveType: 'function',
      legend: 'none',
    };
    var chart = new google.visualization.LineChart(document.getElementById('inflacionGrafica'));
    chart.draw(data, options);
  }
  else if(value == "tijuanaInflacionAnual"){
    var data = new google.visualization.DataTable();
    data.addColumn('string', '');
    data.addColumn('number', '');
    for (var i = 0; i < array.length; i++) {
      data.addRow([array[i].date, (parseFloat(array[i].tijuana))]);
    }
    var options = {
      title: 'Inflación Anual - Tijuana',
      hAxis: {title: 'Periodos'},
      vAxis: {title: 'Porcentaje'},
      curveType: 'function',
      legend: 'none',
    };
    var chart = new google.visualization.LineChart(document.getElementById('inflacionGrafica'));
    chart.draw(data, options);
  }
  else if(value == "mexicaliInflacionAnual"){
    var data = new google.visualization.DataTable();
    data.addColumn('string', '');
    data.addColumn('number', '');
    for (var i = 0; i < array.length; i++) {
      data.addRow([array[i].date, (parseFloat(array[i].mexicali))]);
    }
    var options = {
      title: 'Inflación Anual - Mexicali',
      hAxis: {title: 'Periodos'},
      vAxis: {title: 'Porcentaje'},
      curveType: 'function',
      legend: 'none',
    };
    var chart = new google.visualization.LineChart(document.getElementById('inflacionGrafica'));
    chart.draw(data, options);
  }
  
}