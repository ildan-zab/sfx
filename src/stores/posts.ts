import { defineStore } from 'pinia';
import { useCustomFetch } from '@/composables/useCustomFetch';

export const usePostsStore = defineStore('post', () => {
  const post: Ref<IPost> = ref({} as IPost);
  const posts: Ref<IPost[]> = ref([]);
  const total: Ref<number> = ref(0);
  const page: Ref<number> = ref(1);
  const limit: Ref<number> = ref(5);
  const loading: Ref<boolean> = ref(false);

  // Асинхронная функция для получения постов
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

      // Добавляем новые посты с пользовательскими реакциями (лайк/дизлайк)
      const newPosts = data.value.posts.map((post) => ({
        ...post,
        reactions: { ...post.reactions, userLike: false, userDislike: false },
      }));
      posts.value = page.value === 1 ? newPosts : posts.value.concat(newPosts);
    } catch (error) {
      console.error('Ошибка при получении постов:', error);
    } finally {
      loading.value = false;
    }
  }

  // Асинхронная функция для получения поста по его ID
  async function fetchPostId(postId: number) {
    try {
      const { data } = await useCustomFetch<IPost>(`/posts/${postId}`);
      const fetchedPost = data.value;
      if (!fetchedPost) return console.log('Нет данных');

      // Устанавливаем пользовательские реакции по умолчанию
      fetchedPost.reactions.userLike = false;
      fetchedPost.reactions.userDislike = false;
      post.value = fetchedPost;
    } catch (error) {
      console.error('Ошибка при получении поста:', error);
    }
  }

  // Проверка наличия поста в списке постов, чтобы не запрашивать его повторно
  function checkPostStore(postId: number) {
    const findPost = posts.value.find((p) => p.id === postId);
    if (findPost) {
      post.value = findPost;
      return true;
    }
    return false;
  }

  function nextPage() {
    page.value++;
  }

  // Функция для установки лайка на пост
  function likePost(postId: number, isCurrentPostPage = false) {
    let currentPost: IPost;
    if (isCurrentPostPage && post.value.id === postId) currentPost = post.value;
    else currentPost = posts.value.find((p) => p.id === postId) as IPost;

    // Если у поста был дизлайк, снимаем его и ставим лайк
    if (currentPost.reactions.userDislike) {
      currentPost.reactions.dislikes--;
      currentPost.reactions.userDislike = false;
    }
    if (!currentPost.reactions.userLike) {
      currentPost.reactions.likes++;
      currentPost.reactions.userLike = true;
    }
  }

  // Функция для установки дизлайка на пост
  function dislikePost(postId: number, isCurrentPostPage = false) {
    let currentPost: IPost;
    if (isCurrentPostPage && post.value.id === postId) currentPost = post.value;
    else currentPost = posts.value.find((p) => p.id === postId) as IPost;

    // Если у поста был лайк, снимаем его и ставим дизлайк
    if (currentPost.reactions.userLike) {
      currentPost.reactions.likes--;
      currentPost.reactions.userLike = false;
    }
    if (!currentPost.reactions.userDislike) {
      currentPost.reactions.dislikes++;
      currentPost.reactions.userDislike = true;
    }
  }

  return {
    post,
    posts,
    total,
    page,
    limit,
    loading,
    fetchPosts,
    fetchPostId,
    checkPostStore,
    nextPage,
    likePost,
    dislikePost,
  };
});
