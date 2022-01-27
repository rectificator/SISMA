'use strict'


google.charts.load('current', {'packages':['corechart']})
.then(() => {
  drawChart(a_b_y_g_a_e_Config, 'avance_b_y_g_de_apoyo_en_salud_mental');
});

function drawChart(config, htmlContainerId) {

  const options = config.charOptions;
  const data = google.visualization.arrayToDataTable(config.chartValues);
  
  const chart = config.charType(document.getElementById(htmlContainerId));
  chart.draw(data, options);

  // Al hacer Click sobre la rebanada
  google.visualization.events.addListener(chart, 'click', clickHandler);

  

  function selectHandler() {
    var selectedItem = chart.getSelection()[0];
    if (selectedItem) {
      var topping = data.getValue(selectedItem.row, 0);
      var value = data.getValue(selectedItem.row, 1);
      alert('The user selected ' + topping + ' with value ' + value);
    }
  }

  // Escuchando el evento 'select', 
  google.visualization.events.addListener(chart, 'select', selectHandler);
  
}

function clickHandler(e) {
  //alert('The user is navigating to page ' + e['targetID']);
}
