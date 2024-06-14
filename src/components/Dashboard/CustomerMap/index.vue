<template>
    <div ref="customerSpendChart" style="width: 100%; height: 500px;"></div>
  </template>
  
  <script>
  import * as echarts from 'echarts';
  
  export default {
    name: 'CustomerSpendChart',
    props: {
      data: {
        type: Array,
        required: true,
      },
    },
    mounted() {
      this.initChart();
    },
    methods: {
      initChart() {
        const chart = echarts.init(this.$refs.customerSpendChart);
        const option = {
          title: {
            text: 'Top 10 Customers',
            left: 'center'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          xAxis: {
            type: 'category',
            data: this.data.map(item => item.name),
            axisLabel: {
              rotate: 45,
              interval: 0,
            }
          },
          yAxis: [
            {
              type: 'value',
              name: 'Spent (Br)',
            },
            {
              type: 'value',
              name: 'Ordered',
            }
          ],
          series: [
            {
              name: 'Spent',
              type: 'bar',
              data: this.data.map(item => item.amountSpent),
              itemStyle: {
                color: '#3398DB'
              },
            },
            {
              name: 'Orders',
              type: 'line',
              yAxisIndex: 1,
              data: this.data.map(item => item.numberOfOrders),
              itemStyle: {
                color: '#FF5722'
              },
            }
          ],
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
        };
        chart.setOption(option);
      }
    },
    watch: {
      data: {
        handler() {
          this.initChart();
        },
        deep: true,
      },
    },
  };
  </script>
  
  <style scoped>
  /* Additional styling if necessary */
  </style>
  