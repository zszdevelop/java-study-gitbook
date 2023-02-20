# MediaRecorde录制视频

## 1. 简介

## 代码实现

```vue
<template>
  <div id="video-app">
    <div class="recorder-wrapper">
      <div class="phone">
        <div class="phone-body">
          <div class="phone-head">
            <span>&lt; 微信(66)</span>
            <span>哈哈哈</span>
            <span>···</span>
          </div>
          <div class="phone-content">
            <transition-group tag="ul" class="msg-list" name="fade" >
              <li class="msg eg" :key="-1">
                <div class="avatar"></div>
                <div class="video">拍段视频吧</div>
              </li>

              <li v-for="(item, index) in chunkList" :key="index" class="msg">
                <div class="avatar"></div>
                <div
                  class="video"
                  @click="onPlay(index)"
                  @touchend.prevent="onPlay(index)"
                >
                  <img alt="截图" :src="item.poster" />
                  <i class="el-icon-caret-right"></i>
                </div>
              </li>
            </transition-group>
          </div>
          <div
            class="phone-operate"
            @mousedown="onMousedown"
            @touchstart.prevent="onMousedown"
            @mouseup="onMouseup"
            @touchend.prevent="onMouseup"
          >
            {{ btnText }}
          </div>
          <video
            ref="video"
            width="200"
            @click="showVideo(false)"
            @touchend.prevent="showVideo(false)"
          ></video>
        </div>
      </div>
      <canvas ref="canvas"></canvas>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chunks: [],
      chunkList: [],
      btnText: "按住拍视频",
      index: 0,
    };
  },
  created() {},
  mounted() {
    if (!navigator.mediaDevices) {
      alert("您的浏览器不支持获取用户设备");
      return;
    }
    if (!window.MediaRecorder) {
      alert("您的浏览器不支持录音");
      return;
    }
    this.video = this.$refs.video;
    this.canvas = this.$refs.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.requestAudioAccess();
  },
  methods: {
    requestAudioAccess() {
      navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(
        (stream) => {
          this.recorder = new window.MediaRecorder(stream);
          this.stream = stream;
          this.bindEvents();
        },
        (error) => {
          alert("出错，请确保已允许浏览器获取音视频权限");
        }
      );
    },

    onMousedown() {
      this.showVideo(true);
      this.onPreview();
      this.btnText = "松开结束";
      this.onStart();
    },

    onMouseup() {
      this.onStop();
      this.btnText = "按住拍视频";
    },

    onPreview() {
      this.video.srcObject = this.stream;
      this.video.muted = true;
      this.video.play();
    },

    showVideo(bShow) {
      if (bShow) {
        this.video.style.display = "block";
      } else {
        this.video.style.display = "none";
        this.video.pause();
      }
    },

    onStart() {
      this.recorder.start();
    },

    onStop() {
      this.recorder.stop();
    },

    onPlay(index) {
      this.showVideo(true);
      let item = this.chunkList[index];
      this.video.src = item.stream;
      this.video.muted = false;
      this.video.play();

      this.bindAudioEvent();
    },

    bindAudioEvent() {
      this.video.onended = () => {
        this.showVideo(false);
      };
    },

    bindEvents() {
      this.recorder.ondataavailable = this.getRecordingData;
      this.recorder.onstop = this.saveRecordingData;
    },

    getRecordingData(e) {
      this.chunks.push(e.data);
    },

    saveRecordingData() {
      let blob = new Blob(this.chunks, { type: "video/webm" }),
        videoStream = URL.createObjectURL(blob);
      this.chunkList.push({ stream: videoStream });

      this.onCapture(this.index);

      this.chunks = [];
    },

    //获取视频截图
    onCapture(index) {
      let item = this.chunkList[index];
      this.ctx.drawImage(
        this.video,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
      this.canvas.toBlob((blob) => {
        let src = URL.createObjectURL(blob);
        this.$set(item, "poster", src);
      });
      //索引后移
      this.index++;

      //隐藏video
      this.showVideo(false);
      this.video.srcObject = null;
    },
  },
};
</script>
<style scoped>
.recorder-wrapper {
  margin-top: 10px;
  padding: 20px;
  border: 1px solid #00b894;
}
.phone {
  margin: 0 auto;
  padding: 55px 11px 53px;
  width: 221px;
  height: 448px;
  font-size: 12px;
  border-radius: 35px;
  background-image: url("https://xiaotianxia.github.io/blog/vuepress/assets/img/iphone-bg1.bf9c75ef.png");
  box-sizing: border-box;
  user-select: none;
}
.phone-body {
  position: relative;
  height: 100%;
  background-color: #fff;
}
.phone-head {
  height: 30px;
  line-height: 30px;
  color: #fff;
  font-weight: bold;
  background-color: #000;
}
.phone-head span {
  display: inline-block;
}
.phone-head span:nth-child(2) {
  width: 100px;
  text-align: center;
}
.phone-head span:nth-child(3) {
  float: right;
  margin-right: 10px;
}
.phone-content {
  height: 282px;
  background-color: #f1eded;
}
.phone-operate {
  position: relative;
  line-height: 28px;
  text-align: center;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 -1px 1px rgba(0, 0, 0, 0.1);
}
.phone-operate:active {
  background-color: #95a5a6;
}
.phone-operate:active:before {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  top: -2px;
  content: "";
  width: 0%;
  height: 2px;
  background-color: #7bed9f;
  animation: loading 1s ease-in-out infinite backwards;
}
.msg-list {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.msg-list::-webkit-scrollbar {
  display: none;
}
.msg-list .msg {
  list-style: none;
  padding: 0 8px;
  margin: 10px 0;
  overflow: hidden;
}
.msg-list .msg .avatar,
.msg-list .msg .video,
.msg-list .msg .duration {
  float: right;
}
.msg-list .msg .avatar {
  width: 24px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  background-color: #000;
  background: url("https://denzel.netlify.com/hero.png") 0 0;
  background-size: 100%;
}
.msg-list .msg .video {
  position: relative;
  width: 100px;
  height: 75px;
  line-height: 80px;
  margin-right: 6px;
  border-radius: 4px;
  overflow: hidden;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  font-size: 0;
  cursor: pointer;
}
.msg-list .msg .video img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #636e72;
}
.msg-list .msg .video i {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 30px;
}
.msg-list .msg.eg {
  cursor: default;
}
.msg-list .msg.eg .video {
  position: relative;
  width: auto;
  height: 24px;
  line-height: 24px;
  padding: 0 8px 0 10px;
  border-radius: 2px;
  color: #000;
  overflow: initial;
  font-size: 12px;
  background-color: rgba(107, 197, 107, 0.85);
}
.msg-list .msg.eg .video:before {
  position: absolute;
  content: "";
  right: -8px;
  top: 8px;
  display: inline-block;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 4px;
  border-color: transparent transparent transparent rgba(107, 197, 107, 0.85);
}
video {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: none;
}
canvas {
  display: none;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@keyframes loading {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}
</style>

```

## 3. 注意事项

1. 需要部署在https环境下才能正常使用

## 参考文章

[用浏览器轻松录制音频、视频—— MediaRecorder API](https://juejin.cn/post/6844903671793188878)