<template>
  <div class="task-content">
    <a-table
        :columns="columns"
        :row-key="record => record.examinationId"
        :data-source="taskList"
        :loading="taskListLoading"
        :pagination="pagination"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key==='action'">
          <a-button type="primary" @click="gotoTask(record.examinationId)">
            阅卷
          </a-button>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup>
  import {onBeforeMount, reactive, ref} from "vue";
  import {useTeacherStore} from "@/store/teacher.js";
  import {useRouter} from "vue-router";
  
  const router = useRouter();
  const teacherStore = useTeacherStore();
  
  onBeforeMount(async () => {
    await getTaskList();
  })
  
  // 考试表格
  const columns = [{
    title: '考试名称',
    dataIndex: 'examinationName',
    key: 'examinationName',
    width: '800px'
  }, {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
  }];
  const taskListLoading = ref(false);
  const pagination = reactive({
    onChange: (currentPage, pageSize) => {
      pagination.pageSize = pageSize, pagination.current = currentPage;
      getTaskList(currentPage, pageSize)
    },
    total: 0,
    current: 1,
    pageSize: 8,
  })
  const taskList = ref([
    {
      examinationId: '',
      examinationName: '',
    }
  ])
  const getTaskList = async (currentPage = 1, pageSize = 8) => {
    taskListLoading.value = true;
    const res = await teacherStore.GetTaskList({currentPage, pageSize});
    if (res.code !== 200) return;
    const {data} = res;
    taskList.value = [...data.records];
    pagination.total = data.total;
    taskListLoading.value = false;
  }
  
  // 阅卷按钮
  const gotoTask = (examinationId) => {
    let link = router.resolve(`/task/${examinationId}`);
    window.open(link.href, '_blank');
  }
</script>

<style scoped>
  .task-content :deep(.ant-btn){
    font-weight: 500;
  }
</style>