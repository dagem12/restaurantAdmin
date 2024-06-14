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
    orderSummary: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      option: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
          {
            name: "Order Status",
            type: "pie",
            radius: ["30%", "60%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "inside",
              formatter: "{b} ({c})"
            },
            labelLine: {
              show: false,
            },
            data: []
          },
        ],
      },
      colorMap: {
        open: "#309330",
        preparing: "#3366FF",
        delivered: "#FFFF33",
        paid: "#FF9900",
        cancelled: "#FF0000"
      }
    };
  },
  watch: {
    orderSummary: {
      handler(newOrderSummary) {
        this.updateChart(newOrderSummary);
      },
      deep: true
    }
  },
  mounted() {
    this.updateChart(this.orderSummary);
  },
  methods: {
    updateChart(orderSummary) {
      const chartContainer = this.$refs.chart;
      const chart = echarts.init(chartContainer);
      const statusNames = Object.keys(orderSummary);
      const chartData = statusNames.map(status => ({
        name: status,
        value: orderSummary[status],
        itemStyle: {
          color: this.colorMap[status]
        }
      }));
      this.option.series[0].data = chartData;
      chart.setOption(this.option);
    }
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
  width: 250px;
  height: 250px;
}
</style>
