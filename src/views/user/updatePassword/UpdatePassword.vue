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
              @finish="handleFinish"
              @finishFailed="handleFinishFailed"
          >
            <a-form-item>
              <a-typography-title :level="5">修改密码</a-typography-title>
            </a-form-item>
            <a-form-item label="手机号">
              <a-input v-model:value="formUpdatePassword.loginName" disabled>
                <template #prefix>
                  <UserOutlined style="color: rgba(0, 0, 0, 0.25)"/>
                </template>
              </a-input>
            </a-form-item>
            <a-form-item label="验证码">
              <a-input-search
                  v-model:value="formUpdatePassword.code"
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
  import {onActivated, reactive, ref} from "vue";
  import {useRouter} from "vue-router";
  import {useResultStore} from "@/store/result.js";
  import {useLoadingStore} from "@/store/loading.js";
  import {storeToRefs} from "pinia";
  import Loading from "@/components/Loading.vue";

  const loading = storeToRefs(useLoadingStore()).isLoading;
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const formUpdatePassword = reactive({
    loginName: '', // 手机号码
    password: '',
    checkPass: '',
    code: '',
  })
  const btnLoading = ref(false);
  const router = useRouter();
  const resultStore = useResultStore();
  const handleFinish = values => {
    btnLoading.value = true;
    console.log(values, formUpdatePassword);
    setTimeout(() => {
      resultStore.setResult(
          'success',
          '修改密码成功',
          '点击去登录跳转到登录页面',
          '去登录',
          'login',
      )
      router.push({name: 'result'});
      btnLoading.value = false;
    }, 1500)
  };
  const handleFinishFailed = errors => {
    console.log(errors);
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