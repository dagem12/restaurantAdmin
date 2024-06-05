<template>
  <div class="pie-chart">
    <div ref="chart" class="chart-container"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "Revenue",
  props: {},
  data() {
    return {
      option: {
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [9000, 20000, 15000, 19000, 18000, 16000, 20000],
            type: "line",
            smooth: true,
            areaStyle: {
              color: "rgb(244,246,253)",
            },
          },
        ],
      },
    };
  },
  watch: {
    count(newCount) {
      this.option.series[0].data[0].value = newCount;
      this.option.title.text = newCount.toString();
      this.renderChart();
    },
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      const chartContainer = this.$refs.chart;
      const chart = echarts.init(chartContainer);
      chart.setOption(this.option);
    },
    getColor(status) {
      switch (status) {
        case "Cancelled":
          return "#FFCD7F";
        case "Open":
          return "#7FD1FF";
        case "Ongoing":
          return "#343aeb";
        case "Complete":
          return "#00FF00";
        case "Expired":
          return "#FF7F7F";
        default:
          return "#000000";
      }
    },
  },
};
</script>

<style scoped>
.pie-chart {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.chart-container {
  width: 100%;
  height: 500px;
}

.count {
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
}
</style>
