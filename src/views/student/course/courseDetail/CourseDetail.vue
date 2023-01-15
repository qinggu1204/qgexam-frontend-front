<!--/course/:courseId-->
<template>
  <!--加载中-->
  <div class="loading-wrapper" v-show="loading">
    <Loading></Loading>
  </div>
  <!--详情页面-->
  <div v-show="!loading" class="course-detail">
    <a-row type="flex" justify="center">
      <a-col class="course-detail-content">
        <!--顶部栏-->
        <a-row type="flex" style="margin-left: 5%;margin-top: 2%;">
          <a-col :flex="2">
            <router-link style="color: black;" to="/course">
              <a-space>
                <rollback-outlined :style="{fontSize: '32px'}"/>
                <b>返回</b>
              </a-space>
            </router-link>
          </a-col>
          <a-col :flex="3">
            <span style="font-size:x-large">{{ courseInfo.courseName }}</span>
          </a-col>
        </a-row>
        <!--课程内容-->
        <!--左边图片右边详情-->
        <a-row justify="center" style="margin-top: 3%;">
          <a-col>
            <a-row justify="center" style="max-width: 100vh;">
              <a-space :size="20">
                <a-image
                    :width="300"
                    :src="courseInfo.courseUrl"
                />
                <div>
                  <a-descriptions title="课程信息" style="max-width: 100%">
                    <a-descriptions-item label="教师" :span="3">
                      {{
                        getTeacherListText(courseInfo.teacherList).length > 30 ?
                            getTeacherListText(courseInfo.teacherList).slice(0, 30) + '...' :
                            getTeacherListText(courseInfo.teacherList)
                      }}
                    </a-descriptions-item>
                    <a-descriptions-item label="学年学期" :span="2">{{ courseInfo.year + ' ' + courseInfo.semester }}
                    </a-descriptions-item>
                    <a-descriptions-item label="状态">
                      <a-badge v-if="courseInfo.isDeleted === 0" status="processing" text="进行中"/>
                      <a-badge v-else status="default" text="已结课"/>
                    </a-descriptions-item>
                    <a-descriptions-item label="成绩" :span="2">
                      <span style="color: darkred">{{ courseInfo.score }}</span>
                    </a-descriptions-item>
                    <a-descriptions-item label="错题集">
                      <a :href="`/errorSet/${courseId}`" target="_blank">查看</a>
                    </a-descriptions-item>
                  </a-descriptions>
                </div>
              </a-space>
            </a-row>
          </a-col>
        </a-row>
        <!--考试表格-->
        <a-row justify="center" style="margin-top: 2%;">

          <a-table
              :columns="columns"
              :row-key="record => record.examinationId"
              :data-source="examList"
              :loading="examListLoading"
              :pagination="pagination"
              style="min-width: 100vh"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key==='status'">
                <a-tag v-if="record.status==='未开始'">未开始</a-tag>
                <a-tag v-else-if="record.status==='进行中'" color="blue">进行中</a-tag>
                <a-tag v-else color="success">已结束</a-tag>
              </template>
              <template v-else-if="column.key==='action'">
                <router-link :to="`/exam/${record.examinationId}`">查看</router-link>
              </template>
            </template>
          </a-table>

        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
  import {RollbackOutlined} from "@ant-design/icons-vue";
  import {useRouter} from "vue-router";
  import {onBeforeMount, reactive, ref} from "vue";
  import {useStudentStore} from "@/store/student.js";
  import {useUserStore} from "@/store/user.js";
  import {useResultStore} from "@/store/result.js";

  const props = defineProps(['courseId']);
  const router = useRouter();
  const userStore = useUserStore();
  const studentStore = useStudentStore();
  const resultStore = useResultStore();

  // 课程基本信息
  const courseInfo = ref({
    courseName: '',
    teacherList: [{
      teacherId: '',
      userName: '',
    }],
    year: '',
    semester: '',
    courseUrl: '',
    isDeleted: 0,
    score: 0,
  })
  const loading = ref(false);
  const getCourseInfo = async () => {
    loading.value = true;
    let res = await userStore.GetCourseList({
      currentPage: 1, pageSize: 12, subjectId: props.courseId
    }); // 一定查询出唯一结果
    if (res.code !== 200) {
      resultStore.setResult(
          '404',
          '404',
          '对不起，您访问的页面不存在，请检查后重试...',
          '返回主页',
          'dashboard'
      )
      await router.push({name: 'result'});
      return;
    }
    courseInfo.value = res.data.records[0];
    res = await studentStore.GetCourseScore({courseId: props.courseId});
    if (res.code === 200) courseInfo.value.score = res.data;
    loading.value = false;
  }

  onBeforeMount(async () => {
    loading.value = true;
    await getCourseInfo();
    await getExamList(props.courseId);
    loading.value = false;
  })

  const getTeacherListText = (teacherList) => {
    let str = '';
    for (const item of teacherList) {
      str += item.userName + ' ';
    }
    return str;
  }
  const columns = [{
    title: '考试名称',
    dataIndex: 'examinationName',
    key: 'examinationName'
  }, {
    title: '开始时间',
    dataIndex: 'startTime',
    key: 'startTime'
  }, {
    title: '结束时间',
    dataIndex: 'endTime',
    key: 'endTime'
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  }, {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
  }];
  const examListLoading = ref(false);
  const pagination = reactive({
    onChange: (currentPage, pageSize) => {
      pagination.pageSize = pageSize, pagination.current = currentPage;
      getExamList(props.courseId)
    },
    total: 0,
    current: 1,
    pageSize: 5,
  })
  const examList = ref([
    {
      examinationId: '',
      examinationName: '',
      startTime: '',
      endTime: '',
      status: '',
    }
  ])
  const getExamList = (
      courseId = null, currentPage = 1, pageSize = 5, 
      examinationName = null, examinationId = null
  ) => {
    examListLoading.value = true;
    studentStore.GetExamList({courseId, currentPage, pageSize: pagination.pageSize, examinationName, examinationId})
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
</script>

<style lang="less" scoped>
  .center-col {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .course-detail {
    min-height: 100vh;
    min-width: 100vh;
    background-color: #f0f2f5;
  }

  .course-detail-content {
    min-height: 100vh;
    min-width: 120vh;
    background-color: #fff;
  }
</style>