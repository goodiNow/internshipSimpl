import { initializeGrids } from './aggrid.js';
import { initializeCharts, renderIncomeChart, renderExpenseComparisonChart } from './echarts.js';

const { incomeRows, expenseRows, incomeGridOptions, expenseGridOptions } = initializeGrids();

let incomeGridApi = null;
let expenseGridApi = null;
let chartsInitialized = false;

const tablesContainer = document.getElementById('tablesSection');
const chartsContainer = document.getElementById('chartsSection');

const btnShowTables = document.getElementById('showTablesBtn');
const btnShowCharts = document.getElementById('showChartsBtn');

const inputIncomeStart = document.getElementById('income-start');
const inputIncomeEnd = document.getElementById('income-end');
const btnApplyIncomeFilter = document.getElementById('applyIncomeFilterBtn');

const inputExpenseStart = document.getElementById('expenses-start');
const inputExpenseEnd = document.getElementById('expenses-end');
const btnApplyExpenseFilter = document.getElementById('applyExpenseFilterBtn');

const saveEntryButton = document.getElementById('saveEntryButton');
const dateInputs = document.querySelectorAll(
  '#income-start, #income-end, #expenses-start, #expenses-end, #modal-date'
);

const entryModal = new bootstrap.Modal(document.getElementById('dataModal'));
const entryCategoryInput = document.getElementById('modal-category');
const entrySumInput = document.getElementById('modal-sum');
const entryDateInput = document.getElementById('modal-date');

const VIEW_TYPE = {
  INCOME: 'income',
  EXPENSES: 'expenses'
};

let modalState = {
  isEditing: false,
  viewType: '',
  rowId: null
};

function getGridContext(source) {
  const viewType =
    typeof source === 'string'
      ? source
      : source.closest('.grid-wrapper').id === 'income-section'
      ? VIEW_TYPE.INCOME
      : VIEW_TYPE.EXPENSES;

  const api = viewType === VIEW_TYPE.INCOME ? incomeGridApi : expenseGridApi;
  const rows = viewType === VIEW_TYPE.INCOME ? incomeRows : expenseRows;

  return { viewType, api, rows };
}

function loadRows() {
  const inc = JSON.parse(localStorage.getItem('incomeData') || '[]');
  const exp = JSON.parse(localStorage.getItem('expensesData') || '[]');

  incomeRows.splice(0, incomeRows.length, ...inc);
  expenseRows.splice(0, expenseRows.length, ...exp);
}

function saveRows() {
  localStorage.setItem('incomeData', JSON.stringify(incomeRows));
  localStorage.setItem('expensesData', JSON.stringify(expenseRows));
}

function setupGrids() {
  incomeGridOptions.onGridReady = (e) => (incomeGridApi = e.api);
  expenseGridOptions.onGridReady = (e) => (expenseGridApi = e.api);

  agGrid.createGrid(document.getElementById('incomeGrid'), incomeGridOptions);
  agGrid.createGrid(document.getElementById('expensesGrid'), expenseGridOptions);
}

function displayTables() {
  tablesContainer.classList.replace('d-none', 'd-flex');
  chartsContainer.classList.replace('d-flex', 'd-none');
}

function displayCharts() {
  tablesContainer.classList.replace('d-flex', 'd-none');
  chartsContainer.classList.replace('d-none', 'd-flex');

  if (!chartsInitialized) {
    initializeCharts();
    chartsInitialized = true;
  }

  renderIncomeChart(inputIncomeStart.value, inputIncomeEnd.value);
  renderExpenseComparisonChart(inputExpenseStart.value, inputExpenseEnd.value);
}

function openEntryModal(button) {
  modalState = {
    isEditing: false,
    viewType: button.dataset.target,
    rowId: null
  };

  entryCategoryInput.value = '';
  entrySumInput.value = '';
  entryDateInput.value = '';

  entryModal.show();
}

function openEditEntryModal(button) {
  const { viewType, api } = getGridContext(button);
  // determine the actual radio-group name used in aggrid.js
  const groupName = viewType === VIEW_TYPE.EXPENSES ? 'expenseRowSelect' : 'incomeRowSelect';

  const sel = document.querySelector(`input[name="${groupName}"]:checked`);
  if (!sel) return alert('Выберите строку для редактирования');

  const node = api.getRowNode(sel.dataset.id);

  modalState = {
    isEditing: true,
    viewType,
    rowId: sel.dataset.id
  };

  entryCategoryInput.value = node.data.category;
  entrySumInput.value = node.data.sum;
  entryDateInput.value = node.data.date;

  entryModal.show();
}

function saveEntry() {
  const { isEditing, viewType, rowId } = modalState;
  const { api, rows } = getGridContext(viewType);

  const newRecord = {
    category: entryCategoryInput.value,
    sum: entrySumInput.value.replace(/\s/g, ''),
    date: entryDateInput.value
  };

  if (isEditing) {
    const node = api.getRowNode(rowId);
    Object.assign(node.data, newRecord);
    node.setData(node.data);
  } else {
    api.applyTransaction({ add: [newRecord] });
    rows.push(newRecord);
  }

  saveRows();

  if (viewType === VIEW_TYPE.INCOME) {
    renderIncomeChart(inputIncomeStart.value, inputIncomeEnd.value);
  } else {
    renderExpenseComparisonChart(inputExpenseStart.value, inputExpenseEnd.value);
  }

  entryModal.hide();
}

function deleteEntry(button) {
  const { viewType, api, rows } = getGridContext(button);
  const groupName = viewType === VIEW_TYPE.EXPENSES ? 'expenseRowSelect' : 'incomeRowSelect';

  const sel = document.querySelector(`input[name="${groupName}"]:checked`);
  if (!sel) return alert('Выберите строку для удаления');

  const node = api.getRowNode(sel.dataset.id);
  api.applyTransaction({ remove: [node.data] });

  const idx = rows.findIndex((r) => r === node.data);
  if (idx >= 0) rows.splice(idx, 1);

  saveRows();

  if (viewType === VIEW_TYPE.INCOME) {
    renderIncomeChart(inputIncomeStart.value, inputIncomeEnd.value);
  } else {
    renderExpenseComparisonChart(inputExpenseStart.value, inputExpenseEnd.value);
  }
}

function handleDatePicker(input) {
  try {
    input.showPicker();
  } catch {
    input.focus();
  }
}

function applyIncomeChartFilter() {
  renderIncomeChart(inputIncomeStart.value, inputIncomeEnd.value);
}

function applyExpenseChartFilter() {
  renderExpenseComparisonChart(inputExpenseStart.value, inputExpenseEnd.value);
}

document.addEventListener('DOMContentLoaded', () => {
  loadRows();
  setupGrids();

  btnShowTables.addEventListener('click', displayTables);
  btnShowCharts.addEventListener('click', displayCharts);

  tablesContainer.addEventListener('click', (e) => {
    const btn = e.target;
    if (btn.matches('.open-modal-add')) openEntryModal(btn);
    else if (btn.matches('.open-modal-edit')) openEditEntryModal(btn);
    else if (btn.matches('.delete-btn')) deleteEntry(btn);
  });

  saveEntryButton.addEventListener('click', saveEntry);

  dateInputs.forEach((input) => {
    input.addEventListener('focus', () => handleDatePicker(input));
    input.addEventListener('click', () => handleDatePicker(input));
  });

  btnApplyIncomeFilter.addEventListener('click', applyIncomeChartFilter);
  btnApplyExpenseFilter.addEventListener('click', applyExpenseChartFilter);

  displayTables();
});

window.addEventListener('beforeunload', saveRows);
