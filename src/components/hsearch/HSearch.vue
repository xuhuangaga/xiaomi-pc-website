<template>
  <div class="f-j-c">
    <div class="p-r"></div>
    <!-- 搜索处 -->
    <div class="f-j-b search header-search-ipt w1200">
      <router-link to="/"
        ><img src="../../assets/image/logo-mi2.png" class="login"
      /></router-link>
      <div
        class="f-j-a nav"
        @mouseenter="recommShow = true"
        ref="recomm"
        @mouseleave="leave"
      >
        <div
          v-for="(item, index) in recommNav"
          :key="index"
          class="f-s16 c-p item"
          @mouseenter="recommEnter(index)"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="p-r">
        <Input
          v-model="query"
          size="large"
          :placeholder="placeholder"
          enter-button
          search
          :border="false"
          @on-focus="show = !show"
          @on-search="search"
          @on-blur="blur"
        />
        <div class="hot bc-w" v-if="show">
          <div
            v-for="(item, index) in hot"
            :key="index"
            class="p-5 c-p item"
            @click="search(item.name)"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
      <!-- 推荐导航商品数据 -->
      <div
        class="recomm bc-w p-20 f-j-c z"
        v-if="recommShow && recommProduct.length"
        ref="recommBox"
        @mouseleave="recommShow = false"
      >
        <div class="w1200 f-j-a">
          <div
            @click="goto(item)"
            class="f-1 wbfb c-p"
            v-for="(item, index) in recommProduct.slice(0, 6)"
            :key="index"
            :class="{ br: index < 5 }"
          >
            <div class="t-a-c">
              <img :src="item.cover" class="pro-img" />
            </div>
            <div class="t-a-c">{{ item.name }}</div>
            <div class="price t-a-c f-s12">{{ item.presentPrice }}元</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      //推荐导航
      recommNav: [],
      // 搜索热词盒子是否显示
      show: false,
      placeholder: "",
      timer: null,
      //搜索内容
      query: "",
      //搜索热词
      hot: [],
      recommProduct: [],
      //推荐导航数据盒子是否显示
      recommShow: false
    };
  },
  components: {},
  methods: {
    blur() {
      setTimeout(() => {
        this.show = !this.show;
      }, 1000);
    },
    //点击搜索
    search(val) {
      val = val ? val : this.placeholder;
      if (this.$route.query.keyword !== val) {
        this.$router.push({
          path: "/search",
          query: {
            keyword: val === "全部商品" ? "全部商品" : val
          }
        });
      }
    },
    //获取推荐导航
    getRecommNav() {
      this.$api.getRecommendNav().then(res => {
        if (res.code === 200) {
          this.recommNav = res.data;
        }
      });
    },
    //获取输入框占位文本
    getPlaceholder() {
      let count = 1;
      this.timer = setInterval(() => {
        this.placeholder = this.hot[count++].name;
        if (count === this.hot.length - 1) count = 1;
      }, 6000);
    },
    recommEnter(index) {
      this.$api.getNavGoods({ id: this.recommNav[index]._id }).then(res => {
        if (res.code === 200) {
          this.recommProduct = res.data;
        }
      });
    },
    //获取搜索热词
    getHot() {
      this.$api.getSearchWords().then(res => {
        if (res.code === 200) {
          this.hot = res.data;
          this.hot.unshift({ name: "全部商品" });
          this.getPlaceholder();
        }
      });
    },
    // 推荐导航移出
    leave(e) {
      // getBoundingClientRect  获取dom元素上下左右的宽高
      let top = this.$refs.recomm.getBoundingClientRect().top;
      // Math.abs 获取绝对值
      if (Math.abs(top - e.pageY) > 50 || top - e.pageY >= 1)
        this.recommShow = false;
    },
    //跳转到详情
    goto(item) {
      if (this.$route.query.id !== item._id) {
        this.$router.push({
          path: "/details",
          query: {
            id: item._id,
            name: item.name
          }
        });
      }
    }
  },
  mounted() {
    this.getRecommNav();
    this.getHot();
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
.search {
  padding: 30px 0px;
  .nav {
    width: 500px;
    .item:hover {
      color: $color;
    }
  }
  .hot {
    position: absolute;
    border: 1px solid red;
    border-top: none !important;
    width: 211px;
    // min-height: 200px;
    z-index: 1001;
    .item:hover {
      background-color: #eee;
    }
  }
  .recomm {
    border-top: 1px solid #ccc;
    position: absolute;
    top: 130px;
    left: 0px;
    right: 0px;
    z-index: 1000;
    .pro-img {
      width: 100px;
      height: 100px;
    }
    .br {
      border-right: 1px solid #eee;
    }
  }
}
</style>