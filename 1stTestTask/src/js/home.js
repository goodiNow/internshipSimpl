import { initGrid } from "./aggrid.js";
import { initChart, updateChart, updateExpensesChart } from "./echarts.js";

const {
  gridIncomeData,
  gridExpensesData,
  gridIncomeOptions,
  gridExpensesOptions,
} = initGrid();

let gridIncomeApi = null;
let gridExpensesApi = null;
let chartInitialized = false;

const tablesContainer = document.querySelector(".tables-container");
const chartsContainer = document.querySelector(".charts-container");
const incomeStartInput = document.getElementById("income-start");
const incomeEndInput = document.getElementById("income-end");
const expensesStartInput = document.getElementById("expenses-start");
const expensesEndInput = document.getElementById("expenses-end");

const modalElement = document.getElementById("dataModal");
const dataModal = new bootstrap.Modal(modalElement);
const modalCategory = document.getElementById("modal-category");
const modalSum = document.getElementById("modal-sum");
const modalDate = document.getElementById("modal-date");

const modalState = {
  editing: false,
  gridType: "",
  rowId: null,
};

function loadData() {
  const inc = JSON.parse(localStorage.getItem("incomeData") || "[]");
  const exp = JSON.parse(localStorage.getItem("expensesData") || "[]");
  gridIncomeData.splice(0, gridIncomeData.length, ...inc);
  gridExpensesData.splice(0, gridExpensesData.length, ...exp);
}

function saveData() {
  localStorage.setItem("incomeData", JSON.stringify(gridIncomeData));
  localStorage.setItem("expensesData", JSON.stringify(gridExpensesData));
}

function initGrids() {
  agGrid.createGrid(document.querySelector("#incomeGrid"), gridIncomeOptions);
  agGrid.createGrid(
    document.querySelector("#expensesGrid"),
    gridExpensesOptions
  );

  gridIncomeOptions.onGridReady = (e) => (gridIncomeApi = e.api);
  gridExpensesOptions.onGridReady = (e) => (gridExpensesApi = e.api);
}

function showTables() {
  tablesContainer.style.display = "flex";
  chartsContainer.style.display = "none";
}

function showCharts() {
  tablesContainer.style.display = "none";
  chartsContainer.style.display = "flex";

  if (!chartInitialized) {
    initChart();
    chartInitialized = true;
  } else {
    updateChart();
    updateExpensesChart();
  }
}

function openAddModal(btn) {
  modalState.editing = false;
  modalState.gridType = btn.dataset.target === "grid1" ? "income" : "expenses";
  modalCategory.value = "";
  modalSum.value = "";
  modalDate.value = "";
  dataModal.show();
}

function openEditModal(btn) {
  const parent = btn.closest(".grid-wrapper");
  const isIncome = !!parent.querySelector("#incomeGrid");
  const gridType = isIncome ? "income" : "expenses";
  const api = isIncome ? gridIncomeApi : gridExpensesApi;

  const sel = document.querySelector(
    `input[name="${gridType}RowSelect"]:checked`
  );
  if (!sel) return alert("Выберите строку для редактирования");

  const rowNode = api.getRowNode(sel.dataset.id);
  if (!rowNode) return alert("Строка не найдена");

  modalState.editing = true;
  modalState.gridType = gridType;
  modalState.rowId = sel.dataset.id;

  modalCategory.value = rowNode.data.category;
  modalSum.value = rowNode.data.sum;
  modalDate.value = rowNode.data.date;
  dataModal.show();
}

function saveModal() {
  const { editing, gridType, rowId } = modalState;
  const api = gridType === "income" ? gridIncomeApi : gridExpensesApi;
  const data = gridType === "income" ? gridIncomeData : gridExpensesData;

  const newRow = {
    category: modalCategory.value,
    sum: modalSum.value.replace(/\s/g, ""),
    date: modalDate.value,
  };

  if (editing) {
    const rowNode = api.getRowNode(rowId);
    const idx = data.findIndex((d) => d === rowNode.data);
    rowNode.setData(newRow);
    if (idx >= 0) data[idx] = newRow;
  } else {
    api.applyTransaction({ add: [newRow] });
    data.push(newRow);
  }

  localStorage.setItem(`${gridType}Data`, JSON.stringify(data));
  if (chartInitialized) {
    gridType === "income" ? updateChart() : updateExpensesChart();
  }
  dataModal.hide();
}

function deleteRow(btn) {
  const parent = btn.closest(".grid-wrapper");
  const isIncome = !!parent.querySelector("#incomeGrid");
  const gridType = isIncome ? "income" : "expenses";
  const api = isIncome ? gridIncomeApi : gridExpensesApi;
  const data = isIncome ? gridIncomeData : gridExpensesData;

  const sel = document.querySelector(
    `input[name="${gridType}RowSelect"]:checked`
  );
  if (!sel) return alert("Выберите строку для удаления");

  const rowNode = api.getRowNode(sel.dataset.id);
  api.applyTransaction({ remove: [rowNode.data] });

  const idx = data.findIndex((d) => d === rowNode.data);
  if (idx >= 0) data.splice(idx, 1);

  localStorage.setItem(`${gridType}Data`, JSON.stringify(data));
  if (chartInitialized) {
    isIncome ? updateChart() : updateExpensesChart();
  }
}

function showDatePicker(input) {
  if (typeof input.showPicker === "function") {
    input.showPicker();
  } else {
    input.focus();
  }
}

function applyIncomeFilter() {
  updateChart(incomeStartInput.value, incomeEndInput.value);
}

function applyExpensesFilter() {
  updateExpensesChart(expensesStartInput.value, expensesEndInput.value);
}

window.showTables = showTables;
window.showCharts = showCharts;
window.openAddModal = openAddModal;
window.openEditModal = openEditModal;
window.saveModal = saveModal;
window.deleteRow = deleteRow;
window.showDatePicker = showDatePicker;
window.applyIncomeFilter = applyIncomeFilter;
window.applyExpensesFilter = applyExpensesFilter;

document.addEventListener("DOMContentLoaded", () => {
  loadData();
  initGrids();
});

window.addEventListener("beforeunload", saveData);
