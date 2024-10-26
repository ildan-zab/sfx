<script setup>
const { error } = defineProps(['error']);
</script>

<template>
  <div class="layout layout-error">
    <LayoutsHeader />

    <LayoutsMain>
      <div class="error">
        <div class="container">
          <div class="error__content">
            <div class="error__num">404</div>
            <p class="error__text title">Ошибка - что-то пошло не так</p>
            <h1 class="error__title h3">Страница не найдена</h1>
            <NuxtLink to="/" class="error__btn btn"> Вернуться на главную </NuxtLink>
          </div>
        </div>
      </div>
    </LayoutsMain>

    <LayoutsFooter />
  </div>
</template>
