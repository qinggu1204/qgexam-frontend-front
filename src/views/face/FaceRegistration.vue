<template>
  <div class="layui-row" >
    <div class="layui-col-xs7 layui-col-md-offset3" align="center">
      <div style="margin: 0,auto; width: 800px;height: 80px;">
        <div style="margin: 0,auto;height: 80px;text-align:center;line-height:80px;font-size: 40px;">
          人脸录入
        </div>
      </div>
      <div id="mainDiv" v-show="fileShow">
        <div v-if="fileShow === 'media'" >
          <video id='video' width='500' height='500' autoplay='autoplay' style='margin-top: 20px'></video>
          <canvas id='canvas' width='500' height='500' style='display: none'></canvas>
        </div>
        <div v-if="fileShow === 'file'">
          <h2>点击图片区域上传文件</h2>
          <input style='display: none' type='file'  name='file0' id='file0' multiple='multiple' />
          <br>
          <img src='./images/shibie.jpg' id='img0' @click='toChooseFile()' style='width: 30rem;height: 25rem;'>
        </div>

      </div>
      <div>
        <table frame="void" >
          <tr>
            <a-space>
              <td>
                <a-button
                    title="摄像头注册" value="摄像头注册" @click="getMedia"
                    type="primary" size="large"
                    style="display:block;margin:0 auto;margin-top:10px;text-align: center;" >
                  摄像头录入
                </a-button>
              </td>
              <td>
                <a-button
                    size="large" @click="imageRecog"
                    style="display:block;margin:0 auto;margin-top:10px;text-align: center;">
                  照片录入
                </a-button>
              </td>
            </a-space>
          </tr>
          <!--<td><button id="snap" onclick="commitPhoto()" style="color:#FFFFFF;height: 30px;display:block;margin:0 auto;margin-top:10px;width:100px;background-color: #3F51B5;border-radius:5px;text-align: center;line-height: 30px;font-size: 20px">照片提交</button></td>-->
          <tr><td colspan="2">
            <a-button 
                id="snap" @click="takePhoto()" size="large" type="primary"
                style="display:block;margin:0 auto;margin-top:10px;text-align: center;width: 100px">
              提交
            </a-button>
          </td></tr>
        </table>
      </div>
      <div style="float: right">

      </div>
    </div>


  </div>
</template>

<script setup>
  import {reqAddFace} from "@/api/student";
  import $ from 'jquery'
  import {reactive, ref} from "vue";
  import {message} from "ant-design-vue";
  import {useRouter} from "vue-router";
  
  const router = useRouter();

  let fileShow = ref("")
  function getMedia() {
    fileShow.value = "media"
    // $("#mainDiv").empty();
    // let videoComp = " <video id='video' width='500px' height='500px' autoplay='autoplay' style='margin-top: 20px'></video><canvas id='canvas' width='500px' height='500px' style='display: none'></canvas>";
    // $("#mainDiv").append(videoComp);

    let constraints = {
      video: {width: 500, height: 500},
      audio: true
    };
    //获得video摄像头区域
    let video = document.getElementById("video");
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
    //     takePhoto();
    // },2000)
  }
  //拍照事件
  async function takePhoto() {
    let mainComp = $("#mainDiv");
    console.log("##################################", mainComp.has('video'))
    if (mainComp.has('video').length) {
      console.log("加入了")
      //获得Canvas对象
      let video = document.getElementById("video");
      let canvas = document.getElementById("canvas");
      let ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, 500, 500);


      var base64File = canvas.toDataURL();
      console.log("base64File " + base64File)
      const params = {
        file: base64File
      }
      console.log("params====", params)
      let result = await reqAddFace(params)
      console.log("1111111111111=", result)
      if (result.code === 200)
        message.success('人脸录入成功！');

      // $.ajax({
      //   type: "post",
      //   url: "/faceAdd",
      //   data: formData,
      //   contentType: false,
      //   processData: false,
      //   async: false,
      //   success: function (text) {
      //     var res = JSON.stringify(text)
      //     if (text.code == 0) {
      //       alert("注册成功")
      //     } else {
      //       alert(text.message)
      //     }
      //   },
      //   error: function (error) {
      //     alert(JSON.stringify(error))
      //   }
      // });
    } else {
      var file = $("#file0")[0].files[0];
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async function () {
        var base64 = reader.result;
        const params = {
          file: base64
        }
        console.log("params====", params)
        let result = await reqAddFace(params)
        if (result.code === 200)
          message.success('人脸录入成功！');
        // $.ajax({
        //   type: "post",
        //   url: "/faceAdd",
        //   data: formData,
        //   contentType: false,
        //   processData: false,
        //   async: false,
        //   success: function (text) {
        //     var res = JSON.stringify(text)
        //     if (text.code == 0) {
        //       alert("注册成功")
        //     } else {
        //       alert(text.message)
        //     }
        //   },
        //   error: function (error) {
        //     alert(JSON.stringify(error))
        //   }
        // });
        location.reload();
      }
    }

  }
  function toChooseFile()
  {
    $("#file0").trigger('click');
  }
  function imageRecog() {
    fileShow.value = "file"
  }


  $(document).on("change","#file0",function(){
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
</script>

<style scoped>

</style>
