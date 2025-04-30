let incomePieChart = null;
let expenseBarChart = null;

function getLocalData(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
}

const parseDateValue = (s) => new Date(s);
const parseNumberValue = (s) => parseFloat((s || '0').replace(/\s+/g, ''));

function filterDataByDateRange(records, start, end) {
  const from = start ? parseDateValue(start) : null;
  const to = end ? parseDateValue(end) : null;
  return records.filter(({ date }) => {
    const d = parseDateValue(date);
    return (!from || d >= from) && (!to || d <= to);
  });
}

function formatDateAxisLabel(value) {
  const d = parseDateValue(value);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
}

function aggregateDataBy(records, keyFn, valueFn) {
  const map = {};
  records.forEach((item) => {
    const key = keyFn(item);
    const value = valueFn(item);
    if (!isNaN(value)) map[key] = (map[key] || 0) + value;
  });
  return Object.entries(map).map(([name, value]) => ({ name, value }));
}

export function initializeCharts() {
  incomePieChart = echarts.init(document.getElementById('incomeChart'));
  expenseBarChart = echarts.init(document.getElementById('expensesChart'));
  renderIncomeChart();
  renderExpenseComparisonChart();
}

export function renderIncomeChart(start, end) {
  if (!incomePieChart) return;

  const raw = getLocalData('incomeData');
  const filtered = filterDataByDateRange(raw, start, end);
  const series = aggregateDataBy(
    filtered,
    (row) => row.category || 'Без категории',
    (row) => parseNumberValue(row.sum)
  );
  const total = series.reduce((sum, { value }) => sum + value, 0);

  incomePieChart.setOption({
    title: [
      {
        text: 'Общие доходы по датам',
        left: 'center'
      },
      {
        text: `Всего\n${total.toLocaleString('ru-RU')}`,
        left: 'center',
        top: 'middle',
        textStyle: { fontSize: 20 }
      }
    ],
    tooltip: {
      trigger: 'item',
      formatter: ({ name, value, percent }) =>
        `${name}: ${percent}% (${value.toLocaleString('ru-RU')})`
    },
    legend: {
      orient: 'horizontal',
      bottom: 0,
      left: 'center'
    },
    series: [
      {
        name: 'Доходы',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: { show: false },
        emphasis: { label: { show: false } },
        labelLine: { show: false },
        data: series
      }
    ]
  });
}

export function renderExpenseComparisonChart(start, end) {
  if (!expenseBarChart) return;

  const incRaw = getLocalData('incomeData');
  const expRaw = getLocalData('expensesData');
  const incFiltered = filterDataByDateRange(incRaw, start, end);
  const expFiltered = filterDataByDateRange(expRaw, start, end);

  const incSeries = aggregateDataBy(
    incFiltered,
    (row) => row.date,
    (row) => parseNumberValue(row.sum)
  );
  const expSeries = aggregateDataBy(
    expFiltered,
    (row) => row.date,
    (row) => parseNumberValue(row.sum)
  );

  const allDates = Array.from(new Set([...incSeries, ...expSeries].map((item) => item.name))).sort(
    (a, b) => parseDateValue(a) - parseDateValue(b)
  );

  const incValues = allDates.map((date) => incSeries.find((e) => e.name === date)?.value || 0);
  const expValues = allDates.map((date) => expSeries.find((e) => e.name === date)?.value || 0);

  expenseBarChart.setOption({
    title: {
      text: 'Доходы и расходы по датам',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params) => {
        const rawDate = params[0].axisValue;
        const date = formatDateAxisLabel(rawDate);
        let text = `${date}<br/>`;
        params.forEach((item) => {
          text += `${item.marker} ${item.seriesName}: ${item.value.toLocaleString('ru-RU')}<br/>`;
        });
        return text;
      }
    },
    legend: {
      data: ['Доходы', 'Расходы'],
      bottom: 0,
      left: 'center'
    },
    xAxis: {
      type: 'category',
      data: allDates,
      axisTick: { alignWithLabel: true }
    },
    yAxis: {
      type: 'value'
    },
    series: [
      { name: 'Доходы', type: 'bar', data: incValues },
      { name: 'Расходы', type: 'bar', data: expValues }
    ]
  });
}
