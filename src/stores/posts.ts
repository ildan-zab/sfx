import { defineStore } from 'pinia';
import { useCustomFetch } from '@/composables/useCustomFetch';

export const usePostsStore = defineStore('post', () => {
  const post: Ref<IPost> = ref({} as IPost);
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

  async function fetchPostId(postId: number) {
    try {
      const { data } = await useCustomFetch<IPost>(`/posts/${postId}`);
      const fetchedPost = data.value;
      if (!fetchedPost) return console.log('Нет данных');
      fetchedPost.reactions.userLike = false;
      fetchedPost.reactions.userDislike = false;
      post.value = fetchedPost;
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }

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

  // Функция для лайка конкретного поста
  function likePost(postId: number, isCurrentPostPage = false) {
    let currentPost: IPost;
    if (isCurrentPostPage && post.value.id === postId) currentPost = post.value;
    else currentPost = posts.value.find((p) => p.id === postId) as IPost;

    if (currentPost.reactions.userDislike) {
      currentPost.reactions.dislikes--;
      currentPost.reactions.userDislike = false;
    }
    if (!currentPost.reactions.userLike) {
      currentPost.reactions.likes++;
      currentPost.reactions.userLike = true;
    }
  }

  // Функция для дизлайка конкретного поста
  function dislikePost(postId: number, isCurrentPostPage = false) {
    let currentPost: IPost;
    if (isCurrentPostPage && post.value.id === postId) currentPost = post.value;
    else currentPost = posts.value.find((p) => p.id === postId) as IPost;

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
