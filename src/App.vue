<template>
  <div>
    <a-config-provider :locale="locale">
      <router-view v-slot="{ Component }" :key="$route.fullPath">
        <transition name="router-fade" mode="out-in">
          <keep-alive>
            <component :is="Component"/>
          </keep-alive>
        </transition>
      </router-view>
    </a-config-provider>
  </div>
</template>

<script setup>
  import locale from 'ant-design-vue/lib/locale-provider/zh_CN';
  import dayjs from 'dayjs';
  import 'dayjs/locale/zh-cn';
  
  dayjs.locale('zh-cn');
</script>

<style>
  .loading-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 90vh;
  }
</style>
