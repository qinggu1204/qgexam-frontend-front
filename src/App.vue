<template>
  <div v-if="loading" class="loading-wrapper">
    <Loading></Loading>
  </div>
  <div v-else>
    <router-view v-slot="{ Component }">
      <transition name="router-fade" mode="out-in">
        <keep-alive>
          <component :is="Component"/>
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
  import {onMounted, ref} from "vue";

  const loading = ref(true);
  onMounted(() => {
    setTimeout(() => {
      loading.value = false;
    }, 1500)
  })
</script>

<style lang="less">
  .loading-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 90vh;
  }
</style>
