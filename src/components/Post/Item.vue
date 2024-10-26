<template>
  <article class="post-item">
    <div class="post-item__desc">
      <NuxtLink v-if="!isCurrentPostPage" class="post-item__link" :to="`/post/${post.id}`">
        <h2 class="post-item__title">
          {{ post.title }}
        </h2>
        <p class="post-item__subtitle">
          {{ post.body }}
        </p>
      </NuxtLink>
      <div v-else>
        <h2 class="post-item__title">
          {{ post.title }}
        </h2>
        <p class="post-item__subtitle">
          {{ post.body }}
        </p>
      </div>
      <div class="post-item__footer">
        <div class="post-item__btn">
          <PostLike
            @click="likePost(post.id, isCurrentPostPage)"
            :class="{ 'post-like--active': post.reactions?.userLike }"
            :likes="post.reactions?.likes || 0"
          />
          <PostDislike
            @click="dislikePost(post.id, isCurrentPostPage)"
            :class="{ 'post-dislike--active': post.reactions?.userDislike }"
            :dislikes="post.reactions?.dislikes || 0"
          />
        </div>
        <PostCommentsLink :id="post.id" />
        <PostDate date="Today" />
        <PostTags :tags="post.tags" />
      </div>
    </div>
  </article>
</template>

<script lang="ts" setup>
import { usePostsStore } from '~/stores/posts';

const { post, isCurrentPostPage } = defineProps<{
  post: IPost;
  isCurrentPostPage: boolean;
}>();

const postsStore = usePostsStore();
const { likePost, dislikePost } = postsStore;
</script>

<style lang="scss" scoped>
.post-item {
  position: relative;
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0px;
  }

  &__link {
    display: block;

    &:hover {
      .post-item__title {
        color: $color-primary;
      }
    }
  }

  &__title {
    margin-bottom: 16px;
  }

  &__subtitle {
    margin-bottom: 24px;
  }

  &__footer {
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
    column-gap: 8px;
    row-gap: 8px;
  }

  &__btn {
    display: inline-flex;
    column-gap: 1px;
  }
}
</style>
