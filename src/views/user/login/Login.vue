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
        <a-col>
          <a-tabs v-model="activeKey" centered>
            <a-tab-pane key="1" tab="密码登录">
              <a-form
                  :model="formType1"
                  @finish="handleFinish"
                  @finishFailed="handleFinishFailed"
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
                  >
                    登录
                  </a-button>
                </a-form-item>
              </a-form>
            </a-tab-pane>
            <a-tab-pane key="2" tab="验证码登录">
              <a-form
                  :model="formType2"
                  @finish="handleFinish"
                  @finishFailed="handleFinishFailed"
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
                  <!--<a-input v-model:value="formType2.code" type="password"  placeholder="请输入密码">
                    <template #prefix>
                      <LockOutlined style="color: rgba(0, 0, 0, 0.25)"/>
                    </template>
                  </a-input>-->
                </a-form-item>
                <a-form-item>
                  <a-button
                      type="primary"
                      html-type="submit"
                  >
                    登录
                  </a-button>
                </a-form-item>
              </a-form>
            </a-tab-pane>
          </a-tabs>
          <div style="text-align: center">
            <router-link to="/register">没有账号？去注册</router-link>
          </div>
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

  const loading = storeToRefs(useLoadingStore()).isLoading;
  
  const activeKey = ref('1');
  
  const formType1 = reactive({
    loginName: '',
    password: '',
  });
  const handleFinish = values => {
    console.log(values, formType1);
  };
  const handleFinishFailed = errors => {
    console.log(errors);
  };

  const formType2 = reactive({
    phoneNumber: '',
    code: '',
  });
  //TODO: 表单校验,创建验证码登录的方法
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

  .login-wrapper :deep(.ant-btn) {
    display: block;
    margin: 0 auto;
  }

  .login-wrapper :deep(.ant-tabs-nav) {
    margin-bottom: 4vh;
  }

  .login-wrapper a {
    color: #5eaf7d;
  }
</style>