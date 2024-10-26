<template>
  <div class="comment-item">
    <div class="comment-item__left">
      <div class="comment-item__avatar">
        <img src="https://i.pravatar.cc/300" class="comment-item__avatar-img" />
      </div>
    </div>
    <div class="comment-item__right">
      <div class="comment-item__username">
        {{ comment.user.username }}
      </div>
      <div class="comment-item__text">
        {{ comment.body }}
      </div>
      <div class="comment-item__bar">
        <UIDate date="Today" />
        <CommentRemove @click="removeComment(comment.id)" />
      </div>
    </div>
    <AnimationsBlock v-if="loading.item && loading.id === comment.id" />
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useCommentsStore } from '~/stores/comments';
const commentsStore = useCommentsStore();
const { removeComment } = commentsStore;

const { comment } = defineProps<{
  comment: IComment;
  loading: Object;
}>();
</script>

<style lang="scss" scoped>
.comment-item {
  display: flex;
  position: relative;
  column-gap: 8px;
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0px;
  }

  &__left {
    max-width: 46px;
    width: 100%;
  }

  &__right {
    width: calc(100% - 46px - 8px);
  }

  &__username {
    font-weight: 600;
    margin-bottom: 12px;
  }

  &__text {
    margin-bottom: 16px;
  }

  &__bar {
    display: inline-flex;
    align-items: center;
    column-gap: 20px;
  }

  &__avatar {
    border-radius: 100%;
    overflow: hidden;
    border: 2px solid #000;
    height: 46px;
    width: 46px;
  }
}
</style>
