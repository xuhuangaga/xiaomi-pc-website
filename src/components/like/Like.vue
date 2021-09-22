<template>
  <div class="like">
    <div class="f-j-a">
      <div class="hx"></div>
      <div class="f-s30 f-c-6">{{ title }}</div>
      <div class="hx"></div>
    </div>
    <div class="m-t20">
      <Carousel
        v-model="val"
        loop
        arrow="never"
        class="like-Carousel"
        :autoplay-speed="5000"
        :autoplay="play"
        :radius-dot="true"
      >
        <CarouselItem v-for="(item, index) in list" :key="index">
          <div class="f-j-b f-w">
            <div
              v-for="(item1, index1) in item"
              :key="index1"
              class="bc-w item c-p p-r"
              @click="goto(item1)"
              @mouseenter="play = false"
              @mouseleave="play = true"
            >
              <div class="tips f-c-w t-a-c p-5" :ref="`tips-${item1._id}`">
                成功加入购物车
              </div>
              <div class="f-j-c">
                <img :src="item1.cover" class="img p-10" />
              </div>
              <div class="f-j-c">
                <div class="name sl-one t-a-c">{{ item1.name }}</div>
              </div>
              <div class="t-a-c price m-t-b10">
                ￥{{ item1.presentPrice }}元
              </div>
              <div class="f-j-c">
                <div class="addCar t-a-c z" @click.stop="checkLogin(item1)">
                  加入购物车
                </div>
              </div>
            </div>
          </div>
        </CarouselItem>
      </Carousel>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    title: {
      type: String,
      default: "猜你喜欢"
    }
  },
  data() {
    return {
      list: [],
      val: 0,
      play: true,
      id: ""
    };
  },
  components: {},
  methods: {
    //获取数据
    getData() {
      this.$api.getRecommend().then(res => {
        if (res.code === 200) {
          this.list = [res.data.slice(0, 5), res.data.slice(5, 10)];
        }
      });
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
    },
    //加入购物车
    addCar(item) {
      console.log(item);
      let spec = [];
      item.spec.map(i => {
        spec.push({
          name: i.name,
          spec: i.spec[0]
        });
      });
      this.$api
        .addCart({
          user_id: JSON.parse(this.$store.state.user)._id,
          count: 1,
          goods: item,
          spec: spec
        })
        .then(res => {
          if (res.code === 200) {
            this.$refs[`tips-${item._id}`][0].style.display = "block";
            setTimeout(() => {
              this.$refs[`tips-${item._id}`][0].style.display = "none";
            }, 1000);
          }
        });
    },
    //检查是否登录
    checkLogin(item) {
      this.$utils.checkLogin({
        key: "xm-pc-user",
        next: this.addCar,
        item: item
      });
    }
  },
  mounted() {
    this.getData();
  },
  computed: {},
  watch: {}
};
</script>

<style lang='scss' scoped>
$color: #ff6700;
.like {
  padding-bottom: 50px;
  .hx {
    height: 1px;
    background: #ccc;
    width: 300px;
  }
  .item {
    padding: 30px 0;
    width: 19%;
    .tips {
      background: green;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      display: none;
    }
    .img {
      width: 140px;
      height: 140px;
    }
    .name {
      width: 200px;
    }
    .addCar {
      color: $color;
      border: 1px solid $color;
      padding: 5px 10px;
      position: absolute;
      display: none;
      bottom: 5px;
      &:hover {
        color: #fff;
        background: $color;
      }
    }
    &:hover {
      .addCar {
        display: block;
        animation: up 0.2s forwards;
      }
    }
  }
}
.down {
  animation: down 0.2s forwards;
  background: red;
  display: block;
}
@keyframes up {
  0% {
    bottom: 0;
  }
  100% {
    bottom: 5px;
  }
}
</style>