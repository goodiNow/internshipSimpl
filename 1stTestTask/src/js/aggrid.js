export function initGrid() {
  const gridIncomeData = [];
  const gridExpensesData = [];

  const createColumnDefs = (radioName) => [
    {
      width: 50,
      cellRenderer: (params) =>
        `<input type="radio" name="${radioName}" data-id="${params.node.id}" />`,
    },
    { field: "Категория" },
    { field: "Сумма" },
    { field: "Дата" },
  ];

  const gridIncomeOptions = {
    autoSizeStrategy: { type: "fitCellContents" },
    rowData: gridIncomeData,
    columnDefs: createColumnDefs("incomeRowSelect"),
  };

  const gridExpensesOptions = {
    autoSizeStrategy: { type: "fitCellContents" },
    rowData: gridExpensesData,
    columnDefs: createColumnDefs("expensesRowSelect"),
  };

  return {
    gridIncomeData,
    gridExpensesData,
    gridIncomeOptions,
    gridExpensesOptions,
  };
}
