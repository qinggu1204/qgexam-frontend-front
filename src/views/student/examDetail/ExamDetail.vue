<!--考试详情，路由匹配：/exam/:examinationId-->
<template>
  <!--已结束的考试，展示成绩-->
  <div style="margin-left: 8%;margin-top: 1%;" v-if="false">
    <a-row>
      <a-affix :offset-top="0">
        <a-col :span="12">
          <router-link style="color: black;" to="/">
            <a-space>
              <rollback-outlined :style="{fontSize: '32px'}"/>
              <b>返回</b>
            </a-space>
          </router-link>
        </a-col>
      </a-affix>
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
            <rollback-outlined :style="{fontSize: '32px'}"/>
            <b>返回</b>
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
      <a-col flex="350px" style="margin-top: 1%">
        <div>
          <a-space :size="10" class="center-col">
            <clock-circle-outlined :style="{fontSize: '32px'}"/>
            <span style="font-size: xx-large">02:34:28</span>
          </a-space>
          <div class="center-col">
            <span style="font-size: large">姓名：张三</span>
          </div>
          <div class="center-col">
            <span style="font-size: large">学号：202000001111</span>
          </div>
          <div class="center-col">
            <span style="font-size: large">总分：50.0分</span>
          </div>
          <div class="center-col">
            <span style="font-size: large">考试开始时间：</span>
          </div>
          <div class="center-col">
            <span style="font-size: large">yyyy-mm-dd hh:ss</span>
          </div>
          <div class="center-col">
            <span style="font-size: large">考试结束时间：</span>
          </div>
          <div class="center-col">
            <span style="font-size: large">yyyy-mm-dd hh:ss</span>
          </div>
        </div>
      </a-col>
      <a-col flex="auto" style="margin-bottom: 10%;">
        <div class="choice">
          <a-typography-title :level="2">一、单选题（共10题，50.0分）</a-typography-title>
          <div id="1">
            <a-typography-paragraph>
              1.单选题（5分）
            </a-typography-paragraph>
            <a-typography-paragraph>
              消费者调查、生产者调查、价格调查属于（）
            </a-typography-paragraph>
            <a-typography-paragraph>
              <a-radio-group v-model:value="value">
                <a-radio :value="1">A. 消费者调查、生产者调查、价格调查属于（）</a-radio>
                <a-radio :value="2">B. 消费者调查、生产者调查、价格调查属于（）</a-radio>
                <a-radio :value="3">C. 消费者调查、生产者调查、价格调查属于（）</a-radio>
                <a-radio :value="4">D. 消费者调查、生产者调查、价格调查属于（）</a-radio>
              </a-radio-group>
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
              <a-radio-group v-model:value="value">
                <a-radio :value="1">A. 消费者调查、生产者调查、价格调查属于（）</a-radio>
                <a-radio :value="2">B. 消费者调查、生产者调查、价格调查属于（）</a-radio>
                <a-radio :value="3">C. 消费者调查、生产者调查、价格调查属于（）</a-radio>
                <a-radio :value="4">D. 消费者调查、生产者调查、价格调查属于（）</a-radio>
              </a-radio-group>
            </a-typography-paragraph>
          </div>
        </div>
        <div class="choice">
          <a-typography-title :level="2">二、多选题（共10题，50.0分）</a-typography-title>
          <div id="multi1">
            <a-typography-paragraph>
              1.多选题（5分）
            </a-typography-paragraph>
            <a-typography-paragraph>
              消费者调查、生产者调查、价格调查属于（）
            </a-typography-paragraph>
            <a-typography-paragraph>
              <a-checkbox-group v-model:value="state.value1" name="checkboxgroup" :options="plainOptions"/>
            </a-typography-paragraph>
          </div>
        </div>
        <div class="choice">
          <a-typography-title :level="2">三、填空题（共10题，50.0分）</a-typography-title>
          <div id="multi1">
            <a-typography-paragraph>
              1.填空题（5分）
            </a-typography-paragraph>
            <a-typography-paragraph>
              <a-space direction="vertical">
                消费者调查、生产者调查、价格调查属于
                <a-textarea
                    v-model:value="value1"
                    auto-size
                />
              </a-space>
              
            </a-typography-paragraph>
          </div>
        </div>
        <div class="choice">
          <a-typography-title :level="2">四、综合题（共10题，50.0分）</a-typography-title>
          <div id="multi1">
            <a-typography-paragraph>
              1.综合题（5分）
            </a-typography-paragraph>
            <a-typography-paragraph>
              <a-space direction="vertical">
                （1）消费者调查、生产者调查、价格调查属于
                <QuillEditor theme="snow" 
                             :toolbar="quillToolBar"
                             v-model:content="text" content-type="html"
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
          <a-anchor :target-offset="targetOffset">
            <div>
              <div>
                <span style="font-size:xx-large">一、单选题</span>
              </div>
              <div>
                <a-anchor-link href="#1">
                  <template #title>
                    <a-button type="primary" ghost @click.prevent>1</a-button>
                  </template>
                </a-anchor-link>
                <a-anchor-link href="#2">
                  <template #title>
                    <a-button type="primary" ghost @click.prevent>2</a-button>
                  </template>
                </a-anchor-link>
              </div>
            </div>
            <div>
              <div>
                <span style="font-size:xx-large">二、多选题</span>
              </div>
              <div>
                <a-anchor-link href="#multi1">
                  <template #title>
                    <a-button type="primary" ghost @click.prevent>1</a-button>
                  </template>
                </a-anchor-link>
              </div>
            </div>
          </a-anchor>
        </div>
      </a-col>
    </a-row>
  </div>
  <a-back-top/>
</template>

<script setup>
  import {CheckOutlined, ClockCircleOutlined, CloseOutlined, RollbackOutlined} from "@ant-design/icons-vue";
  import {useRouter} from "vue-router";
  import {nextTick, onMounted, reactive, ref} from "vue";
  import {message} from "ant-design-vue/es";
  import {QuillEditor} from '@vueup/vue-quill';
  import '@vueup/vue-quill/dist/vue-quill.snow.css';
  import ImageUploader from 'quill-image-uploader';
  import {useUserStore} from "@/store/user.js";

  const props = defineProps(['examinationId']);
  const router = useRouter();
  const userStore = useUserStore();

  // 动态锚点
  const targetOffset = ref(undefined);
  onMounted(() => {
    targetOffset.value = window.innerHeight / 2 - 100;
  })

  // 选择题测试(可以从数组生成)
  // 单选
  const value = ref(1);
  // 多选
  const plainOptions = [{
    label: 'A. 消费者调查、生产者调查、价格调查属于（）',
    value: 'Apple',
  }, {
    label: 'B. 消费者调查、生产者调查、价格调查属于（）',
    value: 'Pear',
  }, {
    label: 'C. 消费者调查、生产者调查、价格调查属于（）',
    value: 'Orange',
  }];
  const state = reactive({
    value1: [],
    value2: ['Apple'],
    value3: ['Pear'],
    value4: ['Apple'],
  });
  // 填空题
  
  // 综合题
  // 富文本
  const quillToolBar = [
      'bold', 'italic', 'underline', 'color', 'background', 'image', 'clean'
  ]
  const handlePaste = () => {
    message.warn('考试中不允许粘贴！如需上传图片请点击上传按钮！', 5);
  }
  const text = ref('');
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

  @rich-text-container: 500px;
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