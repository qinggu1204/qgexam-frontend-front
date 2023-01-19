<!--教师课程列表-->
<template>
  <div class="search-course-input">
    <a-row type="flex">
      <a-col :flex="100">
        <a-button type="primary"
                  @click="createCourseVisible = true"
        >
          <template #icon>
            <plus-outlined />
          </template>
          创建课程
        </a-button>
        <a-modal 
            v-model:visible="createCourseVisible" 
            title="创建课程" @ok="createCourse"
            :confirm-loading="createCourseLoading"
        >
          <a-form
            :model="formCreateCourse"
            :label-col="{span: 6}"
            :wrapper-col="{span: 16}"
          >
            <a-form-item label="学科">
              <a-select
                  v-model:value="formCreateCourse.subjectId"
                  show-search
                  :filter-option="filterOption" optionFilterProp="title"
                  placeholder="请选择学科"
                  @change="handleSelectChange"
              >
                <a-select-option
                    v-for="item in subjectList" :key="item.subjectId" :value="item.subjectId"
                    :title="item.subjectName"
                >
                  {{ item.subjectName }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="课程名">
              <a-input v-model:value="formCreateCourse.courseName"/>
            </a-form-item>
            <a-form-item label="学年">
              <a-select
                  v-model:value="formCreateCourse.yearName"
                  placeholder="学年"
              >
                <a-select-option value="2019-2020">2019-2020</a-select-option>
                <a-select-option value="2020-2021">2020-2021</a-select-option>
                <a-select-option value="2021-2022">2021-2022</a-select-option>
                <a-select-option value="2022-2023">2022-2023</a-select-option>
                <a-select-option value="2023-2024">2023-2024</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="学期">
              <a-select
                  v-model:value="formCreateCourse.semesterName"
                  placeholder="学期"
              >
                <a-select-option value="第一学期">第一学期</a-select-option>
                <a-select-option value="第二学期">第二学期</a-select-option>
                <a-select-option value="第三学期">第三学期</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="课程图片">
              <a-upload
                  name="image"
                  list-type="picture-card"
                  class="avatar-uploader"
                  accept="image/png, image/jpeg"
                  :action="actionURL"
                  @change="handleImgChange"
                  :max-count="1"
                  :multiple="false"
              >
                <div>
                  <plus-outlined></plus-outlined>
                  <div class="ant-upload-text">上传图片</div>
                </div>
              </a-upload>
            </a-form-item>
          </a-form>
        </a-modal>
      </a-col>
      <a-col :flex="1">
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
      </a-col>
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
  import {PlusOutlined} from "@ant-design/icons-vue";

  // 获取学生考试列表
  import {useRouter} from "vue-router";
  import {useUserStore} from "@/store/user.js";
  import {useTeacherStore} from "@/store/teacher.js";
  import {message} from "ant-design-vue";
  import {useNeteacherStore} from "@/store/neteacher.js";

  const router = useRouter();
  const userStore = useUserStore();
  const teacherStore = useTeacherStore();
  const neteacherStore = useNeteacherStore();

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

  onBeforeMount(async () => {
    await Promise.all([getCourseList(), getSubjectList()]);
  })

  const getTeacherListText = (teacherList) => {
    let str = '';
    for (const item of teacherList) {
      str += item.userName + ' ';
    }
    return str;
  }
  
  // 获取学科列表
  const subjectList = ref([]);
  const filterOption = (input, option) => {
    return option.title.indexOf(input) >= 0;
  }
  const handleSelectChange = (value, option) => {
    formCreateCourse.subjectId = value;
    formCreateCourse.subjectName = option.title;
  }
  const getSubjectList = async () => {
    const res = await teacherStore.GetSubjectList();
    if (res.code !== 200) return;
    subjectList.value = res.data;
  }
  
  // 上传课程图片
  const actionURL = ref(import.meta.env.VITE_API_DOMAIN + '/common/upload');
  const handleImgChange = (info) => {
    const {response} = info.file;
    if (info.file.status === 'done' && response && response.code === 200) {
      message.success('上传成功！');
      formCreateCourse.courseUrl = response.data.url;
    }
    else if (response && response.code !== 200) {
      message.error('上传失败！');
    }
  }
  
  // 创建课程
  const formCreateCourse = reactive({
    subjectId: '',
    subjectName: '',
    courseUrl: 'http://roq1oxwf8.bkt.clouddn.com/course.jpg',
    courseName: '',
    yearName: '',
    semesterName: '',
  })
  const createCourseLoading = ref(false);
  const createCourseVisible = ref(false);
  const createCourse = async () => {
    if (!formCreateCourse.subjectId || !formCreateCourse.subjectName) {
      message.warn('学科不能为空！');
      return;
    }
    if (!formCreateCourse.courseName) {
      message.warn('课程名不能为空！');
      return;
    }
    if (!formCreateCourse.courseUrl) {
      formCreateCourse.courseUrl = 'http://roq1oxwf8.bkt.clouddn.com/course.jpg';
    }
    if (!formCreateCourse.semesterName || !formCreateCourse.yearName) {
      message.warn('学年或学期不能为空！');
      return;
    }
    
    createCourseLoading.value = true;
    const res = await teacherStore.CreateCourse(formCreateCourse);
    if (res.code === 200) {
      message.success('创建课程成功，即将刷新页面');
      setTimeout(() => {
        window.location.reload();
      }, 2500)
    }
    createCourseVisible.value = false;
    createCourseLoading.value = false;
  }
  
</script>

<style scoped>
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