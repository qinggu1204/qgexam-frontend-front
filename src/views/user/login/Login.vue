<template>
  <div v-if="loading" class="loading-wrapper">
    <Loading></Loading>
  </div>
  <div v-else>
    <div class="logo-img">
      <img src="./login-img.png" alt="logo">
    </div>
    <div class="login-wrapper">
      <a-row justify="center">
        <a-col :span="4">
          <a-tabs v-model="activeKey" centered>
            <a-tab-pane key="1" tab="密码登录">
              <a-form
                  :model="formType1"
                  @finish="handleFinish1"
              >
                <a-form-item>
                  <a-input v-model:value="formType1.loginName" placeholder="请输入手机号">
                    <template #prefix>
                      <UserOutlined style="color: rgba(0, 0, 0, 0.25)"/>
                    </template>
                  </a-input>
                </a-form-item>
                <a-form-item>
                  <a-input v-model:value="formType1.password" type="password" placeholder="请输入密码">
                    <template #prefix>
                      <LockOutlined style="color: rgba(0, 0, 0, 0.25)"/>
                    </template>
                  </a-input>
                </a-form-item>
                <a-form-item>
                  <a-button
                      type="primary"
                      html-type="submit"
                      :loading="loginLoading1"
                  >
                    登录
                  </a-button>
                </a-form-item>
              </a-form>
              <div>
                <div style="display: inline;float: left">
                  <router-link to="/register">注册</router-link>
                </div>
                <div style="display: inline;float: right">
                  <router-link to="/updatePassword">忘记密码</router-link>
                </div>
              </div>
            </a-tab-pane>
            <a-tab-pane key="2" tab="验证码登录">
              <a-form
                  :model="formType2"
                  @finish="handleFinish2"
              >
                <a-form-item>
                  <a-input v-model:value="formType2.phoneNumber" placeholder="请输入手机号">
                    <template #prefix>
                      <UserOutlined style="color: rgba(0, 0, 0, 0.25)"/>
                    </template>
                  </a-input>
                </a-form-item>
                <a-form-item>
                  <a-input-search
                      v-model:value="formType2.code"
                      placeholder="请输入验证码"
                      @search="sendCode"
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
                      :loading="loginLoading2"
                  >
                    登录
                  </a-button>
                </a-form-item>
              </a-form>
              <div>
                <div style="display: inline;float: left">
                  <router-link to="/register">注册</router-link>
                </div>
                <div style="display: inline;float: right">
                  <router-link to="/updatePassword">忘记密码</router-link>
                </div>
              </div>
            </a-tab-pane>
          </a-tabs>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script setup>
  import {reactive, ref} from "vue";
  import {LockOutlined, MessageOutlined, UserOutlined} from '@ant-design/icons-vue';
  import {storeToRefs} from "pinia";
  import {useLoadingStore} from "@/store/loading.js";
  import Loading from "@/components/Loading.vue";
  import {useRouter} from "vue-router";
  import {useUserStore} from "@/store/user.js";
  import {message} from "ant-design-vue/es";

  const router = useRouter();
  const loading = storeToRefs(useLoadingStore()).isLoading;

  const activeKey = ref('1');
  const loginLoading1 = ref(false);
  let formType1 = reactive({
    loginName: '',
    password: '',
  });
  const userStore = useUserStore();
  const handleFinish1 = () => {
    // 校验
    if (!formType1.loginName) {
      message.warn('手机号不能为空！');
      return;
    }
    if (isNaN(Number(formType1.loginName))) {
      message.warn('手机号必须为数字！');
      return;
    }
    if (!formType1.password) {
      message.warn('密码不能为空！');
      return;
    }

    loginLoading1.value = true;

    userStore.Login(formType1)
        .then(res => {
          if (res.code === 200) {
            router.push({name: 'dashboard'});
          }
        })
        .finally(() => {
          loginLoading1.value = false;
        })
  };

  // 验证码
  const sendCodeDisabled = ref(false);
  const codeBtnText = ref('发送');
  const sendCode = () => {
    // 校验
    if (sendCodeDisabled.value) return;
    if (!formType2.phoneNumber) {
      message.warn('手机号不能为空！');
      return;
    }
    if (isNaN(Number(formType2.phoneNumber))) {
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

    userStore.SendCode({phoneNumber: formType2.phoneNumber})
        .then(res => {
          if (res.code === 200) {
            message.success('验证码发送成功，请注意查收！');
          }
        })
  }

  let formType2 = reactive({
    phoneNumber: '',
    code: '',
  });
  const loginLoading2 = ref(false);
  const handleFinish2 = () => {
    // 校验
    if (!formType2.phoneNumber) {
      message.warn('手机号不能为空！');
      return;
    }
    if (isNaN(Number(formType2.phoneNumber))) {
      message.warn('手机号必须为数字！');
      return;
    }
    if (!formType2.code) {
      message.warn('验证码不能为空！');
      return;
    }
    if (isNaN(Number(formType2.code))) {
      message.warn('验证码必须为数字！');
      return;
    }

    loginLoading2.value = true;

    userStore.LoginByCode(formType2)
        .then(res => {
          if (res.code === 200) {
            router.push({name: 'dashboard'});
          }
        })
        .finally(() => {
          loginLoading2.value = false;
        })
    
  }
</script>

<style lang="less" scoped>
  .logo-img {
    height: 30vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    height: 100%;
    width: auto;
  }

  .login-wrapper {
    min-height: 70vh;
  }

  .login-wrapper :deep(.ant-col-4) {
    display: block;
    flex: 0 0 13.5%;
    max-width: 13.5%;
  }

  .login-wrapper :deep(.ant-btn) {
    width: 100%;
  }

  .login-wrapper :deep(.ant-tabs-nav) {
    margin-bottom: 4vh;
  }

  .login-wrapper a {
    color: #5eaf7d;
  }

</style>