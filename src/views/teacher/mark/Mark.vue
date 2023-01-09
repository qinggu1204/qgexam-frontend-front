<template>
  <div class="loading-wrapper" v-show="loading">
    <Loading></Loading>
  </div>
  <div v-show="!loading" class="mark-container"> 
    <a-row type="flex">
      <a-col flex="auto">
        123
      </a-col>
      <a-col flex="350px">
        456
      </a-col>
    </a-row>
  </div>
</template>

<script setup>

  import {onBeforeMount, ref} from "vue";
  import {useTeacherStore} from "@/store/teacher.js";

  const props = defineProps(['answerPaperId']);
  const loading = ref(false);
  const teacherStore = useTeacherStore();
  
  onBeforeMount(async () => {
    loading.value = true;
    await getAnswerPaper();
    loading.value = false;
  })
  
  // 获取答卷
  const answerPaper = ref([
    {
      questionId: '',
      hasSubQuestion: 0,
      questionScore: 0,
      studentAnswer: '',
      questionAns: '',
      subQuestionInfo: [
        {
          subQuestionId: '',
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
    console.log(answerPaper.value);
    loading.value = false;
  }
  
</script>

<style scoped>
  .mark-container {
    min-height: 100vh;
    background-color: #f0f2f5;
  }
</style>