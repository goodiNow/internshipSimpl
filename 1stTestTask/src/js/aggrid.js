export function initGrid() {
  const gridIncomeData = [];
  const gridExpensesData = [];

  function formatDate(value) {
    if (!value) return "";
    const d = new Date(value);
    const day   = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year  = d.getFullYear();
    return `${day}.${month}.${year}`;
  }

  function createRadioColumn(radioName) {
    return {
      width: 50,
      cellRenderer: params =>
        `<input type="radio" name="${radioName}" data-id="${params.node.id}" />`,
    };
  }

  function createColumnDefs(radioName) {
    return [
      createRadioColumn(radioName),
      { headerName: "Категория", field: "category" },
      { headerName: "Сумма",      field: "sum"      },
      {
        headerName: "Дата",
        field:      "date",
        valueFormatter: params => formatDate(params.value),
      },
    ];
  }

  function createGridOptions(rowData, radioName) {
    return {
      autoSizeStrategy: { type: "fitCellContents" },
      rowData,
      columnDefs: createColumnDefs(radioName),
    };
  }

  const gridIncomeOptions   = createGridOptions(gridIncomeData,   "incomeRowSelect");
  const gridExpensesOptions = createGridOptions(gridExpensesData, "expensesRowSelect");

  return {
    gridIncomeData,
    gridExpensesData,
    gridIncomeOptions,
    gridExpensesOptions,
  };
}
