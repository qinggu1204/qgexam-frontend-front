<template>
  <div v-if="!id||loading" class="loading-wrapper">
    <Loading></Loading>
  </div>
  <div v-else class="layout-wrapper">
    <a-layout>
      <a-layout-header>
        <a @click.prevent="router.push('/')">
          <div class="logo">
            <img src="./img/logo.png" alt="青谷教育" style="max-width: 100%;margin-bottom: 6px;">
          </div>
          <div class="logo-text">
            <img src="./img/logo-text.png" alt="青谷教育·考试系统" style="max-width: 100%;margin-bottom: 12px;">
          </div>
        </a>
        <div class="avatar-wrapper">
          <a-space :size="12">
            <a-button type="text" @click="showModal">加入课程</a-button>
            <a-modal v-model:visible="visible" @ok="handleOk"
                     cancel-text="取消" ok-text="加入" @cancel="handleCancel"
                     :confirm-loading="joinCourseLoading"
            >
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
                    <a href="javascript:;" @click.prevent="router.push({name: 'userinfo'})">
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
          <router-view></router-view>
        </div>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script setup>
  import {createVNode, nextTick, onBeforeMount, ref} from "vue";
  import {ExclamationCircleOutlined, LogoutOutlined, UserOutlined} from '@ant-design/icons-vue';
  import {message, Modal} from "ant-design-vue";
  import 'ant-design-vue/es/message/style/css'
  import {useUserStore} from "@/store/user.js";
  import Loading from "@/components/Loading.vue";
  import {useRouter} from "vue-router";
  import 'dayjs/locale/zh-cn';
  import {storeToRefs} from "pinia";
  import {useLoadingStore} from "@/store/loading.js";
  import {joinCourse} from "@/api/student.js";

  const userStore = useUserStore();
  const loading = storeToRefs(useLoadingStore()).isLoading;
  onBeforeMount(() => {
    userStore.GetUserInfo();
  })
  const {username, avatar, id} = storeToRefs(userStore);

  // 退出登录
  const router = useRouter();
  const showLogoutConfirm = () => {
    Modal.confirm({
      title: '您确定要退出登录吗？',
      icon: createVNode(ExclamationCircleOutlined),
      // content: 'Some descriptions',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        return new Promise((resolve, reject) => {
          userStore.Logout()
              .then(res => {
                if (res.code === 200) {
                  localStorage.clear();
                  nextTick(() => {
                    router.push({name: 'login'});
                    setTimeout(() => {
                      window.location.reload();
                    }, 500)
                  })
                  resolve();
                }
                else reject();
              })
        })

      },
      onCancel() {
      },
    });
  }

  // 添加课程
  const visible = ref(false);
  const joinCourseLoading = ref(false);
  const courseId = ref('');
  const showModal = () => {
    visible.value = true;
  };
  const handleOk = () => {
    if (!courseId.value) {
      message.warn('请先输入课程编号！');
      return;
    }
    joinCourseLoading.value = true;
    joinCourse(courseId.value)
        .then(res => {
          if (res.code === 200) {
            message.success('添加课程成功，即将刷新页面！');
            setTimeout(() => {
              window.location.reload();
            }, 2500)
          }
        })
        .finally(() => {
          visible.value = false;
          courseId.value = '';
          joinCourseLoading.value = false;
        })
  };
  const handleCancel = () => {
    visible.value = false;
    courseId.value = '';
    joinCourseLoading.value = false;
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
    border-radius: 18px;
    padding: 1%;
    min-height: 100%;
  }

  .content .ant-card-meta {
    margin: 1px 0;
  }

  .content .ant-tag {
    float: right;
    margin-right: 30px;
  }

  .content .ant-card-body {
    padding: 20px;
  }

  .content .search-course-input {
    margin-bottom: 15px;
  }

  .content :deep(.ant-list) {
    min-height: 80vh;
  }

  .content :deep(.ant-spin-nested-loading) {
    min-height: 80vh;
    margin-bottom: -32px;
  }

  .content :deep(.ant-card-bordered) {
    border: 2px solid #f0f0f0;
  }
</style>