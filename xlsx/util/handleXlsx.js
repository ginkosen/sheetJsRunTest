module.exports = (sheetWorkbook, toJsonOptions, XLSX) => {
  const loadExcelData = workbook => {
    const sheetList = [];
    workbook.SheetNames.forEach(item => {
      sheetList.push({
        id: item,
        name: item,
        data: parseSheetData(workbook.Sheets[item]),
      });
    });
    return sheetList;
  };

  const parseSheetData = sheet => {
    const header = [];
    let columnCount = 0;
    try {
      columnCount = XLSX.utils.decode_range(sheet['!ref']).e.c + 1;
    } catch (e) {
      console.log('import error.', e);
    }
    let emptyCount = 0;
    for (let i = 0; i < columnCount; ++i) {
      const cell = sheet[`${ XLSX.utils.encode_col(i) }1`];
      if (cell) {
        header[i] = cell.v;
      } else {
        if (emptyCount > 0) {
          header[i] = `__EMPTY_${ emptyCount }`;
        } else {
          header[i] = `__EMPTY`;
        }
        emptyCount++;
      }
    }
    const list = XLSX.utils.sheet_to_json(sheet, toJsonOptions);
    return {
      header: header,
      headerName: header,
      list: list,
    };
  };
  return loadExcelData(sheetWorkbook);
};
