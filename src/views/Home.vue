<template>
  <div>
    <div class="f-j-c">
      <div>
        <div class="w1200 f-j-b p-r">
          <div><Nav v-if="category.length" :category="category"></Nav></div>
          <div><Banner></Banner></div>
        </div>
        <Plate></Plate>
      </div>
    </div>
    <Main v-if="category.length" :category="category"></Main>
  </div>
</template>

<script>
import Nav from "../components/home/nav/Nav";
import Banner from "../components/home/banner/Banner";
import Plate from "../components/home/plate/Plate";
import Main from "../components/home/main/main";
export default {
  name: "",
  props: {},
  data() {
    return {
      category: []
    };
  },
  components: {
    Nav,
    Banner,
    Plate,
    Main
  },
  methods: {
    //获取所有分类
    getNav() {
      this.$api.getCategory().then(res => {
        if (res.code === 200) {
          this.category = res.data;
        }
      });
    }
  },
  mounted() {
    this.getNav();
  },
  computed: {},
  watch: {}
};
</script>

<style lang='scss' scoped>
</style>