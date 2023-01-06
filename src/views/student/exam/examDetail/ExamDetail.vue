<!--考试详情，路由匹配：/exam/:examinationId-->
<template>
  <!--加载中-->
  <div class="loading-wrapper" v-show="status === 'loading'">
    <Loading></Loading>
  </div>
  <!--已结束的考试，展示成绩-->
  <div style="margin-left: 8%;margin-top: 1%;" v-if="status === 'done'">
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
    <a-row type="flex" style="min-height: 90vh;margin-top: 2%;">
      <a-col flex="1 1 200px">
        <a-row type="flex">
          <a-col :flex="1">
            <a-space direction="vertical">
              <span style="font-size:xx-large">{{examInfo.examinationName}}</span>
              <span style="color: gray;font-size: large">
                考试时间：
                {{dayjs(examInfo.startTime).format('YYYY-MM-DD HH:mm:ss')}} 
                至 
                {{dayjs(examInfo.endTime).format('YYYY-MM-DD HH:mm:ss')}}
              </span>
            </a-space>
          </a-col>
          <a-col :flex="2">
            <span style="font-size: x-large;color: palevioletred">
              {{ examScoreDetail.stuTotalScore }} / {{ examScoreDetail.totalScore }} 分
            </span>
          </a-col>
        </a-row>
        <a-row style="min-height: 100%;margin-top: 1%;">
          <div v-if="examScoreDetail.single.singleList.length" style="max-width: 700px">
            <a-typography-title :level="2">
              单选题（共{{ examScoreDetail.single.singleList.length }}题
              ，{{ examScoreDetail.single.singleList.length * examScoreDetail.single.singleList[0].questionScore }}分）
            </a-typography-title>
            <div v-for="(item, index) in examScoreDetail.single.singleList" :key="item.questionId"
                 :id="item.questionId">
              <a-typography-paragraph>
                <b>{{ index + 1 }}.单选题（{{ item.questionScore }}分）</b>
              </a-typography-paragraph>
              <a-typography-paragraph>
                {{ item.description }}
              </a-typography-paragraph>
              <a-typography-paragraph v-for="(option, optionIndex) in item.optionInfo" :key="option.value">
                {{ alphaMap[optionIndex + 1] }}{{ option.label }}
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
              多选题（共{{ examScoreDetail.multi.multiList.length }}题
              ，{{ examScoreDetail.multi.multiList.length * examScoreDetail.multi.multiList[0].questionScore }}分）
            </a-typography-title>
            <div v-for="(item, index) in examScoreDetail.multi.multiList" :key="item.questionId" :id="item.questionId">
              <a-typography-paragraph>
                <b>{{ index + 1 }}.多选题（{{ item.questionScore }}分）</b>
              </a-typography-paragraph>
              <a-typography-paragraph>
                {{ item.description }}
              </a-typography-paragraph>
              <a-typography-paragraph v-for="(option, optionIndex) in item.optionInfo" :key="option.value">
                {{ alphaMap[optionIndex + 1] }}{{ option.label }}
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
              判断题（共{{ examScoreDetail.judge.judgeList.length }}题
              ，{{ examScoreDetail.judge.judgeList.length * examScoreDetail.judge.judgeList[0].questionScore }}分）
            </a-typography-title>
            <div v-for="(item, index) in examScoreDetail.judge.judgeList" :key="item.questionId" :id="item.questionId">
              <a-typography-paragraph>
                <b>{{ index + 1 }}.判断题（{{ item.questionScore }}分）</b>
              </a-typography-paragraph>
              <a-typography-paragraph>
                {{ item.description }}
              </a-typography-paragraph>
              <a-typography-paragraph v-for="(option, optionIndex) in item.optionInfo" :key="option.value">
                {{ alphaMap[optionIndex + 1] }}{{ option.label }}
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
              填空题（共{{ examScoreDetail.completion.completionList.length }}题
              ，{{ examScoreDetail.completion.completionList.length * examScoreDetail.completion.completionList[0].questionScore }}分）
            </a-typography-title>
            <div v-for="(item, index) in examScoreDetail.completion.completionList" :key="item.questionId" :id="item.questionId">
              <a-typography-paragraph>
                <b>{{ index + 1 }}.填空题（{{ item.questionScore }}分）</b>
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
              综合题（共{{ examScoreDetail.complex.complexList.length }}题
              ，{{ leftScore }}分）
            </a-typography-title>
            <div v-for="(item, index) in examScoreDetail.complex.complexList" :key="item.questionId" :id="item.questionId">
              <a-typography-paragraph>
                <b>{{ index + 1 }}.综合题（{{ item.questionScore }}分）</b>
              </a-typography-paragraph>
              <a-typography-paragraph>
                {{ item.description }}
              </a-typography-paragraph>
              <a-typography-paragraph 
                  v-if="item.hasSubQuestion"
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
        </a-row>
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
  <!--进行中的考试，展示答题页面-->
  <div style="margin-top: 1%;" v-if="status === 'doing'">
    <a-row justify="space-between">
      <a-col :span="8" class="center-col">
        <router-link style="color: black;" to="/">
          <a-space>
            <rollback-outlined :style="{fontSize: '32px'}"/>
            <b>返回</b>
          </a-space>
        </router-link>
      </a-col>
      <a-col :span="8" class="center-col">
        <span style="font-size:x-large">{{examInfo.examinationName}}</span>
      </a-col>
      <a-col :span="8" class="center-col">
        <a-space>
          <a-button @click="saveOrSubmit('save')" :loading="saveLoading">保存</a-button>
          <a-button type="primary" @click="saveOrSubmit('submit')" :loading="submitLoading">交卷</a-button>
        </a-space>
      </a-col>
    </a-row>
    <a-row type="flex" style="margin-top: 3%;">
      <a-col flex="350px" style="margin-top: 1%">
        <a-affix :offset-top="10">
          <div>
            <a-space :size="15" class="center-col">
              <clock-circle-outlined :style="{fontSize: '32px'}"/>
              <a-statistic-countdown
                  :value="deadline"
                  style="margin-right: 50px"
                  @finish="onFinish"
              />
            </a-space>
            <div class="center-col">
              <span style="font-size: large">姓名：{{ userStore.username }}</span>
            </div>
            <div class="center-col">
              <span style="font-size: large">学号：{{ studentInfo.studentNumber }}</span>
            </div>
            <div class="center-col">
              <span style="font-size: large">总分：{{ sum }}分</span>
            </div>
            <div class="center-col">
              <span style="font-size: large">考试开始时间：</span>
            </div>
            <div class="center-col">
              <span style="font-size: large">
                {{dayjs(examInfo.startTime).format('YYYY-MM-DD HH:mm:ss')}}
              </span>
            </div>
            <div class="center-col">
              <span style="font-size: large">考试结束时间：</span>
            </div>
            <div class="center-col">
              <span style="font-size: large">
                {{dayjs(examInfo.endTime).format('YYYY-MM-DD HH:mm:ss')}}
              </span>
            </div>
          </div>
        </a-affix>
      </a-col>
      <a-col flex="auto" style="margin-bottom: 10%;">
        <div class="choice" v-if="singleList.list.length">
          <a-typography-title :level="2">
            {{ map[singleList.idx] }}、单选题（共{{ singleList.list.length }}题，{{ singleList.num }}分）
          </a-typography-title>
          <div v-for="(item, index) in singleList.list" :key="item.questionId" :id="item.questionId"
               style="max-width: 600px">
            <a-typography-paragraph>
              <b>{{ index + 1 }}.单选题（{{ item.questionScore }}分）</b>
            </a-typography-paragraph>
            <a-typography-paragraph>
              {{ item.description }}
            </a-typography-paragraph>
            <a-typography-paragraph>
              <a-radio-group v-model:value="singleAns[index].questionAnswer" :options="item.optionInfo"/>
            </a-typography-paragraph>
          </div>
        </div>
        <div class="choice" v-if="multiList.list.length">
          <a-typography-title :level="2">
            {{ map[multiList.idx] }}、多选题（共{{ multiList.list.length }}题，{{ multiList.num }}分）
          </a-typography-title>
          <div v-for="(item, index) in multiList.list" :key="item.questionId" :id="item.questionId"
               style="max-width: 600px">
            <a-typography-paragraph>
              <b>{{ index + 1 }}.多选题（{{ item.questionScore }}分）</b>
            </a-typography-paragraph>
            <a-typography-paragraph>
              {{ item.description }}
            </a-typography-paragraph>
            <a-typography-paragraph>
              <a-checkbox-group v-model:value="multiAns[index].questionAnswer" :options="item.optionInfo"/>
            </a-typography-paragraph>
          </div>
        </div>
        <div class="choice" v-if="judgeList.list.length">
          <a-typography-title :level="2">
            {{ map[judgeList.idx] }}、判断题（共{{ judgeList.list.length }}题，{{ judgeList.num }}分）
          </a-typography-title>
          <div v-for="(item, index) in judgeList.list" :key="item.questionId" :id="item.questionId"
               style="max-width: 600px">
            <a-typography-paragraph>
              <b>{{ index + 1 }}.判断题（{{ item.questionScore }}分）</b>
            </a-typography-paragraph>
            <a-typography-paragraph>
              {{ item.description }}
            </a-typography-paragraph>
            <a-typography-paragraph>
              <a-radio-group v-model:value="judgeAns[index].questionAnswer" :options="item.optionInfo"/>
            </a-typography-paragraph>
          </div>
        </div>
        <div class="choice" v-if="completionList.list.length">
          <a-typography-title :level="2">
            {{ map[completionList.idx] }}、填空题（共{{ completionList.list.length }}题，{{ completionList.num }}分）
          </a-typography-title>
          <div v-for="(item, index) in completionList.list" :key="item.questionId" :id="item.questionId"
               style="max-width: 600px">
            <a-typography-paragraph>
              <b>{{ index + 1 }}.填空题（{{ item.questionScore }}分）</b>
            </a-typography-paragraph>
            <a-typography-paragraph>
              <a-space direction="vertical">
                {{ item.description }}
                <a-textarea
                    v-model:value="completionAns[index].questionAnswer"
                    auto-size
                />
              </a-space>
            </a-typography-paragraph>
          </div>
        </div>
        <div class="choice" v-if="complexList.list.length">
          <a-typography-title :level="2">
            {{ map[complexList.idx] }}、综合题（共{{ complexList.list.length }}题，{{ complexList.num }}分）
          </a-typography-title>
          <div v-for="(item, index) in complexList.list" :key="item.questionId" :id="item.questionId"
               style="max-width: 600px">
            <a-typography-paragraph>
              <b>{{ index + 1 }}.综合题（{{ item.questionScore }}分）</b>
            </a-typography-paragraph>
            <a-typography-paragraph v-if="item.description">
              {{ item.description }}
            </a-typography-paragraph>
            <a-typography-paragraph>
              <a-space direction="vertical" style="margin-bottom: 5px;"
                       v-for="(sub, subIndex) in item.subQuestionInfo" :key="sub.subQuestionId"
              >
                （{{ subIndex + 1 }}）{{ sub.subQuestionDesc }}
                <QuillEditor theme="snow"
                             :toolbar="quillToolBar"
                             v-model:content="complexAns[index].subQuestion[subIndex].subQuestionAnswer"
                             content-type="html"
                             @paste.native.capture.prevent="handlePaste"
                             :modules="modules"
                />
              </a-space>
            </a-typography-paragraph>
          </div>
        </div>
      </a-col>
      <a-col flex="350px">
        <div>
          <a-affix :offset-top="10">
            <a-anchor :target-offset="targetOffset" :affix="false">
              <div v-if="singleList.list.length">
                <div>
                  <span style="font-size:xx-large">{{ map[singleList.idx] }}、单选题</span>
                </div>
                <div>
                  <a-anchor-link v-for="(item, index) in singleList.list" :href="'#'+item.questionId"
                                 :key="item.questionId">
                    <template #title>
                      <a-button type="primary" ghost @click.prevent>{{ index + 1 }}</a-button>
                    </template>
                  </a-anchor-link>
                </div>
              </div>
              <div v-if="multiList.list.length">
                <div>
                  <span style="font-size:xx-large">{{ map[multiList.idx] }}、多选题</span>
                </div>
                <div>
                  <a-anchor-link v-for="(item, index) in multiList.list" :href="'#'+item.questionId"
                                 :key="item.questionId">
                    <template #title>
                      <a-button type="primary" ghost @click.prevent>{{ index + 1 }}</a-button>
                    </template>
                  </a-anchor-link>
                </div>
              </div>
              <div v-if="judgeList.list.length">
                <div>
                  <span style="font-size:xx-large">{{ map[judgeList.idx] }}、判断题</span>
                </div>
                <div>
                  <a-anchor-link v-for="(item, index) in judgeList.list" :href="'#'+item.questionId"
                                 :key="item.questionId">
                    <template #title>
                      <a-button type="primary" ghost @click.prevent>{{ index + 1 }}</a-button>
                    </template>
                  </a-anchor-link>
                </div>
              </div>
              <div v-if="completionList.list.length">
                <div>
                  <span style="font-size:xx-large">{{ map[completionList.idx] }}、填空题</span>
                </div>
                <div>
                  <a-anchor-link v-for="(item, index) in completionList.list" :href="'#'+item.questionId"
                                 :key="item.questionId">
                    <template #title>
                      <a-button type="primary" ghost @click.prevent>{{ index + 1 }}</a-button>
                    </template>
                  </a-anchor-link>
                </div>
              </div>
              <div v-if="complexList.list.length">
                <div>
                  <span style="font-size:xx-large">{{ map[complexList.idx] }}、综合题</span>
                </div>
                <div>
                  <a-anchor-link v-for="(item, index) in complexList.list" :href="'#'+item.questionId"
                                 :key="item.questionId">
                    <template #title>
                      <a-button type="primary" ghost @click.prevent>{{ index + 1 }}</a-button>
                    </template>
                  </a-anchor-link>
                </div>
              </div>
            </a-anchor>
          </a-affix>
        </div>
      </a-col>
    </a-row>
  </div>
  <a-back-top/>
</template>

<script setup>
  import {CheckOutlined, ClockCircleOutlined, CloseOutlined, RollbackOutlined} from "@ant-design/icons-vue";
  import {useRouter} from "vue-router";
  import {computed, h, nextTick, onBeforeMount, onMounted, reactive, ref} from "vue";
  import {message, Modal} from "ant-design-vue";
  import 'ant-design-vue/es/message/style';
  import 'ant-design-vue/es/modal/style';
  import {QuillEditor} from '@vueup/vue-quill';
  import '@vueup/vue-quill/dist/vue-quill.snow.css';
  import ImageUploader from 'quill-image-uploader';
  import {useUserStore} from "@/store/user.js";
  import {useStudentStore} from "@/store/student.js";
  import 'dayjs/locale/zh-cn';
  import 'dayjs/plugin/advancedFormat';
  import dayjs from "dayjs";
  import {useResultStore} from "@/store/result.js";

  const props = defineProps(['examinationId']);
  const router = useRouter();
  const userStore = useUserStore();
  const studentStore = useStudentStore();
  const resultStore = useResultStore();
  const status = ref('loading');

  // 动态锚点
  const targetOffset = ref(undefined);
  onMounted(() => {
    targetOffset.value = window.innerHeight / 2 - 150;
  })
  
  // 判断状态
  const examInfo = ref({
    examinationName: '',
    startTime: '',
    endTime: '',
    status: '',
  })
  onBeforeMount(async () => {
    status.value = 'loading';
    let res = await studentStore.GetExamInfo({examinationId: props.examinationId});
    if (res.code !== 200) {
      resultStore.setResult(
          '404',
          '404',
          '对不起，您访问的页面不存在，请检查后重试...',
          '返回主页',
          'dashboard'
      )
      await router.push({name: 'result'});
      return;
    } 
    examInfo.value = res.data;
    if (dayjs(examInfo.value.endTime, 'YYYY-MM-DD HH:mm:ss') < dayjs()) 
      examInfo.value.status = '已结束';
    if (dayjs(examInfo.value.startTime, 'YYYY-MM-DD HH:mm:ss') > dayjs()) 
      examInfo.value.status = '未开始';
    if (examInfo.value.status === '未开始') {
      message.warn('考试未开始！');
      await router.push('/');
      return;
    }
    await getStudentInfo();
    if (examInfo.value.status === '进行中') {
      await joinExam();
      deadline.value = dayjs(examInfo.value.endTime, 'YYYY-MM-DD HH:mm:ss').toDate();
      status.value = 'doing'
    }
    else {
      await getExamScoreDetail();
      status.value = 'done';
    }
  })

  // 获取试卷
  // 参加考试
  const map = {
    1: '一', 2: '二', 3: '三', 4: '四', 5: '五'
  }, alphaMap = {
    1: 'A. ', 2: 'B. ', 3: 'C. ', 4: 'D. ', 5: 'E. ', 6: 'F. '
  }
  let singleList = reactive({idx: 0, num: 0, list: []}), multiList = reactive({idx: 0, num: 0, list: []}),
      judgeList = reactive({idx: 0, num: 0, list: []}),
      completionList = reactive({idx: 0, num: 0, list: []}), complexList = reactive({idx: 0, num: 0, list: []});
  let answer = ref([]), sum = ref(0), answerPaperId = ref('');
  let singleAns = ref([]), multiAns = ref([]), judgeAns = ref([]), completionAns = ref([]);
  let complexAns = ref([]);
  const joinExam = async () => {
    const res = await studentStore.JoinExam({examinationId: props.examinationId});
    if (res.code !== 200) return;
    const {data} = res;
    answerPaperId.value = data.answerPaperId;
    let idx = 1;
    if (data.single && data.single.singleList.length) {
      singleList.idx = idx++, singleList.num = data.single.singleList[0].questionScore * data.single.singleList.length;
      singleList.list = data.single.singleList;
      sum.value += singleList.num;
      for (let i = 0; i < singleList.list.length; i++) {
        singleAns.value.push({
          questionId: singleList.list[i].questionId,
          questionAnswer: null,
          subQuestion: null
        })
      }
    }
    if (data.multi && data.multi.multiList.length) {
      multiList.idx = idx++, multiList.num = data.multi.multiList[0].questionScore * data.multi.multiList.length;
      multiList.list = data.multi.multiList;
      sum.value += multiList.num;
      for (let i = 0; i < multiList.list.length; i++) {
        multiAns.value.push({
          questionId: multiList.list[i].questionId,
          questionAnswer: null,
          subQuestion: null
        })
      }
    }
    if (data.judge && data.judge.judgeList.length) {
      judgeList.idx = idx++, judgeList.num = data.judge.judgeList[0].questionScore * data.judge.judgeList.length;
      judgeList.list = data.judge.judgeList;
      sum.value += judgeList.num;
      for (let i = 0; i < judgeList.list.length; i++) {
        judgeAns.value.push({
          questionId: judgeList.list[i].questionId,
          questionAnswer: null,
          subQuestion: null
        })
      }
    }
    if (data.completion && data.completion.completionList.length) {
      completionList.idx = idx++, completionList.num = data.completion.completionList[0].questionScore * data.completion.completionList.length;
      completionList.list = data.completion.completionList;
      sum.value += completionList.num;
      for (let i = 0; i < completionList.list.length; i++) {
        completionAns.value.push({
          questionId: completionList.list[i].questionId,
          questionAnswer: null,
          subQuestion: null
        })
      }
    }
    if (data.complex && data.complex.complexList.length) {
      let sum_score = 0;
      complexList.idx = idx++;
      complexList.list = data.complex.complexList;
      for (let i = 0; i < complexList.list.length; i++) {
        sum_score += complexList.list[i].questionScore;
        complexAns.value.push({
          questionId: complexList.list[i].questionId,
          questionAnswer: null,
          subQuestion: []
        })
        for (let j = 0; j < complexList.list[i].subQuestionInfo.length; j++) {
          complexAns.value[i].subQuestion.push({
            subQuestionId: complexList.list[i].subQuestionInfo[j].subQuestionId,
            subQuestionAnswer: ''
          })
        }
      }
      complexList.num = sum_score;
      sum.value += complexList.num;
    }
  }
  const saveLoading = ref(false), submitLoading = ref(false);
  const saveOrSubmit = async (type) => {
    if (type === 'save') saveLoading.value = true;
    else submitLoading.value = true;
    answer.value = [...singleAns.value, ...multiAns.value, ...judgeAns.value, ...completionAns.value, ...complexAns.value];
    const res = await studentStore.SaveOrSubmit({
      answerPaperId: answerPaperId.value,
      question: answer.value
    })
    if (res.code === 200) {
      message.success(type === 'save' ? '保存成功！' : '交卷成功！');
    }
    if (type === 'submit') await router.push('/');
    saveLoading.value = false, submitLoading.value = false;
  }

  // 倒计时
  const deadline = ref(new Date());
  const onFinish = () => {
    Modal.info({
      title: '考试已结束',
      content: h('div', {}, [
        h('p', '考试已经结束，即将为您强制交卷...'),
      ]),
      okText: '确认',
      onOk() {
        saveOrSubmit('submit');
      },
    })
  };

  // 综合题
  // 富文本
  const quillToolBar = [
    'bold', 'italic', 'underline', 'color', 'background', 'image', 'clean'
  ]
  const handlePaste = () => {
    message.warn('考试中不允许粘贴！如需上传图片请点击上传按钮！', 5);
  }
  const modules = {
    name: 'imageUploader',
    module: ImageUploader,
    options: {
      upload: file => {
        return new Promise((resolve, reject) => {
          const formData = new FormData();
          formData.append("image", file);

          userStore.Upload(formData)
              .then(res => {
                if (res.code === 200) {
                  message.success('上传成功！');
                  nextTick(() => {
                    resolve(res.data.url);
                  })
                }
                else {
                  message.error('上传失败！');
                  reject('上传失败！');
                }
              })
              .catch(err => {
                message.error('上传失败！');
                reject("上传失败！");
                console.error("Error:", err);
              })
        })
      }
    }
  }

  // 显示已结束的考试
  let examScoreDetail = ref({
    totalScore: null,
    stuTotalScore: null,
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
  const getExamScoreDetail = async () => {
    const res = await studentStore.GetExamScoreDetail({examinationId: props.examinationId});
    if (res.code !== 200) return;
    examScoreDetail.value = res.data;
  }
  const leftScore = computed(() => {
    return parseFloat(examScoreDetail.value.totalScore)
        - examScoreDetail.value.single.singleList.length * examScoreDetail.value.single.singleList[0].questionScore
        - examScoreDetail.value.multi.multiList.length * examScoreDetail.value.multi.multiList[0].questionScore
        - examScoreDetail.value.judge.judgeList.length * examScoreDetail.value.judge.judgeList[0].questionScore
        - examScoreDetail.value.completion.completionList.length * examScoreDetail.value.completion.completionList[0].questionScore
  })

  // 获取学生信息
  let studentInfo = ref({
    studentNumber: null,
    schoolName: null,
    userName: null,
    headImg: null,
    loginName: null,
    faceImg: null
  });
  const getStudentInfo = async () => {
    const res = await studentStore.GetStudentInfo();
    if (res.code !== 200) return;
    studentInfo.value = res.data;
  }

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
</style>