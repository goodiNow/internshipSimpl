import { initGrid } from "./aggrid.js";
import { initChart, updateChart, updateExpensesChart } from "./echarts.js";

const tablesContainer = document.querySelector(".tables-container");
const chartsContainer = document.querySelector(".charts-container");
const modalMenu = document.getElementById("modal-menu");
const modalCategory = document.getElementById("modal-category");
const modalSum = document.getElementById("modal-sum");
const modalDate = document.getElementById("modal-date");
const modalSaveBtn = document.getElementById("modal-save-btn");

const showTablesBtn = document.getElementById("show-tables");
const showChartsBtn = document.getElementById("show-charts");
const openModalAdd = document.querySelectorAll(".open-modal-add");
const openModalEdit = document.querySelectorAll(".open-modal-edit");
const deleteBtns = document.querySelectorAll(".delete-btn");
const applyIncomeFilter = document.getElementById("apply-income-filter");
const applyExpensesFilter = document.getElementById("apply-expenses-filter");

let chartInitialized = false;
let gridIncomeApi, gridExpensesApi;

const {
  gridIncomeData,
  gridExpensesData,
  gridIncomeOptions,
  gridExpensesOptions,
} = initGrid();

function loadDataFromLocalStorage() {
  const income = JSON.parse(localStorage.getItem("incomeData") || "[]");
  const expenses = JSON.parse(localStorage.getItem("expensesData") || "[]");

  gridIncomeData.splice(0, gridIncomeData.length, ...income);
  gridExpensesData.splice(0, gridExpensesData.length, ...expenses);
}

loadDataFromLocalStorage();

gridIncomeOptions.onGridReady = (e) => (gridIncomeApi = e.api);
gridExpensesOptions.onGridReady = (e) => (gridExpensesApi = e.api);

document.addEventListener("DOMContentLoaded", () => {
  agGrid.createGrid(document.querySelector("#incomeGrid"), gridIncomeOptions);
  agGrid.createGrid(document.querySelector("#expensesGrid"), gridExpensesOptions);
});

window.addEventListener("beforeunload", () => {
  localStorage.setItem("incomeData", JSON.stringify(gridIncomeData));
  localStorage.setItem("expensesData", JSON.stringify(gridExpensesData));
});

showChartsBtn.addEventListener("click", () => {
  tablesContainer.style.display = "none";
  chartsContainer.style.display = "flex";
  if (!chartInitialized) {
    initChart();
    chartInitialized = true;
  } else {
    updateChart();
    updateExpensesChart();
  }
});

showTablesBtn.addEventListener("click", () => {
  tablesContainer.style.display = "flex";
  chartsContainer.style.display = "none";
});

openModalAdd.forEach((btn) =>
  btn.addEventListener("click", () => {
    modalMenu.dataset.editing = "false";
    modalMenu.dataset.gridType = btn.dataset.target === "grid1" ? "income" : "expenses";
    [modalCategory.value, modalSum.value, modalDate.value] = ["", "", ""];
    modalMenu.style.display = "flex";
  })
);

modalSaveBtn.addEventListener("click", () => {
  const gridType = modalMenu.dataset.gridType;
  const isEdit = modalMenu.dataset.editing === "true";
  const api = gridType === "income" ? gridIncomeApi : gridExpensesApi;
  const data = gridType === "income" ? gridIncomeData : gridExpensesData;

  const newRow = {
    Категория: modalCategory.value,
    Сумма: modalSum.value.replace(/\s/g, ""),
    Дата: modalDate.value,
  };

  if (isEdit) {
    const rowNode = api.getRowNode(modalMenu.dataset.rowId);
    if (rowNode) {
      const index = data.findIndex((item) => item === rowNode.data);
      rowNode.setData(newRow);
      if (index !== -1) data[index] = newRow;
    }
  } else {
    api.applyTransaction({ add: [newRow] });
    data.push(newRow);
  }

  localStorage.setItem(`${gridType}Data`, JSON.stringify(data));
  if (chartInitialized) {
    gridType === "income" ? updateChart() : updateExpensesChart();
  }

  closeModal();
});

openModalEdit.forEach((btn) =>
  btn.addEventListener("click", () => {
    const parentGrid = btn.closest(".grid-wrapper");
    const isIncome = parentGrid.querySelector("#incomeGrid") !== null;
    const gridType = isIncome ? "income" : "expenses";
    const api = isIncome ? gridIncomeApi : gridExpensesApi;

    const selected = document.querySelector(`input[name="${gridType}RowSelect"]:checked`);
    if (!selected) return alert("Выберите строку для редактирования");

    const rowNode = api.getRowNode(selected.dataset.id);
    if (!rowNode) return alert("Строка не найдена");

    modalMenu.dataset.editing = "true";
    modalMenu.dataset.gridType = gridType;
    modalMenu.dataset.rowId = selected.dataset.id;

    modalCategory.value = rowNode.data.Категория;
    modalSum.value = rowNode.data.Сумма;
    modalDate.value = rowNode.data.Дата;
    modalMenu.style.display = "flex";
  })
);

deleteBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    const parentGrid = btn.closest(".grid-wrapper");
    const isIncome = parentGrid.querySelector("#incomeGrid") !== null;
    const gridType = isIncome ? "income" : "expenses";
    const api = isIncome ? gridIncomeApi : gridExpensesApi;
    const data = isIncome ? gridIncomeData : gridExpensesData;

    const selected = document.querySelector(`input[name="${gridType}RowSelect"]:checked`);
    if (!selected) return alert("Выберите строку для удаления");

    const rowNode = api.getRowNode(selected.dataset.id);
    if (rowNode) {
      api.applyTransaction({ remove: [rowNode.data] });
      const index = data.findIndex((item) => item === rowNode.data);
      if (index !== -1) data.splice(index, 1);

      localStorage.setItem(`${gridType}Data`, JSON.stringify(data));
      if (chartInitialized) {
        isIncome ? updateChart() : updateExpensesChart();
      }
    }
  })
);

window.addEventListener("click", (e) => {
  if (e.target === modalMenu) closeModal();
});

function closeModal() {
  modalMenu.style.display = "none";
  modalMenu.dataset.editing = "false";
  modalMenu.dataset.gridType = "";
  modalMenu.dataset.rowId = "";
}

applyIncomeFilter.addEventListener("click", () => {
  updateChart(
    document.getElementById("income-start").value,
    document.getElementById("income-end").value
  );
});

applyExpensesFilter.addEventListener("click", () => {
  updateExpensesChart(
    document.getElementById("expenses-start").value,
    document.getElementById("expenses-end").value
  );
});
