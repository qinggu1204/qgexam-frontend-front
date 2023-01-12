<!--试卷列表页面-->
<template>
  <div class="search-course-input">
    <a-row justify="end">
      <a-button type="primary" @click="gotoCreatePaper">
        <template #icon>
          <plus-outlined />
        </template>
        创建试卷
      </a-button>
    </a-row>
  </div>
  <div class="task-content">
    <a-table
        :columns="columns"
        :row-key="record => record.examinationPaperId"
        :data-source="paperList"
        :loading="paperListLoading"
        :pagination="pagination"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key==='action'">
          <a-button type="primary" @click="gotoPaper(record.examinationPaperId)">
            查看
          </a-button>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup>
  import {onBeforeMount, reactive, ref} from "vue";
  import {useRouter} from "vue-router";
  import {useNeteacherStore} from "@/store/neteacher.js";
  import {PlusOutlined} from "@ant-design/icons-vue";

  const router = useRouter();
  const neteacherStore = useNeteacherStore();

  onBeforeMount(async () => {
    await getPaperList();
  })

  // 考试表格
  const columns = [{
    title: '试卷名称',
    dataIndex: 'title',
    key: 'title',
    width: '800px'
  }, {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
  }];
  const paperListLoading = ref(false);
  const pagination = reactive({
    onChange: (currentPage, pageSize) => {
      pagination.pageSize = pageSize, pagination.current = currentPage;
      getPaperList(currentPage, pageSize)
    },
    total: 0,
    current: 1,
    pageSize: 7,
  })
  const paperList = ref([
    {
      examinationPaperId: 0,
      title: '',
    }
  ])
  const getPaperList = async (currentPage = 1, pageSize = 7) => {
    paperListLoading.value = true;
    const res = await neteacherStore.GetPaperList({currentPage, pageSize});
    if (res.code !== 200) return;
    const {data} = res;
    paperList.value = [...data.records];
    pagination.total = data.total;
    paperListLoading.value = false;
  }

  // 阅卷按钮
  const gotoPaper = (examinationPaperId) => {
    let link = router.resolve(`/paper/${examinationPaperId}`);
    window.open(link.href, '_blank');
  }
  const gotoCreatePaper = () => {
    let link = router.resolve('/createPaper');
    window.open(link.href, '_blank');
  }
</script>

<style scoped>
  .task-content :deep(.ant-btn){
    font-weight: 500;
  }

  .content .search-course-input {
    margin-bottom: 15px;
    margin-right: 15px;
  }
</style>