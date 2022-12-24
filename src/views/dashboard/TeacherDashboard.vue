<template>
  <div class="layout-wrapper">
    <a-layout>
      <a-layout-header>
        <div class="logo">
          <img src="./img/logo.png" alt="青谷教育" style="max-width: 100%;margin-bottom: 6px;">
        </div>
        <div class="logo-text">
          <img src="./img/logo-text.png" alt="青谷教育·考试系统" style="max-width: 100%;margin-bottom: 12px;">
        </div>
        <a-menu
            v-model:selectedKeys="selectedKeys"
            mode="horizontal"
            theme="light"
            :style="{ lineHeight: '64px' }"
        >
          <a-menu-item key="1">nav 1</a-menu-item>
          <a-menu-item key="2">nav 2</a-menu-item>
          <a-menu-item key="3">nav 3</a-menu-item>
        </a-menu>
      </a-layout-header>
      <a-layout-content style="padding: 0 25px;">
        <div class="content">
          Content
        </div>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script setup>
  import {ref} from "vue";

  const selectedKeys = ref(['2']);
</script>

<style lang="less" scoped>
  .layout-wrapper {
    min-height: 100vh;
    background: #f0f2f5;
    display: flex;
  }

  .logo {
    float: left;
    width: 31px;
    height: 31px;
    margin: 0 16px 0 32px;
  }
  
  .logo-text {
    float: left;
    margin-right: 6px;
  }

  .layout-wrapper :deep(.ant-layout-header) {
    padding: 0 0px;
  }

  .layout-wrapper :deep(.ant-layout-header) {
    background: #f0f2f5;
  }

  .layout-wrapper :deep(.ant-layout-header .ant-menu) {
    background: #f0f2f5;
  }

  .content {
    background: #fff;
    min-height: 97%;
    border-radius: 18px;
  }
</style>