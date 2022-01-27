'use strict'
const config = {
    chartValues: [
        ['Estado', 'PERSONAS', 'ACCIONES', 'PERSONAS','ACCIONES','PERSONAS','ACCIONES', 'ATENCIÓN', 'SUICIDIO', 'POLITICAS'],
        ['Aguascalientes', 8, 34,2,2,2,2,2,2,2],
        ['Baja California', 8, 34,2,2,2,2,2,2,2],
        ['Baja California Sur', 8, 34,2,2,2,2,2,2,2],
        ['Campeche', 8, 34,2,2,2,2,2,2,2],
        ['Chiapas', 8, 34,2,2,2,2,2,2,2],
        ['Chihuahua', 8, 34,2,2,2,2,2,2,2],
        ['Ciudad de México', 8, 34,2,2,2,2,2,2,2],
        ['Coahuila', 8, 34,2,2,2,2,2,2,2],
        ['Colima', 8, 34,2,2,2,2,2,2,2],
        ['Durango', 8, 34,2,2,2,2,2,2,2],
        ['Estado de México', 8, 34,2,2,2,2,2,2,2],
        ['Guanajuato', 8, 34,2,2,2,2,2,2,2],
        ['Guerrero', 8, 34,2,2,2,2,2,2,2],
        ['Hidalgo', 8, 34,2,2,2,2,2,2,2],
        ['Jalisco', 8, 34,2,2,2,2,2,2,2],
        ['Michoacán', 8, 34,2,2,2,2,2,2,2],
        ['Morelos', 8, 34,2,2,2,2,2,2,2],
        ['Nayarit', 8, 34,2,2,2,2,2,2,2],
        ['Nuevo León', 8, 34,2,2,2,2,2,2,2],
        ['Oaxaca', 8, 34,2,2,2,2,2,2,2],
        ['Puebla', 8, 34,2,2,2,2,2,2,2],
        ['Querétaro', 8, 34,2,2,2,2,2,2,2],
        ['Quintana Roo', 8, 34,2,2,2,2,2,2,2],
        ['San Luis Potosí', 8, 34,2,2,2,2,2,2,2],
        ['Sinaloa', 8, 34,2,2,2,2,2,2,2],
        ['Sonora', 8, 34,2,2,2,2,2,2,2],
        ['Tabasco', 8, 34,2,2,2,2,2,2,2],
        ['Tamaulipas', 8, 34,2,2,2,2,2,2,2],
        ['Tlaxcala', 8, 34,2,2,2,2,2,2,2],
        ['Veracruz', 8, 34,2,2,2,2,2,2,2],
        ['Yucatán', 8, 34,2,2,2,2,2,2,2],
        ['Zacatecas', 8, 34,2,2,2,2,2,2,2]
    ],
    // Puedes encontrar todas las opciones de configuración disponibles en:
    // https://developers.google.com/chart/interactive/docs/gallery/scatterchart#configuration-options
    chartOptions: {
      allowHtml: true,
      width: '100%'
    },
    charType: (htmlElement) => new google.visualization.Table(htmlElement),
    
};