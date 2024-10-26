<template>
  <NuxtLink class="post-comments-link" :to="`/post/${id}/#comments`"> Open comments </NuxtLink>
</template>

<script lang="ts" setup>
const { id } = defineProps<{
  id: Number;
}>();
</script>

<style lang="scss" scoped>
.post-comments-link {
  color: $color-primary;
  font-size: $font-size-caption;
  border-bottom: 1px solid $accent-border;
  padding: 2px 0;
}
</style>
