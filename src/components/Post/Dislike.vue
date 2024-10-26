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
