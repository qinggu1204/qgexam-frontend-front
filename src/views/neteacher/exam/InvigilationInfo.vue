<!--排考结果页面-->
<!--/arrange/:examinationId-->
<template>
  <div class="task-content" >
    <a-row justify="center" style="min-height: 100vh">
      <a-col :span="10" style="background-color: #fff;">
        <a-table
            :columns="columns"
            :row-key="record => record.id"
            :data-source="examList"
            :loading="examListLoading"
            :pagination="pagination"
            style="margin-top: 20px;"
        >
          <template #bodyCell="{ column, record }">
          </template>
        </a-table>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
  import {onBeforeMount, reactive, ref} from "vue";
  import {useNeteacherStore} from "@/store/neteacher.js";

  const props = defineProps(['examinationId']);
  const neteacherStore = useNeteacherStore();
  
  onBeforeMount(async () => {
    await getInvigilationInfo();
  })
      
  // 考试表格
  const columns = [{
    title: '课程名称',
    dataIndex: 'courseName',
    key: 'courseName',
  }, {
    title: '教师',
    dataIndex: 'teacherName',
    key: 'teacherName',
  }];
  const examListLoading = ref(false);
  const pagination = reactive({
    onChange: (currentPage, pageSize) => {
      pagination.pageSize = pageSize, pagination.current = currentPage;
      getInvigilationInfo(currentPage, pageSize)
    },
    total: 0,
    current: 1,
    pageSize: 10,
  })
  const examList = ref([
    {
      courseName: '',
      id: '',
      teacherName: '',
    }
  ])
  const getInvigilationInfo = async (currentPage = pagination.current, pageSize = pagination.pageSize) => {
    examListLoading.value = true;
    const res = await neteacherStore.GetInvigilationInfo(
        props.examinationId,{currentPage, pageSize}
    );
    if (res.code !== 200) return;
    const {data} = res;
    examList.value = [...data.records];
    pagination.total = data.total;
    examListLoading.value = false;
  }
</script>

<style scoped>
  .task-content {
    min-height: 100vh;
    background-color: #f0f2f5;
  }
</style>