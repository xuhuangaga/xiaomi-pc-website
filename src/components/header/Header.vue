<template>
  <div>
    <!-- 顶部 -->
    <div class="header f-j-c">
      <div class="f-s12 f-j-b p-r w1200">
        <div class="top f-a-c">
          <div v-for="(item, index) in arrLeft" :key="index" class="c-p item">
            <span @click="goto(item.path)">{{ item.name }}</span>
            <span class="m-lr5 sx" v-if="index < arrLeft.length - 1">|</span>
          </div>
        </div>
        <div class="f-a-c top">
          <div class=" f-a-c">
            <div
              v-for="(item, index) in arrRight"
              :key="index"
              class="c-p item"
            >
              <span v-if="index < 2 && user" class="m-r10"
                ><span v-if="index === 0">
                  <Dropdown style="margin-left: 20px" @on-click="change">
                    {{ user.username }}
                    <Icon type="ios-arrow-down"></Icon>
                    <DropdownMenu slot="list">
                      <DropdownItem
                        :name="item.name"
                        v-for="(item, index) in dparr"
                        :key="index"
                        >{{ item.title }}</DropdownItem
                      >
                    </DropdownMenu>
                  </Dropdown>
                </span></span
              >
              <span v-else>
                <span @click="goto(item.path)">{{ item.name }}</span>
                <span class="m-lr5 sx" v-if="index < arrRight.length - 1"
                  >|</span
                >
              </span>
            </div>
          </div>
          <div
            class="f-a-c m-l10 car c-p"
            ref="car"
            @mouseenter="enter"
            @mouseleave="leave"
          >
            <Icon type="ios-cart" class="f-s20" />
            <span class="m-lr5">购物车</span>
            <span class="m-l5">({{ carNum }})</span>
          </div>
          <div
            :class="[
              { up: !visible && carNum },
              { down: visible && carNum },
              { up1: !visible && !carNum },
              { down1: visible && !carNum }
            ]"
            class="car-box bc-w "
            ref="carBox"
            @mouseleave="boxLeave"
            @mouseenter="boxEnter"
          >
            <div class="f-j-c bc-w" v-if="visible">
              <div v-if="!user || !carList.length" class="m-t20 p-t20">
                购物车中还没有商品，赶紧选购吧！
              </div>
              <div v-else class="p-10 car-b wbfb p-r">
                <div
                  v-for="(item, index) in carList"
                  class="f-j-b p-tb10 c-p"
                  @click="gotoToDetail(item.goods)"
                  :class="{ 'b-b': index < carList.length - 1 }"
                >
                  <div class="f-a-c">
                    <div>
                      <img :src="item.goods.cover" />
                    </div>
                    <div class="m-l10 name sl-two">
                      {{ item.goods.name }}
                    </div>
                  </div>
                  <div class="f-c-9">
                    {{ item.goods.presentPrice }} x {{ item.count }}
                  </div>
                </div>
                <div class="car-bottom f-j-b bc-e">
                  <div>
                    <div class="f-c-9 f-s12">共{{ carList.length }}件商品</div>
                    <div class="price">
                      <span class="f-s20">{{ totalMoney }}</span
                      >元
                    </div>
                  </div>
                  <div class="pay t-a-c p-tb10 f-c-w" @click="goCars">
                    去购物车结算
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <HSearch></HSearch>
  </div>
</template>

<script>
import HSearch from "../../components/hsearch/HSearch";
import { dparr } from "../../types";
export default {
  name: "",
  props: {},
  data() {
    return {
      dparr: dparr,
      arrLeft: [
        {
          name: "小米商城",
          path: "/"
        },
        {
          name: "MIUI",
          path: "https://home.miui.com/"
        },
        {
          name: "loT",
          path: "https://iot.mi.com/"
        },
        {
          name: "云服务",
          path: "https://i.mi.com/"
        },
        {
          name: "天星数科",
          path: "https://airstar.com/home"
        },
        {
          name: "有品",
          path: "https://www.xiaomiyoupin.com/"
        },
        {
          name: "小爱开放平台",
          path: "https://xiaoai.mi.com/"
        },
        {
          name: "企业团购",
          path: "https://qiye.mi.com/"
        },
        {
          name: "资质证照",
          path: "https://www.mi.com/aptitude/list?id=41"
        },
        {
          name: "协议规则",
          path: "https://www.mi.com/aptitude/list"
        },
        {
          name: "下载app",
          path: ""
        },
        {
          name: "智能生活",
          path: "https://xiaomishare.mi.com/?from=micom#/"
        },
        {
          name: "Select Location",
          path: ""
        }
      ],
      arrRight: [
        {
          name: "登录",
          path: "/login"
        },
        {
          name: "注册",
          path: "/register"
        },
        {
          name: "消息通知",
          path: "/notice"
        }
      ],
      //购物车盒子是否显示
      visible: false,
      //购物车数据
      carList: [],
      totalMoney: 0
    };
  },
  components: {
    HSearch
  },
  methods: {
    //去购物车结算
    goCars() {
      this.$router.push("/carts");
    },
    //获取购物车数据
    getCar() {
      if (this.user) {
        this.$api.getCart(this.user._id).then(res => {
          if (res.code === 200) {
            this.carList = res.data;
            this.carList.map(item => {
              this.totalMoney += Number(item.goods.presentPrice) * item.count;
            });
            localStorage.setItem("xm-pc-carNum", res.data.length);
            this.$store.commit("setCarNum", res.data.length);
          }
        });
      }
    },
    //退出登录
    change(e) {
      if (e === 5) {
        localStorage.removeItem("xm-pc-user");
        localStorage.removeItem("token");
        this.$store.commit("setUser", null);
      }
    },
    //跳转到详情
    gotoToDetail(item) {
      this.$router.push({
        path: "/details",
        query: {
          id: item._id,
          name: item.name
        }
      });
    },
    //跳转页面
    goto(url) {
      if (url.indexOf("http") > -1) {
        window.open(url);
      } else this.$router.push(url);
    },
    //移入移出效果
    enter() {
      this.visible = !this.visible;
      this.$refs.car.style.backgroundColor = "#fff";
      this.$refs.car.style.color = "#ff6700";
      this.getCar()
    },
    leave(e) {
      this.$refs.car.style.backgroundColor = "#424242";
      this.$refs.car.style.color = "#b0b0b0";
      // getBoundingClientRect  获取dom元素上下左右的宽高
      let top = this.$refs.carBox.getBoundingClientRect().top;
      // Math.abs 获取绝对值
      if (Math.abs(top - e.pageY) > 5) this.visible = false;
    },
    boxEnter() {
      this.$refs.car.style.backgroundColor = "#fff";
      this.$refs.car.style.color = "#ff6700";
    },
    boxLeave() {
      this.$refs.car.style.backgroundColor = "#424242";
      this.$refs.car.style.color = "#b0b0b0";
      this.visible = false;
    }
  },
  mounted() {
    this.getCar();
  },
  computed: {
    user() {
      let users = this.$store.state.user;
      return users ? JSON.parse(users) : users;
    },
    //购物车数量
    carNum() {
      let num = 0;
      if (this.user) {
        num = this.$store.state.carNum;
      }
      return num;
    }
  },
  watch: {}
};
</script>

<style lang='scss' scoped>
.header {
  height: 40px;
  color: #b0b0b0;
  background: #333;
  .car-box {
    position: absolute;
    right: 0px;
    top: 40px;
    overflow: auto;
    width: 300px;
    z-index: 1200;
    box-shadow: -1px 2px 5px #eee;
    .car-b {
      img {
        width: 60px;
        height: 60px;
      }
      .name {
        width: 100px;
      }
      padding-bottom: 0px !important;
    }
    .car-bottom {
      position: sticky;
      width: 283px;
      margin-left: -10px;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 10px;
      .pay {
        background: #ff6700;
        width: 150px;
      }
    }
  }
  .top {
    .sx {
      color: #424242;
    }
    .item {
      &:hover {
        color: #fff;
      }
    }
  }
  .car {
    color: #b0b0b0;
    background: #424242;
    height: 40px;
    line-height: 40px;
    padding: 0px 20px;
  }
}
.up {
  animation: up 0.4s forwards;
  display: block !important;
}
.down {
  animation: down 0.4s forwards;
  display: block !important;
}
.up1 {
  animation: up1 0.4s forwards;
  display: block !important;
}
.down1 {
  animation: down1 0.4s forwards;
  display: block !important;
}
@keyframes up {
  0% {
    height: auto;
  }
  100% {
    height: 0px;
  }
}
@keyframes down {
  0% {
    height: 0px;
  }
  100% {
    height: auto;
  }
}
@keyframes up1 {
  0% {
    height: 100px;
  }
  100% {
    height: 0px;
  }
}
@keyframes down1 {
  0% {
    height: 0px;
  }
  100% {
    height: 100px;
  }
}
</style>