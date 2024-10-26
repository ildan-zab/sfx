<template>
  <div class="page-post">
    <!-- Компонент PostItem для отображения информации о посте -->
    <PostItem v-if="post" :post="post" :is-current-post-page="true" />
    <div v-if="total" id="comments" class="comments">
      <h3 class="comments__title">
        {{ comments.length }} {{ pluralizeComments(comments.length) }}
      </h3>
      <!-- Перебор и отображение комментариев через CommentItem -->
      <CommentItem
        v-for="comment in comments"
        :comment="comment"
        :key="comment.id"
        :loading="loading"
      />
    </div>
    <div v-else class="comments">
      <h3 class="comments__title">Комментарии отсутствуют</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { usePostsStore } from '~/stores/posts';
import { useCommentsStore } from '~/stores/comments';

const route = useRoute();

const postsStore = usePostsStore();
const { post } = storeToRefs(postsStore);
const postId: number = +route.params?.id;

// Если пост отсутсвует в store, отправляем запрос
if (!postsStore.checkPostStore(postId)) {
  await postsStore.fetchPostId(postId);
}

// Обработка ошибки, если пост не найден
if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found 404',
  });
}

const commentsStore = useCommentsStore();
const { comments, total, loading } = storeToRefs(commentsStore);

// Загрузка комментариев для данного поста
await commentsStore.fetchComments(postId);

// Функция для загрузки дополнительных комментариев
async function getComments() {
  commentsStore.nextPage();
  await commentsStore.fetchComments(postId);
}

// Функция для определения склонения слова
function pluralizeComments(count: number): string {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return 'комментариев';

  if (lastDigit === 1) return 'комментарий';

  if (lastDigit >= 2 && lastDigit <= 4) return 'комментария';

  return 'комментариев';
}
</script>
