<template>
  <div class="detail bc-e">
    <div class="bc-w f-j-c header" v-if="!isAdd">
      <div class="w1200 f-j-b  p-tb20">
        <div class="f-s16">{{ name }}</div>
        <div class="c-p">用户评价</div>
      </div>
    </div>
    <div class="bc-e f-j-c p-tb10" v-if="!user" ref="login">
      <div>为方便您购买，请提前登录</div>
      <div class="f-a-c m-l10 p-l10">
        <router-link to="login"
          ><div class="price c-p">立即登录</div></router-link
        >
        <i class="iconfont icon-guanbi f-c-9 m-l10 c-p" @click="close"></i>
      </div>
    </div>
    <div class="f-j-c bc-w" v-if="!isAdd">
      <div class="w1200" v-if="detail">
        <Detail :detail="detail" @chengeIsAdd="chengeIsAdd"></Detail>
      </div>
    </div>
    <div v-else class="bc-w f-j-c p-tb20">
      <div class="w1200 f-j-b">
        <div class="f-a-c">
          <i class="iconfont icon-tubiaolunkuo- f-s20"></i>
          <div class="m-l10">
            <div class="f-s20">已成功加入购物车</div>
            <div class="f-c-9 f-s12">{{ name }}</div>
          </div>
        </div>
        <div class="f-a-c">
          <div class="back t-a-c p-tb10 c-p" @click="isAdd = false">
            返回上一级
          </div>
          <div class="m-l10 pay f-c-w t-a-c p-tb10 c-p" @click="carts">
            去购物车结算
          </div>
        </div>
      </div>
    </div>
    <div class="p-t20 bc-w" v-if="!isAdd">
      <Content :detail="detail" v-if="detail"></Content>
    </div>
    <div class="m-t20 p-t20">
      <!-- 猜你喜欢 -->
      <Like title="买购物车中商品的人还买了"></Like>
    </div>
  </div>
</template>

<script>
import Like from "../../components/like/Like";
import Detail from "../../components/details/Details";
import Content from "../../components/content/Content";
export default {
  name: "",
  props: {},
  data() {
    return {
      name: "",
      id: "",
      detail: null,
      //加入购物车是否成功
      isAdd: false
    };
  },
  components: {
    Like,
    Detail,
    Content
  },
  methods: {
    //去购物车结算
    carts() {
      this.$router.push("/carts");
    },
    //修改是否加入购物车成功
    chengeIsAdd() {
      this.isAdd = true;
    },
    //点击管理立即登录提示
    close() {
      this.$refs.login.style.display = "none";
    },
    //获取商品详情
    getData() {
      this.$api.goodsDetail(this.id).then(res => {
        if (res.code === 200) {
          this.detail = res.data;
        }
      });
    }
  },
  mounted() {
    this.id = this.$route.query.id;
    this.name = this.$route.query.name;
    this.getData();
  },
  computed: {
    user() {
      let users = this.$store.state.user;
      return users ? JSON.parse(users) : users;
    }
  },
  watch: {
    $route: {
      handler() {
        this.id = this.$route.query.id;
        this.name = this.$route.query.name;
        this.getData();
      },
      immediate: true
    }
  }
};
</script>

<style lang='scss' scoped>
.detail {
  .header {
    border-top: 1px solid #eee;
    box-shadow: 0 10px 5px #eee;
    margin-bottom: 3px;
  }
  .back {
    border: 1px solid #eee;
    width: 120px;
  }
  .pay {
    background: #ff6700;
    width: 120px;
  }
  .icon-tubiaolunkuo- {
    color: green;
  }
}
</style>