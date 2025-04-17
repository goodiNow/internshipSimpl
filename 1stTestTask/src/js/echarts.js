let incomeChartInstance = null;
let expensesChartInstance = null;

export function initChart() {
  incomeChartInstance = echarts.init(document.getElementById("chart1"));
  expensesChartInstance = echarts.init(document.getElementById("chart2"));

  updateChart();
  updateExpensesChart();
}

export function updateChart() {
  if (!incomeChartInstance) return;

  const incomeData = JSON.parse(localStorage.getItem("incomeData") || "[]");
  const incomeCategories = {};
  let totalIncome = 0;

  incomeData.forEach((item) => {
    const sum = parseFloat(item.Сумма);
    if (!isNaN(sum)) {
      totalIncome += sum;
      const category = item.Категория || "Без категории";
      incomeCategories[category] = (incomeCategories[category] || 0) + sum;
    }
  });

  const incomeSeriesData = Object.entries(incomeCategories).map(
    ([name, value]) => ({ name, value })
  );

  incomeChartInstance.setOption({
    title: {
      text: `Всего\n${totalIncome} рублей`,
      left: "center",
      top: "middle",
      textStyle: {
        fontSize: 20,
      },
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "horizontal",
      bottom: 0,
      left: "center",
    },
    series: [
      {
        name: "Доходы",
        type: "pie",
        radius: ["50%", "70%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: false,
          },
        },
        labelLine: {
          show: false,
        },
        data: incomeSeriesData,
      },
    ],
  });
}

export function updateExpensesChart() {
  if (!expensesChartInstance) return;

  const expensesData = JSON.parse(localStorage.getItem("expensesData") || "[]");
  const expensesByDate = {};

  expensesData.forEach((item) => {
    const sum = parseFloat(item.Сумма);
    const date = item.Дата;
    if (!isNaN(sum) && date) {
      expensesByDate[date] = (expensesByDate[date] || 0) + sum;
    }
  });

  const expenseDates = Object.keys(expensesByDate).sort();
  const expenseValues = expenseDates.map((date) => expensesByDate[date]);

  expensesChartInstance.setOption({
    title: {
      text: "Расходы по датам",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: expenseDates,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: expenseValues,
        type: "bar",
        name: "Сумма",
        itemStyle: {
          color: "#00bcd4",
        },
      },
    ],
  });
}
