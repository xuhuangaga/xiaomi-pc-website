<template>
  <div class="f-j-c p-tb10 pheader">
    <div class="w1200 f-j-b">
      <div class="f-a-c m-p">
        <img
          src="../../assets/image/logo-mi2.png"
          @click="goto('/')"
          class="login"
        />
        <div class="m-l10 f-a-c">
          <div class="f-s20 m-l10">
            {{ isCars ? "我的购物车" : "确认订单" }}
          </div>
          <div class="m-l10 f-s12 f-c-9" v-if="isCars && user">
            温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算
          </div>
        </div>
      </div>
      <div class="f-a-c f-c-9"  v-if="user">
        <div>
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
        </div>
        <div class=" m-lr10">|</div>
        <div class="m-l10 c-p" @click="goto('/orders')">
          我的订单
        </div>
      </div>
      <div v-else class="f-a-c f-c-9 c-p">
          <div @click="goto('/login')">登录</div>
          <div class="m-lr10">|</div>
          <div @click="goto('/login')">注册</div>
      </div>
    </div>
  </div>
</template>

<script>
import { dparr } from "../../types";
export default {
  name: "",
  props: {
    //是否是购物车
    isCars: {
      type: Boolean
    }
  },
  data() {
    return {
      dparr: dparr
    };
  },
  components: {},
  methods: {
    goto(url, id) {
      if (id) {
        //跳转到详情
      } else this.$router.push(url);
    },
    //退出登录
    change(e) {
      if (e === 5) {
        localStorage.removeItem("xm-pc-user");
        localStorage.removeItem("token");
        this.$store.commit("setUser", null);
        this.$router.push("/");
      }
    }
  },
  mounted() {},
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
.pheader {
  border-bottom: 2px solid #ff6700;
}
</style>