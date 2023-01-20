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
        <a-menu v-model:selected-keys="current" mode="horizontal">
          <a-menu-item key="examList" @click="router.push({name: 'examList'})">考试</a-menu-item>
          <a-menu-item key="courseList" @click="router.push({name: 'courseList'})">课程</a-menu-item>
        </a-menu>
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
            <a-badge :dot="unreadNum > 0">
              <a-tooltip>
                <template #title>
                  {{ unreadNum > 0 ? '您有未读消息' : '您没有消息或全部已读' }}
                </template>
                <a @click.prevent="messageVisible = true">
                  <bell-outlined :style="{fontSize: '16px'}"/>
                </a>
              </a-tooltip>
            </a-badge>
            <a-modal
                v-model:visible="messageVisible" title="消息列表"
                @ok="messageVisible = false" width="700px"
            >
              <a-table
                  :columns="columns"
                  :row-key="record => record.messageId"
                  :data-source="messageList"
                  :loading="messageLoading"
                  :pagination="messagePagination"
              >
                <template #bodyCell="{ column, record }">
                  <template v-if="column.key==='status'">
                    <a-badge v-if="record.status===0" status="processing" text="未读"/>
                    <a-badge v-else status="default" text="已读"/>
                  </template>
                  <template v-else-if="column.key==='action'">
                    <a-button
                        type="link" style="font-weight: 500"
                        @click="getMessage(record.messageId, record.title)"
                    >
                      查看
                    </a-button>
                    <a-divider type="vertical"></a-divider>
                    <a-popconfirm
                        title="你确定要删除该消息吗？"
                        ok-text="确定" :okButtonProps="{style: {fontWeight: '500'}}"
                        cancel-text="取消" :cancelButtonProps="{style: {fontWeight: '500'}}"
                        @confirm="deleteMessage(record.messageId)"
                    >
                      <a-button type="link" style="font-weight: 500">删除</a-button>
                    </a-popconfirm>
                  </template>
                </template>
              </a-table>
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
  import {computed, createVNode, nextTick, onBeforeMount, reactive, ref} from "vue";
  import {BellOutlined, ExclamationCircleOutlined, LogoutOutlined, UserOutlined, PieChartOutlined} from '@ant-design/icons-vue';
  import {message, Modal, notification} from "ant-design-vue";
  import 'ant-design-vue/es/message/style/css'
  import {useUserStore} from "@/store/user.js";
  import Loading from "@/components/Loading.vue";
  import {useRoute, useRouter} from "vue-router";
  import 'dayjs/locale/zh-cn';
  import {storeToRefs} from "pinia";
  import {useLoadingStore} from "@/store/loading.js";
  import {joinCourse} from "@/api/student.js";

  const userStore = useUserStore();
  const loading = storeToRefs(useLoadingStore()).isLoading;
  const route = useRoute();
  onBeforeMount(async () => {
    await userStore.GetUserInfo();
    await getMessageList();
  })
  const {username, avatar, id} = storeToRefs(userStore);

  // 退出登录
  const router = useRouter();
  const showLogoutConfirm = () => {
    Modal.confirm({
      title: '您确定要退出登录吗？',
      icon: createVNode(ExclamationCircleOutlined),
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
    joinCourse({courseId: courseId.value})
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

  // 导航
  const current = computed(() => {
    return [route.name];
  })

  // 消息
  const messageVisible = ref(false);
  const unreadNum = ref(0);
  const unreadMsg = async () => {
    const res = await userStore.GetBadgeNumber();
    if (res.code === 200) unreadNum.value = res.data;
  }
  const messageLoading = ref(false);
  const messageList = ref([{
    messageId: '',
    title: '',
    status: '',
  }])
  const columns = [{
    title: '标题',
    dataIndex: 'title',
    key: 'title'
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status'
  }, {
    title: '操作',
    dataIndex: 'action',
    key: 'action'
  }];
  const messagePagination = reactive({
    onChange: (currentPage, pageSize) => {
      messagePagination.pageSize = pageSize, messagePagination.current = currentPage;
      getMessageList(currentPage, pageSize);
    },
    total: 0,
    current: 1,
    pageSize: 5,
  })
  const getMessageList = async (currentPage = 1, pageSize = 5) => {
    messageLoading.value = true;
    const res = await userStore.GetMessageList({currentPage, pageSize});
    if (res.code !== 200) return;
    messageList.value = res.data.records;
    messagePagination.total = res.data.total;
    await unreadMsg();
    messageLoading.value = false;
  }
  const getMessage = async (messageId, title) => {
    const res = await userStore.GetMessage({messageId});
    if (res.code !== 200) return;
    const {examinationName, startTime, endTime} = res.data;
    let desc = '考试名称：' + examinationName + '\n';
    if (startTime) desc += '开始时间：' + startTime + '\n';
    if (endTime) desc += '结束时间：' + endTime + '\n';
    notification.info({
      message: title,
      description: desc,
      duration: 25,
    })
    await getMessageList(messagePagination.current, messagePagination.pageSize);
  }
  const deleteMessage = async (messageId) => {
    const res = await userStore.DeleteMessage({messageId});
    if (res.code !== 200) return;
    message.success('删除成功');
    await getMessageList(messagePagination.current, messagePagination.pageSize);
  }

</script>

<style scoped>
  .layout-wrapper {
    min-height: 100vh;
    background: #f0f2f5;
    display: flex;
  }

  :deep(.ant-menu) {
    display: inline-block;
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

  a {
    color: black;
  }

  a:hover {
    color: #56b870;
  }
</style>