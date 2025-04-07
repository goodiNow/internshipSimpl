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

const openModalBtns = document.querySelectorAll(".open-modal-add");
const deleteBtns = document.querySelectorAll(".delete-btn");

const { firstGridInstance, secondGridInstance } = initGrid();  // Ссылаемся на API таблиц

let activeGrid = null;
let chartInitialized = false;

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

openModalBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetGrid = btn.getAttribute("data-target");

    if (targetGrid === "grid1") {
      activeGrid = firstGridInstance;  // Используем первую таблицу
    } else if (targetGrid === "grid2") {
      activeGrid = secondGridInstance;  // Используем вторую таблицу
    }

    console.log(activeGrid); // Логирование активной таблицы

    if (activeGrid) {
      modalMenu.style.display = "flex";
    } else {
      console.error("Active grid is not set!");
    }
  });
});

modalSaveBtn.addEventListener("click", () => {
  console.log("Кнопка 'Добавить' нажата!");

  const category = modalCategory.value.trim();
  const sum = modalSum.value.trim();
  const date = modalDate.value.trim();

  if (!activeGrid || !category || !sum || !date) return;

  const newRow = {
    Категория: category,
    Сумма: sum,
    Дата: date,
  };

  if (activeGrid) {
    activeGrid.applyTransaction({ add: [newRow] });  // Добавляем новую строку
  } else {
    console.error("API not available for active grid!");
  }

  modalCategory.value = "";
  modalSum.value = "";
  modalDate.value = "";

  modalMenu.style.display = "none";
});

deleteBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    alert("delete");
  });
});

window.addEventListener("click", (event) => {
  if (event.target === modalMenu) {
    modalMenu.style.display = "none";
  }
});
