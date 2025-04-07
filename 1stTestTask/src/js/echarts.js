export function initChart() {
  
  var chart1 = echarts.init(document.getElementById("chart1"));
  var chart2 = echarts.init(document.getElementById("chart2"));

  var option = {
    title: {
      text: "Test",
    },
    tooltip: {},
    legend: {
      data: ["sales"],
    },
    xAxis: {
      data: ["Shirts", "Cardigans", "Chiffons", "Pants", "Heels", "Socks"],
    },
    yAxis: {},
    series: [
      {
        name: "sales",
        type: "bar",
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  };

  chart1.setOption(option);
  chart2.setOption(option);
}
