<template>
    <div class="q-pa-md q-gutter-sm row justify-center items-center">
      <q-icon name="report_problem" size="40px" color="warning" />
      <div class="text-center q-mt-md">
        <div class="text-h6">{{ title }}</div>
        <div class="text-subtitle2">{{ message }}</div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'EmptyState',
    props: {
      title: {
        type: String,
        default: 'No data available'
      },
      message: {
        type: String,
        default: 'No trending products to display for the selected period.'
      }
    }
  }
  </script>
  
  <style scoped>

  </style>