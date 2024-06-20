<template>
  <div>
    <div ref="revenueChart" style="width: 100%; height: 500px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'RevenueChart',
  props: {
    hourlyData: {
      type: Array,
      required: true,
    },
    dailyData: {
      type: Array,
      required: true,
    },
    weeklyData: {
      type: Array,
      required: true,
    },
    monthlyData: {
      type: Array,
      required: true,
    },
    selectedPeriod: {
      type: String,
      required: true,
    },
  },
  watch: {
    selectedPeriod() {
      this.updateChart();
    },
    hourlyData: {
      handler() {
        this.updateChart();
      },
      deep: true,
    },
    dailyData: {
      handler() {
        this.updateChart();
      },
      deep: true,
    },
    weeklyData: {
      handler() {
        this.updateChart();
      },
      deep: true,
    },
    monthlyData: {
      handler() {
        this.updateChart();
      },
      deep: true,
    },
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      // Initialize echarts instance
      this.chart = echarts.init(this.$refs.revenueChart);
      this.updateChart();
    },
    updateChart() {
      const data = this.getRevenueData(this.selectedPeriod);
      const option = {
        title: {
          text: `Revenue - ${this.selectedPeriod.charAt(0).toUpperCase() + this.selectedPeriod.slice(1)}`,
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        xAxis: {
          type: 'category',
          data: data.map(item => item.period),
          axisLabel: {
            rotate: 45,
            interval: 0,
          },
        },
        yAxis: [
          {
            type: 'value',
            name: 'Revenue ($)',
          },
          {
            type: 'value',
            name: 'Order Items',
          },
        ],
        series: [
          {
            name: 'Revenue',
            type: 'bar',
            data: data.map(item => item.revenue),
            itemStyle: {
              color: '#3398DB',
            },
          },
          {
            name: 'Orders',
            type: 'line',
            yAxisIndex: 1,
            data: data.map(item => item.orders),
            itemStyle: {
              color: '#FF0000',
            },
          },
        ],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
      };
      // Set chart options
      this.chart.setOption(option);
    },
    getRevenueData(period) {
      switch (period) {
        case 'hourly':
          return this.hourlyData;
        case 'daily':
          return this.dailyData;
        case 'weekly':
          return this.weeklyData;
        case 'monthly':
          return this.monthlyData;
        default:
          return [];
      }
    },
  },
};
</script>

<style scoped>
/* Additional styling if necessary */
</style>
