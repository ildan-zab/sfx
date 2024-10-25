<template>
  <span class="animations-loader"></span>
</template>

<style lang="scss" scoped>
.animations-loader {
  width: 15px;
  height: 15px;
  border: 2px solid $color-text;
  margin-right: 10px;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
