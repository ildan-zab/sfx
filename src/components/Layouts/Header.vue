<template>
  <header class="header">
    <div class="container">
      <div class="header__logo">
        <NuxtLink class="header__logo-link" to="/">
          <nuxt-icon class="header__logo-icon" name="logo" filled />
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  margin-bottom: 48px;

  &__logo {
    padding-top: 16px;

    &-link {
      display: block;
      max-width: 240px;
      margin: 0 auto;
    }

    &-icon {
      fill: $color-primary;
    }
  }
}
</style>
