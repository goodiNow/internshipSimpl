export function initChart() {
  const incomeChart = echarts.init(document.getElementById("chart1"));
  const expensesChart = echarts.init(document.getElementById("chart2"));

  const incomeData = JSON.parse(localStorage.getItem("incomeData") || "[]");
  const expensesData = JSON.parse(localStorage.getItem("expensesData") || "[]");

  const incomeCategories = {};
  const expensesByDate = {};

  let totalIncome = 0;

  incomeData.forEach((item) => {
    const sum = parseFloat(item.Сумма);
    const date = item.Дата;
    if (!isNaN(sum)) {
      totalIncome += sum;
      const category = item.Категория || "Без категории";
      incomeCategories[category] = (incomeCategories[category] || 0) + sum;
    }
  });

  expensesData.forEach((item) => {
    const sum = parseFloat(item.Сумма);
    const date = item.Дата;
    if (!isNaN(sum) && date) {
      expensesByDate[date] = (expensesByDate[date] || 0) + sum;
    }
  });

  const incomeSeriesData = Object.entries(incomeCategories).map(
    ([name, value]) => ({ name, value })
  );

  const expenseDates = Object.keys(expensesByDate).sort();
  const expenseValues = expenseDates.map((date) => expensesByDate[date]);

  incomeChart.setOption({
    title: {
      text: `Всего\n${totalIncome} рублей`,
      left: "center",
      top: "middle",
      textStyle: {
        fontSize: 20,
        // fontWeight: "bold",
      },
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      right: 10,
      top: "middle",
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
            show: false
          }
        },
        labelLine: {
          show: false,
        },
        data: incomeSeriesData,
      }
    ]
    ,
  });

  expensesChart.setOption({
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
