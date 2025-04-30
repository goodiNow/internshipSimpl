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

const tablesSection = document.getElementById("tablesSection");
const chartsSection = document.getElementById("chartsSection");
const headerBtns = document.querySelectorAll(".page-header button");
const incomeStartInput = document.getElementById("income-start");
const incomeEndInput = document.getElementById("income-end");
const expensesStartInput = document.getElementById("expenses-start");
const expensesEndInput = document.getElementById("expenses-end");
const modalSaveBtn = document.querySelector(
  "#dataModal .modal-footer .btn-primary"
);
const dateInputs = document.querySelectorAll(
  "#income-start, #income-end, #expenses-start, #expenses-end, #modal-date"
);
const chartFilterBtns = document.querySelectorAll(".chart-filter .btn-primary");

const dataModal = new bootstrap.Modal(document.getElementById("dataModal"));
const modalCategory = document.getElementById("modal-category");
const modalSum = document.getElementById("modal-sum");
const modalDate = document.getElementById("modal-date");

const GRID_TYPE = {
  INCOME: "income",
  EXPENSES: "expenses",
};

let modalState = {
  editing: false,
  gridType: "",
  rowId: null,
};

function getContext(btnOrType) {
  const type =
    typeof btnOrType === "string"
      ? btnOrType
      : btnOrType.closest(".grid-wrapper").id === "income-section"
      ? GRID_TYPE.INCOME
      : GRID_TYPE.EXPENSES;

  const api = type === GRID_TYPE.INCOME ? gridIncomeApi : gridExpensesApi;
  const data = type === GRID_TYPE.INCOME ? gridIncomeData : gridExpensesData;

  return { type, api, data };
}

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
  gridIncomeOptions.onGridReady = (e) => (gridIncomeApi = e.api);
  gridExpensesOptions.onGridReady = (e) => (gridExpensesApi = e.api);

  agGrid.createGrid(document.getElementById("incomeGrid"), gridIncomeOptions);
  agGrid.createGrid(
    document.getElementById("expensesGrid"),
    gridExpensesOptions
  );
}

function showTables() {
  tablesSection.classList.replace("d-none", "d-flex");
  chartsSection.classList.replace("d-flex", "d-none");
}

function showCharts() {
  tablesSection.classList.replace("d-flex", "d-none");
  chartsSection.classList.replace("d-none", "d-flex");

  if (!chartInitialized) {
    initChart();
    chartInitialized = true;
  }
  updateChart(incomeStartInput.value, incomeEndInput.value);
  updateExpensesChart(expensesStartInput.value, expensesEndInput.value);
}


function openAddModal(btn) {
  modalState = {
    editing: false,
    gridType: btn.dataset.target,
    rowId: null,
  };

  modalCategory.value = "";
  modalSum.value = "";
  modalDate.value = "";

  dataModal.show();
}

function openEditModal(btn) {
  const { type, api } = getContext(btn);

  const sel = document.querySelector(`input[name="${type}RowSelect"]:checked`);
  if (!sel) return alert("Выберите строку для редактирования");

  const rowNode = api.getRowNode(sel.dataset.id);

  modalState = {
    editing: true,
    gridType: type,
    rowId: sel.dataset.id,
  };

  modalCategory.value = rowNode.data.category;
  modalSum.value = rowNode.data.sum;
  modalDate.value = rowNode.data.date;

  dataModal.show();
}

function saveModal() {
  const { editing, gridType, rowId } = modalState;
  const { api, data } = getContext(gridType);

  const newRow = {
    category: modalCategory.value,
    sum: modalSum.value.replace(/\s/g, ""),
    date: modalDate.value,
  };

  if (editing) {
    const rn = api.getRowNode(rowId);
    Object.assign(rn.data, newRow);
    rn.setData(rn.data);
  } else {
    api.applyTransaction({ add: [newRow] });
    data.push(newRow);
  }

  saveData();
  gridType === GRID_TYPE.INCOME ? updateChart() : updateExpensesChart();

  dataModal.hide();
}

function deleteRow(btn) {
  const { type, api, data } = getContext(btn);

  const sel = document.querySelector(`input[name="${type}RowSelect"]:checked`);
  if (!sel) return alert("Выберите строку для удаления");

  const rn = api.getRowNode(sel.dataset.id);
  api.applyTransaction({ remove: [rn.data] });

  const idx = data.findIndex((d) => d === rn.data);
  if (idx >= 0) data.splice(idx, 1);

  saveData();
  type === GRID_TYPE.INCOME ? updateChart() : updateExpensesChart();
}

function showDatePicker(input) {
  try {
    input.showPicker();
  } catch {
    input.focus();
  }
}

function applyIncomeFilter() {
  updateChart(incomeStartInput.value, incomeEndInput.value);
}

function applyExpensesFilter() {
  updateExpensesChart(expensesStartInput.value, expensesEndInput.value);
}

document.addEventListener("DOMContentLoaded", () => {
  loadData();
  initGrids();

  headerBtns[0].addEventListener("click", showTables);
  headerBtns[1].addEventListener("click", showCharts);

  tablesSection.addEventListener("click", (e) => {
    const b = e.target;
    if (b.matches(".open-modal-add")) openAddModal(b);
    else if (b.matches(".open-modal-edit")) openEditModal(b);
    else if (b.matches(".delete-btn")) deleteRow(b);
  });

  modalSaveBtn.addEventListener("click", saveModal);

  dateInputs.forEach((input) => {
    input.addEventListener("focus", () => showDatePicker(input));
    input.addEventListener("click", () => showDatePicker(input));
  });

  chartFilterBtns[0].addEventListener("click", applyIncomeFilter);
  chartFilterBtns[1].addEventListener("click", applyExpensesFilter);

  showTables();
});

window.addEventListener("beforeunload", saveData);
