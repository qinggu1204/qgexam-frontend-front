<!--教师监考假页面-->
<template>
  <a-list
      :grid="{ gutter: 16 }"
      :data-source="data"
      style="margin-left: 7%;"
  >
    <template #renderItem="{ item }">
      <a-list-item>
        <a-card hoverable style="width: 300px;">
          <template #cover>
            <video :src="item.src" style="height: 200px">
              123
            </video>
            <!--<img alt="example" style="height: 200px" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />-->
          </template>
          <a-card-meta :title="item.title">
            <template #description>学生 {{item.student}}</template>
          </a-card-meta>
        </a-card>
      </a-list-item>
    </template>
  </a-list>
</template>

<script setup>

  const data = [
    {
      title: '操作系统',
      src: './videos/1.mp4',
      student: '202003151106',
    },
    {
      title: '操作系统',
      src: './videos/2.mp4',
      student: '202003150811',
    },
    {
      title: '操作系统',
      src: './videos/2.mp4',
      student: '202003150811',
    },
    {
      title: '操作系统',
      src: './videos/2.mp4',
      student: '202003150811',
    },
    {
      title: '操作系统',
      src: './videos/2.mp4',
      student: '202003150811',
    },
    {
      title: '操作系统',
      src: './videos/2.mp4',
      student: '202003150811',
    },
    {
      title: '操作系统',
      src: './videos/2.mp4',
      student: '202003150811',
    },
    {
      title: '操作系统',
      src: './videos/2.mp4',
      student: '202003150811',
    },
  ]
</script>

<style scoped>
  :deep(.ant-list-item) {
    display: inline-flex;
  }
</style>