<template>
  <div class="search-course-input">
    <a-row justify="end">
      <a-input-search
          v-model:value="examinationName"
          placeholder="课程名"
          enter-button
          @search="getExamList(null,1,pagination.pageSize,examinationName)"
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
            <a-card-meta :title="item.examinationName" @click="router.push(`/exam/${item.examinationId}`)">
              <template #description>
                <calendar-outlined/>
                {{ item.startTime }} <br>
                <clock-circle-outlined/>
                {{ getExamTime(item.startTime, item.endTime) }} 分钟
                <a-tag :color="getStatusColor(item.status)">{{ item.status }}</a-tag>
              </template>
            </a-card-meta>
          </a-card>
        </a-list-item>

      </template>
    </a-list>
  </div>
</template>

<script setup>
  import {onBeforeMount, reactive, ref} from "vue";
  import 'dayjs/locale/zh-cn';

  // 获取学生考试列表
  import {useStudentStore} from "@/store/student.js";
  import dayjs from "dayjs";
  import {useRouter} from "vue-router";

  const router = useRouter();
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
    studentStore.GetExamList(courseId, {currentPage, pageSize: pagination.pageSize, examinationName})
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


  onBeforeMount(() => {
    getExamList();
  })


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