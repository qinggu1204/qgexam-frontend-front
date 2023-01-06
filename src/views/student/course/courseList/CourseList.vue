<template>
  <div class="search-course-input">
    <a-row justify="end">
      <a-space :size="15">
        <a-select 
            v-model:value="courseSelector.year" style="width: 200px"
            :allow-clear="true" placeholder="学年"
        >
          <a-select-option value="2019-2020">2019-2020</a-select-option>
          <a-select-option value="2020-2021">2020-2021</a-select-option>
          <a-select-option value="2021-2022">2021-2022</a-select-option>
          <a-select-option value="2022-2023">2022-2023</a-select-option>
          <a-select-option value="2023-2024">2023-2024</a-select-option>
        </a-select>
        <a-select 
            v-model:value="courseSelector.semester" style="width: 200px"
            :allow-clear="true" placeholder="学期"
        >
          <a-select-option value="第一学期">第一学期</a-select-option>
          <a-select-option value="第二学期">第二学期</a-select-option>
          <a-select-option value="第三学期">第三学期</a-select-option>
        </a-select>
        <a-button type="primary" 
                  @click="getCourseList(
                      pagination.current, pagination.pageSize,
                      null, courseSelector.year, courseSelector.semester
                  )"
        >
          查询
        </a-button>
      </a-space>
    </a-row>
  </div>
  <div style="min-height: 60%">
    <a-list :grid="{ gutter: 16, column: 6 }" :data-source="courseList"
            :pagination="pagination" :loading="{spinning:courseListLoading, size:'large', delay: '300'}"
    >
      <template #renderItem="{ item }">
        <a-list-item key="item.examinationId">
          <a-card hoverable @click="router.push(`/course/${item.courseId}`)">
            <template #cover>
              <img
                  alt="课程图片"
                  :src="item.courseUrl"
              />
            </template>
            <a-card-meta :title="item.courseName.slice(0,10)">
              <template #description>
                <div>
                  {{
                    getTeacherListText(item.teacherList).length > 12 ?
                        getTeacherListText(item.teacherList).slice(0, 12) + '...' :
                        getTeacherListText(item.teacherList)
                  }}
                </div>
                <div>
                  {{item.year + ' ' + item.semester}}
                </div>
                <div>
                  <a-tag v-if="item.isDeleted===1" color="default">已结课</a-tag>
                  <a-tag v-if="item.isDeleted===0" color="blue">进行中</a-tag>
                </div>
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

  // 获取学生考试列表
  import {useRouter} from "vue-router";
  import {useUserStore} from "@/store/user.js";

  const router = useRouter();
  const userStore = useUserStore();

  const courseList = ref([{
    isDeleted: 0,
    courseId: '',
    teacherList: [{
      teacherId: '',
      userName: '',
    }],
    year: '',
    courseName: '',
    courseUrl: '',
    semester: '',
  }]);
  // 搜索课程
  const courseListLoading = ref(true);
  const courseSelector = reactive({
    subjectId: null,
    year: null,
    semester: null,
  })
  // 分页
  const pagination = reactive({
    onChange: (currentPage, pageSize) => {
      // 切换页面时的分页查询
      pagination.pageSize = pageSize, pagination.current = currentPage;
      courseListLoading.value = true;
      getCourseList(
          currentPage, pageSize, courseSelector.subjectId,
          courseSelector.year, courseSelector.semester
      );
    },
    pageSize: 12,
    current: 1,
    total: 0,
    defaultCurrent: 1,
    defaultPageSize: 12,
  });

  const getCourseList = async (
      currentPage = pagination.current, pageSize = pagination.pageSize,
      subjectId = null, year = null, semester = null
  ) => {
    courseListLoading.value = true;
    const res = await userStore.GetCourseList({
      currentPage, pageSize, subjectId, year, semester
    })
    if (res.code !== 200) return;
    courseList.value = [...res.data.records];
    pagination.total = res.data.total;
    courseListLoading.value = false;
  }

  onBeforeMount(() => {
    getCourseList();
  })

  const getTeacherListText = (teacherList) => {
    let str = '';
    for (const item of teacherList) {
      str += item.userName + ' ';
    }
    return str;
  }
</script>

<style lang="less" scoped>
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