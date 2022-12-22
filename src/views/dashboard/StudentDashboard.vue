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
          <div class="search-course-input">
            <a-row justify="end">
              <a-input-search
                  v-model:value="examinationName"
                  placeholder="课程名"
                  enter-button
                  @search="onSearch"
                  style="width: 350px"
              />
            </a-row>
          </div>
          <div style="min-height: 60%">
            <a-list :grid="{ gutter: 16, column: 6 }" :data-source="examList"
                    :pagination="pagination" :loading="{spinning:examListLoading, size:'large', delay: '300'}"
            >
              <template #renderItem="{ item }">
                <a-list-item key="item.examinationId">
                  <a-card hoverable>
                    <a-card-meta :title="item.examinationName">
                      <template #description>
                        <calendar-outlined/>
                        {{item.startTime}} <br>
                        <clock-circle-outlined/>
                        {{getExamTime(item.startTime, item.endTime)}} 分钟
                        <a-tag :color="getStatusColor(item.status)">{{item.status}}</a-tag>
                      </template>
                    </a-card-meta>
                  </a-card>
                </a-list-item>

              </template>
            </a-list>
          </div>
        </div>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script setup>
  import {createVNode, nextTick, onBeforeMount, reactive, ref} from "vue";
  import {
    CalendarOutlined,
    ClockCircleOutlined,
    ExclamationCircleOutlined,
    LogoutOutlined,
    UserOutlined
  } from '@ant-design/icons-vue';
  import {message, Modal} from "ant-design-vue";
  import 'ant-design-vue/es/message/style/css'
  import {useUserStore} from "@/store/user.js";
  import {storeToRefs} from "pinia";
  import Loading from "@/components/Loading.vue";
  import {useLoadingStore} from "@/store/loading.js";
  import {useRouter} from "vue-router";
  import {joinCourse} from "@/api/student.js";
  import {useStudentStore} from "@/store/student.js";
  import dayjs from "dayjs";
  import 'dayjs/locale/zh-cn';


  // 获取学生考试列表
  const studentStore = useStudentStore();
  const examList = ref([]);
  // 搜索课程
  const examinationName = ref(undefined);
  const examListLoading = ref(true);
  // 分页
  const pagination = reactive({
    onChange: (currentPage, pageSize) => {
      // 切换页面时的分页查询
      pagination.pageSize = pageSize, pagination.current = currentPage;
      examListLoading.value = true;
      getExamList(null, currentPage, pageSize, examinationName);
    },
    pageSize: 24,
    current: 1,
    total: 0,
    defaultCurrent: 1,
    defaultPageSize: 24,
  });

  const getExamList = (courseId = null, currentPage = 1, pageSize = 24, examinationName = null) => {
    examListLoading.value = true;
    studentStore.GetExamList(courseId, {currentPage, pageSize:pagination.pageSize, examinationName})
        .then(res => {
          if (res.code === 200) {
            const {data} = res;
            examList.value = [...data.records];
            pagination.total = data.total;
          }
        })
        .finally(() => {
          examListLoading.value = false;
        })
  }
  // 获取考试时间，转化为分钟
  const getExamTime = (startTime, endTime) => {
    const S = dayjs(startTime, 'YYYY-MM-dd HH:mm:ss');
    const E = dayjs(endTime, 'YYYY-MM-dd HH:mm:ss');
    return dayjs(E).diff(dayjs(S), 'seconds');
  }
  // 获取考试状态的颜色
  const getStatusColor = (status) => {
    if (status === '未开始') return 'default';
    else if (status === '进行中') return 'blue';
    else return 'success';
  }

  const userStore = useUserStore();
  const loading = storeToRefs(useLoadingStore()).isLoading;
  onBeforeMount(() => {
    userStore.GetUserInfo();
    getExamList(null, {
      currentPage: 1,
      pageSize: pagination.pageSize,
      examinationName: null,
    });
  })
  const {username, avatar, id} = storeToRefs(userStore);

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
                    }, 100)
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