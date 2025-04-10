import { initGrid } from "./aggrid.js";
import { initChart } from "./echarts.js";

const showTablesBtn = document.getElementById("show-tables");
const showChartsBtn = document.getElementById("show-charts");
const tablesContainer = document.querySelector(".tables-container");
const chartsContainer = document.querySelector(".charts-container");

const modalMenu = document.getElementById("modal-menu");
const modalCategory = document.getElementById("modal-category");
const modalSum = document.getElementById("modal-sum");
const modalDate = document.getElementById("modal-date");
const modalSaveBtn = document.getElementById("modal-save-btn");

const openModalAdd = document.querySelectorAll(".open-modal-add");
const openModalEdit = document.querySelectorAll(".open-modal-edit");
const deleteBtns = document.querySelectorAll(".delete-btn");

let chartInitialized = false;
let currentTargetGrid = null;

const {
  gridIncomeData,
  gridExpensesData,
  gridIncomeOptions,
  gridExpensesOptions,
} = initGrid();

let gridIncomeApi;
let gridExpensesApi;

gridIncomeOptions.onGridReady = (event) => {
  gridIncomeApi = event.api;
  window.gridIncomeApi = gridIncomeApi;
};

gridExpensesOptions.onGridReady = (event) => {
  gridExpensesApi = event.api;
  window.gridExpensesApi = gridExpensesApi;
};

document.addEventListener("DOMContentLoaded", () => {
  const IncomeGrid = document.querySelector("#incomeGrid");
  const expensesGrid = document.querySelector("#expensesGrid");

  agGrid.createGrid(IncomeGrid, gridIncomeOptions);
  agGrid.createGrid(expensesGrid, gridExpensesOptions);
});

showChartsBtn.addEventListener("click", () => {
  tablesContainer.style.display = "none";
  chartsContainer.style.display = "flex";

  if (!chartInitialized) {
    initChart();
    chartInitialized = true;
  }
});

showTablesBtn.addEventListener("click", () => {
  tablesContainer.style.display = "flex";
  chartsContainer.style.display = "none";
});

openModalAdd.forEach((btn) => {
  btn.addEventListener("click", () => {
    modalMenu.style.display = "flex";

    modalMenu.dataset.editing = "false";

    modalMenu.dataset.gridType = btn.dataset.target === "grid1" ? "income" : "expenses";

    modalCategory.value = "";
    modalSum.value = "";
    modalDate.value = "";
  });
});

modalSaveBtn.addEventListener("click", () => {
  const newRow = {
    Категория: modalCategory.value,
    Сумма: modalSum.value,
    Дата: modalDate.value,
  };

  const gridType = modalMenu.dataset.gridType;

  if (modalMenu.dataset.editing === "true") {
    const api =
      gridType === "income" ? window.gridIncomeApi : window.gridExpensesApi;
    const rowId = modalMenu.dataset.rowId;

    const rowNode = api.getRowNode(rowId);
    if (rowNode) {
      rowNode.setData(newRow);
    }
  } else {
    const api =
      gridType === "income" ? window.gridIncomeApi : window.gridExpensesApi;
    api.applyTransaction({ add: [newRow] });
  }

  modalMenu.style.display = "none";
  modalMenu.dataset.editing = "false";
  modalMenu.dataset.gridType = "";
  modalMenu.dataset.rowId = "";
});

window.addEventListener("click", (event) => {
  if (event.target === modalMenu) {
    modalMenu.style.display = "none";
  }
});

openModalEdit.forEach((btn) => {
  btn.addEventListener("click", () => {
    const parentGrid = btn.closest(".grid-wrapper");
    const isIncome = parentGrid.querySelector("#incomeGrid") !== null;

    const radioName = isIncome ? "incomeRowSelect" : "expensesRowSelect";
    const selectedRadio = document.querySelector(
      `input[name="${radioName}"]:checked`
    );

    if (!selectedRadio) {
      alert("Выберите строку для редактирования");
      return;
    }

    const rowId = selectedRadio.getAttribute("data-id");
    const api = isIncome ? window.gridIncomeApi : window.gridExpensesApi;

    const rowNode = api.getRowNode(rowId);
    if (!rowNode) {
      alert("Строка не найдена");
      return;
    }

    modalCategory.value = rowNode.data.Категория;
    modalSum.value = rowNode.data.Сумма;
    modalDate.value = rowNode.data.Дата;

    modalMenu.dataset.editing = "true";
    modalMenu.dataset.gridType = isIncome ? "income" : "expenses";
    modalMenu.dataset.rowId = rowId;
    modalMenu.style.display = "flex";
  });
});

deleteBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const parentGrid = btn.closest(".grid-wrapper");
    const isIncome = parentGrid.querySelector("#incomeGrid") !== null;

    const radioName = isIncome ? "incomeRowSelect" : "expensesRowSelect";
    const selectedRadio = document.querySelector(
      `input[name="${radioName}"]:checked`
    );

    if (!selectedRadio) {
      alert("Выберите строку для удаления");
      return;
    }

    const rowId = selectedRadio.getAttribute("data-id");
    const api = isIncome ? window.gridIncomeApi : window.gridExpensesApi;

    const rowNode = api.getRowNode(rowId);
    if (rowNode) {
      api.applyTransaction({ remove: [rowNode.data] });
    }
  });
});

//test