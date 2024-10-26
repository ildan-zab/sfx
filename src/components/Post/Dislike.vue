<template>
  <button class="post-dislike">
    <nuxt-icon name="dislike" class="post-dislike__icon" />
    <div class="post-dislike__text">Trash</div>
    <div class="post-dislike__count">{{ dislikes }}</div>
  </button>
</template>

<script lang="ts" setup>
const { dislikes } = defineProps<{
  dislikes: Number;
}>();
</script>

<style lang="scss" scoped>
.post-dislike {
  padding: 8px 8px 8px 12px;
  border-radius: 0px 30px 30px 0px;
  color: #040405;
  background-color: #0404050a;
  display: inline-flex;
  align-items: center;
  transition: all cubic-bezier(0.3, 0, 1, 1) 0.1s;

  &:hover,
  &--active {
    color: $color-white;
    background-color: #040405;
  }

  &__icon {
    width: 13px;
    fill: #040405;
  }

  &__text {
    margin-left: 4px;
    font-size: $font-size-caption;
  }

  &__count {
    margin-left: 6px;
    font-size: $font-size-numtub;
    color: #acacad;
  }
}
</style>
