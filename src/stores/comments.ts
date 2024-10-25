import { defineStore } from 'pinia';
import { useCustomFetch } from '@/composables/useCustomFetch';

export const useCommentsStore = defineStore('comments', () => {
  const comments: Ref<IComment[]> = ref([]);
  const total: Ref<number> = ref(0);
  const page: Ref<number> = ref(1);
  const limit: Ref<number> = ref(5);
  const loading: Ref<{ item: boolean; id: number | null }> = ref({
    item: false,
    id: null,
  });

  // Функция для получения комментариев по ID поста
  async function fetchComments(postId: number) {
    try {
      const skip = (page.value - 1) * limit.value;
      const { data } = await useCustomFetch<IFetchComments>(`/posts/${postId}/comments`, {
        params: {
          skip: skip,
          limit: limit.value,
        },
      });
      if (!data.value) return console.log('Нет данных');
      total.value = data.value.total;

      comments.value =
        page.value === 1 ? data.value.comments : comments.value.concat(data.value.comments);
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }

  function nextPage() {
    page.value++;
  }

  // Функция удаления комментария
  async function removeComment(id: number) {
    loading.value = { item: true, id };
    try {
      const { data } = await useCustomFetch<IComment>(`/comments/${id}`, { method: 'DELETE' });
      if (data.value?.isDeleted) {
        // Поиск индекса комментария и его удаление
        const index = comments.value.findIndex((comment) => comment.id === id);
        if (index !== -1) comments.value.splice(index, 1);
      }
    } catch (error) {
      console.error('Ошибка удаления комментария:', error);
    } finally {
      loading.value = { item: false, id: null };
    }
  }

  return { comments, total, page, limit, loading, fetchComments, nextPage, removeComment };
});
