<template>
  <div v-if="status==='first-step'" class="bg">
    <div class="register-bg">
      <div class="register-wrapper">
        <a-row justify="center">
          <a-form
              :model="formCheckPhone"
              :layout="layout"
              @finish="nextStep"
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
                  @search="sendCode"
                  style="max-width: 204px"
              >
                <template #prefix>
                  <MessageOutlined style="color: rgba(0, 0, 0, 0.25)"/>
                </template>
                <template #enterButton>
                  <a-button :disabled="sendCodeDisabled">{{ codeBtnText }}</a-button>
                </template>
              </a-input-search>
            </a-form-item>
            <a-form-item>
              <a-button
                  type="primary"
                  html-type="submit"
                  :loading="nextStepLoading"
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
                @finish="register"
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
              <div v-show="formRegister.role==='student'">
                <a-form-item label="姓名">
                  <a-input v-model:value="formRegister.studentName"/>
                </a-form-item>
                <a-form-item label="学校">
                  <a-select
                      v-model:value="formRegister.schoolId"
                      show-search
                      :filter-option="filterOption" optionFilterProp="title"
                      placeholder="请选择学校"
                      @change="handleSelectChange"
                  >
                    <a-select-option
                        v-for="item in schoolList" :key="item.schoolId" :value="item.schoolId"
                        :title="item.schoolName"
                    >
                      {{ item.schoolName }}
                    </a-select-option>
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
              <div v-show="formRegister.role==='teacher'">
                <a-form-item label="姓名">
                  <a-input v-model:value="formRegister.teacherName"/>
                </a-form-item>
                <a-form-item label="学校">
                  <a-select
                      v-model:value="formRegister.schoolId"
                      show-search
                      :filter-option="filterOption" optionFilterProp="title"
                      placeholder="请选择学校"
                      @change="handleSelectChange"
                  >
                    <a-select-option
                        v-for="item in schoolList" :key="item.schoolId" :value="item.schoolId"
                        :title="item.schoolName"
                    >
                      {{ item.schoolName }}
                    </a-select-option>
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
                      :custom-request="handleUpload"
                      :before-upload="beforeUpload"
                      @change="handleChange"
                      :multiple="false"
                      showUploadList
                  >
                    <!--<img v-if="imageUrl" :src="imageUrl" alt="avatar"/>-->
                    <div>
                      <div v-show="loading">
                        <loading-outlined v-if="loading"></loading-outlined>
                        <div class="ant-upload-text">上传中</div>
                      </div>
                      <div v-show="!loading">
                        <plus-outlined></plus-outlined>
                        <div class="ant-upload-text">上传</div>
                      </div>
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
  import {nextTick, onActivated, onMounted, reactive, ref} from "vue";
  import Loading from "@/components/Loading.vue";
  // 上传图片
  import {LeftOutlined, LoadingOutlined, PlusOutlined} from "@ant-design/icons-vue";
  import {message} from 'ant-design-vue/es';
  import {useRouter} from "vue-router";
  // 跳转路由
  import {useResultStore} from "@/store/result.js";
  import {useUserStore} from "@/store/user.js";

  const router = useRouter();
  const userStore = useUserStore();
  const resultStore = useResultStore();

  // 注册进度
  // loading, first-step, second-step 
  const status = ref('loading');

  onMounted(() => {
    setTimeout(() => {
      status.value = 'first-step';
    }, 1500)
  })
  onActivated(() => {
    status.value = 'first-step';
  })

  // 验证码
  const sendCodeDisabled = ref(false);
  const codeBtnText = ref('发送');
  const sendCode = () => {
    // 校验
    if (sendCodeDisabled.value) return;
    if (!formCheckPhone.phoneNumber) {
      message.warn('手机号不能为空！');
      return;
    }
    if (isNaN(Number(formCheckPhone.phoneNumber))) {
      message.warn('手机号必须为数字！');
      return;
    }

    // 倒计时
    sendCodeDisabled.value = true;
    let count = 60;
    let timer = setInterval(() => {
      codeBtnText.value = '' + count;
      count--;
      if (count < 0) {
        sendCodeDisabled.value = false;
        codeBtnText.value = '发送';
        clearInterval(timer);
      }
    }, 1000)

    userStore.SendCode(formCheckPhone.phoneNumber)
        .then(res => {
          if (res.code === 200) {
            message.success('验证码发送成功，请注意查收！');
          }
        })
  }

  // 第一步检查手机号表单
  let formCheckPhone = reactive({
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
  const nextStepLoading = ref(false);
  const nextStep = () => {
    // 校验
    if (!formCheckPhone.phoneNumber) {
      message.warn('手机号不能为空！');
      return;
    }
    if (isNaN(Number(formCheckPhone.phoneNumber))) {
      message.warn('手机号必须为数字！');
      return;
    }
    if (!formCheckPhone.code) {
      message.warn('验证码不能为空！');
      return;
    }
    if (isNaN(Number(formCheckPhone.code))) {
      message.warn('验证码必须为数字！');
      return;
    }

    nextStepLoading.value = true;
    userStore.ValidateCode(formCheckPhone)
        .then(res => {
          if (res.code === 200) {
            formRegister.phoneNumber = formCheckPhone.phoneNumber;
            status.value = 'loading';
            // 获取学校列表作为下一个表单的下拉框
            userStore.GetSchoolList()
                .then(res => {
                  if (res.code === 200) {
                    schoolList.value = [...res.data];
                    setTimeout(() => {
                      status.value = 'second-step';
                    }, 1500)
                  }
                })
          }
        })
        .finally(() => {
          nextStepLoading.value = false;
        })

  };

  // 获取学校列表
  const schoolList = ref([]);
  const filterOption = (input, option) => {
    return option.title.indexOf(input) >= 0;
  }
  const handleSelectChange = (value, option) => {
    formRegister.schoolId = value;
    formRegister.schoolName = option.title;
  }
  let formRegister = reactive({
    role: 'student', // 身份
    studentName: '',
    teacherName: '',
    phoneNumber: '',
    studentNumber: '',
    teacherNumber: '',
    schoolId: '',
    schoolName: '',
    qualificationImg: '', // 教师资格证url
    password: '',
    checkPass: '',
  })
  // 登录
  const btnRegisterLoading = ref(false);
  const register = () => {
    if (formRegister.role === 'student') studentRegister();
    else teacherRegister();
  }
  const studentRegister = () => {
    // 校验
    if (!formRegister.studentName) {
      message.warn('姓名不能为空！');
      return;
    }
    if (!formRegister.schoolId) {
      message.warn('学校不能为空！');
      return;
    }
    if (!formRegister.studentNumber) {
      message.warn('学号不能为空！');
      return;
    }
    if (!formRegister.password) {
      message.warn('密码不能为空！');
      return;
    }
    if (!formRegister.checkPass) {
      message.warn('确认密码不能为空！');
      return;
    }
    if (formRegister.password !== formRegister.checkPass) {
      message.warn('两次输入的密码不一致！');
      return;
    }

    btnRegisterLoading.value = true;
    userStore.StudentRegister(formRegister)
        .then(res => {
          if (res.code === 200) {
            resultStore.setResult(
                'success',
                '注册成功',
                '点击去登录按钮跳转到登录页面',
                '去登录',
                'login',
            )
            nextTick(() => {
              setTimeout(() => {
                router.push({name: 'result'});
                formRegister = {
                  role: 'student',
                  studentName: '',
                  teacherName: '',
                  phoneNumber: '',
                  studentNumber: '',
                  teacherNumber: '',
                  schoolId: '',
                  schoolName: '',
                  qualificationImg: '',
                  password: '',
                  checkPass: '',
                }
                formCheckPhone = {
                  phoneNumber: '',
                  code: '',
                }
              }, 1500)
            })
          }
        })
        .finally(() => {
          btnRegisterLoading.value = false;
        })
  }


  const teacherRegister = () => {
    // 校验
    if (!formRegister.teacherName) {
      message.warn('姓名不能为空！');
      return;
    }
    if (!formRegister.schoolId) {
      message.warn('学校不能为空！');
      return;
    }
    if (!formRegister.teacherNumber) {
      message.warn('工号不能为空！');
      return;
    }
    if (!formRegister.qualificationImg) {
      message.warn('教师资格证不能为空！');
      return;
    }
    if (!formRegister.password) {
      message.warn('密码不能为空！');
      return;
    }
    if (!formRegister.checkPass) {
      message.warn('确认密码不能为空！');
      return;
    }
    if (formRegister.password !== formRegister.checkPass) {
      message.warn('两次输入的密码不一致！');
      return;
    }

    btnRegisterLoading.value = true;
    userStore.TeacherRegister(formRegister)
        .then(res => {
          if (res.code === 200) {
            resultStore.setResult(
                'success',
                '注册成功',
                '点击去登录按钮跳转到登录页面',
                '去登录',
                'login',
            )
            setTimeout(() => {
              router.push({name: 'result'});
              formRegister = {
                role: 'student',
                studentName: '',
                teacherName: '',
                phoneNumber: '',
                studentNumber: '',
                teacherNumber: '',
                schoolId: '',
                schoolName: '',
                qualificationImg: '',
                password: '',
                checkPass: '',
              }
              formCheckPhone = {
                phoneNumber: '',
                code: '',
              }
            })
          }
        })
        .finally(() => {
          btnRegisterLoading.value = false;
        })
  }

  // 上传图片
  const fileList = ref([]);
  const loading = ref(false);
  const handleChange = info => {

  };
  const beforeUpload = file => {
    if (fileList.value.length >= 1) {
      message.warn('只能上传一张图片，将为您覆盖上一张！');
      fileList.value = [];
    }
    const isImg = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isImg) {
      message.error('你只能上传jpg或者png格式的图片！');
    }
    const isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      message.error('图片大小必须小于10MB');
    }
    return isImg && isLt10M;
  };
  const handleUpload = info => {
    loading.value = true;
    const form = new FormData();
    form.append('image', info.file);
    userStore.Upload(form)
        .then(res => {
          if (res.code === 200) {
            message.success('上传成功！');
            info.onSuccess(res.data, info);
            formRegister.qualificationImg = res.data.url;
          }
        })
        .catch(err => {
          info.onError(err);
        })
        .finally(() => {
          loading.value = false;
        })
  }


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
    //display: block;
    //margin: 0 auto;
    width: 100%;
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