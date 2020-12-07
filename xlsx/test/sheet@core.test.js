const XLSX = require('@sheet/core');
const handleXlsx = require('../util/handleXlsx');

(() => {
  const workbook = XLSX.readFile('../doc/test.xlsx', {
    raw: true,
    cellDates: true,
  });
  const sheetList = handleXlsx(workbook, {
    raw: true,
  }, XLSX);
  console.log(sheetList[0].data.list);
})();
