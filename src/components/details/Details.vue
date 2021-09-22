<template>
  <div class="f detail-comm m-t20">
    <div class="f-1">
      <!-- 显示轮播 -->
      <Carousel
        v-model="val"
        loop
        :autoplay="true"
        :autoplay-speed="5000"
        v-if="detail.pic.length > 1"
        class="img"
      >
        <CarouselItem
          v-for="(item, index) in detail.pic"
          :key="index"
          class="img"
        >
          <img :src="item" class="img" />
        </CarouselItem>
      </Carousel>
      <img v-else :src="detail.pic[0]" class="img" />
    </div>
    <div class="f-1">
      <!-- 显示商品信息 -->
      <div class=" f-s25">{{ detail.name }}</div>
      <div class="m-t-b10">
        <span class="price">{{ detail.introduction }}</span>
        <span class="f-c-9">{{ detail.sellDesc }}</span>
      </div>
      <div class="f-a-c b-b p-b20">
        <div class="price f-s16">{{ detail.presentPrice }}元</div>
        <div class="f-c-9 line m-l10">{{ detail.originalPrice }}元</div>
      </div>
      <!-- 地图 -->
      <div class="b-b location f-a-c p-l10">
        <i class="iconfont icon-dingwei"></i>
        <div class="m-l10">{{address}}</div>
      </div>
      <!-- 规格信息 -->
      <div v-for="(item, index) in detail.spec" :key="index">
        <div class="m-t-b10">选择{{ item.name }}</div>
        <div class="f-a-c f-w">
          <div
            v-for="(item1, index1) in item.checkedList"
            :key="index1"
            class=" p-tb10 item t-a-c m-r10 m-b10 c-p"
            :class="{ activeItem: checkSpec(item.name, item1.name) }"
            @click="changeSpec(item.name, item1.name)"
          >
            {{ item1.name }}
          </div>
        </div>
      </div>
      <div class="m-t10 addCar f-c-w t-a-c c-p" @click="checkLogin">
        加入购物车
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    detail: {
      type: Object
    }
  },
  data() {
    return {
      val: 0,
      //默认规格
      defaultSpec: [],
      //当前位置
      address: null
    };
  },
  components: {},
  methods: {
    //获取当前位置
    getLocaltion() {
      let that=this
      AMap.plugin("AMap.Geolocation", function() {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
          // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
          buttonOffset: new AMap.Pixel(10, 20),
          //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          zoomToAccuracy: true,
          //  定位按钮的排放位置,  RB表示右下
          buttonPosition: "RB"
        });

        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete);
        AMap.event.addListener(geolocation, "error", onError);

        function onComplete(data) {
          // data是具体的定位信息
          let obj=data.addressComponent
          that.address=obj.province+' '+obj.city+' '+obj.district+' '+obj.township
        }

        function onError(data) {
          // 定位出错
        }
      });
    },
    //查看是否包含指定规格
    checkSpec(name, spec) {
      return this.defaultSpec.filter(item => {
        return item.name === name && item.spec.name === spec;
      }).length;
    }, //点击加入购物车
    addCar() {
      this.$api
        .addCart({
          user_id: JSON.parse(this.$store.state.user)._id,
          count: 1,
          goods: this.detail,
          spec: this.defaultSpec
        })
        .then(res => {
          if (res.code === 200) {
            // 重新获取购物车数量
            this.$api.getCart(this.user._id).then(res => {
              if (res.code === 200) {
                localStorage.setItem("xm-pc-carNum", res.data.length);
                this.$store.commit("setCarNum", res.data.length);
              }
            });
            this.$emit("chengeIsAdd");
          }
        });
    },
    checkLogin() {
      this.$utils.checkLogin({
        key: "xm-pc-user",
        next: this.addCar
      });
    },
    //切换规格
    changeSpec(name, spec) {
      this.defaultSpec.map(item => {
        if (item.name === name) item.spec.name = spec;
      });
    }
  },
  mounted() {
    this.getLocaltion()
    //获取默认规格
    this.detail.spec.map(i => {
      this.defaultSpec.push({
        name: i.name,
        spec: i.spec.filter(ii => {
          return ii.checked;
        })[0]
      });
      i.checkedList = i.checkedList.filter(item => {
        return item.checked;
      });
    });
  },
  computed: {
    user() {
      let users = this.$store.state.user;
      return users ? JSON.parse(users) : users;
    }
  },
  watch: {}
};
</script>

<style lang='scss' scoped>
$color: #ff6700;
.location {
  border:1px solid #eee;
  background: #fafafa;
  height:60px;
}
.detail-comm {
  .img {
    width: 500px;
    height: 500px;
  }
  .activeItem {
    border: 1px solid $color !important;
    color: $color;
  }
  .item {
    border: 1px solid #eee;
    width: 45%;
  }
  .addCar {
    background: $color;
    width: 260px;
    padding: 15px 0px;
  }
}
</style>