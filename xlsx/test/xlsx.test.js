const XLSX = require('xlsx');
const handleXlsx = require('../util/handleXlsx');

(() => {
  const workbook = XLSX.readFile('../doc/test.xlsx', {
    raw: true,
    cellDates: true,
  });
  const sheetList = handleXlsx(workbook, null, XLSX);
  console.log(sheetList[0].data.list);
})();
