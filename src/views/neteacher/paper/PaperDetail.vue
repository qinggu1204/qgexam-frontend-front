<!--预览试卷页面-->
<!--/paper/:examinationPaperId-->
<template>
  <div class="loading-wrapper" v-show="loading">
    <Loading></Loading>
  </div>
  <div class="task-content" v-show="!loading">
    <a-row justify="center" style="min-height: 100vh">
      <a-col :span="12" style="background-color: #fff;">
        <div class="center-col" style="margin-top: 5%;">
          <a-typography-title :level="2">
            预览试卷
          </a-typography-title>          
        </div>
        <div 
            v-for="(item, index) in paper" :key="item.questionId"
            class="question"
        >
          <a-typography-paragraph>
            <span>
              <b>{{index + 1}}.{{item.subOrObj === 1 ? '客观题' : '主观题'}}</b>
            </span>
          </a-typography-paragraph>
          <a-typography-paragraph>
            {{item.description}}
          </a-typography-paragraph>
          <!--客观题-->
          <a-typography-paragraph v-if="item.subOrObj === 1">
            <a-typography-paragraph 
                v-for="sub in item.optionInfo" :key="sub.optionId"
            >
              {{sub.optionName + ' ' + sub.optionDesc}}
            </a-typography-paragraph>
            <a-typography-paragraph>
              <blockquote style="color:#56b870">
                <b>参考答案：{{item.questionAns}}</b>
              </blockquote>
            </a-typography-paragraph>
          </a-typography-paragraph>
          <!--有小题的主观题-->
          <a-typography-paragraph 
              v-else-if="item.subQuestionInfo && item.subQuestionInfo.length > 0"
          >
            <a-typography-paragraph
              v-for="(sub, subIndex) in item.subQuestionInfo" 
              :key="sub.subQuestionId"
            >
              <a-typography-paragraph>
               （{{subIndex + 1}}）
                {{sub.subQuestionDesc}}
              </a-typography-paragraph>
              <a-typography-paragraph>
                <blockquote style="color:#56b870">
                  <b>参考答案：</b>
                  {{sub.subQuestionAns}}
                </blockquote>
              </a-typography-paragraph>
            </a-typography-paragraph>
          </a-typography-paragraph>
          <!--无小题的主观题-->
          <a-typography-paragraph v-else>
            <a-typography-paragraph>
              {{item.description}}
            </a-typography-paragraph>
            <a-typography-paragraph>
              <blockquote style="color:#56b870">
                <b>参考答案：</b>
                {{item.questionAns}}
              </blockquote>
            </a-typography-paragraph>
          </a-typography-paragraph>
        </div>
        <a-divider />
        <div style="float: right;margin-right: 5%;margin-bottom: 12%;">
          <a-button type="primary" 
                    @click="router.push(`/createExam/${examinationPaperId}`)"
          >
            发布考试
          </a-button>
        </div>
      </a-col>
    </a-row>
    <a-back-top />
  </div>
</template>

<script setup>

  import {onBeforeMount, ref} from "vue";
  import {useNeteacherStore} from "@/store/neteacher.js";
  import {useRouter} from "vue-router";

  const props = defineProps(['examinationPaperId']);
  const loading = ref(false);
  const router = useRouter();
  const neteacherStore = useNeteacherStore();
  
  onBeforeMount(async () => {
    await previewPaper();
  })
  
  // 获取试卷
  const paper = ref([{
    questionId: 0,
    description: '',
    subOrObj: 0,
    questionAns: '',
    optionInfo: [{
      optionId: 0,
      optionName: '',
      optionDesc: '',
    }],
    subQuestionInfo: [{
      subQuestionId: 0,
      subQuestionDesc: '',
      subQuestionAns: '',
    }]
  }])
  const previewPaper = async () => {
    loading.value = true;
    const res = await neteacherStore.PreviewPaper(props.examinationPaperId);
    if (res.code === 200) {
      paper.value = res.data;
    }
    loading.value = false;
  }

</script>

<style scoped>
  .task-content {
    min-height: 100vh;
    background-color: #f0f2f5;
  }
  
  .question {
    max-width: 700px;
    margin-left: 3%;
    margin-bottom: 5%;
    margin-top: 3%;
  }
</style>