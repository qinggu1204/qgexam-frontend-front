<!--结果页-->
<template>
  <div v-if="loading" class="loading-wrapper">
    <Loading></Loading>
  </div>
  <div v-else class="result-wrapper">
    <a-result
        :status="type"
        :title="title"
        :sub-title="subTitle"
    >
      <template #extra>
        <a-button key="console" type="primary"
                  @click="handleClick"
                  :loading="btnLoading"
        >
          {{btnText}}</a-button>
      </template>
    </a-result>
  </div>
</template>

<script setup>
  import {useResultStore} from "@/store/result.js";
  import {storeToRefs} from "pinia";
  import {useRouter} from "vue-router";
  import {useLoadingStore} from "@/store/loading.js";
  import Loading from "@/components/Loading.vue";
  import {ref} from "vue";
 
  const router = useRouter();
  const resultStore = useResultStore();
  const {type, title, subTitle, btnText, routerName} = storeToRefs(resultStore);
  const loading = storeToRefs(useLoadingStore()).isLoading;
  const btnLoading = ref(false);
  const handleClick = () => {
    btnLoading.value = true;
    setTimeout(()=>{
      router.push({name: routerName.value});
      resultStore.$reset();
      btnLoading.value = false;
    }, 1500)
  }
</script>

<style scoped>
  .result-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
  }
</style>