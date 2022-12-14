<template>
  <a-button type="primary" @click="login">按钮</a-button>
</template>

<script setup>
  import {useUserStore} from "@/store/index.js";
  import {message} from "ant-design-vue";
  import 'ant-design-vue/es/message/style/css'

  const userStore = useUserStore();

  const login = async () => {
    const res = await userStore.Login();
    console.log(res);
    message.success(res.msg);
  }
</script>

<style scoped>

</style>