export function initGrid() {
  const gridIncomeData = [
    { Категория: "Работа", Сумма: "52 001", Дата: "12.04.2024" },
    { Категория: "Работа", Сумма: "52 002", Дата: "13.04.2024" },
    { Категория: "Работа", Сумма: "52 003", Дата: "14.04.2024" },
  ];

  const gridExpensesData = [
    { Категория: "Работа", Сумма: "52 001", Дата: "12.04.2024" },
    { Категория: "Работа", Сумма: "52 002", Дата: "13.04.2024" },
    { Категория: "Работа", Сумма: "52 003", Дата: "14.04.2024" },
  ];

  const gridIncomeOptions = {
    autoSizeStrategy: {
      type: "fitCellContents",
    },
    rowData: gridIncomeData,
    columnDefs: [
      {
        width: 50,
        cellRenderer: (params) =>
          `<input type="radio" name="incomeRowSelect" data-id="${params.node.id}" />`,
      },
      { field: "Категория" },
      { field: "Сумма" },
      { field: "Дата" },
    ],
  };

  const gridExpensesOptions = {
    autoSizeStrategy: {
      type: "fitCellContents",
    },
    rowData: gridExpensesData,
    columnDefs: [
      {
        width: 50,
        cellRenderer: (params) =>
          `<input type="radio" name="expensesRowSelect" data-id="${params.node.id}" />`,
      },
      { field: "Категория" },
      { field: "Сумма" },
      { field: "Дата" },
    ],
  };

  return {
    gridIncomeData,
    gridExpensesData,
    gridIncomeOptions,
    gridExpensesOptions,
  };
}
