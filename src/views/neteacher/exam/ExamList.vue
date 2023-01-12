<!--考试列表页面-->
<template>
  <div class="task-content">
    <a-table
        :columns="columns"
        :row-key="record => record.examinationId"
        :data-source="examList"
        :loading="examListLoading"
        :pagination="pagination"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key==='status'">
          <a-badge status="success" v-if="record.status==='已结束'" text="已结束" />
          <a-badge status="processing" v-else-if="record.status==='进行中'" text="进行中" />
          <a-badge status="default" v-else text="未开始" />
        </template>
        <template v-else-if="column.key==='action'">
          <a-button type="primary" @click="arrangeInvigilation(record.examinationId)">
            安排监考
          </a-button>
          <a-divider type="vertical" />
          <a-button type="primary" @click="visible = true">
            分配阅卷
          </a-button>
          <a-modal
                  :visible="visible" :confirm-loading="modalLoading"
                  title="分配阅卷任务" ok-text="分配" cancel-text="取消"
                  @ok="distributeJudgeTask(record.examinationId)" @cancel="visible = false"
          >
            <div>
              考试名：{{record.examinationName}}
            </div>
            <div style="margin-top: 15px;">
              阅卷截止时间：
              <a-date-picker v-model:value="endTime" 
                             value-format="YYYY-MM-DD HH:mm:ss" showTime
              />
            </div>
          </a-modal>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup>
  import {onBeforeMount, reactive, ref} from "vue";
  import {useRouter} from "vue-router";
  import {useNeteacherStore} from "@/store/neteacher.js";
  import {useTeacherStore} from "@/store/teacher.js";
  import {message} from "ant-design-vue";

  const router = useRouter();
  const teacherStore = useTeacherStore();
  const neteacherStore = useNeteacherStore();

  onBeforeMount(async () => {
    await getExamList();
  })

  // 考试表格
  const columns = [{
    title: '考试名称',
    dataIndex: 'examinationName',
    key: 'examinationName',
  }, {
    title: '开始时间',
    dataIndex: 'startTime',
    key: 'startTime',
  },{
    title: '结束时间',
    dataIndex: 'endTime',
    key: 'endTime',
  },{
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  },{
    title: '操作',
    dataIndex: 'action',
    key: 'action',
  }];
  const examListLoading = ref(false);
  const pagination = reactive({
    onChange: (currentPage, pageSize) => {
      pagination.pageSize = pageSize, pagination.current = currentPage;
      getExamList(currentPage, pageSize)
    },
    total: 0,
    current: 1,
    pageSize: 8,
  })
  const examList = ref([
    {
      examinationId: 0,
      examinationName: '',
      startTime: '',
      endTime: '',
      status: '',
    }
  ])
  const getExamList = async (currentPage = 1, pageSize = 8) => {
    examListLoading.value = true;
    const res = await teacherStore.GetExamList({currentPage, pageSize});
    if (res.code !== 200) return;
    const {data} = res;
    examList.value = [...data.records];
    pagination.total = data.total;
    examListLoading.value = false;
  }

  // 安排监考
  const arrangeInvigilationLoading = ref(false);
  const arrangeInvigilation = async (examinationId) => {
    arrangeInvigilationLoading.value = true;
    const res = await neteacherStore.ArrangeInvigilation(examinationId);
    if (res.code === 200) {
      message.success('安排监考成功，即将为您跳转到排考界面');
      setTimeout(() => {
        let link = router.resolve(`/arrange/${examinationId}`);
        window.open(link.href, '_blank');
      }, 1500)
    }
    arrangeInvigilationLoading.value = false;
  }
  
  // 分配阅卷
  const visible = ref(false);
  const modalLoading = ref(false);
  const endTime = ref(undefined);
  const distributeJudgeTask = async (examinationId) => {
    modalLoading.value = true;
    const res = await neteacherStore.DistributeJudgeTask({examinationId, endTime});
    if (res.code === 200) {
      message.success('分配阅卷任务成功！');
    }
    visible.value = false;
    modalLoading.value = false;
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