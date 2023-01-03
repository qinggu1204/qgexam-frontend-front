<template>
  <div v-if="loading" class="loading-wrapper">
    <Loading></Loading>
  </div>
  <div v-else class="bg">
    <div class="register-bg">
      <div class="register-wrapper">
        <a-row justify="center">
          <a-form
              :model="formUpdatePassword"
              :layout="layout"
              @finish="updatePassword"
          >
            <a-form-item>
              <a-typography-title :level="5">修改密码</a-typography-title>
            </a-form-item>
            <a-form-item label="手机号">
              <a-input v-model:value="formUpdatePassword.loginName">
                <template #prefix>
                  <UserOutlined style="color: rgba(0, 0, 0, 0.25)"/>
                </template>
              </a-input>
            </a-form-item>
            <a-form-item label="验证码">
              <a-input-search
                  v-model:value="formUpdatePassword.code"
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
            <a-form-item label="设置密码">
              <a-input v-model:value="formUpdatePassword.password" type="password"/>
            </a-form-item>
            <a-form-item label="确认密码">
              <a-input v-model:value="formUpdatePassword.checkPass" type="password"/>
            </a-form-item>
            <a-form-item>
              <a-button
                  type="primary"
                  html-type="submit"
                  :loading="btnLoading"
                  style="width: 100%"
              >
                提交
              </a-button>
            </a-form-item>
          </a-form>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script setup>
  import {reactive, ref} from "vue";
  import {useRouter} from "vue-router";
  import {useResultStore} from "@/store/result.js";
  import {useLoadingStore} from "@/store/loading.js";
  import {storeToRefs} from "pinia";
  import Loading from "@/components/Loading.vue";
  import {useUserStore} from "@/store/user.js";
  import {message} from "ant-design-vue/es";

  const userStore = useUserStore();
  const loading = storeToRefs(useLoadingStore()).isLoading;
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  let formUpdatePassword = reactive({
    loginName: '', // 手机号码
    password: '',
    checkPass: '',
    code: '',
  })
  const btnLoading = ref(false);
  const router = useRouter();
  const resultStore = useResultStore();
  const sendCodeDisabled = ref(false);
  const codeBtnText = ref('发送');
  const sendCode = () => {
    // 校验
    if (sendCodeDisabled.value) return;
    if (!formUpdatePassword.loginName) {
      message.warn('手机号不能为空！');
      return;
    }
    if (isNaN(Number(formUpdatePassword.loginName))) {
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

    userStore.SendCode({phoneNumber: formUpdatePassword.loginName})
        .then(res => {
          if (res.code === 200) {
            message.success('验证码发送成功，请注意查收！');
          }
        })
  }
  const updatePassword = () => {
    if (!formUpdatePassword.loginName) {
      message.warn('手机号不能为空！');
      return;
    }
    if (isNaN(Number(formUpdatePassword.loginName))) {
      message.warn('手机号必须为数字！');
      return;
    }
    if (!formUpdatePassword.code) {
      message.warn('验证码不能为空！');
      return;
    }
    if (isNaN(Number(formUpdatePassword.code))) {
      message.warn('验证码必须为数字！');
      return;
    }
    if (!formUpdatePassword.password) {
      message.warn('密码不能为空！');
      return;
    }
    if (!formUpdatePassword.checkPass) {
      message.warn('确认密码不能为空！');
      return;
    }
    if (formUpdatePassword.password !== formUpdatePassword.checkPass) {
      message.warn('两次输入的密码不一致！');
      return;
    }

    btnLoading.value = true;
    userStore.UpdatePassword(formUpdatePassword)
        .then(res => {
          if (res.code === 200) {
            resultStore.setResult(
                'success',
                '修改成功',
                '点击去登录按钮跳转到登录页面',
                '去登录',
                'login'
            )
            router.push({name: 'result'});
          }
        })
        .finally(() => {
          btnLoading.value = false;
        })
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
</style> 