<template>
  <div class="nav-box ">
    <div class="f-c-w nav z" ref="nav">
      <div
        v-for="(item, index) in category"
        :key="index"
        class="f-j-b item c-p"
        @mouseenter="enter(item)"
        @mouseleave="leave"
        :class="{ activeBgc: active === item._id }"
      >
        <div>{{ item.name }}</div>
        <div><i class="iconfont icon-youjiantou"></i></div>
      </div>
    </div>
    <div
      class="nav-product bc-w  p-10 z"
      v-if="show && activeItem.length"
      @mouseenter="enterBox"
      @mouseleave="leaveBox"
      ref="product"
    >
      <div class="f-w nav-pro-b f">
        <div
          v-for="(item, index) in activeItem"
          class="f-a-c m-r10 m-b10 c-p nav-p-item"
          :key="index"
        >
          <img :src="item.cover" class="nav-p-img" />
          <div class="m-l10 active sl-one">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    category: {
      type: Array
    }
  },
  data() {
    return {
      //产品盒子是否显示
      show: false,
      activeItem: [],
      active: 0,
      activeId: ""
    };
  },
  components: {},
  methods: {
    enter(item) {
      this.active = item._id;
      this.activeId = item._id;
      this.show = true;
      this.activeItem = [];
      item.list.map(item1 => {
        item1.list &&
          item1.list.map(item2 => {
            item2[item1.name].map(item3 => {
              this.activeItem.push(item3);
            });
          });
      });
    },
    leave(e) {
      let top = this.$refs.nav.getBoundingClientRect().top;
      if (
        Math.abs(top - e.pageY) > 20 ||
        top - e.pageY >= 1 ||
        top - e.pageY < 0
      ) {
        this.show = false;
        this.active = "";
      }
    },
    enterBox() {
      this.active = this.activeId;
      this.show = true;
    },
    leaveBox(e) {
      this.active = "";
      let top = this.$refs.product.getBoundingClientRect().top;
      if (Math.abs(top - e.pageY) > 5 || top - e.pageY >= 1) this.show = false;
    }
  },
  mounted() {},
  computed: {},
  watch: {}
};
</script>

<style lang='scss' scoped>
.nav-box {
  .activeBgc {
    background: #ff6700;
  }
  .nav {
    position: absolute;
    background-color: rgba(180, 172, 172, 0.5);
    height: 500px;
    width: 225px;
    top: 0px;
  }
  .item {
    padding: 5px 10px;
    width: 225px;
  }
  .nav-product {
    position: absolute;
    left: 225px;
    top: 0px;
    height: 500px;
    width: 950px;
    box-shadow: 0px 3px 5px #eee;
    border: 1px solid #eee;
    .nav-p-img {
      width: 40px;
      height: 40px;
    }
    .nav-p-item {
      height: 50px;
      width: 200px;
    }
  }
}
</style>