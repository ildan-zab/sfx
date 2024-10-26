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
