<template>
  <div class="layui-row">
    <div class="layui-col-xs7 layui-col-md-offset3" align="center">
      <div style="margin: 0,auto; width: 800px;height: 80px;">
        <div style="margin: 0,auto;height: 80px;text-align:center;line-height:80px;font-size: 40px;">
          人脸验证
        </div>
      </div>

      <div id="regcoDiv">
        <div v-if="fileShow === 'file'">
          <h2>点击图片区域上传文件</h2><input style='display: none' type='file' name='file1' id='file1' multiple='multiple' />
          <br>
          <img src='./images/shibie.jpg' @click='chooseFile()' id='img0' style='width: 30rem;height: 25rem;'>
        </div>
        <div v-if="fileShow === 'media'">
          <video id='video2' width='500' height='500' autoplay='autoplay' style='margin-top: 20px'></video>
          <canvas id='canvas2' width='500' height='500' style='display: none'></canvas>
        </div>

      </div>
      <div>
        <table frame="void">
          <tr>
            <a-space :size="10">
              <td>
                <a-button title="人脸识别" value="人脸识别" @click="getMedia2" type="primary" size="large">
                  摄像头验证
                </a-button>
              </td>
              <td>
                <a-button @click="imageTo()" size="large">
                  照片验证
                </a-button>
              </td>
            </a-space>
          </tr>
          <tr>
            <td colspan="2">
              <a-button 
                  id="snap" @click="chooseFileChangeComp()" 
                  type="primary" size="large"      
                  style="display:block;margin:0 auto;margin-top:10px;width:100px;text-align: center;">
                提交
              </a-button>
            </td>
          </tr>
        </table>

      </div>
      <div>
        <img id="imageDivComp" />
      </div>

    </div>

  </div>
</template>

<script setup>

  import $ from "jquery"
  import {ref} from "vue";
  import {reqFaceSearch} from "@/api/student";
  import {useRouter} from "vue-router";
  import {useFaceStore} from "@/store/face.js";
  import {message} from "ant-design-vue";
  
  const router = useRouter();
  const faceStore = useFaceStore();
  
  let fileShow = ref("")

  function chooseFile() {
    $("#file1").trigger('click');
  }

  function imageTo()
  {
    fileShow.value = "file"
  }

  $(document).on("change","#file1",function(){
    var objUrl = getObjectURL(this.files[0]) ;//获取文件信息
    console.log("objUrl = "+objUrl);
    if (objUrl) {
      $("#img0").attr("src", objUrl);
    }
  });

  function getObjectURL(file) {
    var url = null;
    if (window.createObjectURL!=undefined) {
      url = window.createObjectURL(file) ;
    } else if (window.URL!=undefined) { // mozilla(firefox)
      url = window.URL.createObjectURL(file) ;
    } else if (window.webkitURL!=undefined) { // webkit or chrome
      url = window.webkitURL.createObjectURL(file) ;
    }
    return url ;
  }

  $("#imageDivComp").click(function () {
    $("#chooseFileComp").click();

  });

  function getMedia2() {
    fileShow.value = "media"
    let constraints = {
      video: {width: 500, height: 500},
      audio: true
    };
    //获得video摄像头区域
    let video = document.getElementById("video2");
    //这里介绍新的方法，返回一个 Promise对象
    // 这个Promise对象返回成功后的回调函数带一个 MediaStream 对象作为其参数
    // then()是Promise对象里的方法
    // then()方法是异步执行，当then()前的方法执行完后再执行then()内部的程序
    // 避免数据没有获取到
    let promise = navigator.mediaDevices.getUserMedia(constraints);
    promise.then(function (MediaStream) {
      video.srcObject = MediaStream;
      video.play();
    });
    // var t1 = window.setTimeout(function() {
    //     chooseFileChangeComp()
    // },2000)
  }

  async function chooseFileChangeComp() {
    let regcoDivComp = $("#regcoDiv");
    if (regcoDivComp.has('video').length) {
      let video = document.getElementById("video2");
      let canvas = document.getElementById("canvas2");
      let ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, 500, 500);
      var base64File = canvas.toDataURL();
      const params = {
        file: base64File
      }

      let result = await reqFaceSearch(params)
      console.log("###", result)
      if (result.code !== 200) return;
      const {similarValue} = result.data;
      if (similarValue >= 75) {
        faceStore.setAuth(true);
        message.success('人脸比对通过！');
        if (faceStore.examinationId) 
          await router.push(`/exam/${faceStore.examinationId}`);
      }
      else 
        message.error('人脸比对失败！');
      // $.ajax({
      //   type: "post",
      //   url: "/faceSearch",
      //   data: formData,
      //   contentType: false,
      //   processData: false,
      //   async: false,
      //   success: function (text) {
      //     var res = JSON.stringify(text)
      //     if (text.code == 0) {
      //       var name = text.data.name;
      //       $("#nameDiv").html("姓名：" + name);
      //       var similar = text.data.similarValue;
      //       $("#similarDiv").html("相似度：" + similar + "%");
      //       var age = text.data.age;
      //       $("#ageDiv").html("年龄：" + age);
      //       var gender = text.data.gender;
      //       $("#genderDiv").html("性别：" + gender);
      //       // img.css("background-image", 'url(' + text.data.image + ')');
      //       alert("姓名：" + name + "\n相似度：" + similar + "%" + "\n年龄：" + age + "\n性别：" + gender);
      //     } else {
      //       $("#nameDiv").html("");
      //       $("#similarDiv").html("");
      //       $("#ageDiv").html("");
      //       $("#genderDiv").html("");
      //       alert("人脸不匹配")
      //     }
      //
      //   },
      //   error: function (error) {
      //     $("#nameDiv").html("");
      //     $("#similarDiv").html("");
      //     $("#ageDiv").html("");
      //     $("#genderDiv").html("");
      //     alert(JSON.stringify(error))
      //   }
      // });
    } else {
      var file = $("#file1")[0].files[0];
      if (file == undefined) {
        alert("请选择有人脸的图片进行识别");
        return;
      }
      var formData = new FormData();
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async function () {
        var base64 = reader.result;
        const params = {
          file: base64
        }
        let result = await reqFaceSearch(params)
        if (result.code !== 200) return;
        const {similarValue} = result.data;
        if (similarValue >= 75) {
          faceStore.setAuth(true);
          message.success('人脸比对通过！');
          if (faceStore.examinationId)
            await router.push(`/exam/${faceStore.examinationId}`);
        }
        else
          message.error('人脸比对失败！');
        // $.ajax({
        //   type: "post",
        //   url: "/faceSearch",
        //   data: formData,
        //   contentType: false,
        //   processData: false,
        //   async: false,
        //   success: function (text) {
        //     var res = JSON.stringify(text)
        //     if (text.code == 0) {
        //       var name = text.data.name;
        //       // $("#nameDiv").html("姓名：" + name);
        //       var similar = text.data.similarValue;
        //       // $("#similarDiv").html("相似度：" + similar + "%");
        //       var age = text.data.age;
        //       // $("#ageDiv").html("年龄：" + age);
        //       var gender = text.data.gender;
        //       // $("#genderDiv").html("性别：" + gender);
        //       // img.css("background-image", 'url(' + text.data.image + ')');
        //       alert("姓名：" + name + "\n相似度：" + similar + "%" + "\n年龄：" + age + "\n性别：" + gender);
        //     } else {
        //       $("#nameDiv").html("");
        //       $("#similarDiv").html("");
        //       $("#ageDiv").html("");
        //       $("#genderDiv").html("");
        //       alert("人脸不匹配")
        //     }
        //
        //   },
        //   error: function (error) {
        //     $("#nameDiv").html("");
        //     $("#similarDiv").html("");
        //     $("#ageDiv").html("");
        //     $("#genderDiv").html("");
        //     alert(JSON.stringify(error))
        //   }
        // });
      }
    }
  }


</script>

<style scoped>

</style>
