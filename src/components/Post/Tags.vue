<template>
  <div class="post-tags">
    <NuxtLink v-for="tag in tags" :key="tag" class="post-tags__item" :to="`/?tag=${tag}`">
      {{ tag }}
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
const { tags } = defineProps<{
  tags: Array;
}>();
</script>

<style lang="scss" scoped>
.post-tags {
  display: inline-flex;
  column-gap: 4px;

  &__item {
    background-color: $color-secondary-light;
    font-size: $font-size-caption;
    padding: 4px 4px 4px 4px;
    border-radius: 3px;

    &:nth-child(1) {
      position: relative;
      margin-left: 10px;

      &::before {
        content: '';
        position: absolute;
        display: block;
        border-color: transparent $color-secondary-light transparent transparent;
        border-style: solid;
        border-width: 11px 12px 11px 0;
        inset: 0 auto 0 -10px;
        width: 10px;
      }
    }
  }
}
</style>
