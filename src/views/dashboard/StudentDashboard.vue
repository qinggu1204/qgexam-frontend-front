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
        <div class="avatar-wrapper">
          <a-space :size="12">
            <a-button type="text">加入课程</a-button>
            <a-divider type="vertical" style="height: 24px"/>
            <a-dropdown>
              <a class="ant-dropdown-link" @click.prevent>
                <a-space :size="10">
                  <a-avatar src="https://img1.imgtp.com/2022/12/17/pO3TGJOg.png" size="large" />
                  <span>用户名</span>
                </a-space>
              </a>
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <a href="javascript:;">1st menu item</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;">2nd menu item</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;">3rd menu item</a>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </a-space>
        </div>
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
  import { DownOutlined } from '@ant-design/icons-vue';

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
  
  .avatar-wrapper {
    float: right;
    margin-right: 40px;
  }
  
  .avatar-wrapper .ant-dropdown-link {
    color: rgba(0, 0, 0, 0.85);
  }

  .content {
    background: #fff;
    min-height: 97%;
    border-radius: 18px;
  }
</style>