<!--错题集-->
<!--/errorSet/:courseId-->
<template>
  <!--加载中-->
  <div class="loading-wrapper" v-show="loading">
    <Loading></Loading>
  </div>
  <!--详情-->
  <div class="exam-detail" v-show="!loading">
    <div style="padding-left: 8%;padding-top: 1%;min-height: 100vh">
      <a-row>
        <a-col :span="12">
          <router-link style="color: black;" to="/">
            <a-space>
              <rollback-outlined :style="{fontSize: '32px'}"/>
              <b>返回</b>
            </a-space>
          </router-link>
        </a-col>
      </a-row>
      <a-row type="flex" style="padding-top: 2%;min-height: 100vh">
        <a-col flex="1 1 200px">
          <div v-if="examScoreDetail.single.singleList.length" style="max-width: 700px">
            <a-typography-title :level="2">
              单选题（共{{ examScoreDetail.single.singleList.length }}题）
            </a-typography-title>
            <div v-for="(item, index) in examScoreDetail.single.singleList" :key="item.questionId"
                 :id="item.questionId">
              <a-typography-paragraph>
                <a-space :size="20">
                  <b>{{ index + 1 }}.单选题（{{ item.questionScore }}分）</b>
                  <b>章节：{{item.chapterName}}</b>
                  <b>题目难度：{{item.difficultyLevel}}</b>
                </a-space>
              </a-typography-paragraph>
              <a-typography-paragraph>
                {{ item.description }}
              </a-typography-paragraph>
              <a-typography-paragraph v-for="option in item.optionInfo" :key="option.value">
                {{ option.label }}
              </a-typography-paragraph>
              <a-typography-paragraph>
                <blockquote>
                  <a-space :size="30" align="baseline">
                    <span><b>我的答案：{{ item.answer }}</b></span>
                    <span style="color: #56b870"><b>正确答案：{{ item.questionAns }}</b></span>
                    <close-outlined v-if="item.questionScore!==item.score" :style="{color: '#dd3927'}"/>
                    <check-outlined v-if="item.questionScore===item.score" :style="{color: '#56b870'}"/>
                    <span style="font-size: large"><b>{{ item.score }}分</b></span>
                  </a-space>
                </blockquote>
              </a-typography-paragraph>
            </div>
          </div>
          <div v-if="examScoreDetail.multi.multiList.length" style="max-width: 700px">
            <a-typography-title :level="2">
              多选题（共{{ examScoreDetail.multi.multiList.length }}题）
            </a-typography-title>
            <div v-for="(item, index) in examScoreDetail.multi.multiList" :key="item.questionId" :id="item.questionId">
              <a-typography-paragraph>
                <a-typography-paragraph>
                  <a-space :size="20">
                    <b>{{ index + 1 }}.多选题（{{ item.questionScore }}分）</b>
                    <b>章节：{{item.chapterName}}</b>
                    <b>题目难度：{{item.difficultyLevel}}</b>
                  </a-space>
                </a-typography-paragraph>
              </a-typography-paragraph>
              <a-typography-paragraph>
                {{ item.description }}
              </a-typography-paragraph>
              <a-typography-paragraph v-for="option in item.optionInfo" :key="option.value">
                {{ option.label }}
              </a-typography-paragraph>
              <a-typography-paragraph>
                <blockquote>
                  <a-space :size="30" align="baseline">
                    <span><b>我的答案：{{ item.answer }}</b></span>
                    <span style="color: #56b870"><b>正确答案：{{ item.questionAns }}</b></span>
                    <close-outlined v-if="item.questionScore!==item.score" :style="{color: '#dd3927'}"/>
                    <check-outlined v-if="item.questionScore===item.score" :style="{color: '#56b870'}"/>
                    <span style="font-size: large"><b>{{ item.score }}分</b></span>
                  </a-space>
                </blockquote>
              </a-typography-paragraph>
            </div>
          </div>
          <div v-if="examScoreDetail.judge.judgeList.length" style="max-width: 700px">
            <a-typography-title :level="2">
              判断题（共{{ examScoreDetail.judge.judgeList.length }}题）
            </a-typography-title>
            <div v-for="(item, index) in examScoreDetail.judge.judgeList" :key="item.questionId" :id="item.questionId">
              <a-typography-paragraph>
                <a-space :size="20">
                  <b>{{ index + 1 }}.判断题（{{ item.questionScore }}分）</b>
                  <b>章节：{{item.chapterName}}</b>
                  <b>题目难度：{{item.difficultyLevel}}</b>
                </a-space>
              </a-typography-paragraph>
              <a-typography-paragraph>
                {{ item.description }}
              </a-typography-paragraph>
              <a-typography-paragraph v-for="option in item.optionInfo" :key="option.value">
                {{ option.label }}
              </a-typography-paragraph>
              <a-typography-paragraph>
                <blockquote>
                  <a-space :size="30" align="baseline">
                    <span><b>我的答案：{{ item.answer }}</b></span>
                    <span style="color: #56b870"><b>正确答案：{{ item.questionAns }}</b></span>
                    <close-outlined v-if="item.questionScore!==item.score" :style="{color: '#dd3927'}"/>
                    <check-outlined v-if="item.questionScore===item.score" :style="{color: '#56b870'}"/>
                    <span style="font-size: large"><b>{{ item.score }}分</b></span>
                  </a-space>
                </blockquote>
              </a-typography-paragraph>
            </div>
          </div>
          <div v-if="examScoreDetail.completion.completionList.length" style="max-width: 700px">
            <a-typography-title :level="2">
              填空题（共{{ examScoreDetail.completion.completionList.length }}题）
            </a-typography-title>
            <div v-for="(item, index) in examScoreDetail.completion.completionList" :key="item.questionId" :id="item.questionId">
              <a-typography-paragraph>
                <a-space :size="20">
                  <b>{{ index + 1 }}.填空题（{{ item.questionScore }}分）</b>
                  <b>章节：{{item.chapterName}}</b>
                  <b>题目难度：{{item.difficultyLevel}}</b>
                </a-space>
              </a-typography-paragraph>
              <a-typography-paragraph>
                {{ item.description }}
              </a-typography-paragraph>
              <a-typography-paragraph>
                <blockquote>
                  <a-space :size="5" align="baseline" direction="vertical">
                    <a-typography-paragraph>
                      <span><b>我的答案：</b>{{ item.answer }}</span>
                    </a-typography-paragraph>
                    <a-typography-paragraph>
                      <span style="color: #56b870"><b>正确答案：</b>{{ item.questionAns }}</span>
                    </a-typography-paragraph>
                    <a-typography-paragraph>
                      <a-space :size="30">
                        <close-outlined v-if="item.questionScore!==item.score" :style="{color: '#dd3927'}"/>
                        <check-outlined v-if="item.questionScore===item.score" :style="{color: '#56b870'}"/>
                        <span style="font-size: large"><b>{{ item.score }}分</b></span>
                      </a-space>
                    </a-typography-paragraph>
                  </a-space>
                </blockquote>
              </a-typography-paragraph>
            </div>
          </div>
          <div v-if="examScoreDetail.complex.complexList.length" style="max-width: 700px">
            <a-typography-title :level="2">
              综合题（共{{ examScoreDetail.complex.complexList.length }}题）
            </a-typography-title>
            <div v-for="(item, index) in examScoreDetail.complex.complexList" :key="item.questionId" :id="item.questionId">
              <a-typography-paragraph>
                <a-space :size="20">
                  <b>{{ index + 1 }}.综合题（{{ item.questionScore }}分）</b>
                  <b>章节：{{item.chapterName}}</b>
                  <b>题目难度：{{item.difficultyLevel}}</b>
                </a-space>
              </a-typography-paragraph>
              <a-typography-paragraph>
                {{ item.description }}
              </a-typography-paragraph>
              <a-typography-paragraph
                  v-if="!item.hasSubQuestion"
              >
                <blockquote>
                  <a-space :size="5" align="baseline" direction="vertical">
                    <a-typography-paragraph>
                      <span><b>我的答案：</b>{{ item.answer }}</span>
                    </a-typography-paragraph>
                    <a-typography-paragraph>
                      <span style="color: #56b870"><b>正确答案：</b>{{ item.questionAns }}</span>
                    </a-typography-paragraph>
                  </a-space>
                </blockquote>
              </a-typography-paragraph>
              <a-typography-paragraph
                  v-else
                  v-for="(sub, subIndex) in item.subQuestionInfo" :key="sub.subQuestionId"
              >
                <a-typography-paragraph>
                  （{{subIndex + 1}}）{{sub.subQuestionDesc}}
                </a-typography-paragraph>
                <blockquote>
                  <a-space :size="5" align="baseline" direction="vertical">
                    <a-typography-paragraph>
                      <span><b>我的答案：</b>{{ sub.subQuestionAnswer }}</span>
                    </a-typography-paragraph>
                    <a-typography-paragraph>
                      <span style="color: #56b870"><b>正确答案：</b>{{ sub.subQuestionAns }}</span>
                    </a-typography-paragraph>
                  </a-space>
                </blockquote>
              </a-typography-paragraph>
              <a-typography-paragraph>
                <a-space :size="30">
                  <close-outlined v-if="item.questionScore!==item.score" :style="{color: '#dd3927'}"/>
                  <check-outlined v-if="item.questionScore===item.score" :style="{color: '#56b870'}"/>
                  <span style="font-size: large"><b>{{ item.score }}分</b></span>
                </a-space>
              </a-typography-paragraph>
            </div>
          </div>
        </a-col>
        <a-col flex="0 1 350px">
          <a-anchor :target-offset="targetOffset" :affix="true">
            <div v-if="examScoreDetail.single.singleList.length">
              <span style="font-size:xx-large;margin-left: 15px;">单选题</span>
              <div v-if="examScoreDetail.single.singleList.length">
                <a-anchor-link v-for="(item, index) in examScoreDetail.single.singleList"
                               :href="'#' + item.questionId"
                >
                  <template #title>
                    <a-button type="primary" ghost @click.prevent>{{ index + 1 }}</a-button>
                  </template>
                </a-anchor-link>
              </div>
            </div>
            <div v-if="examScoreDetail.multi.multiList.length">
              <span style="font-size:xx-large;margin-left: 15px;">多选题</span>
              <div v-if="examScoreDetail.multi.multiList.length">
                <a-anchor-link v-for="(item, index) in examScoreDetail.multi.multiList"
                               :href="'#' + item.questionId"
                >
                  <template #title>
                    <a-button type="primary" ghost @click.prevent>{{index + 1}}</a-button>
                  </template>
                </a-anchor-link>
              </div>
            </div>
            <div v-if="examScoreDetail.judge.judgeList.length">
              <span style="font-size:xx-large;margin-left: 15px;">判断题</span>
              <div v-if="examScoreDetail.judge.judgeList.length">
                <a-anchor-link v-for="(item, index) in examScoreDetail.judge.judgeList"
                               :href="'#' + item.questionId"
                >
                  <template #title>
                    <a-button type="primary" ghost @click.prevent>{{index + 1}}</a-button>
                  </template>
                </a-anchor-link>
              </div>
            </div>
            <div v-if="examScoreDetail.completion.completionList.length">
              <span style="font-size:xx-large;margin-left: 15px;">填空题</span>
              <div v-if="examScoreDetail.completion.completionList.length">
                <a-anchor-link v-for="(item, index) in examScoreDetail.completion.completionList"
                               :href="'#' + item.questionId"
                >
                  <template #title>
                    <a-button type="primary" ghost @click.prevent>{{index + 1}}</a-button>
                  </template>
                </a-anchor-link>
              </div>
            </div>
            <div v-if="examScoreDetail.complex.complexList.length">
              <span style="font-size:xx-large;margin-left: 15px;">综合题</span>
              <div v-if="examScoreDetail.complex.complexList.length">
                <a-anchor-link v-for="(item, index) in examScoreDetail.complex.complexList"
                               :href="'#' + item.questionId"
                >
                  <template #title>
                    <a-button type="primary" ghost @click.prevent>{{index + 1}}</a-button>
                  </template>
                </a-anchor-link>
              </div>
            </div>
          </a-anchor>
        </a-col>
      </a-row>
    </div>
    <a-back-top />
  </div>
</template>

<script setup>

  import {useStudentStore} from "@/store/student.js";
  import {onBeforeMount, onMounted, ref} from "vue";
  import {CheckOutlined, ClockCircleOutlined, CloseOutlined, RollbackOutlined} from "@ant-design/icons-vue";


  const props = defineProps(['courseId']);
  const loading = ref(false);
  const studentStore = useStudentStore();
  
  onBeforeMount(async () => {
    await getErrorQuestionList();
  })
  
  // 错题集
  let examScoreDetail = ref({
    single: {
      singleList: [],
    },
    multi: {
      multiList: [],
    },
    judge: {
      judgeList: [],
    },
    completion: {
      completionList: [],
    },
    complex: {
      complexList: [],
    }
  })
  const getErrorQuestionList = async () => {
    loading.value = true;
    const res = await studentStore.GetErrorQuestionList({courseId: props.courseId});
    if (res.code === 200) {
      examScoreDetail.value = res.data;
    }
    loading.value = false;
  }

  // 动态锚点
  const targetOffset = ref(undefined);
  onMounted(() => {
    targetOffset.value = window.innerHeight / 2 - 150;
  })
</script>

<style lang="less" scoped>
  .center-col {
    display: flex;
    align-items: center;
    justify-content: center;
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

  @rich-text-container: 600px;
  :deep(.ql-toolbar) {
    width: @rich-text-container;
  }

  :deep(.ql-snow) {
    width: @rich-text-container;
  }

  :deep(.ql-container) {
    width: @rich-text-container;
  }

  .exam-detail {
    min-height: 100vh;
    background-color: #f0f2f5;
    box-sizing: border-box;
  }
</style>