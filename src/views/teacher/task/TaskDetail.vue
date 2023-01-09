<template>
  <div class="loading-wrapper" v-show="loading">
    <Loading></Loading>
  </div>
  <div class="task-content" v-show="!loading">
    <a-row justify="center" style="min-height: 100vh">
      <a-col :span="9" style="background-color: #fff;">
        <a-row justify="center">
          <!--标题-->
          <a-col style="margin-top: 2%;">
            <span style="font-size: x-large">答卷列表</span>
          </a-col>
        </a-row>
        <a-row justify="center">
          <!--答卷列表-->
          <a-col :span="24">
            <a-table
                :columns="columns"
                :row-key="record => record.answerPaperId"
                :data-source="list"
                :loading="listLoading"
                :pagination="pagination"
            >
              <template #bodyCell="{ column, record }">
                <template v-if="column.key==='isMarked'">
                  <a-badge status="processing" 
                           v-if="record.isMarked === 0"
                           text="待批阅"
                  />
                  <a-badge status="default"
                           v-else
                           text="已批阅"
                  />
                </template>
                <templat v-if="column.key==='action'">
                  <a
                      :href="`/mark/${record.answerPaperId}`"
                      target="_blank"
                  >
                    {{record.isMarked === 0 ? '批阅' : '查看'}}
                  </a>
                </templat>
              </template>
            </a-table>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
  import {onBeforeMount, reactive, ref} from "vue";
  import {useTeacherStore} from "@/store/teacher.js";
  
  const loading = ref(false);
  const props = defineProps(['examinationId']);
  const teacherStore = useTeacherStore();
  
  onBeforeMount(async () => {
    loading.value = true;
    await getAnswerPaperList();
    loading.value = false;
  })
  
  // 答卷列表
  const columns = [{
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
  }, {
    title: '状态',
    dataIndex: 'isMarked',
    key: 'isMarked',
  }, {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
  }];
  const listLoading = ref(false);
  const pagination = reactive({
    onChange: (currentPage, pageSize) => {
      pagination.pageSize = pageSize, pagination.current = currentPage;
      getAnswerPaperList(currentPage, pageSize);
    },
    total: 0,
    current: 1,
    pageSize: 10,
  })
  const list = ref([
    {
      answerPaperId: '',
      updateTime: '',
      isMarked: 0,
    }
  ])
  const getAnswerPaperList = async (
      currentPage = 1, pageSize = 10
  ) => {
    listLoading.value = true;
    const res = await teacherStore.GetAnswerPaperList(
        props.examinationId,{currentPage, pageSize}
    );
    if (res.code !== 200) return;
    const {data} = res;
    list.value = [...data.records];
    pagination.total = data.total;
    listLoading.value = false;
  }

  // 阅卷按钮
  /*const gotoMark = (answerPaperId) => {
    let link = router.resolve(`/task/${answerPaperId}`);
    window.open(link.href, '_blank');
  }*/
  
</script>

<style scoped>
  .task-content {
    min-height: 100vh;
    background-color: #f0f2f5;
  }
</style>