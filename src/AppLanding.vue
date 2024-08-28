<template>
<div>
  <router-view />
</div>
</template>

<script>
import EventBus from './AppEventBus';
export default {
  data() {
    return {
    }
  },
  async mounted() {
    EventBus.emit('theme-change', { theme: '_default', dark: false });
  },
}
</script>

<style lang="scss">
// @import './App.scss';
</style>
