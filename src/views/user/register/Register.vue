<template>
  <div v-if="status==='first-step'" class="bg">
    <div class="register-bg">
      <div class="register-wrapper">
        <a-row justify="center">
          <a-form
              :model="formCheckPhone"
              :layout="layout"
              @finish="handleFinish"
              @finishFailed="handleFinishFailed"
          >
            <a-form-item>
              <left-outlined style="opacity: 55%"></left-outlined>
              <router-link to="/login"><span style="color: gray">登录</span></router-link>
            </a-form-item>
            <a-form-item>
              <a-typography-title :level="5">新用户注册</a-typography-title>
            </a-form-item>
            <a-form-item label="手机号">
              <a-input v-model:value="formCheckPhone.phoneNumber">
                <template #prefix>
                  <UserOutlined style="color: rgba(0, 0, 0, 0.25)"/>
                </template>
              </a-input>
            </a-form-item>
            <a-form-item label="验证码">
              <a-input-search
                  v-model:value="formCheckPhone.code"
                  @search="onSearch"
                  style="max-width: 204px"
              >
                <template #prefix>
                  <MessageOutlined style="color: rgba(0, 0, 0, 0.25)"/>
                </template>
                <template #enterButton>
                  <a-button>发送</a-button>
                </template>
              </a-input-search>
            </a-form-item>
            <a-form-item>
              <a-button
                  type="primary"
                  html-type="submit"
              >
                下一步
              </a-button>
            </a-form-item>
          </a-form>
        </a-row>
      </div>
    </div>
  </div>
  <div v-else-if="status==='loading'" class="bg">
    <Loading></Loading>
  </div>
  <div v-else-if="status==='second-step'" class="bg">
    <div class="register-bg">
      <div class="register-wrapper">
        <a-row justify="center">
          <a-col>
            <a-form
                :model="formRegister"
                :layout="layout"
                @finish="handleFinish2"
                @finishFailed="handleFinishFailed"
            >
              <a-form-item>
                <a-typography-title :level="5">新用户注册</a-typography-title>
              </a-form-item>
              <a-form-item label="请选择您的身份">
                <a-radio-group v-model:value="formRegister.role">
                  <a-radio value="student">学生</a-radio>
                  <a-radio value="teacher">教师</a-radio>
                </a-radio-group>
              </a-form-item>
              <div v-if="formRegister.role==='student'">
                <a-form-item label="姓名">
                  <a-input v-model:value="formRegister.studentName"/>
                </a-form-item>
                <a-form-item label="学校">
                  <a-select v-model:value="formRegister.schoolName">
                    <a-select-option value="shanghai">Zone one</a-select-option>
                    <a-select-option value="beijing">Zone two</a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item label="学号">
                  <a-input v-model:value="formRegister.studentNumber"/>
                </a-form-item>
                <a-form-item label="手机号码">
                  <a-input v-model:value="formRegister.phoneNumber" disabled/>
                </a-form-item>
                <a-form-item label="设置密码">
                  <a-input v-model:value="formRegister.password" type="password"/>
                </a-form-item>
                <a-form-item label="确认密码">
                  <a-input v-model:value="formRegister.checkPass" type="password"/>
                </a-form-item>
              </div>
              <div v-else>
                <a-form-item label="姓名">
                  <a-input v-model:value="formRegister.teacherName"/>
                </a-form-item>
                <a-form-item label="学校">
                  <a-select v-model:value="formRegister.schoolName">
                    <a-select-option value="shanghai">Zone one</a-select-option>
                    <a-select-option value="beijing">Zone two</a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item label="工号">
                  <a-input v-model:value="formRegister.teacherNumber"/>
                </a-form-item>
                <a-form-item label="教师资格证">
                  <a-upload
                      v-model:file-list="fileList"
                      name="avatar"
                      list-type="picture-card"
                      class="avatar-uploader"
                      :show-upload-list="false"
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      :before-upload="beforeUpload"
                      @change="handleChange"
                  >
                    <img v-if="imageUrl" :src="imageUrl" alt="avatar"/>
                    <div v-else>
                      <loading-outlined v-if="loading"></loading-outlined>
                      <plus-outlined v-else></plus-outlined>
                      <div class="ant-upload-text">上传</div>
                    </div>
                  </a-upload>
                </a-form-item>
                <a-form-item label="手机号码">
                  <a-input v-model:value="formRegister.phoneNumber" disabled/>
                </a-form-item>
                <a-form-item label="设置密码">
                  <a-input v-model:value="formRegister.password" type="password"/>
                </a-form-item>
                <a-form-item label="确认密码">
                  <a-input v-model:value="formRegister.checkPass" type="password"/>
                </a-form-item>
              </div>
              <a-form-item>
                <a-button
                    type="primary"
                    html-type="submit"
                    :loading="btnRegisterLoading"
                >
                  注册
                </a-button>
              </a-form-item>
            </a-form>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script setup>
  import {nextTick, onBeforeMount, reactive, ref} from "vue";
  import Loading from "@/components/Loading.vue";
  // 上传图片
  import {LeftOutlined, LoadingOutlined, PlusOutlined} from "@ant-design/icons-vue";
  import {message} from 'ant-design-vue';
  import 'ant-design-vue/es/message/style/css';
  import {useRouter} from "vue-router";
  // 跳转路由
  import {useResultStore} from "@/store/result.js";

  const router = useRouter();

  // 注册进度
  // loading, first-step, second-step 
  const status = ref('loading');

  onBeforeMount(() => {
    setTimeout(() => {
      status.value = 'first-step';
    }, 1500)
  })

  // 第一步检查手机号表单
  const formCheckPhone = reactive({
    phoneNumber: '',
    code: '',
  });
  // 表单布局(和第二步共用)
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const handleFinish = values => {
    console.log(values, formCheckPhone);
    status.value = 'second-step';
  };
  const handleFinishFailed = errors => {
    console.log(errors);
  };

  //TODO: 第二步表单，记得发请求的时候存一下第一步的phoneNumber
  const formRegister = reactive({
    role: 'student', // 身份
    studentName: '',
    teacherName: '',
    phoneNumber: '12345678910', // 只读
    studentNumber: '',
    teacherNumber: '',
    schoolId: '',
    schoolName: '',
    qualificationImg: '', // 教师资格证url
    password: '',
    checkPass: '',
  })

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const fileList = ref([]);
  const loading = ref(false);
  const imageUrl = ref('');
  const handleChange = info => {
    if (info.file.status === 'uploading') {
      loading.value = true;
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, base64Url => {
        imageUrl.value = base64Url;
        loading.value = false;
      });
    }
    if (info.file.status === 'error') {
      loading.value = false;
      message.error('upload error');
    }
  };
  const beforeUpload = file => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 5;
    if (!isLt2M) {
      message.error('Image must smaller than 5MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const resultStore = useResultStore();

  const btnRegisterLoading = ref(false);
  const handleFinish2 = values => {
    console.log(values, formCheckPhone);
    resultStore.setResult(
        'success',
        '登录成功！',
        '点击去登录按钮跳转到登录页面',
        '去登录',
        'login',
    )
    nextTick(() => {
      setTimeout(() => {
        router.push({name: 'result'});
      }, 1500)
    })
    btnRegisterLoading.value = true;
  };

</script>

<style lang="less" scoped>
  .bg {
    min-height: 100vh;
    background: #f5f5f7;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .register-bg {
    background: white;
    border-radius: 15px;
    min-width: 50vh;
    min-height: 35vh;
    box-shadow: 0 0 10px #888888;
  }

  .register-wrapper {
    margin-top: 3vh;
  }

  .register-wrapper :deep(.ant-btn-primary) {
    display: block;
    margin: 0 auto;
  }

  // 上传
  .avatar-uploader > .ant-upload {
    width: 128px;
    height: 128px;
  }

  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }

  .login-wrapper a {
    color: #5eaf7d;
  }
</style> 