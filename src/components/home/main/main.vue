<template>
  <div class="bc-e f-j-c m-t10 p-tb20">
    <div>
      <div class="w1200">
        <img src="../../../assets/image/active.webp" class="w1200 c-p" />
        <div class="m-t20">
          <div v-for="(item, index) in list" :key="index" class=" m-t-b20 item">
            <template v-if="item.list.length">
              <div class="f-s16">{{ item.name }}</div>
              <!-- <div v-if="index < 3" class="f m-t10">
                <div class="c-p pro-img">
                  <img :src="item.list[0].cover" class="pro-img" />
                </div>
                <div class="f f-w">
                  <div
                    v-for="(item1, index1) in item.list"
                    :key="index1"
                    class="m-b10"
                    @click="goto(item1)"
                  >
                    <div
                      v-if="index1 > 0"
                      class="m-l10 c-p pro-img-ob1 bc-w proItem"
                    >
                      <div class="t-a-c p-10">
                        <img :src="item1.cover" class="pro-img-o p-10" />
                      </div>
                      <div class="f-j-c p-tb10">
                        <div class="name sl-one t-a-c">{{ item1.name }}</div>
                      </div>
                      <div class="f-j-c">
                        <div class="f-a-c">
                          <div class="price">￥{{ item1.presentPrice }}元</div>
                          <div class="line f-c-9 m-l10">
                            ￥{{ item1.originalPrice }}元
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> -->
               <!-- v-else -->
              <div class="f-a-c f-w m-t10">
                <div
                  v-for="(item1, index1) in item.list"
                  :key="index1"
                  class="bc-w m-r10 p-10 proItem m-b10"
                  @click="goto(item1)"
                >
                  <div class="m-l10 c-p pro-img-ob">
                    <div class="t-a-c">
                      <img :src="item1.cover" class="pro-img-o" />
                    </div>
                    <div class="f-j-c p-tb10">
                      <div class="name sl-one t-a-c">{{ item1.name }}</div>
                    </div>
                    <div class="f-j-c">
                      <div class="f-a-c">
                        <div class="price">￥{{ item1.presentPrice }}元</div>
                        <div class="line f-c-9 m-l10">
                          ￥{{ item1.originalPrice }}元
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
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
      //分类+商品数据
      list: []
    };
  },
  components: {},
  methods: {
    //跳转到详情
    goto(item) {
      this.$router.push({
        path:'/details',
        query:{
          id:item._id,
          name:item.name
        }
      });
    },
    // 整理数据
    getData() {
      this.category.map(item => {
        let obj = {
          name: item.name,
          list: []
        };
        item.list &&
          item.list.map(item1 => {
            item1.list &&
              item1.list.map(item2 => {
                obj.list = [...obj.list, ...item2[item1.name]];
              });
          });
        this.list.push(obj);
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
.pro-img {
  width: 237px;
  height: 610px;
}
.pro-img-o {
  width: 160px;
  height: 160px;
}
.pro-img-ob {
  width: 205px;
  height: 240px;
}
.pro-img-ob1 {
  width: 237px;
  height: 300px;
}
.name {
  width: 160px;
}

.proItem:hover {
  box-shadow: 3px 10px 20px #ccc;
}
</style>