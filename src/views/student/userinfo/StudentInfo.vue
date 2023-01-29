<template>
  <div style="display: inline;float: right">
    <a href="src/views/face/face_registration.html" target="_blank">人脸识别</a>
  </div>
  <div v-if="infoLoading" class="loading-wrapper">
    <Loading></Loading>
  </div>
  <div style="margin-top: 1%;"></div>
  <a-form
      :model="formStudentInfo"
      name="basic"
      :label-col="{ span: 10 }"
      :wrapper-col="{ span: 6 }"
      @finish="updateStudentInfo"
  >
    <a-form-item label="姓名">
      {{ formStudentInfo.userName }}
    </a-form-item>
    <a-form-item label="手机号">
      <a-space :size="15">
        {{ formStudentInfo.loginName }}
        <a @click.prevent="updatePhoneVisible = true">修改手机号</a>
        <a-modal
            v-model:visible="updatePhoneVisible"
            title="修改手机号"
            ok-text="确定"
            cancel-text="取消"
            @ok="updatePhone"
            :confirm-loading="updatePhoneLoading"
        >
          <div style="display: flex;justify-content: center;align-items: center;">
            <a-space direction="vertical">
              <a-input v-model:value="formUpdatePhone.phoneNumber"
                       style="max-width: 204px" placeholder="新手机号"
              >
                <template #prefix>
                  <UserOutlined style="color: rgba(0, 0, 0, 0.25)"/>
                </template>
              </a-input>
              <a-input-search
                  v-model:value="formUpdatePhone.code"
                  @search="sendCode"
                  style="max-width: 204px"
                  placeholder="验证码"
              >
                <template #prefix>
                  <MessageOutlined style="color: rgba(0, 0, 0, 0.25)"/>
                </template>
                <template #enterButton>
                  <a-button :disabled="sendCodeDisabled">{{ codeBtnText }}</a-button>
                </template>
              </a-input-search>
            </a-space>
          </div>
        </a-modal>
      </a-space>
    </a-form-item>
    <a-form-item label="学号">
      {{ formStudentInfo.studentNumber }}
    </a-form-item>
    <a-form-item label="学校">
      {{ formStudentInfo.schoolName }}
    </a-form-item>
    <a-form-item label="头像">
      <a-space align="start">
        <a-image
            :width="104"
            :src="formStudentInfo.headImg ? formStudentInfo.headImg : userStore.avatar"
        />
        <a-upload
            v-model:file-list="fileList"
            name="avatar"
            list-type="picture-card"
            class="avatar-uploader"
            :custom-request="handleUpload"
            :before-upload="beforeUpload"
            @change="handleChange"
            :multiple="false"
            :show-upload-list="false"
        >
          <div>
            <div v-show="loading">
              <loading-outlined v-if="loading"></loading-outlined>
              <div class="ant-upload-text">上传中</div>
            </div>
            <div v-show="!loading">
              <plus-outlined></plus-outlined>
              <div class="ant-upload-text">上传头像</div>
            </div>
          </div>
        </a-upload>
      </a-space>
    </a-form-item>
    <a-form-item label="人脸信息">
      <a-button @click="gotoFace">
        录入人脸
      </a-button>
    </a-form-item>
    <a-form-item label="密码">
      <a-space :size="15">
        **************
        <a @click.prevent="router.push({name:'updatePassword'})">修改密码</a>
      </a-space>
    </a-form-item>
    <a-form-item :wrapper-col="{ offset: 10, span: 16 }">
      <a-button type="primary" html-type="submit" :loading="updateStudentInfoLoading">修改</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup>
  import {onActivated, onBeforeMount, onMounted, reactive, ref} from "vue";
  import {message} from "ant-design-vue/es"
  import {useUserStore} from "@/store/user.js";
  import {LoadingOutlined, PlusOutlined} from "@ant-design/icons-vue";
  import {useStudentStore} from "@/store/student.js";
  import Loading from "@/components/Loading.vue";
  import {useRouter} from "vue-router";

  const router = useRouter();
  const userStore = useUserStore();
  const studentStore = useStudentStore();

  const infoLoading = ref(false);
  onBeforeMount(async () => {
    infoLoading.value = true;
    const res =  await Promise.all([userStore.GetUserInfo(), studentStore.GetStudentInfo()]);
    if (res[0].code === 200 && res[1].code === 200) {
      formStudentInfo.value = res[1].data;
    } 
    infoLoading.value = false;
  })

  // 验证码
  const sendCodeDisabled = ref(false);
  const codeBtnText = ref('发送');
  const sendCode = () => {
    // 校验
    if (sendCodeDisabled.value) return;
    if (!formUpdatePhone.phoneNumber) {
      message.warn('手机号不能为空！');
      return;
    }
    if (isNaN(Number(formUpdatePhone.phoneNumber))) {
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

    userStore.SendCode(formUpdatePhone.phoneNumber)
        .then(res => {
          if (res.code === 200) {
            message.success('验证码发送成功，请注意查收！');
          }
        })
  }
  // 修改手机号
  const updatePhoneVisible = ref(false);
  let formUpdatePhone = reactive({
    phoneNumber: '',
    code: '',
  })
  const updatePhoneLoading = ref(false);
  const updatePhone = () => {
    if (!formUpdatePhone.phoneNumber) {
      message.warn('手机号不能为空！');
      return;
    }
    if (isNaN(Number(formUpdatePhone.phoneNumber))) {
      message.warn('手机号必须为数字！');
      return;
    }
    if (!formUpdatePhone.code) {
      message.warn('验证码不能为空！');
      return;
    }
    if (isNaN(Number(formUpdatePhone.code))) {
      message.warn('验证码必须为数字！');
      return;
    }

    updatePhoneLoading.value = true;
    userStore.ValidateCode(formUpdatePhone)
        .then(res => {
          if (res.code === 200) {
            message.success('新手机号验证成功！需要点“修改”应用修改！');
            formStudentInfo.loginName = formUpdatePhone.phoneNumber;
          }
        })
        .finally(() => {
          updatePhoneVisible.value = false;
          updatePhoneLoading.value = false;
        })
  }


  let formStudentInfo = ref({
    studentNumber: '',
    schoolName: '',
    userName: '',
    headImg: '',
    loginName: '',
  });
  const updateStudentInfoLoading = ref(false);
  const updateStudentInfo = () => {
    updateStudentInfoLoading.value = true;
    studentStore.UpdateStudentInfo(formStudentInfo.value)
        .then(res => {
          if (res.code === 200) {
            message.success('修改用户信息成功！即将刷新页面！');
            setTimeout(() => {
              window.location.reload();
            }, 2500)
          }
        })
        .finally(() => {
          updateStudentInfoLoading.value = false;
        })
  };

  // 头像上传
  // 上传图片
  const fileList = ref([]);
  const loading = ref(false);
  const handleChange = info => {
  };
  const beforeUpload = file => {
    if (fileList.value.length >= 1) {
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
            message.success('上传成功！需要点“修改”应用修改！');
            info.onSuccess(res.data, info);
            formStudentInfo.value.headImg = res.data.url;
          }
        })
        .catch(err => {
          info.onError(err);
        })
        .finally(() => {
          loading.value = false;
        })
  }
  
  // 人脸
  const gotoFace = () => {
    let link = router.resolve('/faceRegistration');
    window.open(link.href, '_blank');
  }
</script>

<style scoped>

</style>