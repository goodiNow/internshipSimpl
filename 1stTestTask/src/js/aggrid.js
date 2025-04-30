const DEFAULT_COL_DEF = {
  sortable: true,
  filter: false,
  resizable: true
};

const SELECTION_COL_WIDTH = 50;

function formatDateCell(value) {
  if (!value) return '';
  const d = new Date(value);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
}

function formatNumberCell(value) {
  if (value == null || value === '') return '';
  const n = parseFloat(String(value).replace(/\s|,/g, ''));
  if (isNaN(n)) return '';
  return n.toLocaleString('ru-RU');
}

function createSelectionColumn(selectionName) {
  return {
    ...DEFAULT_COL_DEF,
    width: SELECTION_COL_WIDTH,
    cellRenderer: (params) =>
      `<input type="radio" name="${selectionName}" data-id="${params.node.id}" />`,
    suppressSizeToFit: true,
    sortable: false,
    filter: false
  };
}

function getColumnDefinitions(selectionName) {
  return [
    createSelectionColumn(selectionName),
    {
      headerName: 'Категория',
      field: 'category',
      ...DEFAULT_COL_DEF
    },
    {
      headerName: 'Сумма',
      field: 'sum',
      ...DEFAULT_COL_DEF,
      valueFormatter: (params) => formatNumberCell(params.value)
    },
    {
      headerName: 'Дата',
      field: 'date',
      ...DEFAULT_COL_DEF,
      valueFormatter: (params) => formatDateCell(params.value)
    }
  ];
}

function getGridOptions(rowData, selectionName) {
  return {
    rowData,
    columnDefs: getColumnDefinitions(selectionName),
    defaultColDef: DEFAULT_COL_DEF,
    onFirstDataRendered: (params) => params.api.sizeColumnsToFit()
  };
}

export function initializeGrids() {
  const incomeRows = [];
  const expenseRows = [];

  const incomeGridOptions = getGridOptions(incomeRows, 'incomeRowSelect');
  const expenseGridOptions = getGridOptions(expenseRows, 'expenseRowSelect');

  return {
    incomeRows,
    expenseRows,
    incomeGridOptions,
    expenseGridOptions
  };
}
