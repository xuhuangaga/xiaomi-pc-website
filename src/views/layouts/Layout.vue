<template>
  <div>
    <Header></Header>
    <router-view />
    <Footer></Footer>
    <!-- 右下角悬浮内容 -->
    <div class="suspension p-f c-p">
      <div class="b-b f-j-c"><i class="iconfont icon-shouji"></i></div>
      <div class="b-b f-j-c"><i class="iconfont icon-yonghu"></i></div>
      <div class="b-b f-j-c"><i class="iconfont icon-tool"></i></div>
      <div class="b-b f-j-c"><i class="iconfont icon-kefu"></i></div>
      <div class="f-j-c" @click="goto">
        <i class="iconfont icon-gouwuche"></i>
      </div>
    </div>
    <div class="suspension1 p-f c-p m-t10" @click="gotop" v-if="show">
      <div class="f-j-c"><i class="iconfont icon-shangjiantou-xi"></i></div>
    </div>
  </div>
</template>

<script>
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
export default {
  name: "",
  props: {},
  data() {
    return {
      show: false
    };
  },
  components: {
    Header,
    Footer
  },
  methods: {
    goto() {
      this.$router.push("/carts");
    },
    gotop() {
      window.scrollTo(0, 0);
    },
    handleScroll(e) {
      this.show = e.layerY > 500;
    }
  },
  mounted() {
    //监听鼠标滚动事件
    window.addEventListener("mousewheel", this.handleScroll);
    window.scrollTo(0, 0);
  },
  computed: {},
  watch: {}
};
</script>

<style lang='scss' scoped>
.suspension1 {
  right: 0;
  bottom: 30px;
  padding: 5px;
  border: 1px solid #eee;
  background: #fafafa;
  z-index: 1500;
  div {
    width: 30px;
    height: 30px;
  }
}
.suspension {
  right: 0;
  bottom: 100px;
  padding: 5px;
  border: 1px solid #eee;
  background: #fafafa;
  z-index: 1500;
  div {
    width: 30px;
    height: 40px;
  }
}
</style>