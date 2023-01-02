<!--考试详情，路由匹配：/exam/:examinationId-->
<template>
  <!--已结束的考试，展示成绩-->
  <div style="margin-left: 8%;margin-top: 1%;" v-if="false">
    <a-row>
      <a-col :span="12">
        <router-link style="color: black;" to="/">
          <a-space>
            <rollback-outlined :style="{fontSize: '32px'}"/> <b>返回</b>
          </a-space>
        </router-link>
      </a-col>
    </a-row>
    <a-row type="flex" style="min-height: 90vh;margin-top: 2%;">
      <a-col flex="auto">
        <a-row type="flex">
          <a-col flex="auto">
            <a-space direction="vertical">
              <span style="font-size:xx-large">操作系统期末考试</span>
              <span style="color: gray;font-size: large">考试时间：2022-12-10 10:10 至 2022-12-10 12:10</span>
            </a-space>
          </a-col>
          <a-col flex="100px">
            <span style="font-size: x-large;color: palevioletred">100.0分</span>
          </a-col>
        </a-row>
        <a-row style="min-height: 100%;margin-top: 1%;">
          <div>
            <a-typography-title :level="2">一、单选题（共10题，50.0分）</a-typography-title>
            <div id="1">
              <a-typography-paragraph>
                1.单选题（5分）
              </a-typography-paragraph>
              <a-typography-paragraph>
                消费者调查、生产者调查、价格调查属于（）
              </a-typography-paragraph>
              <a-typography-paragraph>
                A. 消费者调查、生产者调查、价格调查属于（）
              </a-typography-paragraph>
              <a-typography-paragraph>
                B. 消费者调查、生产者调查、价格调查属于（）
              </a-typography-paragraph>
              <a-typography-paragraph>
                C. 消费者调查、生产者调查、价格调查属于（）
              </a-typography-paragraph>
              <a-typography-paragraph>
                D. 消费者调查、生产者调查、价格调查属于（）
              </a-typography-paragraph>
              <a-typography-paragraph>
                <blockquote>
                  <a-space :size="30" align="baseline">
                    <span><b>我的答案：A</b></span>
                    <span style="color: #56b870"><b>正确答案：D</b></span>
                    <close-outlined :style="{color: '#dd3927'}"/>
                    <span style="font-size: large"><b>0.0分</b></span>
                  </a-space>
                </blockquote>
              </a-typography-paragraph>
            </div>
            <div id="2">
              <a-typography-paragraph>
                2.单选题（5分）
              </a-typography-paragraph>
              <a-typography-paragraph>
                消费者调查、生产者调查、价格调查属于（）
              </a-typography-paragraph>
              <a-typography-paragraph>
                A. 消费者调查、生产者调查、价格调查属于（）
              </a-typography-paragraph>
              <a-typography-paragraph>
                B. 消费者调查、生产者调查、价格调查属于（）
              </a-typography-paragraph>
              <a-typography-paragraph>
                C. 消费者调查、生产者调查、价格调查属于（）
              </a-typography-paragraph>
              <a-typography-paragraph>
                D. 消费者调查、生产者调查、价格调查属于（）
              </a-typography-paragraph>
              <a-typography-paragraph>
                <blockquote>
                  <a-space :size="30" align="baseline">
                    <span><b>我的答案：A</b></span>
                    <span style="color: #56b870"><b>正确答案：D</b></span>
                    <close-outlined :style="{color: '#dd3927'}"/>
                    <span style="font-size: large"><b>0.0分</b></span>
                  </a-space>
                </blockquote>
              </a-typography-paragraph>
            </div>
            <div id="3">
              <a-typography-paragraph>
                3.单选题（5分）
              </a-typography-paragraph>
              <a-typography-paragraph>
                消费者调查、生产者调查、价格调查属于（）
              </a-typography-paragraph>
              <a-typography-paragraph>
                A. 消费者调查、生产者调查、价格调查属于（）
              </a-typography-paragraph>
              <a-typography-paragraph>
                B. 消费者调查、生产者调查、价格调查属于（）
              </a-typography-paragraph>
              <a-typography-paragraph>
                C. 消费者调查、生产者调查、价格调查属于（）
              </a-typography-paragraph>
              <a-typography-paragraph>
                D. 消费者调查、生产者调查、价格调查属于（）
              </a-typography-paragraph>
              <a-typography-paragraph>
                <blockquote>
                  <a-space :size="30" align="baseline">
                    <span><b>我的答案：A</b></span>
                    <span style="color: #56b870"><b>正确答案：D</b></span>
                    <close-outlined :style="{color: '#dd3927'}"/>
                    <span style="font-size: large"><b>0.0分</b></span>
                  </a-space>
                </blockquote>
              </a-typography-paragraph>
            </div>
            <div id="4">
              <a-typography-paragraph>
                4.单选题（5分）
              </a-typography-paragraph>
              <a-typography-paragraph>
                消费者调查、生产者调查、价格调查属于（）
              </a-typography-paragraph>
              <a-typography-paragraph>
                A. 消费者调查、生产者调查、价格调查属于（）
              </a-typography-paragraph>
              <a-typography-paragraph>
                B. 消费者调查、生产者调查、价格调查属于（）
              </a-typography-paragraph>
              <a-typography-paragraph>
                C. 消费者调查、生产者调查、价格调查属于（）
              </a-typography-paragraph>
              <a-typography-paragraph>
                D. 消费者调查、生产者调查、价格调查属于（）
              </a-typography-paragraph>
              <a-typography-paragraph>
                <blockquote>
                  <a-space :size="30" align="baseline">
                    <span><b>我的答案：A</b></span>
                    <span style="color: #56b870"><b>正确答案：A</b></span>
                    <check-outlined :style="{color: '#56b870'}"/>
                    <span style="font-size: large"><b>5.0分</b></span>
                  </a-space>
                </blockquote>
              </a-typography-paragraph>
            </div>
          </div>
        </a-row>
      </a-col>
      <a-col flex="350px">
        <div>
          <a-anchor :target-offset="targetOffset">
            <div>
              <span style="font-size:xx-large">一、单选题</span>
            </div>
            <div>
              <a-anchor-link href="#1">
                <template #title>
                  <a-button type="primary" ghost>1</a-button>
                </template>
              </a-anchor-link>
              <a-anchor-link href="#2">
                <template #title>
                  <a-button type="primary" ghost>2</a-button>
                </template>
              </a-anchor-link>
              <a-anchor-link href="#3">
                <template #title>
                  <a-button type="primary" ghost>3</a-button>
                </template>
              </a-anchor-link>
              <a-anchor-link href="#4">
                <template #title>
                  <a-button type="primary" ghost>4</a-button>
                </template>
              </a-anchor-link>
            </div>
          </a-anchor>
        </div>
      </a-col>
    </a-row>
  </div>
  <!--进行中的考试，展示答题页面-->
  <div style="margin-top: 1%;">
    <a-row justify="space-between">
      <a-col :span="8" class="center-col">
        <router-link style="color: black;" to="/">
          <a-space>
            <rollback-outlined :style="{fontSize: '32px'}"/> <b>返回</b>
          </a-space>
        </router-link>
      </a-col>
      <a-col :span="8" class="center-col">
        <span style="font-size:x-large">操作系统期末考试</span>
      </a-col>
      <a-col :span="8" class="center-col">
        <a-space>
          <a-button>保存</a-button>
          <a-button type="primary">交卷</a-button>
        </a-space>
      </a-col>
    </a-row>
    <a-row type="flex" style="margin-top: 3%;">
      <a-col flex="350px" class="center-col">
        <div style="display: flex;align-items: center;">
          <a-space :size="10">
            <clock-circle-outlined :style="{fontSize: '32px'}"/>
            <span style="font-size: x-large">02:34:28</span>
          </a-space>
        </div>
        <div style="display: block">
          <a-space direction="vertical">
            <span>姓名：张三</span>
          </a-space>
        </div>
        
      </a-col>
      <a-col flex="auto">456</a-col>
      <a-col flex="350px">789</a-col>
    </a-row>
  </div>
  <a-back-top />
</template>

<script setup>
  import {RollbackOutlined, CloseOutlined, CheckOutlined, ClockCircleOutlined} from "@ant-design/icons-vue";
  import {useRouter} from "vue-router";
  import {onMounted, ref} from "vue";

  const props = defineProps(['examinationId']);
  const router = useRouter();

  // 动态锚点
  const targetOffset = ref(undefined);
  onMounted(() => {
    targetOffset.value = window.innerHeight / 2 - 100;
    console.log(targetOffset.value)
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
</style>