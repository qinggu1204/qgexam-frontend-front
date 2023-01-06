<!--/course/:courseId-->
<template>
  <!--加载中-->
  <div class="loading-wrapper" v-show="loading">
    <Loading></Loading>
  </div>
  <!--详情页面-->
  <div v-show="!loading" class="course-detail">
    <a-row type="flex" justify="center" >
      <a-col class="course-detail-content">
        <!--顶部栏-->
        <a-row type="flex" style="margin-left: 5%;margin-top: 2%;">
          <a-col :flex="2">
            <router-link style="color: black;" to="/">
              <a-space>
                <rollback-outlined :style="{fontSize: '32px'}"/>
                <b>返回</b>
              </a-space>
            </router-link>
          </a-col>
          <a-col :flex="3">
            <span style="font-size:x-large">{{courseInfo.courseName}}</span>
          </a-col>
        </a-row>
        <!--课程内容-->
        <a-row>
          
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
  import {RollbackOutlined} from "@ant-design/icons-vue";
  import {useRouter} from "vue-router";
  import {onBeforeMount, ref} from "vue";
  import {useStudentStore} from "@/store/student.js";
  import {useUserStore} from "@/store/user.js";

  const props = defineProps(['courseId']);
  const router = useRouter();
  const userStore = useUserStore();
  const studentStore = useStudentStore();
  
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
  })
  const loading = ref(false);
  const getCourseInfo = async () => {
    loading.value = true;
    const res = await userStore.GetCourseList({
      currentPage: 1, pageSize: 12, subjectId: props.courseId
    }); // 一定查询出唯一结果
    if (res.code !== 200) return;
    courseInfo.value = res.data.records[0];
    loading.value = false;
  }

  onBeforeMount(async () => {
    loading.value = true;
    await getCourseInfo();
    loading.value = false;
  })
  
  
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