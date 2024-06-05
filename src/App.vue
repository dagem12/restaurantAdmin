<template>
  <router-view></router-view>
</template>

<script>
export default {};
</script>
<style>
.custom-dialog {
  --q-dialog-backdrop-filter: blur(4px) saturate(150%);
}

.custom-dialog::backdrop {
  backdrop-filter: var(--q-dialog-backdrop-filter);
}
</style>