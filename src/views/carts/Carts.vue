<template>
  <div class="carts">
    <Header :isCars="true"></Header>
    <div class="bc-e f-j-c">
      <div class="w1200 bc-w">
        <div class="f-j-c bc-e">
          <div class="w1200">
            <div v-if="carList.length && user">
              <!-- 显示购物车数据 -->
              <div class="bc-w m-t-b20 cars-d">
                <div class="f-j-b b-b p-b10 p-20">
                  <div class="f-1">
                    <Checkbox v-model="allChecked" @on-change="changeAll">
                      <span class="m-l10">全选</span></Checkbox
                    >
                  </div>
                  <div class="f-1">商品名称</div>
                  <div class="f-1 t-a-r">单价</div>
                  <div class="f-1 t-a-r">数量</div>
                  <div class="f-1 t-a-r">小计</div>
                  <div class="f-1 t-a-r">操作</div>
                </div>
                <div class="bc-w p-20">
                  <div
                    v-for="(item, index) in carList"
                    :key="index"
                    class="item f-j-b m-b10"
                  >
                    <div class="first">
                      <Checkbox
                        v-model="item.checked"
                        @on-change="change"
                      ></Checkbox>
                    </div>
                    <div class="c-p f-a-c second" @click="goto('',item.goods)">
                      <img :src="item.goods.cover" class="img" />
                      <div class="name sl-one">{{ item.goods.name }}</div>
                    </div>
                    <div class="first">{{ item.goods.presentPrice }}元</div>
                    <div class="first stepper f-j-b p-5 ">
                      <div>
                        <i
                          class="iconfont icon-jian c-p"
                          @click="changeCount(item, Number(item.count) - 1)"
                        ></i>
                      </div>
                      <div>
                        <Input
                          v-model="item.count"
                          :border="false"
                          class="t-a-c ipt"
                          type="number"
                          min="1"
                        />
                      </div>
                      <div>
                        <i
                          class="iconfont icon-jia c-p"
                          @click="changeCount(item, Number(item.count) + 1)"
                        ></i>
                      </div>
                    </div>
                    <div class="first price">
                      {{ Number(item.goods.presentPrice) * item.count }}元
                    </div>
                    <div class="f-j-e">
                      <i
                        class="iconfont icon-guanbi c-p"
                        @click="del(item)"
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
              <div class="m-t-b20 p-20 carts-affix bc-w">
                <Affix :offset-bottom="20">
                  <div class="f-j-b">
                    <div class="f-a-c f-c-9">
                      <div @click="goto('/', '')">继续购物</div>
                      <div class="m-lr10">|</div>
                      <div>
                        共<span class="price"> {{ carList.length }} </span
                        >件商品, 已选择<span class="price">
                          {{ checkdNum }} </span
                        >件
                      </div>
                    </div>
                    <div class="f-a-c">
                      <div class="price f-s20">合计：{{ totalMoney }}元</div>
                      <div @click="goto('/pay')" class="pay f-c-w m-l10 c-p">
                        去结算
                      </div>
                    </div>
                  </div>
                </Affix>
              </div>
            </div>
            <div v-else class="no-carts p-t20 f">
              <div class="f-1"></div>
              <div class="f-1">
                <div class="f-c-9 f-s30 f-w-b">您的购物车还是空的！</div>
                <div v-if="!user">登录后将显示您之前加入的商品</div>
                <div class="f-a-c f-c-w m-t20 c-p">
                  <div class="log t-a-c" @click="go('/login')" v-if="!user">
                    立即登录
                  </div>
                  <div class="go t-a-c m-l10" @click="go('/')">马上去购物</div>
                </div>
              </div>
            </div>
            <Like title="买购物车中商品的人还买了"></Like>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "../../components/pheader/PHeader";
import Footer from "../../components/footer/Footer";
import Like from "../../components/like/Like";
export default {
  name: "",
  props: {},
  data() {
    return {
      carList: [],
      allChecked: false
    };
  },
  components: {
    Header,
    Footer,
    Like
  },
  methods: {
    go(url) {
      this.$router.push(url);
    },
    //点击单选
    change() {
      this.allChecked = this.carList.every(item => {
        return item.checked;
      });
    },
    //点击全选
    changeAll() {
      this.carList.map(item => {
        item.checked = this.allChecked;
      });
    },
    //删除购物车数据
    del(item) {
      this.$api.delCart({ id: item._id, user_id: this.user._id }).then(res => {
        if (res.code === 200) {
          this.getCar();
        }
      });
    },
    //修改购买数量
    changeCount(item, count) {
      if (count > 0) {
        this.$api
          .updateCart({ id: item._id, user_id: this.user._id, count: count })
          .then(res => {
            if (res.code === 200) {
              item.count = count;
            }
          });
      }
    },
    //跳转到详情
    goto(url, item) {
      if (item) {
        this.$router.push({
          path: "/details",
          query: {
            id: item._id,
            name: item.name
          }
        });
      } else {
        if (url === "/pay") {
          let arr = this.carList.filter(i => {
            return i.checked;
          });
          if (arr.length) {
            localStorage.setItem("checkList", JSON.stringify(arr));
            this.$router.push(url);
          } else this.$Message.error("请选择需要结算的项");
        } else this.$router.push(url);
      }
    },
    //获取购物车数据
    getCar() {
      this.user &&
        this.$api.getCart(this.user._id).then(res => {
          if (res.code === 200) {
            this.carList = res.data;
            this.carList.map(item => {
              this.$set(item, "checked", false);
            });
          }
        });
    }
  },
  mounted() {
    this.getCar();
    window.scrollTo(0, 0);
  },
  computed: {
    checkdNum() {
      return this.carList.filter(item => {
        return item.checked;
      }).length;
    },
    totalMoney() {
      let total = 0;
      this.carList.map(item => {
        if (item.checked) {
          total += Number(item.goods.presentPrice) * item.count;
        }
      });
      return total;
    },
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
.log,
.go {
  width: 120px;
  height: 40px;
  line-height: 40px;
  border: 1px solid $color;
}
.go {
  color: $color;
}
.log {
  background: $color;
  border: 1px solid $color;
}
.carts {
  .no-carts {
    height: 400px;
    margin-top: 150px;
    background: url(https://cdn.cnbj1.fds.api.mi-img.com/staticsfile/cart/cart-empty.png)
      no-repeat 124px 0;
  }
  .pay {
    background: #ff6700;
    padding: 10px 60px;
  }
  .item {
    .stepper {
      border: 1px solid #eee;
      .ipt {
        width: 50px;
        margin-left: 30px;
      }
    }
    .first {
      width: 150px;
    }
    .second {
      width: 315px;
      .name {
        width: 220px;
      }
    }
    .affix {
      background: #fafafa;
      box-shadow: 1px 2px 5px #eee;
    }
    .img {
      width: 60px;
      height: 60px;
    }
  }
}
</style>