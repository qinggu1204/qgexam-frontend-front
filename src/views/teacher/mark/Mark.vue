<template>
  <div class="loading-wrapper" v-show="loading">
    <Loading></Loading>
  </div>
  <div v-show="!loading" class="mark-container">
    <a-row type="flex">
      <a-col flex="auto" style="margin-left: 13%;margin-top: 3%;">
        <a-typography-title :level="2">
          综合题（共{{ answerPaper.length }}题）
        </a-typography-title>
        <div v-for="(item, index) in answerPaper" 
             :key="item.questionId" :id="item.questionId"
             style="max-width: 700px"
        >
          <a-typography-paragraph>
            <b>{{ index + 1 }}.综合题（{{ item.questionScore }}分）</b>
          </a-typography-paragraph>
          <a-typography-paragraph>
            {{ item.description }}
          </a-typography-paragraph>
          <a-typography-paragraph
              v-if="item.hasSubQuestion === 0"
          >
            <blockquote>
              <a-space :size="5" align="baseline" direction="vertical">
                <a-typography-paragraph>
                  <span><b>学生答案：</b><span v-html="item.studentAnswer"></span></span>
                </a-typography-paragraph>
                <a-typography-paragraph>
                  <span style="color: #56b870"><b>参考答案：</b>{{ item.questionAns }}</span>
                </a-typography-paragraph>
                <a-typography-paragraph>
                  <span><b>学生分数：</b></span>
                  <a-input-number 
                      v-model:value="item.score" 
                      :min="0" :max="item.questionScore"
                      style="max-width: 65px"
                  />
                  <span><b>&nbsp;分</b></span>
                </a-typography-paragraph>
              </a-space>
            </blockquote>
          </a-typography-paragraph>
          <a-typography-paragraph
              v-if="item.hasSubQuestion === 1"
              v-for="(sub, subIndex) in item.subQuestionInfo" :key="sub.subQuestionId"
          >
            <a-typography-paragraph>
              （{{subIndex + 1}}）{{sub.subQuestionDesc}}
            </a-typography-paragraph>
            <blockquote>
              <a-space :size="5" align="baseline" direction="vertical">
                <a-typography-paragraph>
                  <span><b>学生答案：</b><span v-html="sub.subQuestionAnswer"></span></span>
                </a-typography-paragraph>
                <a-typography-paragraph>
                  <span style="color: #56b870"><b>参考答案：</b>{{ sub.subQuestionAns }}</span>
                </a-typography-paragraph>
              </a-space>
            </blockquote>
          </a-typography-paragraph>
          <a-typography-paragraph v-if="item.hasSubQuestion === 1">
            <blockquote>
              <span><b>学生分数：</b></span>
              <a-input-number
                  v-model:value="item.score"
                  :min="0" :max="item.questionScore"
                  style="max-width: 65px"
              />
              <span><b>&nbsp;分</b></span>
            </blockquote>
          </a-typography-paragraph>
        </div>
        <div style="margin-bottom: 5%;margin-top: 2%;">
          <a-button @click="marking" type="primary" :loading="markingLoading">
            提交
          </a-button>
        </div>
      </a-col>
      <a-col flex="350px" style="margin-top: 3%;">
        <a-anchor :target-offset="targetOffset" :affix="true">
          <div>
            <span style="font-size:xx-large;margin-left: 15px;">
              综合题
            </span>
            <div>
              <a-anchor-link v-for="(item, index) in answerPaper"
                             :href="'#' + item.questionId"
              >
                <template #title>
                  <a-button type="primary" ghost @click.prevent>{{ index + 1 }}</a-button>
                </template>
              </a-anchor-link>
            </div>
          </div>
        </a-anchor>
      </a-col>
    </a-row>
    <a-back-top/>
  </div>
</template>

<script setup>

  import {onBeforeMount, onMounted, ref} from "vue";
  import {useTeacherStore} from "@/store/teacher.js";
  import {message} from "ant-design-vue";
  import {useRouter} from "vue-router";

  const props = defineProps(['answerPaperId']);
  const loading = ref(false);
  const router = useRouter();
  const teacherStore = useTeacherStore();

  onBeforeMount(async () => {
    loading.value = true;
    await getAnswerPaper();
    loading.value = false;
  })
  
  // 动态锚点
  const targetOffset = ref(undefined);
  onMounted(() => {
    targetOffset.value = window.innerHeight / 2 - 150;
  })

  // 获取答卷
  const answerPaper = ref([
    {
      questionId: 0,
      hasSubQuestion: 0,
      questionScore: 0,
      description: '',
      studentAnswer: '',
      questionAns: '',
      score: 0,
      subQuestionInfo: [
        {
          subQuestionId: '',
          subQuestionDesc: '',
          subQuestionAnswer: '',
          subQuestionAns: '',
        }
      ]
    }
  ])
  const getAnswerPaper = async () => {
    loading.value = true;
    const res = await teacherStore.GetAnswerPaper(props.answerPaperId);
    if (res.code !== 200) return;
    answerPaper.value = res.data;
    loading.value = false;
  }
  
  // 提交阅卷
  const markingLoading = ref(false);
  const marking = async () => {
    markingLoading.value = true;
    const res = await teacherStore.Marking(props.answerPaperId, answerPaper.value);
    if (res.code === 200) {
      message.success('批阅成功！');
      setTimeout(() => {
        router.back();
      }, 1000)
    }
    markingLoading.value = false;
  }
  

</script>

<style scoped>
  .mark-container {
    min-height: 100vh;
    background-color: #f0f2f5;
  }

  :deep(.ant-anchor-ink) {
    display: none;
  }

  :deep(.ant-anchor-link) {
    display: inline-flex;
  }

  :deep(.ant-anchor-link-active .ant-btn-background-ghost) {
    color: #fff;
    border-color: #5eaf7d;
    background: #5eaf7d;
    text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
    box-shadow: 0 2px 0 rgb(0 0 0 / 5%);
    outline: 0;
  }

  .choice :deep(.ant-radio-wrapper) {
    display: block;
    margin-bottom: 5px;
  }

  .choice :deep(.ant-checkbox-wrapper) {
    display: flex;
    margin-bottom: 10px;
  }
</style>