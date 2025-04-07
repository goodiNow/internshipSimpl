export function initGrid() {
  const gridOptions1 = {
    autoSizeStrategy: {
      type: "fitCellContents",
    },
    rowData: [
      { Категория: "Работа1", Сумма: "52 001", Дата: "12.04.2024" },
      { Категория: "Работа2", Сумма: "52 002", Дата: "13.04.2024" },
      { Категория: "Работа3", Сумма: "52 003", Дата: "14.04.2024" },
    ],
    columnDefs: [
      {
        width: 50,
        cellRenderer: function (params) {
          return `<input type="radio" name="rowSelect" value="${params.value}" />`;
        },
      },
      { field: "Категория" },
      { field: "Сумма" },
      { field: "Дата" },
    ],
  };

  const gridOptions2 = {
    autoSizeStrategy: {
      type: "fitCellContents",
    },
    rowData: [
      { Категория: "Работа1", Сумма: "52 001", Дата: "12.04.2024" },
      { Категория: "Работа2", Сумма: "52 002", Дата: "13.04.2024" },
      { Категория: "Работа3", Сумма: "52 003", Дата: "14.04.2024" },
    ],
    columnDefs: [
      {
        width: 50,
        cellRenderer: function (params) {
          return `<input type="radio" name="rowSelect" value="${params.value}" />`;
        },
      },
      { field: "Категория" },
      { field: "Сумма" },
      { field: "Дата" },
    ],
  };

  const firstGrid = document.querySelector("#grid1");
  const secondGrid = document.querySelector("#grid2");

  // Инициализируем таблицы
  const firstGridInstance = agGrid.createGrid(firstGrid, gridOptions1);
  const secondGridInstance = agGrid.createGrid(secondGrid, gridOptions2);

  // Возвращаем ссылки на API каждой таблицы через событие
  return {
    firstGridInstance: firstGridInstance.gridOptions.api,  // API первой таблицы
    secondGridInstance: secondGridInstance.gridOptions.api, // API второй таблицы
  };
}
