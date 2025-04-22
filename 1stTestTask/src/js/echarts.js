let incomeChartInstance = null;
let expensesChartInstance = null;

export function initChart() {
  incomeChartInstance = echarts.init(document.getElementById("chart1"));
  expensesChartInstance = echarts.init(document.getElementById("chart2"));

  updateChart();
  updateExpensesChart();
}

const parseDate = (str) => new Date(str);
const parseSum = (str) => parseFloat((str || "0").replace(/\s+/g, ""));
const isInRange = (date, start, end) => {
  const d = parseDate(date);
  return (!start || d >= start) && (!end || d <= end);
};

export function updateChart(startDateStr, endDateStr) {
  if (!incomeChartInstance) return;

  const data = JSON.parse(localStorage.getItem("incomeData") || "[]");
  const start = startDateStr ? parseDate(startDateStr) : null;
  const end = endDateStr ? parseDate(endDateStr) : null;

  let total = 0;
  const byCategory = {};

  data.forEach(({ Сумма, Дата, Категория }) => {
    if (isInRange(Дата, start, end)) {
      const sum = parseSum(Сумма);
      if (!isNaN(sum)) {
        total += sum;
        const cat = Категория || "Без категории";
        byCategory[cat] = (byCategory[cat] || 0) + sum;
      }
    }
  });

  const chartData = Object.entries(byCategory).map(([name, value]) => ({
    name,
    value,
  }));

  incomeChartInstance.setOption({
    title: {
      text: `Всего\n${total} рублей`,
      left: "center",
      top: "middle",
      textStyle: { fontSize: 20 },
    },
    tooltip: { trigger: "item" },
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
        label: { show: false },
        emphasis: { label: { show: false } },
        labelLine: { show: false },
        data: chartData,
      },
    ],
  });
}

export function updateExpensesChart(startDateStr, endDateStr) {
  if (!expensesChartInstance) return;

  const data = JSON.parse(localStorage.getItem("expensesData") || "[]");
  const start = startDateStr ? parseDate(startDateStr) : null;
  const end = endDateStr ? parseDate(endDateStr) : null;

  const grouped = {};

  data.forEach(({ Сумма, Дата }) => {
    if (Дата && isInRange(Дата, start, end)) {
      const sum = parseSum(Сумма);
      if (!isNaN(sum)) {
        grouped[Дата] = (grouped[Дата] || 0) + sum;
      }
    }
  });

  const dates = Object.keys(grouped).sort();
  const values = dates.map((date) => grouped[date]);

  expensesChartInstance.setOption({
    tooltip: { trigger: "axis" },
    xAxis: { type: "category", data: dates },
    yAxis: { type: "value" },
    series: [
      {
        name: "Сумма",
        type: "bar",
        data: values,
        itemStyle: { color: "#00bcd4" },
      },
    ],
  });
}
