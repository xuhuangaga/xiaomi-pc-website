<template>
  <div class="bc-e search">
    <div class=" f-j-c">
      <div class="w1200">
        <div class="p-tb10">
          <Breadcrumb>
            <BreadcrumbItem to="/" class="active">首页</BreadcrumbItem>
            <BreadcrumbItem to="search" class="active" v-if="!keyword"
              >全部商品</BreadcrumbItem
            >
            <BreadcrumbItem v-if="keyword" @click="search">{{
              keyword
            }}</BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>
    </div>
    <div class="f-j-c bc-w">
      <div class="p-tb20 f-a-c w1200">
        <div class="f-c-9 m-r20">排序:</div>
        <div class="f-a-c m-l10">
          <div v-for="(item, index) in arr" :key="index" class="f-a-c">
            <div class="active c-p f-a-c" @click="change(item.id, index)">
              <span
                :class="{
                  activeItem:
                    sort === item.id ||
                    ((sort === 2 || sort === 3) && item.name === '价格')
                }"
                >{{ item.name }}</span
              >
              <span v-if="item.name === '价格' && item.id === 2">
                <i
                  class="iconfont icon-shangjiantou-xi active"
                  :class="{ activeItem: sort === 3 }"
                ></i>
              </span>
              <span v-else-if="item.name === '价格' && item.id === 3">
                <i
                  class="iconfont icon-xiajiantou-xi active"
                  :class="{ activeItem: sort === 2 }"
                ></i
              ></span>
            </div>
            <span class="m-lr10 f-c-9" v-if="index < arr.length - 1">|</span>
          </div>
        </div>
      </div>
    </div>
    <div class="f-j-c bc-e">
      <div class="w1200">
        <div class="p-tb20 f-a-c f-w" v-if="total">
          <div
            class="bc-w item m-r20 m-b10 active c-p"
            v-for="(item, index) in list"
            :key="index"
            @click="goto(item)"
          >
            <div class="f-j-c">
              <img :src="item.cover" class="img p-10" />
            </div>
            <div class="name t-a-c sl-one">{{ item.name }}</div>
            <div class="price t-a-c m-t-b5">￥{{ item.presentPrice }}元</div>
            <div class="f-j-c f-w m-b10">
              <div
                class="img-dv f-j-c m-r5"
                v-for="(item1, index1) in item.pic"
                :key="index1"
                @mouseenter="mouseenter(item, item1)"
                :class="{ activeImg: item.active === item1 }"
              >
                <img :src="item1" />
              </div>
            </div>
          </div>
        </div>
        <div v-else class="p-20 t-a-c m-t20">
          暂无数据
        </div>
        <div class="f-j-c m-b20 p-tb10 search-page" v-if="total">
          <Page
            :total="total"
            @on-change="pageChange"
            :page-size="pageSize"
            :current.sync="current"
          />
        </div>
        <div class="m-t20 p-t20">
          <!-- 猜你喜欢 -->
          <Like></Like>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import Like from "../../components/like/Like";
export default {
  name: "",
  props: {},
  data() {
    return {
      //搜索关键字
      keyword: "",
      current: 1,
      pageSize: 20,
      total: 0,
      sort: 0,
      list: [],
      arr: [
        {
          name: "综合",
          id: 0
        },
        {
          name: "新品",
          id: 1
        },
        {
          name: "价格",
          id: 2
        }
      ]
    };
  },
  components: {
    Like
  },
  methods: {
    //切换页码
    pageChange(e) {
      this.getData();
    },
    //小图标滑动触发
    mouseenter(item, url) {
      item.cover = url;
      this.$set(item, "active", url);
    },
    //点击排序
    change(id, index) {
      this.sort = id;
      this.list.sort((a, b) => {
        if (index === 0) {
          return a.id - b.id;
        } else if (index === 1) {
          return dayjs(a.create_time) - dayjs(b.create_time);
        } else {
          if (id === 2) {
            return a.presentPrice - b.presentPrice;
          } else {
            return b.presentPrice - a.presentPrice;
          }
        }
      });
      if (index === 2) {
        if (id === 3) this.arr[index].id = 2;
        else this.arr[index].id = 3;
      }
    },
    //获取数据
    getData() {
      this.$api
        .search({
          current: this.current,
          pageSize: this.pageSize,
          query: this.keyword==='全部商品'?'':this.keyword
        })
        .then(res => {
          if (res.code === 200) {
            this.list = res.data;
            this.total = res.total;
          }
        });
    },
    //搜索
    search(val) {
      if (!val) this.keyword = this.$route.query.keyword;
      this.getData();
    },
    //跳转到详情
    goto(item) {
      this.$router.push({
        path: "/details",
        query: {
          id:item._id,
          name:item.name
        }
      });
    }
  },
  mounted() {
    this.keyword = this.$route.query.keyword;
    this.getData();
  },
  computed: {},
  watch: {
    $route: { // 监听路由的参数变化
      handler () { // 数据变化更新数据
        this.keyword = this.$route.query.keyword
        this.getData();
      },
      immediate: true // 立即执行
    }
  }
};
</script>

<style lang='scss' scoped>
$color: #ff6700;
$border: 1px solid $color;
.search {
  .activeItem {
    color: $color;
  }
  .item {
    width: 23.7%;
    .activeImg {
      border: $border !important;
    }
    &:hover {
      box-shadow: 3px 10px 20px #ccc;
    }
    .img {
      width: 200px;
      height: 200px;
    }
    &:nth-child(4n) {
      margin-right: 0px !important;
    }
    .img-dv {
      border: 1px solid #eee;
      padding: 5px;
      img {
        width: 20px;
        height: 20px;
      }
    }
  }
}
</style>