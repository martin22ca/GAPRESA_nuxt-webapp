<template>
    <HotTable :settings="settings" :data="data"></HotTable>
  </template>
  
  <script>
    import HotTable from '~/plugins/vue-handsontable'
  
    export default {
      data: function() {
        return {
          settings: {
            data: [
              ["", "Ford", "Volvo", "Toyota", "Honda"],
              ["2016", 10, 11, 12, 13],
              ["2017", 20, 11, 14, 13],
              ["2018", 30, 15, 12, 13]
            ],
            colHeaders: true,
            rowHeaders: true,
            licenseKey: 'non-commercial-and-evaluation'
          }
        };
      },
    
      head: {
        link: [
          { rel: 'stylesheet', type: 'text/css', 
            href: '/your/path/to/css/directory/handsontable.full.min.css' },
        ]
      },
      components: {
        HotTable
      }
    }
  </script>