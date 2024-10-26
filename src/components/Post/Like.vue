<template>
  <button class="post-like">
    <nuxt-icon name="like" class="post-like__icon" />
    <div class="post-like__text">Like</div>
    <div class="post-like__count">{{ likes }}</div>
  </button>
</template>

<script lang="ts" setup>
const { likes } = defineProps<{
  likes: Number;
}>();
</script>

<style lang="scss" scoped>
.post-like {
  padding: 8px 8px 8px 12px;
  border-radius: 30px 0px 0px 30px;
  color: #040405;
  background-color: #0404050a;
  display: inline-flex;
  align-items: center;
  transition: all cubic-bezier(0.3, 0, 1, 1) 0.1s;

  &:hover,
  &--active {
    color: $color-white;
    background-color: $color-error;

    .post-dislike__count,
    .post-like__count {
      color: $color-white;
    }
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
