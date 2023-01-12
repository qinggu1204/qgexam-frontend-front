<!--组卷-->
<template>
  <div class="loading-wrapper" v-show="loading">
    <Loading></Loading>
  </div>
  <div class="task-content" v-show="!loading">
    <a-row justify="center" style="min-height: 100vh">
      <a-col :span="12" style="background-color: #fff;">
        <div class="paper-form">
          <a-form
              :model="formPaper" v-bind="layout"
              style="margin-bottom: 100px;"
          >
            <a-form-item label="试卷标题">
              <a-input v-model:value="formPaper.title"/>
            </a-form-item>
            <a-form-item label="总分">
              <a-input-number
                  v-model:value="formPaper.totalScore"
                  :min="0" :max="100"
              />
            </a-form-item>
            <a-form-item label="学科">
              <a-select
                  v-model:value="formPaper.subjectId"
                  show-search
                  :filter-option="filterOption" optionFilterProp="title"
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
            <a-form-item label="章节">
              <a-table
                  :columns="columns" :data-source="chapterList" :row-selection="rowSelection"
                  :loading="tableLoading" :row-key="record => record.chapterId"
              />
            </a-form-item>
            <a-form-item
                v-for="(item, index) in questionDetail"
                label="题目设置"
            >
              <a-space>
                题目类型：
                <a-select
                    v-model:value="questionDetail[index].questionType"
                    style="width: 100px"
                >
                  <a-select-option value="SINGLE">单选题</a-select-option>
                  <a-select-option value="MULTI">多选题</a-select-option>
                  <a-select-option value="JUDGE">判断题</a-select-option>
                  <a-select-option value="COMPLETION">填空题</a-select-option>
                  <a-select-option value="COMPLEX">综合题</a-select-option>
                </a-select>
                题目数量：
                <a-input-number
                    v-model:value="questionDetail[index].questionNumber"
                    :min="0" style="width: 100px"
                />
              </a-space>
              <div style="margin-top: 5%;"></div>
              <a-space>
                题目总分：
                <a-input
                    v-model:value.number="questionDetail[index].questionTotalScore"
                    style="width: 100px"
                />
                题目难度:
                <a-input-number 
                    v-model:value="questionDetail[index].difficultyLevel"
                    style="width: 100px;margin-left: 13px;" :min="1" :max="10"
                />
              </a-space>
            </a-form-item>
            <a-form-item label="操作">
              <a-space>
                <a-button @click="addQuestion" type="primary">添加题型</a-button>
                <a-button @click="removeQuestion">删除题型</a-button>
              </a-space>
            </a-form-item>
            <a-form-item :wrapper-col="{ span: 12, offset: 7 }">
              <a-button type="primary" :loading="createPaperLoading"
                        @click="createPaper">
                提交
              </a-button>
            </a-form-item>
          </a-form>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>

  import {useNeteacherStore} from "@/store/neteacher.js";
  import {onBeforeMount, reactive, ref, toRefs, watch} from "vue";
  import {message} from "ant-design-vue";
  import {useRouter} from "vue-router";
  import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons-vue";

  const router = useRouter();
  const loading = ref(false);
  const neteacherStore = useNeteacherStore();

  onBeforeMount(async () => {
    loading.value = true;
    chapterList.value = [];
    await getSubjectList();
    formPaper.questionDetail = [];
    loading.value = false;
  })

  // 表单布局
  const layout = {
    labelCol: {
      span: 3,
      offset: 4,
    },
    wrapperCol: {
      span: 12,
    },
  };

  // 获取学科列表
  const subjectList = ref([]);
  const filterOption = (input, option) => {
    return option.title.indexOf(input) >= 0;
  }
  const handleSelectChange = (value, option) => {
    formPaper.subjectId = value;
  }
  const getSubjectList = async () => {
    const res = await neteacherStore.GetSubjectList();
    if (res.code === 200) subjectList.value = res.data;
  }

  // 组卷
  const questionDetail = ref([{
    questionType: undefined,
    questionNumber: undefined,
    questionTotalScore: undefined,
    difficultyLevel: undefined,
  }])
  const addQuestion = () => {
    questionDetail.value.push({
      questionType: undefined,
      questionNumber: undefined,
      questionTotalScore: undefined,
      difficultyLevel: undefined,
    })
  }
  const removeQuestion = () => {
    questionDetail.value.pop();
  }
  const formPaper = reactive({
    title: '',
    totalScore: undefined,
    subjectId: undefined,
    chapterList: [],
    questionDetail: [{
      questionType: '',
      questionNumber: 0,
      questionTotalScore: 0,
      difficultyLevel: 0,
    }]
  })
  // 侦听学科的变化发送获取章节请求
  const {subjectId} = toRefs(formPaper);
  watch(subjectId, async (newSubjectId, oldSubjectId) => {
    await getChapterList(newSubjectId);
  })
  // 获取章节
  const chapterList = ref([{
    chapterId: '',
    chapterName: '',
    importanceLevel: '',
  }]);
  // 章节表格
  const columns = [{
    title: '章节名',
    dataIndex: 'chapterName',
  }, {
    title: '重要度',
    dataIndex: 'importanceLevel',
  }];
  const tableLoading = ref(false);
  const getChapterList = async (subjectId) => {
    tableLoading.value = true;
    const res = await neteacherStore.GetChapterBySubject(subjectId);
    if (res.code === 200) {
      chapterList.value = res.data;
    }
    tableLoading.value = false;
  }
  const rowSelection = ref({
    checkStrictly: false,
    onChange: (selectedRowKeys, selectedRows) => {
      formPaper.chapterList = selectedRowKeys;
    }
  });


  const createPaperLoading = ref(false);
  const createPaper = async () => {
    formPaper.questionDetail = questionDetail.value;
    
    if (!formPaper.title) {
      message.warn('试卷名不能为空！');
      return;
    }
    if (!formPaper.totalScore) {
      message.warn('总分不能为空！');
      return;
    }
    if (!formPaper.subjectId) {
      message.warn('学科不能为空！');
      return;
    }
    if (!formPaper.chapterList || !formPaper.chapterList.length) {
      message.warn('章节不能为空！');
      return;
    }
    if (!formPaper.questionDetail || !formPaper.questionDetail.length) {
      message.warn('题目设置填写有误!');
      return;
    }
    
    createPaperLoading.value = true;
    const res = await neteacherStore.CreatePaper(formPaper);
    if (res.code === 200) {
      message.success('组卷成功，即将刷新页面！');
      setTimeout(() => {
        router.push('/');
      }, 1500)
    }
    createPaperLoading.value = false;
  }
</script>

<style scoped>
  .task-content {
    min-height: 100vh;
    background-color: #f0f2f5;
  }

  .paper-form {
    margin-top: 5%;
  }
</style>