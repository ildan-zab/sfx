<template>
  <div class="page-home">
    <div class="posts">
      <!-- Компонент PostItem для отображения каждого поста -->
      <PostItem v-for="post in posts" :key="post.id" :post="post" :is-current-post-page="false" />
      <div class="posts__footer">
        <!-- Кнопка для подгрузки постов с анимацией загрузки -->
        <button class="posts__more btn" @click="loadMore()" :disabled="loading">
          <AnimationsLoader v-if="loading" />
          Показать ещё
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { usePostsStore } from '~/stores/posts';

// Подключение и настройка состояния postsStore
const postsStore = usePostsStore();
const { posts, loading } = storeToRefs(postsStore);

// Функция для загрузки дополнительных постов
async function loadMore() {
  postsStore.nextPage();
  await postsStore.fetchPosts();
}

// Первичная загрузка постов при монтировании страницы
await postsStore.fetchPosts();
</script>
