'use strict'
const a_b_y_g_a_e_Config = {
    chartValues: [
        ['Estado', 'NO. TERAPEUTAS DE GRUPOS DE APOYO EMOCIONAL', 'NO. BRIGADAS DE APOYO EN SALUD MENTAL', 'NO. BRIGADISTAS DE APOYO EN SALUD MENTAL'],
        ['Aguascalientes', 2, 1, 3],
        ['Baja California', 3, 4, 16],
        ['Baja California Sur', 7, 1, 4],
        ['Campeche', 32, 32, 32],
        ['Chiapas', 2, 32, 9],
        ['Chihuahua', 6, 32, 32],
        ['Ciudad de México', 5, 32, 7],
        ['Coahuila', 4, 7, 32],
        ['Colima', 4, 5, 32],
        ['Durango', 1, 21, 3],
        ['Estado de México', 32, 4, 34],
        ['Guanajuato', 32, 9, 32],
        ['Guerrero', 6, 32, 0],
        ['Hidalgo', 2, 0, 2],
        ['Jalisco', 32, 1, 3],
        ['Michoacán', 1, 32, 5],
        ['Morelos', 2, 1, 2],
        ['Nayarit', 4, 67, 7],
        ['Nuevo León', 4, 5, 7],
        ['Oaxaca', 0, 32, 3],
        ['Puebla', 0, 0, 0],
        ['Querétaro', 2, 1, 4],
        ['Quintana Roo', 0, 0, 0],
        ['San Luis Potosí', 0, 1, 6],
        ['Sinaloa', 2, 1, 5],
        ['Sonora', 22, 20, 80],
        ['Tabasco', 0, 0, 0],
        ['Tamaulipas', 3, 1, 3],
        ['Tlaxcala', 0, 0, 0],
        ['Veracruz', 2, 1, 4],
        ['Yucatán', 3, 4, 16],
        ['Zacatecas', 2, 1, 3]

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
        bar: { groupWidth: "70%" }
      },
    charType: (htmlElement) => new google.visualization.BarChart(htmlElement),
    
};