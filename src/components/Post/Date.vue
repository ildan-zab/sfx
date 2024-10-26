<template>
  <div class="post-date">
    <time datetime="2024-10-07T20:00:00">{{ date }}</time>
  </div>
</template>

<script lang="ts" setup>
const { date } = defineProps<{
  date: String;
}>();
</script>

<style lang="scss" scoped>
.post-date {
  color: $color-border;
  font-size: $font-size-caption;
}
</style>
