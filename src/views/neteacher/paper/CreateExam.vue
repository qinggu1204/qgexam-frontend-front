<!--创建考试-->
<!--/createExam/:examinationPaperId-->
<template>
  <div class="task-content">
    <a-row justify="center" style="min-height: 100vh">
      <a-col :span="12" style="background-color: #fff;">
        <div>
          <a-steps :current="current">
            <a-step v-for="item in steps" :key="item.title" :title="item.title" />
          </a-steps>
          <div class="steps-content">
            {{ steps[current].content }}
          </div>
          <div class="steps-action">
            <a-button v-if="current < steps.length - 1" type="primary" @click="next">Next</a-button>
            <a-button
                v-if="current == steps.length - 1"
                type="primary"
                @click="message.success('Processing complete!')"
            >
              Done
            </a-button>
            <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">Previous</a-button>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
  import {ref} from "vue";
  import {message} from "ant-design-vue";

  const props = defineProps(['examinationPaperId']);
  
  // 步骤条
  const current = ref(0);
  const next = () => { current.value++; };
  const prev = () => { current.value--; };
  const steps = [{
    title: 'First',
    content: 'First-content',
  }, {
    title: 'Second',
    content: 'Second-content',
  }, {
    title: 'Last',
    content: 'Last-content',
  }];
  
</script>

<style scoped>
  .task-content {
    min-height: 100vh;
    background-color: #f0f2f5;
  }

  .steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 80px;
  }

  .steps-action {
    margin-top: 24px;
  }
</style>