import { defineStore } from 'pinia';
import { useCustomFetch } from '@/composables/useCustomFetch';

export const usePostsStore = defineStore('post', () => {
  const posts: Ref<IPost[]> = ref([]);
  const total: Ref<number> = ref(0);
  const page: Ref<number> = ref(1);
  const limit: Ref<number> = ref(5);
  const loading: Ref<boolean> = ref(false);

  // Функция для получения постов
  async function fetchPosts() {
    loading.value = true;
    try {
      const skip = (page.value - 1) * limit.value;
      const { data } = await useCustomFetch<IFetchPosts>(`/posts`, {
        params: {
          skip: skip,
          limit: limit.value,
        },
      });
      if (!data.value) return console.log('Нет данных');
      total.value = data.value.total;

      const newPosts = data.value.posts.map((post) => ({
        ...post,
        reactions: { ...post.reactions, userLike: false, userDislike: false },
      }));
      posts.value = page.value === 1 ? newPosts : posts.value.concat(newPosts);
    } catch (error) {
      console.error('Ошибка:', error);
    } finally {
      loading.value = false;
    }
  }

  function nextPage() {
    page.value++;
  }

  // Функция для лайка конкретного поста
  function likePost(post: IPost) {
    if (post.reactions.userDislike) {
      post.reactions.dislikes--;
      post.reactions.userDislike = false;
    }
    if (!post.reactions.userLike) {
      post.reactions.likes++;
      post.reactions.userLike = true;
    }
  }

  // Функция для дизлайка конкретного поста
  function dislikePost(post: IPost) {
    if (post.reactions.userLike) {
      post.reactions.likes--;
      post.reactions.userLike = false;
    }
    if (!post.reactions.userDislike) {
      post.reactions.dislikes++;
      post.reactions.userDislike = true;
    }
  }

  return {
    posts,
    total,
    page,
    limit,
    loading,
    fetchPosts,
    nextPage,
    likePost,
    dislikePost,
  };
});
