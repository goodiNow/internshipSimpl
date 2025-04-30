let incomeChartInstance = null;
let expensesChartInstance = null;

export function initChart() {
  incomeChartInstance = echarts.init(document.getElementById("incomeChart"));
  expensesChartInstance = echarts.init(document.getElementById("expensesChart"));
  updateChart();
  updateExpensesChart();
}

const parseDate = (s) => new Date(s);
const parseNumber = (s) => parseFloat((s || "0").replace(/\s+/g, ""));
const filterByDate = (data, start, end) => {
  const s = start ? parseDate(start) : null;
  const e = end   ? parseDate(end)   : null;
  return data.filter(({ date }) => {
    const d = parseDate(date);
    return (!s || d >= s) && (!e || d <= e);
  });
};

function formatDateLabel(dateString) {
  const d     = parseDate(dateString);
  const day   = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year  = d.getFullYear();
  return `${day}.${month}.${year}`;
}

export function updateChart(start, end) {
  if (!incomeChartInstance) return;

  const raw  = JSON.parse(localStorage.getItem("incomeData")  || "[]");
  const rows = filterByDate(raw, start, end);

  let total = 0;
  const byCat = {};

  rows.forEach(({ sum, category }) => {
    const v = parseNumber(sum);
    if (!isNaN(v)) {
      total += v;
      const key = category || "Без категории";
      byCat[key] = (byCat[key] || 0) + v;
    }
  });

  const seriesData = Object.entries(byCat).map(([name, value]) => ({ name, value }));

  incomeChartInstance.setOption({
    title: {
      text: `Всего\n${total} рублей`,
      left: "center",
      top: "middle",
      textStyle: { fontSize: 20 },
    },
    tooltip: {
      trigger: "item",
      formatter: params => {
        return [
          `${params.name}`,
          `Сумма: ${params.value}р.`,
          `Доля: ${params.percent}%`
        ].join('<br/>');
      },
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
        label: { show: false },
        emphasis: { label: { show: false } },
        labelLine: { show: false },
        data: seriesData,
      },
    ],
  });
}

export function updateExpensesChart(start, end) {
  if (!expensesChartInstance) return;

  const incRaw = JSON.parse(localStorage.getItem("incomeData")    || "[]");
  const expRaw = JSON.parse(localStorage.getItem("expensesData") || "[]");

  const incRows = filterByDate(incRaw, start, end);
  const expRows = filterByDate(expRaw, start, end);

  const incMap = {};
  const expMap = {};

  incRows.forEach(({ sum, date }) => {
    const v = parseNumber(sum);
    if (!isNaN(v)) incMap[date] = (incMap[date] || 0) + v;
  });

  expRows.forEach(({ sum, date }) => {
    const v = parseNumber(sum);
    if (!isNaN(v)) expMap[date] = (expMap[date] || 0) + v;
  });

  const allDates = Array.from(
    new Set([...Object.keys(incMap), ...Object.keys(expMap)])
  ).sort((a, b) => parseDate(a) - parseDate(b));

  const formattedDates = allDates.map(formatDateLabel);
  const incValues      = allDates.map((d) => incMap[d] || 0);
  const expValues      = allDates.map((d) => expMap[d] || 0);

  expensesChartInstance.setOption({
    title: {
      text: "Доходы и расходы по датам",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Доходы", "Расходы"],
      bottom: 0,
      left: "center",
    },
    xAxis: {
      type: "category",
      data: formattedDates,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Доходы",
        type: "bar",
        data: incValues,
        itemStyle: { color: "#5470C6" },
      },
      {
        name: "Расходы",
        type: "bar",
        data: expValues,
        itemStyle: { color: "#91CC75" },
      },
    ],
  });
}
