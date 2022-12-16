<!--页面加载中组件-->
<template>
  <a-spin :indicator="indicator" :delay="delay"/>
</template>

<script setup>
  import {LoadingOutlined} from '@ant-design/icons-vue';
  import {h, ref} from 'vue';

  const props = defineProps({
    size: {
      type: String,
      default: '72px',
    },
    delay: {
      type: Number,
      default: 500,
    }
  })
  
  const spinSize = ref(props.size);
  const indicator = h(LoadingOutlined, {
    style: {
      fontSize: spinSize.value,
    },
    spin: true,
  });
</script>