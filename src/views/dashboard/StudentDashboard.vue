<template>
  <div v-if="!id||loading" class="loading-wrapper">
    <Loading></Loading>
  </div>
  <div v-else class="layout-wrapper">
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
            <a-button type="text" @click="showModal">加入课程</a-button>
            <a-modal v-model:visible="visible" @ok="handleOk" cancel-text="取消" ok-text="加入">
              <template #title>
                <a-typography-title :level="5">加入课程</a-typography-title>
              </template>
              <div style="display: flex">
                <a-input v-model:value="courseId" placeholder="请输入课程编号"/>
              </div>
            </a-modal>
            <a-divider type="vertical" style="height: 24px"/>
            <a-dropdown>
              <a class="ant-dropdown-link" @click.prevent>
                <a-space :size="10">
                  <a-avatar :src="avatar" size="large"/>
                  <span>{{ username }}</span>
                </a-space>
              </a>
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <a href="javascript:;">
                      <user-outlined/>
                      <span> 个人信息</span></a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;" @click.prevent="showLogoutConfirm">
                      <LogoutOutlined/>
                      <span> 退出登录</span>
                    </a>
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
  import {createVNode, onBeforeMount, ref} from "vue";
  import {ExclamationCircleOutlined, LogoutOutlined, UserOutlined} from '@ant-design/icons-vue';
  import {message, Modal} from "ant-design-vue";
  import 'ant-design-vue/es/message/style/css'
  import {useUserStore} from "@/store/user.js";
  import {storeToRefs} from "pinia";
  import Loading from "@/components/Loading.vue";
  import {useLoadingStore} from "@/store/loading.js";
  import {useRouter} from "vue-router";

  const userStore = useUserStore();
  const loading = storeToRefs(useLoadingStore()).isLoading;
  onBeforeMount(() => {
    userStore.GetUserInfo();
  })
  const {username, avatar, id} = storeToRefs(userStore);

  // 添加课程
  const visible = ref(false);
  const showModal = () => {
    visible.value = true;
  };
  const courseId = ref('');
  const handleOk = () => {
    message.success('加入课程成功！');
    visible.value = false;
    courseId.value = '';
  };

  // 退出登录
  const router = useRouter();
  const logout = async () => {
    const res = await userStore.Logout();
    if (res.code === 200) {
      localStorage.clear();
      await router.push({name: 'login'});
    }
  }
  const showLogoutConfirm = () => {
    Modal.confirm({
      title: '您确定要退出登录吗？',
      icon: createVNode(ExclamationCircleOutlined),
      // content: 'Some descriptions',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        // logout
        logout();
      },
      onCancel() {},
    });
  }

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