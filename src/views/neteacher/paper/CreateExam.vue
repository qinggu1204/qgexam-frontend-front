<!--创建考试-->
<!--/createExam/:examinationPaperId-->
<template>
  <div class="task-content">
    <a-row justify="center" style="min-height: 100vh">
      <a-col :span="12" style="background-color: #fff;">
        <div style="margin-top: 18%;margin-left: 5%;margin-right: 5%;">
          <a-steps :current="current">
            <a-step v-for="item in steps" :key="item.title" :title="item.title"/>
          </a-steps>
          <div class="steps-content">
            <a-form
                :model="formExamSettings" v-bind="layout"
            >
              <a-form-item label="考试名称" v-show="isVisible('basic')">
                <a-input v-model:value="formExamSettings.examinationName"/>
              </a-form-item>
              <a-form-item label="开始时间" v-show="isVisible('basic')">
                <a-date-picker
                    v-model:value="formExamSettings.startTime"
                    show-time
                    format="YYYY-MM-DD HH:mm:ss"
                    value-format="YYYY-MM-DD HH:mm:ss"
                    style="min-width: 100%"
                />
              </a-form-item>
              <a-form-item label="结束时间" v-show="isVisible('basic')">
                <a-date-picker
                    v-model:value="formExamSettings.endTime"
                    show-time
                    format="YYYY-MM-DD HH:mm:ss"
                    value-format="YYYY-MM-DD HH:mm:ss"
                    style="min-width: 100%"
                />
              </a-form-item>
              <a-form-item label="限时进入" v-show="isVisible('advance')">
                <a-space style="float: left">
                  <a-input-number
                      v-model:value="formExamSettings.limitTime" :min="0"
                  />
                  分钟
                </a-space>
              </a-form-item>
              <a-form-item label="题目乱序" v-show="isVisible('advance')">
                <a-radio-group v-model:value="formExamSettings.isQuestionResort"
                               style="float: left"
                >
                  <a-radio :value="0">默认</a-radio>
                  <a-radio :value="1">乱序</a-radio>
                </a-radio-group>
              </a-form-item>
              <a-form-item label="选项乱序" v-show="isVisible('advance')">
                <a-radio-group v-model:value="formExamSettings.isOptionResort"
                               style="float: left"
                >
                  <a-radio :value="0">默认</a-radio>
                  <a-radio :value="1">乱序</a-radio>
                </a-radio-group>
              </a-form-item>
              <a-form-item label="发布学科" v-show="isVisible('create')">
                <a-select
                    v-model:value="formExamSettings.subjectId"
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
            </a-form>
          </div>
          <div class="steps-action">
            <a-button v-if="current < steps.length - 1" type="primary" @click="next">下一步</a-button>
            <a-button
                v-if="current == steps.length - 1"
                type="primary"
                @click="createExam"
            >
              发布考试
            </a-button>
            <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">上一步</a-button>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
  import {onBeforeMount, onMounted, reactive, ref} from "vue";
  import {message} from "ant-design-vue";
  import {useRouter} from "vue-router";
  import {useNeteacherStore} from "@/store/neteacher.js";
  import {useTeacherStore} from "@/store/teacher.js";

  const props = defineProps(['examinationPaperId']);
  const router = useRouter();
  const neteacherStore = useNeteacherStore();

  onBeforeMount(async () => {
    await getSubjectList();
  })
  onMounted(() => {
    formExamSettings.examinationPaperId = props.examinationPaperId;
  })

  // 步骤条
  const current = ref(0);
  const next = () => {
    current.value++;
  };
  const prev = () => {
    current.value--;
  };
  const steps = [{
    title: '基础设置',
    content: 'basic',
  }, {
    title: '高级设置',
    content: 'advance',
  }, {
    title: '发放设置',
    content: 'create',
  }];
  // 判断应该在第几步显示
  const isVisible = (type) => {
    return steps[current.value].content === type;
  }
  
  // 获取学科列表
  const subjectList = ref([]);
  const filterOption = (input, option) => {
    return option.title.indexOf(input) >= 0;
  }
  const handleSelectChange = (value, option) => {
    formExamSettings.subjectId = value;
  }
  const getSubjectList = async () => {
    const res = await neteacherStore.GetSubjectList();
    if (res.code === 200) subjectList.value = res.data;
  }

  // 发布考试
  const createExamLoading = ref(false);
  const formExamSettings = reactive({
    examinationPaperId: 0,
    examinationName: '',
    startTime: '',
    endTime: '',
    limitTime: 0,
    isQuestionResort: 0,
    isOptionResort: 0,
    subjectId: undefined,
  })
  const layout = {
    labelCol: {
      span: 3,
      offset: 6,
    },
    wrapperCol: {
      span: 8,
    },
  };
  const createExam = async () => {
    if (!formExamSettings.examinationName) {
      message.warn('考试名称不能为空！');
      return;
    }
    if (!formExamSettings.startTime) {
      message.warn('考试开始时间不能为空！');
      return;
    }
    if (!formExamSettings.endTime) {
      message.warn('考试结束时间不能为空！');
      return;
    }
    if (formExamSettings.endTime < formExamSettings.startTime) {
      message.warn('考试结束时间不能早于开始时间！');
      return;
    }
    if (!formExamSettings.subjectId) {
      message.warn('发布学科不能为空！');
      return;
    }
    
    createExamLoading.value = true;
    const res = await neteacherStore.CreateExam(formExamSettings);
    if (res.code === 200) {
      message.success('发布考试成功！');
      setTimeout(() => {
        router.push('/');
      }, 1500)
    }
    createExamLoading.value = false;
  }


</script>

<style scoped>
  .task-content {
    min-height: 100vh;
    background-color: #f0f2f5;
  }

  .steps-content {
    display: block;
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 300px;
    text-align: center;
    padding-top: 80px;
  }

  .steps-action {
    margin-top: 24px;
  }
</style>