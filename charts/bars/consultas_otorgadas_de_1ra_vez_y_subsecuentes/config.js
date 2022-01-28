'use strict'
const c_O_1_v_s_Config = {
    chartValues: [
        ['Estado', 'NO. TERAPEUTAS DE GRUPOS DE APOYO EMOCIONAL'],
        ['Aguascalientes', 2],
        ['Baja California', 3],
        ['Baja California Sur', 7],
        ['Campeche', 32],
        ['Chiapas', 2],
        ['Chihuahua', 6],
        ['Ciudad de México', 5],
        ['Coahuila', 4],
        ['Colima', 4],
        ['Durango', 1],
        ['Estado de México', 32],
        ['Guanajuato', 32],
        ['Guerrero', 6],
        ['Hidalgo', 2],
        ['Jalisco', 32],
        ['Michoacán', 1],
        ['Morelos', 2],
        ['Nayarit', 4],
        ['Nuevo León', 4],
        ['Oaxaca', 0],
        ['Puebla', 0],
        ['Querétaro', 2],
        ['Quintana Roo', 0],
        ['San Luis Potosí', 0],
        ['Sinaloa', 2],
        ['Sonora', 22],
        ['Tabasco', 0],
        ['Tamaulipas', 3],
        ['Tlaxcala', 0],
        ['Veracruz', 2],
        ['Yucatán', 3],
        ['Zacatecas', 2]

    ],
    // Puedes encontrar todas las opciones de configuración disponibles en:
    // https://developers.google.com/chart/interactive/docs/gallery/barchart#configuration-options
    charOptions: {
        title: 'AVANCE BRIGADAS Y GRUPOS DE APOYO EN SALUD MENTAL ',
        legend: { position: 'top' },
        chart: { title: 'Chess opening moves',
                 subtitle: 'popularity by percentage' },
        bars: 'horizontal', // Required for Material Bar Charts.
        axes: {
          x: {
            0: { side: 'Estado', label: 'Cantidades'} // Top x-axis.
          }
        },
        bar: { groupWidth: "50%" }
      },
    charType: (htmlElement) => new google.visualization.BarChart(htmlElement),
    
};