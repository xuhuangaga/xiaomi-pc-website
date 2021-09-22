<template>
  <div>
    <div class="f-top bc-w p-20">
      <div class="f-j-c">
        <div class="b-b wbfb w1200" style="padding:40px 0px;">
          <div class="w1200 f-j-a">
            <div
              v-for="(item, index) in footer.service"
              :key="index"
              class="item f-j-c f-s16"
              :class="{ br: index < footer.service.length - 1 }"
            >
              <Icon :type="item.icon" class="f-s25" />
              <div class="m-l10 c-p active" @click="goto(item.path)">
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="f-j-c">
        <div class="m-t20 f-j-b p-t20 w1200">
          <div class="f-j-b helper-l br">
            <div v-for="(item, index) in footer.helper" :key="index" class="item">
              <div class="m-b10">{{ item.name }}</div>
              <div
                v-for="(item1, index1) in item.children"
                :key="index1"
                class="f-s12 lh25 c-p active"
                @click="goto(item1.path)"
              >
                {{ item1.name }}
              </div>
            </div>
          </div>
          <div class="p-20 helper-r">
            <div class="tel f-s20">400-100-5678</div>
            <div>8:00-18:00（仅收市话费）</div>
            <div class="customer t-a-c m-t-b5 c-p">
              <Icon type="ios-mail-outline" class="f-s16" />
              <span class="m-l5">人工客服</span>
            </div>
            <div class="f-a-c p-r">
              <span>关注小米:</span>
              <i class="iconfont icon-xinlang m-lr5 active c-p f-s20"></i>
              <i class="iconfont icon-weixin wx active c-p f-s20"></i>
              <img src="../../assets/image/wx-img.png" class="wx-img" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="f-j-c f-bottom">
      <div class="p-tb20 w1200">
        <div class="f">
          <img src="../../assets/image/logo-mi2.png" class="login" />
          <div class="m-l10 f-s12">
            <div class="f-a-c f-w c-p">
              <div v-for="(item, index) in footer.bottom" :key="index">
                <span class="active" @click="goto(item.path)">{{
                  item.name
                }}</span>
                <span v-if="index < footer.bottom.length - 1" class="m-lr5"
                  >|</span
                >
              </div>
            </div>
            <div class="f-s12 f-w f-a-c f-c-9" style="width:700px">
              <div
                v-for="(item, index) in footer.permit"
                :key="index"
                class="m-r5"
                :class="[{ 'c-p': item.path }, { active: item.path }]"
                @click="goto(item.path)"
              >
                {{ item.name }}
              </div>
            </div>
            <div class="m-t5">
              <img
                :src="item.src"
                class="b-img m-r5 c-p"
                v-for="(item, index) in footer.icon.slice(0, 4)"
                :key="index"
                @click="goto(item.path)"
              />
              <img
                :src="switchItem.src"
                class="b-img m-r5 c-p"
                @click="goto(switchItem.path)"
              />
            </div>
          </div>
        </div>
        <div class="t-a-c m-t20 p-tb10">
          <img src="../../assets/image/slogan2020.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { footer } from "../../types";
export default {
  name: "",
  props: {},
  data() {
    return {
      footer: footer,
      switchItem: footer.icon[4],
      timer: null,
      num: 4
    };
  },
  components: {},
  methods: {
    //跳转页面
    goto(url) {
      url && window.open(url);
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      if (this.num === 5) this.num = 4;
      else this.num++;
      this.switchItem = footer.icon[this.num];
    }, 2000);
  },
  computed: {},
  watch: {},
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>

<style lang='scss' scoped>
$color: #ff6700;
.active:hover {
  color: $color;
}
.f-top {
  .br {
    border-right: 1px solid #eee;
  }
  .item {
    width: 20%;
  }
  .helper-l {
    width: 80%;
    align-items: baseline !important;
    .item {
      width: 165px;
    }
  }
  .helper-r {
    .tel {
      color: $color;
    }
    .wx:hover ~ .wx-img {
      display: block;
    }
    .wx-img {
      width: 100px;
      height: 100px;
      position: absolute;
      top: 25px;
      left: 50px;
      display: none;
    }
    .customer {
      color: $color;
      border: 1px solid $color;
      width: 118px;
      height: 28px;
      font-size: 12px;
      line-height: 28px;
      &:hover {
        background-color: $color;
        color: #fff;
      }
    }
  }
}
.f-bottom {
  background-color: #fafafa;
  .b-img {
    width: 85px;
    height: 28px;
  }
}
</style>