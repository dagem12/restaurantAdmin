<template>
  <div class="pie-chart">
    <div ref="chart" class="chart-container"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "PieChart",
  props: {
    //   count: {
    //     type: Number,
    //     required: true
    //   },
    //   status: {
    //     type: String,
    //     required: true
    //   }
  },
  data() {
    return {
      option: {
        tooltip: {
          trigger: "item",
        },
        //   legend: {
        //     top: '5%',
        //     left: 'center'
        //   },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["40%", "80%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 20,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: "Open" },
              { value: 735, name: "Preparing" },
              { value: 580, name: "Delivered" },
              { value: 484, name: "Canceled" },
            ],
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
}

.chart-container {
  width: 200px;
  height: 200px;
}

.count {
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
}
</style>
