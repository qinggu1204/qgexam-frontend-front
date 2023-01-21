<!--教师监考假页面-->
<template>
  <a-row :gutter="[16, 16]">
    <a-col :span="6">
      <a-card style="width: 350px;" hoverable>
        <div class="video">
          <video loop muted autoplay src="./videos/1.mp4" style="height: 200px">
            您的浏览器不支持视频播放
          </video>
        </div>
        <a-card-meta title="操作系统">
          <template #description>
            学生 202003151106
          </template>
        </a-card-meta>
      </a-card>
    </a-col>
    <a-col :span="6">
      <a-card style="width: 350px;" hoverable>
        <div class="video">
          <video loop muted autoplay src="./videos/2.mp4" style="height: 200px">
            您的浏览器不支持视频播放
          </video>
        </div>
        <a-card-meta title="操作系统">
          <template #description>
            学生 202003150817
          </template>
        </a-card-meta>
      </a-card>
    </a-col>
    <a-col :span="6">
      <a-card style="width: 350px;" hoverable>
        <div class="video">
          <video loop muted autoplay src="./videos/3.mp4" style="height: 200px">
            您的浏览器不支持视频播放
          </video>
        </div>
        <a-card-meta title="操作系统">
          <template #description>
            学生 202003150912
          </template>
        </a-card-meta>
      </a-card>
    </a-col>
    <a-col :span="6">
      <a-card style="width: 350px;" hoverable>
        <div class="video">
          <video loop muted autoplay src="./videos/1.mp4" style="height: 200px">
            您的浏览器不支持视频播放
          </video>
        </div>
        <a-card-meta title="操作系统">
          <template #description>
            学生 202003151106
          </template>
        </a-card-meta>
      </a-card>
    </a-col>
    <a-col :span="6">
      <a-card style="width: 350px;" hoverable>
        <div class="video">
          <video loop muted autoplay src="./videos/2.mp4" style="height: 200px">
            您的浏览器不支持视频播放
          </video>
        </div>
        <a-card-meta title="操作系统">
          <template #description>
            学生 202003151106
          </template>
        </a-card-meta>
      </a-card>
    </a-col>
    <a-col :span="6">
      <a-card style="width: 350px;" hoverable>
        <div class="video">
          <video loop muted autoplay src="./videos/3.mp4" style="height: 200px">
            您的浏览器不支持视频播放
          </video>
        </div>
        <a-card-meta title="操作系统">
          <template #description>
            学生 202003151106
          </template>
        </a-card-meta>
      </a-card>
    </a-col>
    <a-col :span="6">
      <a-card style="width: 350px;" hoverable>
        <div class="video">
          <video loop muted autoplay src="./videos/1.mp4" style="height: 200px">
            您的浏览器不支持视频播放
          </video>
        </div>
        <a-card-meta title="操作系统">
          <template #description>
            学生 202003151106
          </template>
        </a-card-meta>
      </a-card>
    </a-col>
    <a-col :span="6">
      <a-card style="width: 350px;" hoverable>
        <div class="video">
          <video loop muted autoplay src="./videos/2.mp4" style="height: 200px">
            您的浏览器不支持视频播放
          </video>
        </div>
        <a-card-meta title="操作系统">
          <template #description>
            学生 202003151106
          </template>
        </a-card-meta>
      </a-card>
    </a-col>
  </a-row>
</template>

<script setup>
</script>

<style scoped>
  :deep(.ant-list-item) {
    display: inline-flex;
  }

  .video video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>