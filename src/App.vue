<template>
  <div>
    <router-view v-slot="{ Component }" :key="$route.fullPath">
      <transition name="router-fade" mode="out-in">
        <keep-alive>
          <component :is="Component"/>
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup>

</script>

<style lang="less">
  .loading-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 90vh;
  }
</style>
