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
arrayDelitosTotales = []
arrayDelitosRobos = []
arrayDelitosLesiones = []
arrayDelitosHomicidios = []
arrayDelitosPatrimoniales = []
arrayDelitosSecuestros = []
arrayDelitosViolaciones = []
arrayDelitosFeminicidios = []
arrayDelitosOtros = []
arrayEmpleoBajaCalifornia = []
arrayEmpleoZonaMetropolitana = []
arrayEmpleoTijuana = []
arrayEmpleoTecate = []
arrayEmpleoRosarito = []
arrayEmpleoEnsenada = []
arrayEmpleoMexicali = []
arrayEmpleoSanQuintin = []
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

async function getDataDelitosIndicator(type){
  document.getElementById("delitosZonas").style.display = "none";
  if(type == "delitosTotales"){
    let color = "black"
    document.getElementById("bajaCaliforniaDelitos").style.backgroundColor = color
    document.getElementById("bajaCaliforniaDelitos").value = "bajaCaliforniaDelitosTotales"
    document.getElementById("zonaMetropolitanaDelitos").style.backgroundColor = color
    document.getElementById("zonaMetropolitanaDelitos").value = "zonaMetropolitanaDelitosTotales"
    document.getElementById("tijuanaDelitos").style.backgroundColor = color
    document.getElementById("tijuanaDelitos").value = "tijuanaDelitosTotales"
    document.getElementById("tecateDelitos").style.backgroundColor = color
    document.getElementById("tecateDelitos").value = "tecateDelitosTotales"
    document.getElementById("rosaritoDelitos").style.backgroundColor = color
    document.getElementById("rosaritoDelitos").value = "rosaritoDelitosTotales"
    document.getElementById("ensenadaDelitos").style.backgroundColor = color
    document.getElementById("ensenadaDelitos").value = "ensenadaDelitosTotales"
    document.getElementById("mexicaliDelitos").style.backgroundColor = color
    document.getElementById("mexicaliDelitos").value = "mexicaliDelitosTotales"
    document.getElementById("sanQuintinDelitos").style.backgroundColor = color
    document.getElementById("sanQuintinDelitos").value = "sanQuintinDelitosTotales"
    document.getElementById("sanFelipeDelitos").style.backgroundColor = color
    document.getElementById("sanFelipeDelitos").value = "sanFelipeDelitosTotales"
    if(arrayDelitosTotales.length == 0){
      document.getElementById("spinnerDelitos").style.display = "inline-block"
      var config = {
        method: 'get',
        url: 'https://sheet.best/api/sheets/25cab98b-daa2-4cd3-9c62-74308a0853ca/tabs/indicador_delitosTotales',
      }
      await axios(config)
        .then((res) => {
          for (let i = res.data.length; i >= res.data.length - periods; i--) {
            arrayDelitosTotales.push(res.data[i])
          }
          arrayDelitosTotales.shift()
          arrayDelitosTotales.reverse()
          document.getElementById("spinnerDelitos").style.display = "none"
          document.getElementById("delitosZonas").style.display = "flex";
          document.getElementById("delitosZonas").style.justifyContent = "space-between";
          console.log(arrayDelitosTotales)
        })
        .catch(async (err) => {
          console.log(err)
        })

    }
    else if(arrayDelitosTotales.length > 0){
      document.getElementById("delitosZonas").style.display = "flex";
    }
  }
  else if(type == "delitosRobos"){
    let color = "red"
    document.getElementById("bajaCaliforniaDelitos").style.backgroundColor = color
    document.getElementById("bajaCaliforniaDelitos").value = "bajaCaliforniaDelitosRobos"
    document.getElementById("zonaMetropolitanaDelitos").style.backgroundColor = color
    document.getElementById("zonaMetropolitanaDelitos").value = "zonaMetropolitanaDelitosRobos"
    document.getElementById("tijuanaDelitos").style.backgroundColor = color
    document.getElementById("tijuanaDelitos").value = "tijuanaDelitosRobos"
    document.getElementById("tecateDelitos").style.backgroundColor = color
    document.getElementById("tecateDelitos").value = "tecateDelitosRobos"
    document.getElementById("rosaritoDelitos").style.backgroundColor = color
    document.getElementById("rosaritoDelitos").value = "rosaritoDelitosRobos"
    document.getElementById("ensenadaDelitos").style.backgroundColor = color
    document.getElementById("ensenadaDelitos").value = "ensenadaDelitosRobos"
    document.getElementById("mexicaliDelitos").style.backgroundColor = color
    document.getElementById("mexicaliDelitos").value = "mexicaliDelitosRobos"
    document.getElementById("sanQuintinDelitos").style.backgroundColor = color
    document.getElementById("sanQuintinDelitos").value = "sanQuintinDelitosRobos"
    document.getElementById("sanFelipeDelitos").style.backgroundColor = color
    document.getElementById("sanFelipeDelitos").value = "sanFelipeDelitosRobos"
    if(arrayDelitosRobos.length == 0){
      document.getElementById("spinnerDelitos").style.display = "inline-block"
      var config = {
        method: 'get',
        url: 'https://sheet.best/api/sheets/25cab98b-daa2-4cd3-9c62-74308a0853ca/tabs/indicador_delitosRobos',
      }
      await axios(config)
        .then((res) => {
          for (let i = res.data.length; i >= res.data.length - periods; i--) {
            arrayDelitosRobos.push(res.data[i])
          }
          arrayDelitosRobos.shift()
          arrayDelitosRobos.reverse()
          document.getElementById("spinnerDelitos").style.display = "none"
          document.getElementById("delitosZonas").style.display = "flex";
          document.getElementById("delitosZonas").style.justifyContent = "space-between";
          console.log(arrayDelitosRobos)
        })
        .catch(async (err) => {
          console.log(err)
        })
    }
    else if(arrayDelitosRobos.length > 0){
      document.getElementById("delitosZonas").style.display = "flex";
    }
  }
  else if(type == "delitosLesiones"){
    let color = "blue"
    document.getElementById("bajaCaliforniaDelitos").style.backgroundColor = color
    document.getElementById("bajaCaliforniaDelitos").value = "bajaCaliforniaDelitosLesiones"
    document.getElementById("zonaMetropolitanaDelitos").style.backgroundColor = color
    document.getElementById("zonaMetropolitanaDelitos").value = "zonaMetropolitanaDelitosLesiones"
    document.getElementById("tijuanaDelitos").style.backgroundColor = color
    document.getElementById("tijuanaDelitos").value = "tijuanaDelitosLesiones"
    document.getElementById("tecateDelitos").style.backgroundColor = color
    document.getElementById("tecateDelitos").value = "tecateDelitosLesiones"
    document.getElementById("rosaritoDelitos").style.backgroundColor = color
    document.getElementById("rosaritoDelitos").value = "rosaritoDelitosLesiones"
    document.getElementById("ensenadaDelitos").style.backgroundColor = color
    document.getElementById("ensenadaDelitos").value = "ensenadaDelitosLesiones"
    document.getElementById("mexicaliDelitos").style.backgroundColor = color
    document.getElementById("mexicaliDelitos").value = "mexicaliDelitosLesiones"
    document.getElementById("sanQuintinDelitos").style.backgroundColor = color
    document.getElementById("sanQuintinDelitos").value = "sanQuintinDelitosLesiones"
    document.getElementById("sanFelipeDelitos").style.backgroundColor = color
    document.getElementById("sanFelipeDelitos").value = "sanFelipeDelitosLesiones"
    if(arrayDelitosLesiones.length == 0){
      document.getElementById("spinnerDelitos").style.display = "inline-block"
      var config = {
        method: 'get',
        url: 'https://sheet.best/api/sheets/25cab98b-daa2-4cd3-9c62-74308a0853ca/tabs/indicador_delitosLesiones',
      }
      await axios(config)
        .then((res) => {
          for (let i = res.data.length; i >= res.data.length - periods; i--) {
            arrayDelitosLesiones.push(res.data[i])
          }
          arrayDelitosLesiones.shift()
          arrayDelitosLesiones.reverse()
          document.getElementById("spinnerDelitos").style.display = "none"
          document.getElementById("delitosZonas").style.display = "flex";
          document.getElementById("delitosZonas").style.justifyContent = "space-between";
          console.log(arrayDelitosLesiones)
        })
        .catch(async (err) => {
          console.log(err)
        })
    }
    else if(arrayDelitosLesiones.length > 0){
      document.getElementById("delitosZonas").style.display = "flex";
    }
  }
  else if(type == "delitosHomicidios"){
    let color = "cornflowerblue"
    document.getElementById("bajaCaliforniaDelitos").style.backgroundColor = color
    document.getElementById("bajaCaliforniaDelitos").value = "bajaCaliforniaDelitosHomicidios"
    document.getElementById("zonaMetropolitanaDelitos").style.backgroundColor = color
    document.getElementById("zonaMetropolitanaDelitos").value = "zonaMetropolitanaDelitosHomicidios"
    document.getElementById("tijuanaDelitos").style.backgroundColor = color
    document.getElementById("tijuanaDelitos").value = "tijuanaDelitosHomicidios"
    document.getElementById("tecateDelitos").style.backgroundColor = color
    document.getElementById("tecateDelitos").value = "tecateDelitosHomicidios"
    document.getElementById("rosaritoDelitos").style.backgroundColor = color
    document.getElementById("rosaritoDelitos").value = "rosaritoDelitosHomicidios"
    document.getElementById("ensenadaDelitos").style.backgroundColor = color
    document.getElementById("ensenadaDelitos").value = "ensenadaDelitosHomicidios"
    document.getElementById("mexicaliDelitos").style.backgroundColor = color
    document.getElementById("mexicaliDelitos").value = "mexicaliDelitosHomicidios"
    document.getElementById("sanQuintinDelitos").style.backgroundColor = color
    document.getElementById("sanQuintinDelitos").value = "sanQuintinDelitosHomicidios"
    document.getElementById("sanFelipeDelitos").style.backgroundColor = color
    document.getElementById("sanFelipeDelitos").value = "sanFelipeDelitosHomicidios"
    if(arrayDelitosHomicidios.length == 0){
      document.getElementById("spinnerDelitos").style.display = "inline-block"
      var config = {
        method: 'get',
        url: 'https://sheet.best/api/sheets/25cab98b-daa2-4cd3-9c62-74308a0853ca/tabs/indicador_delitosHomicidios',
      }
      await axios(config)
        .then((res) => {
          for (let i = res.data.length; i >= res.data.length - periods; i--) {
            arrayDelitosHomicidios.push(res.data[i])
          }
          arrayDelitosHomicidios.shift()
          arrayDelitosHomicidios.reverse()
          document.getElementById("spinnerDelitos").style.display = "none"
          document.getElementById("delitosZonas").style.display = "flex";
          document.getElementById("delitosZonas").style.justifyContent = "space-between";
          console.log(arrayDelitosHomicidios)
        })
        .catch(async (err) => {
          console.log(err)
        })
    }
    else if(arrayDelitosHomicidios.length > 0){
      document.getElementById("delitosZonas").style.display = "flex";
    }
  }
  else if(type == "delitosPatrimoniales"){
    let color = "tomato"
    document.getElementById("bajaCaliforniaDelitos").style.backgroundColor = color
    document.getElementById("bajaCaliforniaDelitos").value = "bajaCaliforniaDelitosPatrimoniales"
    document.getElementById("zonaMetropolitanaDelitos").style.backgroundColor = color
    document.getElementById("zonaMetropolitanaDelitos").value = "zonaMetropolitanaDelitosPatrimoniales"
    document.getElementById("tijuanaDelitos").style.backgroundColor = color
    document.getElementById("tijuanaDelitos").value = "tijuanaDelitosPatrimoniales"
    document.getElementById("tecateDelitos").style.backgroundColor = color
    document.getElementById("tecateDelitos").value = "tecateDelitosPatrimoniales"
    document.getElementById("rosaritoDelitos").style.backgroundColor = color
    document.getElementById("rosaritoDelitos").value = "rosaritoDelitosPatrimoniales"
    document.getElementById("ensenadaDelitos").style.backgroundColor = color
    document.getElementById("ensenadaDelitos").value = "ensenadaDelitosPatrimoniales"
    document.getElementById("mexicaliDelitos").style.backgroundColor = color
    document.getElementById("mexicaliDelitos").value = "mexicaliDelitosPatrimoniales"
    document.getElementById("sanQuintinDelitos").style.backgroundColor = color
    document.getElementById("sanQuintinDelitos").value = "sanQuintinDelitosPatrimoniales"
    document.getElementById("sanFelipeDelitos").style.backgroundColor = color
    document.getElementById("sanFelipeDelitos").value = "sanFelipeDelitosPatrimoniales"
    if(arrayDelitosPatrimoniales.length == 0){
      document.getElementById("spinnerDelitos").style.display = "inline-block"
      var config = {
        method: 'get',
        url: 'https://sheet.best/api/sheets/25cab98b-daa2-4cd3-9c62-74308a0853ca/tabs/indicador_delitosPatrimoniales',
      }
      await axios(config)
        .then((res) => {
          for (let i = res.data.length; i >= res.data.length - periods; i--) {
            arrayDelitosPatrimoniales.push(res.data[i])
          }
          arrayDelitosPatrimoniales.shift()
          arrayDelitosPatrimoniales.reverse()
          document.getElementById("spinnerDelitos").style.display = "none"
          document.getElementById("delitosZonas").style.display = "flex";
          document.getElementById("delitosZonas").style.justifyContent = "space-between";
          console.log(arrayDelitosPatrimoniales)
        })
        .catch(async (err) => {
          console.log(err)
        })
    }
    else if(arrayDelitosPatrimoniales.length > 0){
      document.getElementById("delitosZonas").style.display = "flex";
    }
  }
  else if(type == "delitosSecuestros"){
    let color = "blueviolet"
    document.getElementById("bajaCaliforniaDelitos").style.backgroundColor = color
    document.getElementById("bajaCaliforniaDelitos").value = "bajaCaliforniaDelitosSecuestros"
    document.getElementById("zonaMetropolitanaDelitos").style.backgroundColor = color
    document.getElementById("zonaMetropolitanaDelitos").value = "zonaMetropolitanaDelitosSecuestros"
    document.getElementById("tijuanaDelitos").style.backgroundColor = color
    document.getElementById("tijuanaDelitos").value = "tijuanaDelitosSecuestros"
    document.getElementById("tecateDelitos").style.backgroundColor = color
    document.getElementById("tecateDelitos").value = "tecateDelitosSecuestros"
    document.getElementById("rosaritoDelitos").style.backgroundColor = color
    document.getElementById("rosaritoDelitos").value = "rosaritoDelitosSecuestros"
    document.getElementById("ensenadaDelitos").style.backgroundColor = color
    document.getElementById("ensenadaDelitos").value = "ensenadaDelitosSecuestros"
    document.getElementById("mexicaliDelitos").style.backgroundColor = color
    document.getElementById("mexicaliDelitos").value = "mexicaliDelitosSecuestros"
    document.getElementById("sanQuintinDelitos").style.backgroundColor = color
    document.getElementById("sanQuintinDelitos").value = "sanQuintinDelitosSecuestros"
    document.getElementById("sanFelipeDelitos").style.backgroundColor = color
    document.getElementById("sanFelipeDelitos").value = "sanFelipeDelitosSecuestros"
    if(arrayDelitosSecuestros.length == 0){
      document.getElementById("spinnerDelitos").style.display = "inline-block"
      var config = {
        method: 'get',
        url: 'https://sheet.best/api/sheets/25cab98b-daa2-4cd3-9c62-74308a0853ca/tabs/indicador_delitosSecuestros',
      }
      await axios(config)
        .then((res) => {
          for (let i = res.data.length; i >= res.data.length - periods; i--) {
            arrayDelitosSecuestros.push(res.data[i])
          }
          arrayDelitosSecuestros.shift()
          arrayDelitosSecuestros.reverse()
          document.getElementById("spinnerDelitos").style.display = "none"
          document.getElementById("delitosZonas").style.display = "flex";
          document.getElementById("delitosZonas").style.justifyContent = "space-between";
          console.log(arrayDelitosSecuestros)
        })
        .catch(async (err) => {
          console.log(err)
        })
    }
    else if(arrayDelitosSecuestros.length > 0){
      document.getElementById("delitosZonas").style.display = "flex";
    }
  }
  else if(type == "delitosViolaciones"){
    let color = "darkblue"
    document.getElementById("bajaCaliforniaDelitos").style.backgroundColor = color
    document.getElementById("bajaCaliforniaDelitos").value = "bajaCaliforniaDelitosViolaciones"
    document.getElementById("zonaMetropolitanaDelitos").style.backgroundColor = color
    document.getElementById("zonaMetropolitanaDelitos").value = "zonaMetropolitanaDelitosViolaciones"
    document.getElementById("tijuanaDelitos").style.backgroundColor = color
    document.getElementById("tijuanaDelitos").value = "tijuanaDelitosViolaciones"
    document.getElementById("tecateDelitos").style.backgroundColor = color
    document.getElementById("tecateDelitos").value = "tecateDelitosViolaciones"
    document.getElementById("rosaritoDelitos").style.backgroundColor = color
    document.getElementById("rosaritoDelitos").value = "rosaritoDelitosViolaciones"
    document.getElementById("ensenadaDelitos").style.backgroundColor = color
    document.getElementById("ensenadaDelitos").value = "ensenadaDelitosViolaciones"
    document.getElementById("mexicaliDelitos").style.backgroundColor = color
    document.getElementById("mexicaliDelitos").value = "mexicaliDelitosViolaciones"
    document.getElementById("sanQuintinDelitos").style.backgroundColor = color
    document.getElementById("sanQuintinDelitos").value = "sanQuintinDelitosViolaciones"
    document.getElementById("sanFelipeDelitos").style.backgroundColor = color
    document.getElementById("sanFelipeDelitos").value = "sanFelipeDelitosViolaciones"
    if(arrayDelitosViolaciones.length == 0){
      document.getElementById("spinnerDelitos").style.display = "inline-block"
      var config = {
        method: 'get',
        url: 'https://sheet.best/api/sheets/25cab98b-daa2-4cd3-9c62-74308a0853ca/tabs/indicador_delitosViolaciones',
      }
      await axios(config)
        .then((res) => {
          for (let i = res.data.length; i >= res.data.length - periods; i--) {
            arrayDelitosViolaciones.push(res.data[i])
          }
          arrayDelitosViolaciones.shift()
          arrayDelitosViolaciones.reverse()
          document.getElementById("spinnerDelitos").style.display = "none"
          document.getElementById("delitosZonas").style.display = "flex";
          document.getElementById("delitosZonas").style.justifyContent = "space-between";
          console.log(arrayDelitosViolaciones)
        })
        .catch(async (err) => {
          console.log(err)
        })
    }
    else if(arrayDelitosViolaciones.length > 0){
      document.getElementById("delitosZonas").style.display = "flex";
    }
  }
  else if(type == "delitosFeminicidios"){
    let color = "darkgreen"
    document.getElementById("delitosZonas").style.display = "none";
    document.getElementById("bajaCaliforniaDelitos").style.backgroundColor = color
    document.getElementById("bajaCaliforniaDelitos").value = "bajaCaliforniaDelitosFeminicidios"
    document.getElementById("zonaMetropolitanaDelitos").style.backgroundColor = color
    document.getElementById("zonaMetropolitanaDelitos").value = "zonaMetropolitanaDelitosFeminicidios"
    document.getElementById("tijuanaDelitos").style.backgroundColor = color
    document.getElementById("tijuanaDelitos").value = "tijuanaDelitosFeminicidios"
    document.getElementById("tecateDelitos").style.backgroundColor = color
    document.getElementById("tecateDelitos").value = "tecateDelitosFeminicidios"
    document.getElementById("rosaritoDelitos").style.backgroundColor = color
    document.getElementById("rosaritoDelitos").value = "rosaritoDelitosFeminicidios"
    document.getElementById("ensenadaDelitos").style.backgroundColor = color
    document.getElementById("ensenadaDelitos").value = "ensenadaDelitosFeminicidios"
    document.getElementById("mexicaliDelitos").style.backgroundColor = color
    document.getElementById("mexicaliDelitos").value = "mexicaliDelitosFeminicidios"
    document.getElementById("sanQuintinDelitos").style.backgroundColor = color
    document.getElementById("sanQuintinDelitos").value = "sanQuintinDelitosFeminicidios"
    document.getElementById("sanFelipeDelitos").style.backgroundColor = color
    document.getElementById("sanFelipeDelitos").value = "sanFelipeDelitosFeminicidios"
    if(arrayDelitosFeminicidios.length == 0){
      document.getElementById("spinnerDelitos").style.display = "inline-block"
      var config = {
        method: 'get',
        url: 'https://sheet.best/api/sheets/25cab98b-daa2-4cd3-9c62-74308a0853ca/tabs/indicador_delitosFeminicidios',
      }
      await axios(config)
        .then((res) => {
          for (let i = res.data.length; i >= res.data.length - periods; i--) {
            arrayDelitosFeminicidios.push(res.data[i])
          }
          arrayDelitosFeminicidios.shift()
          arrayDelitosFeminicidios.reverse()
          document.getElementById("spinnerDelitos").style.display = "none"
          document.getElementById("delitosZonas").style.display = "flex";
          document.getElementById("delitosZonas").style.justifyContent = "space-between";
          console.log(arrayDelitosFeminicidios)
        })
        .catch(async (err) => {
          console.log(err)
        })
    }
    else if(arrayDelitosFeminicidios.length > 0){
      document.getElementById("delitosZonas").style.display = "flex";
    }
  }
  else if(type == "delitosOtros"){
    let color = "deeppink"
    document.getElementById("bajaCaliforniaDelitos").style.backgroundColor = color
    document.getElementById("bajaCaliforniaDelitos").value = "bajaCaliforniaDelitosOtros"
    document.getElementById("zonaMetropolitanaDelitos").style.backgroundColor = color
    document.getElementById("zonaMetropolitanaDelitos").value = "zonaMetropolitanaDelitosOtros"
    document.getElementById("tijuanaDelitos").style.backgroundColor = color
    document.getElementById("tijuanaDelitos").value = "tijuanaDelitosOtros"
    document.getElementById("tecateDelitos").style.backgroundColor = color
    document.getElementById("tecateDelitos").value = "tecateDelitosOtros"
    document.getElementById("rosaritoDelitos").style.backgroundColor = color
    document.getElementById("rosaritoDelitos").value = "rosaritoDelitosOtros"
    document.getElementById("ensenadaDelitos").style.backgroundColor = color
    document.getElementById("ensenadaDelitos").value = "ensenadaDelitosOtros"
    document.getElementById("mexicaliDelitos").style.backgroundColor = color
    document.getElementById("mexicaliDelitos").value = "mexicaliDelitosOtros"
    document.getElementById("sanQuintinDelitos").style.backgroundColor = color
    document.getElementById("sanQuintinDelitos").value = "sanQuintinDelitosOtros"
    document.getElementById("sanFelipeDelitos").style.backgroundColor = color
    document.getElementById("sanFelipeDelitos").value = "sanFelipeDelitosOtros"
    if(arrayDelitosOtros.length == 0){
      document.getElementById("spinnerDelitos").style.display = "inline-block"
      var config = {
        method: 'get',
        url: 'https://sheet.best/api/sheets/25cab98b-daa2-4cd3-9c62-74308a0853ca/tabs/indicador_delitosOtros',
      }
      await axios(config)
        .then((res) => {
          for (let i = res.data.length; i >= res.data.length - periods; i--) {
            arrayDelitosOtros.push(res.data[i])
          }
          arrayDelitosOtros.shift()
          arrayDelitosOtros.reverse()
          document.getElementById("spinnerDelitos").style.display = "none"
          document.getElementById("delitosZonas").style.display = "flex";
          document.getElementById("delitosZonas").style.justifyContent = "space-between";
          console.log(arrayDelitosOtros)
        })
        .catch(async (err) => {
          console.log(err)
        })
    }
    else if(arrayDelitosOtros.length > 0){
      document.getElementById("delitosZonas").style.display = "flex";
    }
  }
}
async function drawDelitosIndicator(type){
  if(type.includes("Totales")){
    if(type.includes("bajaCalifornia")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosTotales.length; i++) {
        data.addRow([arrayDelitosTotales[i].date, (parseFloat(arrayDelitosTotales[i].bajaCalifornia))]);
      }
      var options = {
        title: 'Delitos Totales - Baja California',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("zonaMetropolitana")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosTotales.length; i++) {
        data.addRow([arrayDelitosTotales[i].date, (parseFloat(arrayDelitosTotales[i].zonaMetropolitana))]);
      }
      var options = {
        title: 'Delitos Totales - Zona Metropolitana',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("tijuana")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosTotales.length; i++) {
        data.addRow([arrayDelitosTotales[i].date, (parseFloat(arrayDelitosTotales[i].tijuana))]);
      }
      var options = {
        title: 'Delitos Totales - Tijuana',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("tecate")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosTotales.length; i++) {
        data.addRow([arrayDelitosTotales[i].date, (parseFloat(arrayDelitosTotales[i].tecate))]);
      }
      var options = {
        title: 'Delitos Totales - Tecate',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("rosarito")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosTotales.length; i++) {
        data.addRow([arrayDelitosTotales[i].date, (parseFloat(arrayDelitosTotales[i].rosarito))]);
      }
      var options = {
        title: 'Delitos Totales - Rosarito',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("ensenada")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosTotales.length; i++) {
        data.addRow([arrayDelitosTotales[i].date, (parseFloat(arrayDelitosTotales[i].ensenada))]);
      }
      var options = {
        title: 'Delitos Totales - Ensenada',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("mexicali")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosTotales.length; i++) {
        data.addRow([arrayDelitosTotales[i].date, (parseFloat(arrayDelitosTotales[i].mexicali))]);
      }
      var options = {
        title: 'Delitos Totales - Mexicali',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("sanQuintin")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosTotales.length; i++) {
        data.addRow([arrayDelitosTotales[i].date, (parseFloat(arrayDelitosTotales[i].sanQuintin))]);
      }
      var options = {
        title: 'Delitos Totales - San Quintin',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("sanFelipe")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosTotales.length; i++) {
        data.addRow([arrayDelitosTotales[i].date, (parseFloat(arrayDelitosTotales[i].sanFelipe))]);
      }
      var options = {
        title: 'Delitos Totales - San Felipe',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
  }
  else if(type.includes("Robos")){
    if(type.includes("bajaCalifornia")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosRobos.length; i++) {
        data.addRow([arrayDelitosRobos[i].date, (parseFloat(arrayDelitosRobos[i].bajaCalifornia))]);
      }
      var options = {
        title: 'Delitos Robos - Baja California',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("zonaMetropolitana")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosRobos.length; i++) {
        data.addRow([arrayDelitosRobos[i].date, (parseFloat(arrayDelitosRobos[i].zonaMetropolitana))]);
      }
      var options = {
        title: 'Delitos Robos - Zona Metropolitana',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("tijuana")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosRobos.length; i++) {
        data.addRow([arrayDelitosRobos[i].date, (parseFloat(arrayDelitosRobos[i].tijuana))]);
      }
      var options = {
        title: 'Delitos Robos - Tijuana',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("tecate")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosRobos.length; i++) {
        data.addRow([arrayDelitosRobos[i].date, (parseFloat(arrayDelitosRobos[i].tecate))]);
      }
      var options = {
        title: 'Delitos Robos - Tecate',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("rosarito")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosRobos.length; i++) {
        data.addRow([arrayDelitosRobos[i].date, (parseFloat(arrayDelitosRobos[i].rosarito))]);
      }
      var options = {
        title: 'Delitos Robos - Rosarito',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("ensenada")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosRobos.length; i++) {
        data.addRow([arrayDelitosRobos[i].date, (parseFloat(arrayDelitosRobos[i].ensenada))]);
      }
      var options = {
        title: 'Delitos Robos - Ensenada',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("mexicali")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosRobos.length; i++) {
        data.addRow([arrayDelitosRobos[i].date, (parseFloat(arrayDelitosRobos[i].mexicali))]);
      }
      var options = {
        title: 'Delitos Robos - Mexicali',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("sanQuintin")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosRobos.length; i++) {
        data.addRow([arrayDelitosRobos[i].date, (parseFloat(arrayDelitosRobos[i].sanQuintin))]);
      }
      var options = {
        title: 'Delitos Robos - San Quintin',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("sanFelipe")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosRobos.length; i++) {
        data.addRow([arrayDelitosRobos[i].date, (parseFloat(arrayDelitosRobos[i].sanFelipe))]);
      }
      var options = {
        title: 'Delitos Robos - San Felipe',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
  }
  else if(type.includes("Lesiones")){
    if(type.includes("bajaCalifornia")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosLesiones.length; i++) {
        data.addRow([arrayDelitosLesiones[i].date, (parseFloat(arrayDelitosLesiones[i].bajaCalifornia))]);
      }
      var options = {
        title: 'Delitos Lesiones - Baja California',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("zonaMetropolitana")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosLesiones.length; i++) {
        data.addRow([arrayDelitosLesiones[i].date, (parseFloat(arrayDelitosLesiones[i].zonaMetropolitana))]);
      }
      var options = {
        title: 'Delitos Lesiones - Zona Metropolitana',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("tijuana")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosLesiones.length; i++) {
        data.addRow([arrayDelitosLesiones[i].date, (parseFloat(arrayDelitosLesiones[i].tijuana))]);
      }
      var options = {
        title: 'Delitos Lesiones - Tijuana',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("tecate")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosLesiones.length; i++) {
        data.addRow([arrayDelitosLesiones[i].date, (parseFloat(arrayDelitosLesiones[i].tecate))]);
      }
      var options = {
        title: 'Delitos Lesiones - Tecate',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("rosarito")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosLesiones.length; i++) {
        data.addRow([arrayDelitosLesiones[i].date, (parseFloat(arrayDelitosLesiones[i].rosarito))]);
      }
      var options = {
        title: 'Delitos Lesiones - Rosarito',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("ensenada")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosLesiones.length; i++) {
        data.addRow([arrayDelitosLesiones[i].date, (parseFloat(arrayDelitosLesiones[i].ensenada))]);
      }
      var options = {
        title: 'Delitos Lesiones - Ensenada',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("mexicali")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosLesiones.length; i++) {
        data.addRow([arrayDelitosLesiones[i].date, (parseFloat(arrayDelitosLesiones[i].mexicali))]);
      }
      var options = {
        title: 'Delitos Lesiones - Mexicali',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("sanQuintin")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosLesiones.length; i++) {
        data.addRow([arrayDelitosLesiones[i].date, (parseFloat(arrayDelitosLesiones[i].sanQuintin))]);
      }
      var options = {
        title: 'Delitos Lesiones - San Quintin',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("sanFelipe")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosLesiones.length; i++) {
        data.addRow([arrayDelitosLesiones[i].date, (parseFloat(arrayDelitosLesiones[i].sanFelipe))]);
      }
      var options = {
        title: 'Delitos Lesiones - San Felipe',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
  }
  else if(type.includes("Homicidios")){
    if(type.includes("bajaCalifornia")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosHomicidios.length; i++) {
        data.addRow([arrayDelitosHomicidios[i].date, (parseFloat(arrayDelitosHomicidios[i].bajaCalifornia))]);
      }
      var options = {
        title: 'Delitos Homicidios - Baja California',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("zonaMetropolitana")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosHomicidios.length; i++) {
        data.addRow([arrayDelitosHomicidios[i].date, (parseFloat(arrayDelitosHomicidios[i].zonaMetropolitana))]);
      }
      var options = {
        title: 'Delitos Homicidios - Zona Metropolitana',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("tijuana")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosHomicidios.length; i++) {
        data.addRow([arrayDelitosHomicidios[i].date, (parseFloat(arrayDelitosHomicidios[i].tijuana))]);
      }
      var options = {
        title: 'Delitos Homicidios - Tijuana',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("tecate")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosHomicidios.length; i++) {
        data.addRow([arrayDelitosHomicidios[i].date, (parseFloat(arrayDelitosHomicidios[i].tecate))]);
      }
      var options = {
        title: 'Delitos Homicidios - Tecate',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("rosarito")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosHomicidios.length; i++) {
        data.addRow([arrayDelitosHomicidios[i].date, (parseFloat(arrayDelitosHomicidios[i].rosarito))]);
      }
      var options = {
        title: 'Delitos Homicidios - Rosarito',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("ensenada")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosHomicidios.length; i++) {
        data.addRow([arrayDelitosHomicidios[i].date, (parseFloat(arrayDelitosHomicidios[i].ensenada))]);
      }
      var options = {
        title: 'Delitos Homicidios - Ensenada',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("mexicali")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosHomicidios.length; i++) {
        data.addRow([arrayDelitosHomicidios[i].date, (parseFloat(arrayDelitosHomicidios[i].mexicali))]);
      }
      var options = {
        title: 'Delitos Homicidios - Mexicali',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("sanQuintin")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosHomicidios.length; i++) {
        data.addRow([arrayDelitosHomicidios[i].date, (parseFloat(arrayDelitosHomicidios[i].sanQuintin))]);
      }
      var options = {
        title: 'Delitos Homicidios - San Quintin',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("sanFelipe")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosHomicidios.length; i++) {
        data.addRow([arrayDelitosHomicidios[i].date, (parseFloat(arrayDelitosHomicidios[i].sanFelipe))]);
      }
      var options = {
        title: 'Delitos Homicidios - San Felipe',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
  }
  else if(type.includes("Patrimoniales")){
    if(type.includes("bajaCalifornia")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosPatrimoniales.length; i++) {
        data.addRow([arrayDelitosPatrimoniales[i].date, (parseFloat(arrayDelitosPatrimoniales[i].bajaCalifornia))]);
      }
      var options = {
        title: 'Delitos Patrimoniales - Baja California',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("zonaMetropolitana")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosPatrimoniales.length; i++) {
        data.addRow([arrayDelitosPatrimoniales[i].date, (parseFloat(arrayDelitosPatrimoniales[i].zonaMetropolitana))]);
      }
      var options = {
        title: 'Delitos Patrimoniales - Zona Metropolitana',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("tijuana")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosPatrimoniales.length; i++) {
        data.addRow([arrayDelitosPatrimoniales[i].date, (parseFloat(arrayDelitosPatrimoniales[i].tijuana))]);
      }
      var options = {
        title: 'Delitos Patrimoniales - Tijuana',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("tecate")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosPatrimoniales.length; i++) {
        data.addRow([arrayDelitosPatrimoniales[i].date, (parseFloat(arrayDelitosPatrimoniales[i].tecate))]);
      }
      var options = {
        title: 'Delitos Patrimoniales - Tecate',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("rosarito")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosPatrimoniales.length; i++) {
        data.addRow([arrayDelitosPatrimoniales[i].date, (parseFloat(arrayDelitosPatrimoniales[i].rosarito))]);
      }
      var options = {
        title: 'Delitos Patrimoniales - Rosarito',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("ensenada")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosPatrimoniales.length; i++) {
        data.addRow([arrayDelitosPatrimoniales[i].date, (parseFloat(arrayDelitosPatrimoniales[i].ensenada))]);
      }
      var options = {
        title: 'Delitos Patrimoniales - Ensenada',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("mexicali")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosPatrimoniales.length; i++) {
        data.addRow([arrayDelitosPatrimoniales[i].date, (parseFloat(arrayDelitosPatrimoniales[i].mexicali))]);
      }
      var options = {
        title: 'Delitos Patrimoniales - Mexicali',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("sanQuintin")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosPatrimoniales.length; i++) {
        data.addRow([arrayDelitosPatrimoniales[i].date, (parseFloat(arrayDelitosPatrimoniales[i].sanQuintin))]);
      }
      var options = {
        title: 'Delitos Patrimoniales - San Quintin',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("sanFelipe")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosPatrimoniales.length; i++) {
        data.addRow([arrayDelitosPatrimoniales[i].date, (parseFloat(arrayDelitosPatrimoniales[i].sanFelipe))]);
      }
      var options = {
        title: 'Delitos Patrimoniales - San Felipe',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
  }
  else if(type.includes("Secuestros")){
    if(type.includes("bajaCalifornia")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosSecuestros.length; i++) {
        data.addRow([arrayDelitosSecuestros[i].date, (parseFloat(arrayDelitosSecuestros[i].bajaCalifornia))]);
      }
      var options = {
        title: 'Delitos Secuestros - Baja California',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("zonaMetropolitana")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosSecuestros.length; i++) {
        data.addRow([arrayDelitosSecuestros[i].date, (parseFloat(arrayDelitosSecuestros[i].zonaMetropolitana))]);
      }
      var options = {
        title: 'Delitos Secuestros - Zona Metropolitana',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("tijuana")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosSecuestros.length; i++) {
        data.addRow([arrayDelitosSecuestros[i].date, (parseFloat(arrayDelitosSecuestros[i].tijuana))]);
      }
      var options = {
        title: 'Delitos Secuestros - Tijuana',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("tecate")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosSecuestros.length; i++) {
        data.addRow([arrayDelitosSecuestros[i].date, (parseFloat(arrayDelitosSecuestros[i].tecate))]);
      }
      var options = {
        title: 'Delitos Secuestros - Tecate',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("rosarito")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosSecuestros.length; i++) {
        data.addRow([arrayDelitosSecuestros[i].date, (parseFloat(arrayDelitosSecuestros[i].rosarito))]);
      }
      var options = {
        title: 'Delitos Secuestros - Rosarito',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("ensenada")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosSecuestros.length; i++) {
        data.addRow([arrayDelitosSecuestros[i].date, (parseFloat(arrayDelitosSecuestros[i].ensenada))]);
      }
      var options = {
        title: 'Delitos Secuestros - Ensenada',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("mexicali")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosSecuestros.length; i++) {
        data.addRow([arrayDelitosSecuestros[i].date, (parseFloat(arrayDelitosSecuestros[i].mexicali))]);
      }
      var options = {
        title: 'Delitos Secuestros - Mexicali',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("sanQuintin")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosSecuestros.length; i++) {
        data.addRow([arrayDelitosSecuestros[i].date, (parseFloat(arrayDelitosSecuestros[i].sanQuintin))]);
      }
      var options = {
        title: 'Delitos Secuestros - San Quintin',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("sanFelipe")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosSecuestros.length; i++) {
        data.addRow([arrayDelitosSecuestros[i].date, (parseFloat(arrayDelitosSecuestros[i].sanFelipe))]);
      }
      var options = {
        title: 'Delitos Secuestros - San Felipe',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
  }
  else if(type.includes("Violaciones")){
    if(type.includes("bajaCalifornia")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosViolaciones.length; i++) {
        data.addRow([arrayDelitosViolaciones[i].date, (parseFloat(arrayDelitosViolaciones[i].bajaCalifornia))]);
      }
      var options = {
        title: 'Delitos Violaciones - Baja California',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("zonaMetropolitana")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosViolaciones.length; i++) {
        data.addRow([arrayDelitosViolaciones[i].date, (parseFloat(arrayDelitosViolaciones[i].zonaMetropolitana))]);
      }
      var options = {
        title: 'Delitos Violaciones - Zona Metropolitana',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("tijuana")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosViolaciones.length; i++) {
        data.addRow([arrayDelitosViolaciones[i].date, (parseFloat(arrayDelitosViolaciones[i].tijuana))]);
      }
      var options = {
        title: 'Delitos Violaciones - Tijuana',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("tecate")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosViolaciones.length; i++) {
        data.addRow([arrayDelitosViolaciones[i].date, (parseFloat(arrayDelitosViolaciones[i].tecate))]);
      }
      var options = {
        title: 'Delitos Violaciones - Tecate',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("rosarito")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosViolaciones.length; i++) {
        data.addRow([arrayDelitosViolaciones[i].date, (parseFloat(arrayDelitosViolaciones[i].rosarito))]);
      }
      var options = {
        title: 'Delitos Violaciones - Rosarito',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("ensenada")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosViolaciones.length; i++) {
        data.addRow([arrayDelitosViolaciones[i].date, (parseFloat(arrayDelitosViolaciones[i].ensenada))]);
      }
      var options = {
        title: 'Delitos Violaciones - Ensenada',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("mexicali")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosViolaciones.length; i++) {
        data.addRow([arrayDelitosViolaciones[i].date, (parseFloat(arrayDelitosViolaciones[i].mexicali))]);
      }
      var options = {
        title: 'Delitos Violaciones - Mexicali',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("sanQuintin")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosViolaciones.length; i++) {
        data.addRow([arrayDelitosViolaciones[i].date, (parseFloat(arrayDelitosViolaciones[i].sanQuintin))]);
      }
      var options = {
        title: 'Delitos Violaciones - San Quintin',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("sanFelipe")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosViolaciones.length; i++) {
        data.addRow([arrayDelitosViolaciones[i].date, (parseFloat(arrayDelitosViolaciones[i].sanFelipe))]);
      }
      var options = {
        title: 'Delitos Violaciones - San Felipe',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
  }
  else if(type.includes("Feminicidios")){
    if(type.includes("bajaCalifornia")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosFeminicidios.length; i++) {
        data.addRow([arrayDelitosFeminicidios[i].date, (parseFloat(arrayDelitosFeminicidios[i].bajaCalifornia))]);
      }
      var options = {
        title: 'Delitos Feminicidios - Baja California',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("zonaMetropolitana")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosFeminicidios.length; i++) {
        data.addRow([arrayDelitosFeminicidios[i].date, (parseFloat(arrayDelitosFeminicidios[i].zonaMetropolitana))]);
      }
      var options = {
        title: 'Delitos Feminicidios - Zona Metropolitana',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("tijuana")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosFeminicidios.length; i++) {
        data.addRow([arrayDelitosFeminicidios[i].date, (parseFloat(arrayDelitosFeminicidios[i].tijuana))]);
      }
      var options = {
        title: 'Delitos Feminicidios - Tijuana',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("tecate")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosFeminicidios.length; i++) {
        data.addRow([arrayDelitosFeminicidios[i].date, (parseFloat(arrayDelitosFeminicidios[i].tecate))]);
      }
      var options = {
        title: 'Delitos Feminicidios - Tecate',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("rosarito")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosFeminicidios.length; i++) {
        data.addRow([arrayDelitosFeminicidios[i].date, (parseFloat(arrayDelitosFeminicidios[i].rosarito))]);
      }
      var options = {
        title: 'Delitos Feminicidios - Rosarito',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("ensenada")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosFeminicidios.length; i++) {
        data.addRow([arrayDelitosFeminicidios[i].date, (parseFloat(arrayDelitosFeminicidios[i].ensenada))]);
      }
      var options = {
        title: 'Delitos Feminicidios - Ensenada',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("mexicali")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosFeminicidios.length; i++) {
        data.addRow([arrayDelitosFeminicidios[i].date, (parseFloat(arrayDelitosFeminicidios[i].mexicali))]);
      }
      var options = {
        title: 'Delitos Feminicidios - Mexicali',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("sanQuintin")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosFeminicidios.length; i++) {
        data.addRow([arrayDelitosFeminicidios[i].date, (parseFloat(arrayDelitosFeminicidios[i].sanQuintin))]);
      }
      var options = {
        title: 'Delitos Feminicidios - San Quintin',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("sanFelipe")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosFeminicidios.length; i++) {
        data.addRow([arrayDelitosFeminicidios[i].date, (parseFloat(arrayDelitosFeminicidios[i].sanFelipe))]);
      }
      var options = {
        title: 'Delitos Feminicidios - San Felipe',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
  }
  else if(type.includes("Otros")){
    if(type.includes("bajaCalifornia")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosOtros.length; i++) {
        data.addRow([arrayDelitosOtros[i].date, (parseFloat(arrayDelitosOtros[i].bajaCalifornia))]);
      }
      var options = {
        title: 'Delitos Otros - Baja California',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("zonaMetropolitana")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosOtros.length; i++) {
        data.addRow([arrayDelitosOtros[i].date, (parseFloat(arrayDelitosOtros[i].zonaMetropolitana))]);
      }
      var options = {
        title: 'Delitos Otros - Zona Metropolitana',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("tijuana")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosOtros.length; i++) {
        data.addRow([arrayDelitosOtros[i].date, (parseFloat(arrayDelitosOtros[i].tijuana))]);
      }
      var options = {
        title: 'Delitos Otros - Tijuana',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("tecate")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosOtros.length; i++) {
        data.addRow([arrayDelitosOtros[i].date, (parseFloat(arrayDelitosOtros[i].tecate))]);
      }
      var options = {
        title: 'Delitos Otros - Tecate',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("rosarito")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosOtros.length; i++) {
        data.addRow([arrayDelitosOtros[i].date, (parseFloat(arrayDelitosOtros[i].rosarito))]);
      }
      var options = {
        title: 'Delitos Otros - Rosarito',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("ensenada")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosOtros.length; i++) {
        data.addRow([arrayDelitosOtros[i].date, (parseFloat(arrayDelitosOtros[i].ensenada))]);
      }
      var options = {
        title: 'Delitos Otros - Ensenada',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("mexicali")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosOtros.length; i++) {
        data.addRow([arrayDelitosOtros[i].date, (parseFloat(arrayDelitosOtros[i].mexicali))]);
      }
      var options = {
        title: 'Delitos Otros - Mexicali',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("sanQuintin")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosOtros.length; i++) {
        data.addRow([arrayDelitosOtros[i].date, (parseFloat(arrayDelitosOtros[i].sanQuintin))]);
      }
      var options = {
        title: 'Delitos Otros - San Quintin',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
    else if(type.includes("sanFelipe")){
      var data = new google.visualization.DataTable();
      data.addColumn('string', '');
      data.addColumn('number', '');
      for (var i = 0; i < arrayDelitosOtros.length; i++) {
        data.addRow([arrayDelitosOtros[i].date, (parseFloat(arrayDelitosOtros[i].sanFelipe))]);
      }
      var options = {
        title: 'Delitos Otros - San Felipe',
        hAxis: {title: 'Periodos'},
        vAxis: {title: 'Delitos'},
        curveType: 'function',
        legend: 'none',
      };
      var chart = new google.visualization.LineChart(document.getElementById('delitosChart'));
      document.getElementById("delitosChart").style.display = "block"
      chart.draw(data, options);
    }
  }
}

async function getDataEmpleoIndicator(zone){
  document.getElementById('empleoChart').style.display = "none"
  if(zone == "bajaCalifornia"){
    if (arrayEmpleoBajaCalifornia.length == 0){
      document.getElementById("spinnerEmpleo").style.display = "inline-block"
      var config = {
        method: 'get',
        url: 'https://sheet.best/api/sheets/25cab98b-daa2-4cd3-9c62-74308a0853ca/tabs/empleoTotalBajaCalifornia',
      }
      await axios(config)
        .then((res) => {
          for (let i = res.data.length; i >= res.data.length - periods; i--) {
            arrayEmpleoBajaCalifornia.push(res.data[i])
          }
          arrayEmpleoBajaCalifornia.shift()
          arrayEmpleoBajaCalifornia.reverse()
          google.charts.setOnLoadCallback(drawEmpleoIndicator(zone, arrayEmpleoBajaCalifornia));
        })
        .catch(async (err) => {
          console.log(err)
        })
    }
    else if (arrayEmpleoBajaCalifornia.length > 0){
      drawEmpleoIndicator(zone, arrayEmpleoBajaCalifornia)
    }
  }
  else if(zone == "zonaMetropolitana"){
    if (arrayEmpleoZonaMetropolitana.length == 0){
      document.getElementById("spinnerEmpleo").style.display = "inline-block"
      var config = {
        method: 'get',
        url: 'https://sheet.best/api/sheets/25cab98b-daa2-4cd3-9c62-74308a0853ca/tabs/empleoTotalZonaMetropolitana',
      }
      await axios(config)
        .then((res) => {
          for (let i = res.data.length; i >= res.data.length - periods; i--) {
            arrayEmpleoZonaMetropolitana.push(res.data[i])
          }
          arrayEmpleoZonaMetropolitana.shift()
          arrayEmpleoZonaMetropolitana.reverse()
          google.charts.setOnLoadCallback(drawEmpleoIndicator(zone, arrayEmpleoZonaMetropolitana));
        })
        .catch(async (err) => {
          console.log(err)
        })
    }
    else if (arrayEmpleoZonaMetropolitana.length > 0){
      drawEmpleoIndicator(zone, arrayEmpleoZonaMetropolitana)
    }
  }
  else if(zone == "tijuana"){
    if (arrayEmpleoTijuana.length == 0){
      document.getElementById("spinnerEmpleo").style.display = "inline-block"
      var config = {
        method: 'get',
        url: 'https://sheet.best/api/sheets/25cab98b-daa2-4cd3-9c62-74308a0853ca/tabs/empleoTotalTijuana',
      }
      await axios(config)
        .then((res) => {
          for (let i = res.data.length; i >= res.data.length - periods; i--) {
            arrayEmpleoTijuana.push(res.data[i])
          }
          arrayEmpleoTijuana.shift()
          arrayEmpleoTijuana.reverse()
          google.charts.setOnLoadCallback(drawEmpleoIndicator(zone, arrayEmpleoTijuana));
        })
        .catch(async (err) => {
          console.log(err)
        })
    }
    else if (arrayEmpleoTijuana.length > 0){
      drawEmpleoIndicator(zone, arrayEmpleoTijuana)
    }
  }
  else if(zone == "tecate"){
    if (arrayEmpleoTecate.length == 0){
      document.getElementById("spinnerEmpleo").style.display = "inline-block"
      var config = {
        method: 'get',
        url: 'https://sheet.best/api/sheets/25cab98b-daa2-4cd3-9c62-74308a0853ca/tabs/empleoTotalTecate',
      }
      await axios(config)
        .then((res) => {
          for (let i = res.data.length; i >= res.data.length - periods; i--) {
            arrayEmpleoTecate.push(res.data[i])
          }
          arrayEmpleoTecate.shift()
          arrayEmpleoTecate.reverse()
          google.charts.setOnLoadCallback(drawEmpleoIndicator(zone, arrayEmpleoTecate));
        })
        .catch(async (err) => {
          console.log(err)
        })
    }
    else if (arrayEmpleoTecate.length > 0){
      drawEmpleoIndicator(zone, arrayEmpleoTecate)
    }
  }
  else if(zone == "rosarito"){
    if (arrayEmpleoRosarito.length == 0){
      document.getElementById("spinnerEmpleo").style.display = "inline-block"
      var config = {
        method: 'get',
        url: 'https://sheet.best/api/sheets/25cab98b-daa2-4cd3-9c62-74308a0853ca/tabs/empleoTotalRosarito',
      }
      await axios(config)
        .then((res) => {
          for (let i = res.data.length; i >= res.data.length - periods; i--) {
            arrayEmpleoRosarito.push(res.data[i])
          }
          arrayEmpleoRosarito.shift()
          arrayEmpleoRosarito.reverse()
          google.charts.setOnLoadCallback(drawEmpleoIndicator(zone, arrayEmpleoRosarito));
        })
        .catch(async (err) => {
          console.log(err)
        })
    }
    else if (arrayEmpleoRosarito.length > 0){
      drawEmpleoIndicator(zone, arrayEmpleoRosarito)
    }
  }
  else if(zone == "ensenada"){
    if (arrayEmpleoEnsenada.length == 0){
      document.getElementById("spinnerEmpleo").style.display = "inline-block"
      var config = {
        method: 'get',
        url: 'https://sheet.best/api/sheets/25cab98b-daa2-4cd3-9c62-74308a0853ca/tabs/empleoTotalEnsenada',
      }
      await axios(config)
        .then((res) => {
          for (let i = res.data.length; i >= res.data.length - periods; i--) {
            arrayEmpleoEnsenada.push(res.data[i])
          }
          arrayEmpleoEnsenada.shift()
          arrayEmpleoEnsenada.reverse()
          google.charts.setOnLoadCallback(drawEmpleoIndicator(zone, arrayEmpleoEnsenada));
        })
        .catch(async (err) => {
          console.log(err)
        })
    }
    else if (arrayEmpleoEnsenada.length > 0){
      drawEmpleoIndicator(zone, arrayEmpleoEnsenada)
    }
  }
  else if(zone == "mexicali"){
    if (arrayEmpleoMexicali.length == 0){
      document.getElementById("spinnerEmpleo").style.display = "inline-block"
      var config = {
        method: 'get',
        url: 'https://sheet.best/api/sheets/25cab98b-daa2-4cd3-9c62-74308a0853ca/tabs/empleoTotalMexicali',
      }
      await axios(config)
        .then((res) => {
          for (let i = res.data.length; i >= res.data.length - periods; i--) {
            arrayEmpleoMexicali.push(res.data[i])
          }
          arrayEmpleoMexicali.shift()
          arrayEmpleoMexicali.reverse()
          google.charts.setOnLoadCallback(drawEmpleoIndicator(zone, arrayEmpleoMexicali));
        })
        .catch(async (err) => {
          console.log(err)
        })
    }
    else if (arrayEmpleoMexicali.length > 0){
      drawEmpleoIndicator(zone, arrayEmpleoMexicali)
    }
  }
  else if(zone == "sanQuintin"){
    if (arrayEmpleoSanQuintin.length == 0){
      document.getElementById("spinnerEmpleo").style.display = "inline-block"
      var config = {
        method: 'get',
        url: 'https://sheet.best/api/sheets/25cab98b-daa2-4cd3-9c62-74308a0853ca/tabs/empleoTotalSanQuintin',
      }
      await axios(config)
        .then((res) => {
          for (let i = res.data.length; i >= res.data.length - periods; i--) {
            arrayEmpleoSanQuintin.push(res.data[i])
          }
          arrayEmpleoSanQuintin.shift()
          arrayEmpleoSanQuintin.reverse()
          google.charts.setOnLoadCallback(drawEmpleoIndicator(zone, arrayEmpleoSanQuintin));
        })
        .catch(async (err) => {
          console.log(err)
        })
    }
    else if (arrayEmpleoSanQuintin.length > 0){
      drawEmpleoIndicator(zone, arrayEmpleoSanQuintin)
    }
  }
}
async function drawEmpleoIndicator(zone, array){
  if(zone == "bajaCalifornia"){
    var data = new google.visualization.DataTable();
    data.addColumn('string', '');
    data.addColumn('number', '');
    for (var i = 0; i < array.length; i++) {
      data.addRow([array[i].date, (parseInt(array[i].bajaCalifornia))]);
    }
    var options = {
      title: 'Empleo Total - Baja California',
      hAxis: {title: 'Periodos'},
      vAxis: {title: 'Empleos'},
      curveType: 'function',
      legend: 'none',
    };
    var chart = new google.visualization.LineChart(document.getElementById('empleoChart'));
    document.getElementById("spinnerEmpleo").style.display = "none"
    document.getElementById("empleoChart").style.display = "block"
    chart.draw(data, options);
  }
  else if(zone == "zonaMetropolitana"){
    var data = new google.visualization.DataTable();
    data.addColumn('string', '');
    data.addColumn('number', '');
    for (var i = 0; i < array.length; i++) {
      data.addRow([array[i].date, (parseInt(array[i].zonaMetropolitana))]);
    }
    var options = {
      title: 'Empleo Total - Zona Metropolitana',
      hAxis: {title: 'Periodos'},
      vAxis: {title: 'Empleos'},
      curveType: 'function',
      legend: 'none',
    };
    var chart = new google.visualization.LineChart(document.getElementById('empleoChart'));
    document.getElementById("spinnerEmpleo").style.display = "none"
    document.getElementById("empleoChart").style.display = "block"
    chart.draw(data, options);
  }
  else if(zone == "tijuana"){
    var data = new google.visualization.DataTable();
    data.addColumn('string', '');
    data.addColumn('number', '');
    for (var i = 0; i < array.length; i++) {
      data.addRow([array[i].date, (parseInt(array[i].tijuana))]);
    }
    var options = {
      title: 'Empleo Total - Tijuana',
      hAxis: {title: 'Periodos'},
      vAxis: {title: 'Empleos'},
      curveType: 'function',
      legend: 'none',
    };
    var chart = new google.visualization.LineChart(document.getElementById('empleoChart'));
    document.getElementById("spinnerEmpleo").style.display = "none"
    document.getElementById("empleoChart").style.display = "block"
    chart.draw(data, options);
  }
  else if(zone == "tecate"){
    var data = new google.visualization.DataTable();
    data.addColumn('string', '');
    data.addColumn('number', '');
    for (var i = 0; i < array.length; i++) {
      data.addRow([array[i].date, (parseInt(array[i].tecate))]);
    }
    var options = {
      title: 'Empleo Total - Tecate',
      hAxis: {title: 'Periodos'},
      vAxis: {title: 'Empleos'},
      curveType: 'function',
      legend: 'none',
    };
    var chart = new google.visualization.LineChart(document.getElementById('empleoChart'));
    document.getElementById("spinnerEmpleo").style.display = "none"
    document.getElementById("empleoChart").style.display = "block"
    chart.draw(data, options);
  }
  else if(zone == "rosarito"){
    var data = new google.visualization.DataTable();
    data.addColumn('string', '');
    data.addColumn('number', '');
    for (var i = 0; i < array.length; i++) {
      data.addRow([array[i].date, (parseInt(array[i].rosarito))]);
    }
    var options = {
      title: 'Empleo Total - Rosarito',
      hAxis: {title: 'Periodos'},
      vAxis: {title: 'Empleos'},
      curveType: 'function',
      legend: 'none',
    };
    var chart = new google.visualization.LineChart(document.getElementById('empleoChart'));
    document.getElementById("spinnerEmpleo").style.display = "none"
    document.getElementById("empleoChart").style.display = "block"
    chart.draw(data, options);
  }
  else if(zone == "ensenada"){
    var data = new google.visualization.DataTable();
    data.addColumn('string', '');
    data.addColumn('number', '');
    for (var i = 0; i < array.length; i++) {
      data.addRow([array[i].date, (parseInt(array[i].ensenada))]);
    }
    var options = {
      title: 'Empleo Total - Ensenada',
      hAxis: {title: 'Periodos'},
      vAxis: {title: 'Empleos'},
      curveType: 'function',
      legend: 'none',
    };
    var chart = new google.visualization.LineChart(document.getElementById('empleoChart'));
    document.getElementById("spinnerEmpleo").style.display = "none"
    document.getElementById("empleoChart").style.display = "block"
    chart.draw(data, options);
  }
  else if(zone == "mexicali"){
    var data = new google.visualization.DataTable();
    data.addColumn('string', '');
    data.addColumn('number', '');
    for (var i = 0; i < array.length; i++) {
      data.addRow([array[i].date, (parseInt(array[i].mexicali))]);
    }
    var options = {
      title: 'Empleo Total - Mexicali',
      hAxis: {title: 'Periodos'},
      vAxis: {title: 'Empleos'},
      curveType: 'function',
      legend: 'none',
    };
    var chart = new google.visualization.LineChart(document.getElementById('empleoChart'));
    document.getElementById("spinnerEmpleo").style.display = "none"
    document.getElementById("empleoChart").style.display = "block"
    chart.draw(data, options);
  }
  else if(zone == "sanQuintin"){
    var data = new google.visualization.DataTable();
    data.addColumn('string', '');
    data.addColumn('number', '');
    for (var i = 0; i < array.length; i++) {
      data.addRow([array[i].date, (parseInt(array[i].sanQuintin))]);
    }
    var options = {
      title: 'Empleo Total - San Quintín',
      hAxis: {title: 'Periodos'},
      vAxis: {title: 'Empleos'},
      curveType: 'function',
      legend: 'none',
    };
    var chart = new google.visualization.LineChart(document.getElementById('empleoChart'));
    document.getElementById("spinnerEmpleo").style.display = "none"
    document.getElementById("empleoChart").style.display = "block"
    chart.draw(data, options);
  }
}