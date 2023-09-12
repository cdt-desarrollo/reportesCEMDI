periods = 10
arrayIED = []
arrayRemittances = []
arrayInflacionIPC = []
arrayInflacionMensual = []
arrayInflacionAnual = []
arrayPeatones = []
arrayVehiculos = []
arrayCamiones = []
arrayTrenes = []
arrayAutobuses = []
arrayITAETrimestral = []
arrayITAEAnual = []
google.charts.load('current', { 'packages': ['corechart'] });
let counterRemittances = 0
let counterIED = 0
let counterInflation = 0
let counterCruces = 0
let counterITAE = 0

async function getDataRemittancesIndicator(cityValue) {
  if(counterRemittances == 1){
    drawRemittancesIndicator(cityValue)
  }
  else if(counterRemittances == 0){
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
  if(cityValue == "bajaCalifornia" || counterRemittances == 0){
    counterRemittances = 1;
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
async function getDataInflationIndicator(typeInflation) {
  document.getElementById("inflacionGrafica").style.display = "none"
  document.getElementById("spinnerInflation").style.display = "block"
  if(typeInflation.includes("IPC") && arrayInflacionIPC.length == 0){
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
  else if(typeInflation.includes("IPC") && arrayInflacionIPC.length > 0){
    drawInflationIndicator(arrayInflacionIPC, typeInflation)
  }
  else if(typeInflation.includes("InflacionMensual") && arrayInflacionMensual.length == 0){
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
  else if(typeInflation.includes("InflacionMensual") && arrayInflacionMensual.length > 0){
    drawInflationIndicator(arrayInflacionMensual, typeInflation)
  }
  else if(typeInflation.includes("InflacionAnual") && arrayInflacionAnual.length == 0){
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
  else if(typeInflation.includes("InflacionAnual") && arrayInflacionAnual.length > 0){
    drawInflationIndicator(arrayInflacionAnual, typeInflation)
  }
}
async function drawInflationIndicator(array, value) {
  document.getElementById("spinnerInflation").style.display = "inline-block"
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
    document.getElementById("spinnerInflation").style.display = "none"
    document.getElementById("inflacionGrafica").style.display = "block"
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
    document.getElementById("spinnerInflation").style.display = "none"
    document.getElementById("inflacionGrafica").style.display = "block"
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
    document.getElementById("spinnerInflation").style.display = "none"
    document.getElementById("inflacionGrafica").style.display = "block"
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
    document.getElementById("spinnerInflation").style.display = "none"
    document.getElementById("inflacionGrafica").style.display = "block"
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
    document.getElementById("spinnerInflation").style.display = "none"
    document.getElementById("inflacionGrafica").style.display = "block"
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
    document.getElementById("spinnerInflation").style.display = "none"
    document.getElementById("inflacionGrafica").style.display = "block"
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
    document.getElementById("spinnerInflation").style.display = "none"
    document.getElementById("inflacionGrafica").style.display = "block"
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
    document.getElementById("spinnerInflation").style.display = "none"
    document.getElementById("inflacionGrafica").style.display = "block"
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
    document.getElementById("spinnerInflation").style.display = "none"
    document.getElementById("inflacionGrafica").style.display = "block"
    chart.draw(data, options);
  } 
}

async function getDataIEDIndicator() {
  if(counterRemittances == 1){
    drawIEDIndicator()
  }
  else if(counterRemittances == 0){
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
}
async function drawIEDIndicator() {
  var data = new google.visualization.DataTable();
  data.addColumn('string', '');
  data.addColumn('number', '');
  for (var i = 0; i < arrayIED.length; i++) {
    data.addRow([arrayIED[i].date, parseFloat(arrayIED[i].bajaCalifornia)]);
  }
  var options = {
    hAxis: {title: 'Periodos'},
    vAxis: {title: 'Dolares en Millones'},
    curveType: 'function',
    legend: 'none',
  };
  var chart = new google.visualization.LineChart(document.getElementById('IEDChart'));
  document.getElementById("spinnerIED").style.display = "none"
  chart.draw(data, options);
}

function displayTypeOfCruce(type){
  if(type === "peatones"){
    document.getElementById("peatonesZonas").style.display = "block"
    document.getElementById("vehiculosZonas").style.display = "none"
    document.getElementById("camionesZonas").style.display = "none"
    document.getElementById("trenesZonas").style.display = "none"
    document.getElementById("autobusesZonas").style.display = "none"
  }
  else if(type === "vehiculos"){
    document.getElementById("peatonesZonas").style.display = "none"
    document.getElementById("vehiculosZonas").style.display = "block"
    document.getElementById("camionesZonas").style.display = "none"
    document.getElementById("trenesZonas").style.display = "none"
    document.getElementById("autobusesZonas").style.display = "none"
  }
  else if(type === "camiones"){
    document.getElementById("peatonesZonas").style.display = "none"
    document.getElementById("vehiculosZonas").style.display = "none"
    document.getElementById("camionesZonas").style.display = "block"
    document.getElementById("trenesZonas").style.display = "none"
    document.getElementById("autobusesZonas").style.display = "none"
  }
  else if(type === "trenes"){
    document.getElementById("peatonesZonas").style.display = "none"
    document.getElementById("vehiculosZonas").style.display = "none"
    document.getElementById("camionesZonas").style.display = "none"
    document.getElementById("trenesZonas").style.display = "block"
    document.getElementById("autobusesZonas").style.display = "none"
  }
  else if(type === "autobuses"){
    document.getElementById("peatonesZonas").style.display = "none"
    document.getElementById("vehiculosZonas").style.display = "none"
    document.getElementById("camionesZonas").style.display = "none"
    document.getElementById("trenesZonas").style.display = "none"
    document.getElementById("autobusesZonas").style.display = "block"
  }
}
async function getDataCrucesIndicator(type){
  document.getElementById("crucesChart").style.display = "none"
  document.getElementById("spinnerCruces").style.display = "inline-block"
  if(type.includes("peatones") && arrayPeatones.length == 0){
    var config = {
      method: 'get',
      url: 'https://sheet.best/api/sheets/25cab98b-daa2-4cd3-9c62-74308a0853ca/tabs/indicador_crucesFronterizosPeatones'
    }
    await axios(config)
    .then((res) => {
      for (let i = res.data.length; i >= res.data.length - periods; i--) {
        arrayPeatones.push(res.data[i])
      }
      arrayPeatones.shift()
      arrayPeatones.reverse()
      google.charts.setOnLoadCallback(drawCrucesIndicator(type));
    })
    .catch(async (err) => {
      console.log(err)
    })
  }
  else if(type.includes("peatones") && arrayPeatones.length > 0){
    drawCrucesIndicator(type)
  }
  else if(type.includes("vehiculos") && arrayVehiculos.length == 0){
    var config = {
      method: 'get',
      url: 'https://sheet.best/api/sheets/25cab98b-daa2-4cd3-9c62-74308a0853ca/tabs/indicador_crucesFronterizosVehiculos'
    }
    await axios(config)
    .then((res) => {
      for (let i = res.data.length; i >= res.data.length - periods; i--) {
        arrayVehiculos.push(res.data[i])
      }
      arrayVehiculos.shift()
      arrayVehiculos.reverse()
      google.charts.setOnLoadCallback(drawCrucesIndicator(type));
    })
    .catch(async (err) => {
      console.log(err)
    })
  }
  else if(type.includes("vehiculo") && arrayVehiculos.length > 0){
    drawCrucesIndicator(type)
  }
  else if(type.includes("camiones") && arrayCamiones.length == 0){
    var config = {
      method: 'get',
      url: 'https://sheet.best/api/sheets/25cab98b-daa2-4cd3-9c62-74308a0853ca/tabs/indicador_crucesFronterizosCamiones'
    }
    await axios(config)
    .then((res) => {
      for (let i = res.data.length; i >= res.data.length - periods; i--) {
        arrayCamiones.push(res.data[i])
      }
      arrayCamiones.shift()
      arrayCamiones.reverse()
      google.charts.setOnLoadCallback(drawCrucesIndicator(type));
    })
    .catch(async (err) => {
      console.log(err)
    })
  }
  else if(type.includes("camiones") && arrayCamiones.length > 0){
    drawCrucesIndicator(type)
  }
  else if(type.includes("trenes") && arrayTrenes.length == 0){
    var config = {
      method: 'get',
      url: 'https://sheet.best/api/sheets/25cab98b-daa2-4cd3-9c62-74308a0853ca/tabs/indicador_crucesFronterizosTrenes'
    }
    await axios(config)
    .then((res) => {
      for (let i = res.data.length; i >= res.data.length - periods; i--) {
        arrayTrenes.push(res.data[i])
      }
      arrayTrenes.shift()
      arrayTrenes.reverse()
      google.charts.setOnLoadCallback(drawCrucesIndicator(type));
    })
    .catch(async (err) => {
      console.log(err)
    })
  }
  else if(type.includes("trenes") && arrayTrenes.length > 0){
    drawCrucesIndicator(type)
  }
  else if(type.includes("autobuses") && arrayAutobuses.length == 0){
    var config = {
      method: 'get',
      url: 'https://sheet.best/api/sheets/25cab98b-daa2-4cd3-9c62-74308a0853ca/tabs/indicador_crucesFronterizosAutobuses'
    }
    await axios(config)
    .then((res) => {
      for (let i = res.data.length; i >= res.data.length - periods; i--) {
        arrayAutobuses.push(res.data[i])
      }
      arrayAutobuses.shift()
      arrayAutobuses.reverse()
      google.charts.setOnLoadCallback(drawCrucesIndicator(type));
    })
    .catch(async (err) => {
      console.log(err)
    })
  }
  else if(type.includes("autobuses") && arrayAutobuses.length > 0){
    drawCrucesIndicator(type)
  }
}
async function drawCrucesIndicator(type){
  if(type.includes("peatones")){
    if(type.includes("BajaCalifornia")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayPeatones.length; i++) {
        data.addRow([arrayPeatones[i].date, (parseFloat(arrayPeatones[i].bajaCalifornia))]);
      }
      var options = {
        title: 'Cruce - Peatones Baja California',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Cantidad en miles'},
        curveType: 'function',
        legend: 'none',
      };
      document.getElementById("spinnerCruces").style.display = "none"
      var chart = new google.visualization.LineChart(document.getElementById('crucesChart'));
      document.getElementById("crucesChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("Tijuana")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayPeatones.length; i++) {
        data.addRow([arrayPeatones[i].date, (parseFloat(arrayPeatones[i].tijuana))]);
      }
      var options = {
        title: 'Cruce - Peatones Tijuana',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Cantidad en miles'},
        curveType: 'function',
        legend: 'none',
      };
      document.getElementById("spinnerCruces").style.display = "none"
      var chart = new google.visualization.LineChart(document.getElementById('crucesChart'));
      document.getElementById("crucesChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("Mexicali")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayPeatones.length; i++) {
        data.addRow([arrayPeatones[i].date, (parseFloat(arrayPeatones[i].mexicali))]);
      }
      var options = {
        title: 'Cruce - Peatones Mexicali',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Cantidad en miles'},
        curveType: 'function',
        legend: 'none',
      };
      document.getElementById("spinnerCruces").style.display = "none"
      var chart = new google.visualization.LineChart(document.getElementById('crucesChart'));
      document.getElementById("crucesChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("Tecate")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayPeatones.length; i++) {
        data.addRow([arrayPeatones[i].date, (parseFloat(arrayPeatones[i].tecate))]);
      }
      var options = {
        title: 'Cruce - Peatones Tecate',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Cantidad en miles'},
        curveType: 'function',
        legend: 'none',
      };
      document.getElementById("spinnerCruces").style.display = "none"
      var chart = new google.visualization.LineChart(document.getElementById('crucesChart'));
      document.getElementById("crucesChart").style.display = "block"
      chart.draw(data, options);
    }
  }
  else if(type.includes("vehiculos")){
    if(type.includes("BajaCalifornia")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayVehiculos.length; i++) {
        data.addRow([arrayVehiculos[i].date, (parseFloat(arrayVehiculos[i].bajaCalifornia))]);
      }
      var options = {
        title: 'Cruce - Vehículos Baja California',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Cantidad en miles'},
        curveType: 'function',
        legend: 'none',
      };
      document.getElementById("spinnerCruces").style.display = "none"
      var chart = new google.visualization.LineChart(document.getElementById('crucesChart'));
      document.getElementById("crucesChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("Tijuana")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayVehiculos.length; i++) {
        data.addRow([arrayVehiculos[i].date, (parseFloat(arrayVehiculos[i].tijuana))]);
      }
      var options = {
        title: 'Cruce - Vehículos Tijuana',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Cantidad en miles'},
        curveType: 'function',
        legend: 'none',
      };
      document.getElementById("spinnerCruces").style.display = "none"
      var chart = new google.visualization.LineChart(document.getElementById('crucesChart'));
      document.getElementById("crucesChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("Mexicali")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayVehiculos.length; i++) {
        data.addRow([arrayVehiculos[i].date, (parseFloat(arrayVehiculos[i].mexicali))]);
      }
      var options = {
        title: 'Cruce - Vehículos Mexicali',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Cantidad en miles'},
        curveType: 'function',
        legend: 'none',
      };
      document.getElementById("spinnerCruces").style.display = "none"
      var chart = new google.visualization.LineChart(document.getElementById('crucesChart'));
      document.getElementById("crucesChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("Tecate")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayVehiculos.length; i++) {
        data.addRow([arrayVehiculos[i].date, (parseFloat(arrayVehiculos[i].tecate))]);
      }
      var options = {
        title: 'Cruce - Vehículos Tecate',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Cantidad en miles'},
        curveType: 'function',
        legend: 'none',
      };
      document.getElementById("spinnerCruces").style.display = "none"
      var chart = new google.visualization.LineChart(document.getElementById('crucesChart'));
      document.getElementById("crucesChart").style.display = "block"
      chart.draw(data, options);
    }
  }
  else if(type.includes("camiones")){
    if(type.includes("BajaCalifornia")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayCamiones.length; i++) {
        data.addRow([arrayCamiones[i].date, (parseFloat(arrayCamiones[i].bajaCalifornia))]);
      }
      var options = {
        title: 'Cruce - Camiones Baja California',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Cantidad en miles'},
        curveType: 'function',
        legend: 'none',
      };
      document.getElementById("spinnerCruces").style.display = "none"
      var chart = new google.visualization.LineChart(document.getElementById('crucesChart'));
      document.getElementById("crucesChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("Tijuana")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayCamiones.length; i++) {
        data.addRow([arrayCamiones[i].date, (parseFloat(arrayCamiones[i].tijuana))]);
      }
      var options = {
        title: 'Cruce - Camiones Tijuana',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Cantidad en miles'},
        curveType: 'function',
        legend: 'none',
      };
      document.getElementById("spinnerCruces").style.display = "none"
      var chart = new google.visualization.LineChart(document.getElementById('crucesChart'));
      document.getElementById("crucesChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("Mexicali")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayCamiones.length; i++) {
        data.addRow([arrayCamiones[i].date, (parseFloat(arrayCamiones[i].mexicali))]);
      }
      var options = {
        title: 'Cruce - Camiones Mexicali',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Cantidad en miles'},
        curveType: 'function',
        legend: 'none',
      };
      document.getElementById("spinnerCruces").style.display = "none"
      var chart = new google.visualization.LineChart(document.getElementById('crucesChart'));
      document.getElementById("crucesChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("Tecate")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayCamiones.length; i++) {
        data.addRow([arrayCamiones[i].date, (parseFloat(arrayCamiones[i].tecate))]);
      }
      var options = {
        title: 'Cruce - Camiones Tecate',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Cantidad en miles'},
        curveType: 'function',
        legend: 'none',
      };
      document.getElementById("spinnerCruces").style.display = "none"
      var chart = new google.visualization.LineChart(document.getElementById('crucesChart'));
      document.getElementById("crucesChart").style.display = "block"
      chart.draw(data, options);
    }
  }
  else if(type.includes("trenes")){
    if(type.includes("BajaCalifornia")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayTrenes.length; i++) {
        data.addRow([arrayTrenes[i].date, (parseFloat(arrayTrenes[i].bajaCalifornia))]);
      }
      var options = {
        title: 'Cruce - Trenes Baja California',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Cantidad en miles'},
        curveType: 'function',
        legend: 'none',
      };
      document.getElementById("spinnerCruces").style.display = "none"
      var chart = new google.visualization.LineChart(document.getElementById('crucesChart'));
      document.getElementById("crucesChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("Tijuana")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayTrenes.length; i++) {
        data.addRow([arrayTrenes[i].date, (parseFloat(arrayTrenes[i].tijuana))]);
      }
      var options = {
        title: 'Cruce - Trenes Tijuana',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Cantidad en miles'},
        curveType: 'function',
        legend: 'none',
      };
      document.getElementById("spinnerCruces").style.display = "none"
      var chart = new google.visualization.LineChart(document.getElementById('crucesChart'));
      document.getElementById("crucesChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("Mexicali")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayTrenes.length; i++) {
        data.addRow([arrayTrenes[i].date, (parseFloat(arrayTrenes[i].mexicali))]);
      }
      var options = {
        title: 'Cruce - Trenes Mexicali',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Cantidad en miles'},
        curveType: 'function',
        legend: 'none',
      };
      document.getElementById("spinnerCruces").style.display = "none"
      var chart = new google.visualization.LineChart(document.getElementById('crucesChart'));
      document.getElementById("crucesChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("Tecate")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayTrenes.length; i++) {
        data.addRow([arrayTrenes[i].date, (parseFloat(arrayTrenes[i].tecate))]);
      }
      var options = {
        title: 'Cruce - Trenes Tecate',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Cantidad en miles'},
        curveType: 'function',
        legend: 'none',
      };
      document.getElementById("spinnerCruces").style.display = "none"
      var chart = new google.visualization.LineChart(document.getElementById('crucesChart'));
      document.getElementById("crucesChart").style.display = "block"
      chart.draw(data, options);
    }
  }
  else if(type.includes("autobuses")){
    if(type.includes("BajaCalifornia")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayAutobuses.length; i++) {
        data.addRow([arrayAutobuses[i].date, (parseFloat(arrayAutobuses[i].bajaCalifornia))]);
      }
      var options = {
        title: 'Cruce - Autobuses Baja California',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Cantidad en miles'},
        curveType: 'function',
        legend: 'none',
      };
      document.getElementById("spinnerCruces").style.display = "none"
      var chart = new google.visualization.LineChart(document.getElementById('crucesChart'));
      document.getElementById("crucesChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("Tijuana")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayAutobuses.length; i++) {
        data.addRow([arrayAutobuses[i].date, (parseFloat(arrayAutobuses[i].tijuana))]);
      }
      var options = {
        title: 'Cruce - Autobuses Tijuana',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Cantidad en miles'},
        curveType: 'function',
        legend: 'none',
      };
      document.getElementById("spinnerCruces").style.display = "none"
      var chart = new google.visualization.LineChart(document.getElementById('crucesChart'));
      document.getElementById("crucesChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("Mexicali")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayAutobuses.length; i++) {
        data.addRow([arrayAutobuses[i].date, (parseFloat(arrayAutobuses[i].mexicali))]);
      }
      var options = {
        title: 'Cruce - Autobuses Mexicali',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Cantidad en miles'},
        curveType: 'function',
        legend: 'none',
      };
      document.getElementById("spinnerCruces").style.display = "none"
      var chart = new google.visualization.LineChart(document.getElementById('crucesChart'));
      document.getElementById("crucesChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("Tecate")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayAutobuses.length; i++) {
        data.addRow([arrayAutobuses[i].date, (parseFloat(arrayAutobuses[i].tecate))]);
      }
      var options = {
        title: 'Cruce - Autobuses Tecate',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Cantidad en miles'},
        curveType: 'function',
        legend: 'none',
      };
      document.getElementById("spinnerCruces").style.display = "none"
      var chart = new google.visualization.LineChart(document.getElementById('crucesChart'));
      document.getElementById("crucesChart").style.display = "block"
      chart.draw(data, options);
    }
  }
}

async function getDataITAEIndicator(type){
  document.getElementById("itaeChart").style.display = "none"
  document.getElementById("spinnerITAE").style.display = "block"
  if(type.includes("trimestral") && arrayITAETrimestral.length == 0){
    var config = {
      method: 'get',
      url: 'https://sheet.best/api/sheets/25cab98b-daa2-4cd3-9c62-74308a0853ca/tabs/indicador_itaeTrimestral',
    }
    await axios(config)
    .then((res) => {
      for (let i = res.data.length; i >= res.data.length - periods; i--) {
        arrayITAETrimestral.push(res.data[i])
      }
      arrayITAETrimestral.shift()
      arrayITAETrimestral.reverse()
      google.charts.setOnLoadCallback(drawITAEIndicator(arrayITAETrimestral, type));
    })
    .catch(async (err) => {
      console.log(err)
    })
  }
  else if(type.includes("trimestral") && arrayITAETrimestral.length != 0){
    google.charts.setOnLoadCallback(drawITAEIndicator(arrayITAETrimestral, type));
  }
  else if(type.includes("anual") && arrayITAEAnual.length == 0){
    var config = {
      method: 'get',
      url: 'https://sheet.best/api/sheets/25cab98b-daa2-4cd3-9c62-74308a0853ca/tabs/indicador_itaeAnual',
    }
    await axios(config)
    .then((res) => {
      for (let i = res.data.length; i >= res.data.length - periods; i--) {
        arrayITAEAnual.push(res.data[i])
      }
      arrayITAEAnual.shift()
      arrayITAEAnual.reverse()
      google.charts.setOnLoadCallback(drawITAEIndicator(arrayITAEAnual, type));
    })
    .catch(async (err) => {
      console.log(err)
    })
  }
  else if(type.includes("anual") && arrayITAEAnual.length != 0){
    google.charts.setOnLoadCallback(drawITAEIndicator(arrayITAEAnual, type));
  }
}
async function drawITAEIndicator(array, value){
  console.log(array, value)
  document.getElementById("spinnerITAE").style.display = "none"

  if(value == "trimestral"){
    var data = new google.visualization.DataTable();
    data.addColumn('string', '');
    data.addColumn('number', '');
    for (var i = 0; i < array.length; i++) {
      data.addRow([array[i].date, (parseFloat(array[i].bajaCalifornia))]);
    }
    var options = {
      title: 'Indicador Trimestral de la Actividad Económica Estatal - Baja California',
      hAxis: {title: 'Periodos'},
      vAxis: {title: 'Porcentaje'},
      curveType: 'function',
      legend: 'none',
    };
    var chart = new google.visualization.LineChart(document.getElementById('itaeChart'));
    document.getElementById("spinnerITAE").style.display = "none"
    document.getElementById("itaeChart").style.display = "block"
    chart.draw(data, options);
  }
  else if(value == "anual"){
    var data = new google.visualization.DataTable();
    data.addColumn('string', '');
    data.addColumn('number', '');
    for (var i = 0; i < array.length; i++) {
      data.addRow([array[i].date, (parseFloat(array[i].bajaCalifornia))]);
    }
    var options = {
      title: 'Indicador Trimestral de la Actividad Económica Estatal - Baja California',
      hAxis: {title: 'Periodos'},
      vAxis: {title: 'Porcentaje'},
      curveType: 'function',
      legend: 'none',
    };
    var chart = new google.visualization.LineChart(document.getElementById('itaeChart'));
    document.getElementById("spinnerITAE").style.display = "none"
    document.getElementById("itaeChart").style.display = "block"
    chart.draw(data, options);
  }

}