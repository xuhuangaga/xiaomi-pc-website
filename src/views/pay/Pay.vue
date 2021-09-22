<template>
  <div class="pay">
    <Header :isCars="false"></Header>
    <div class="bc-e f-j-c">
      <div class="bc-w p-20 w1200 m-t-b20">
        <div class="f-a-c">
          <div class="f-s16">收货地址</div>
          <div class="m-lr10 f-c-9">|</div>
          <div>
            <span class="f-c-9">大型商品下单后，收货地址将无法修改。</span>
            <span class="price"
              >快递公司会电话联系您确认送货时间，收货时需核对身份证信息。</span
            >
          </div>
        </div>
        <div class="address m-t20 f-a-c f-w">
          <div
            class="item f-j-c c-p m-r10 m-b10 item-b"
            v-for="(item, index) in addressList"
            @click="activeAddress(item)"
            :class="{ 'activeItem': active && active.id === item.id }"
          >
            <div class="p-r">
              <div class="t-a-c">{{ item.username }}</div>
              <div class="m-t-b5 t-a-c">
                {{ item.mobile.substr(0, 3) + "****" + item.mobile.substr(7) }}
              </div>
              <div class="t-a-c sl-three">
                {{ item.address.split(",").join("") }}{{ item.detailAddress }}
              </div>
              <div class="edit-d">
                <div class="f-j-e">
                  <div @click="del(item)">删除</div>
                  <div class="price m-l10" @click="edit(item)">修改</div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="item f-j-c c-p"
            @click="show = true"
            style="margin-top:-10px"
          >
            <div class="f-c-9">
              <div class="f-j-c">
                <i
                  class="iconfont icon-yangshi_icon_tongyong_add f-s20 f-c-9"
                ></i>
              </div>
              <div>添加新地址</div>
            </div>
          </div>
        </div>
        <div class="m-t20 goods b-b">
          <div class="f-s16 m-b10">商品及优惠券</div>
          <div class="b-b p-tb20">
            <div class="f-j-b" v-for="(item, index) in checkList" :key="index">
              <div class="f-a-c c-p" @click="goto('', item.goods)">
                <img :src="item.goods.cover" class="img" />
                <span class="m-l10 name">{{ item.goods.name }}</span>
              </div>
              <div>
                {{ item.goods.presentPrice }}元<span class="m-lr5">x</span
                >{{ item.count }}
              </div>
              <div class="price">
                {{ Number(item.goods.presentPrice * item.count) }}元
              </div>
            </div>
          </div>
          <div class="f-a-c p-tb20 b-b">
            <div class="f-s16">配送方式</div>
            <div class="price p-l10 m-l10">包邮</div>
          </div>
          <div class="f-j-b p-tb20">
            <div class="f-1">
              <Dropdown @on-click="changeMenu">
                <div class="f-a-c c-p">
                  <i
                    class="iconfont icon-yangshi_icon_tongyong_add f-s20 coupon-i"
                  ></i>
                  <div class="m-l10">使用优惠券</div>
                </div>
                <DropdownMenu slot="list">
                  <DropdownItem
                    :name="index"
                    :disabled="totalMoney < Number(item.threshold)"
                    v-for="(item, index) in coupon"
                    :key="index"
                  >
                    满{{ item.threshold }}元减{{ item.amount }}元
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div class="f-1 f-j-e">
              <div>
                <div class="f-a-c">
                  <div class="m-r20" style="margin-left:-12px">
                    <div class="t-a-r">商品件数:</div>
                    <div class="t-a-r">商品总价:</div>
                    <div class="t-a-r">优惠券抵扣:</div>
                    <div class="t-a-r">运费:</div>
                  </div>
                  <div class="p-l10 price m-l10">
                    <div>{{ totalNum }}件</div>
                    <div>{{ totalMoney }}元</div>
                    <div>-{{ couponItem ? couponItem.amount : 0 }}元</div>
                    <div>0元</div>
                  </div>
                </div>
                <div class="f-a-c m-t10">
                  <div>应付总额:</div>
                  <div class="price m-l10">
                    <span class="f-s30">{{
                      couponItem
                        ? totalMoney - Number(couponItem.amount)
                        : totalMoney
                    }}</span>
                    元
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="m-t20" :class="[{'f-j-b':active},{'f-j-e':!active}]">
          <div v-if="active">
            <div>{{active.username}} {{ active.mobile.substr(0, 3) + "****" + active.mobile.substr(7) }}</div>
            <div> {{ active.address.split(",").join("") }}{{ active.detailAddress }}</div>
          </div>
          <div class="f-a-c c-p">
            <div class="carts f-c-9 m-r20" @click="goto('/carts', '')">
              返回购物车
            </div>
            <div class="pay f-c-w" @click="pay">去结算</div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
    <Modal
      v-model="show"
      :title="address ? '编辑收货地址' : '添加收货地址'"
      @on-cancel="show = false"
      :footer-hide="true"
    >
      <Form ref="form" :model="formItem" :rules="rules">
        <FormItem prop="username">
          <Input
            type="text"
            v-model.trim="formItem.username"
            placeholder="用户名"
          >
          </Input>
        </FormItem>
        <FormItem prop="mobile">
          <Input
            type="text"
            v-model.trim="formItem.mobile"
            placeholder="手机号"
          >
          </Input>
        </FormItem>
        <FormItem prop="address">
          <Cascader :data="citys" v-model="formItem.address"></Cascader>
        </FormItem>
        <FormItem prop="detailAddress">
          <Input
            type="textarea"
            v-model.trim="formItem.detailAddress"
            placeholder="详细地址"
          >
          </Input>
        </FormItem>
        <FormItem class="f-j-c">
          <Button
            type="warning"
            @click="submit"
            size="large"
            class="address-btn"
            >确定</Button
          >
          <Button class="m-l10 address-btn" @click="show = false" size="large"
            >取消</Button
          >
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import Header from "../../components/pheader/PHeader";
import Footer from "../../components/footer/Footer";
import Like from "../../components/like/Like";
import area from "../../lib/area";
export default {
  name: "",
  props: {},
  data() {
    let checkArea = (rule, value, callback) => {
      if (!value.length) return callback(new Error("请选择省市区"));
      else callback();
    };
    let checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入手机号"));
      } else {
        let reg = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    return {
      citys: [],
      addressList: [],
      checkList: [],
      // 优惠券
      coupon: [],
      //待结算的总额
      totalMoney: 0,
      couponItem: null,
      //商品件数
      totalNum: 0,
      show: false,
      address: null,
      //选中的收货地址
      active: null,
      formItem: {
        username: "",
        mobile: "",
        address: [],
        detailAddress: "",
        isDefault: true,
        _id: ""
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur"
          }
        ],
        mobile: [
          {
            validator: checkPhone,
            trigger: "blur"
          }
        ],
        address: [
          {
            validator: checkArea,
            trigger: "blur"
          }
        ],
        detailAddress: [
          {
            required: true,
            message: "请输入详细地址",
            trigger: "blur"
          }
        ]
      }
    };
  },
  components: {
    Header,
    Footer,
    Like
  },
  methods: {
    //选中收货地址
    activeAddress(item) {
      this.active = item;
    },
    //点击删除
    del(item) {
      this.$api
        .delAddress({ addressId: item.id, user_id: this.user._id })
        .then(res => {
          if (res.code === 200) {
            this.$Message.success("删除成功");
            this.getAddress();
          } else this.$Message.success(res.msg);
        });
    },
    edit(item) {
      let obj = JSON.stringify(item);
      let obj1 = JSON.parse(obj);
      obj1.address = obj1.address.split(",");
      this.formItem = obj1;
      this.show = true;
    },
    changeIsDefault(e) {
      this.formItem.isDefault = e;
    },
    //获取省市区级联数据
    getArea() {
      let province_list = area.province_list;
      let city_list = area.city_list;
      let county_list = area.county_list;
      Object.keys(province_list).map(item => {
        //市区
        let proArr = [];
        Object.keys(city_list).map(item1 => {
          if (item.substr(0, 2) === item1.substr(0, 2)) {
            //城市
            let cityArr = [];
            Object.keys(county_list).map(item2 => {
              if (item1.substr(0, 4) === item2.substr(0, 4)) {
                cityArr.push({
                  value: county_list[item2],
                  label: county_list[item2]
                });
              }
            });
            let obj1 = {
              value: city_list[item1],
              label: city_list[item1],
              children: cityArr
            };
            proArr.push(obj1);
          }
        });
        //省份
        let obj = {
          value: province_list[item],
          label: province_list[item],
          children: proArr
        };
        this.citys.push(obj);
      });
    },
    //添加收货地址
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.formItem.user_id = this.user._id;
          let obj = JSON.stringify(this.formItem);
          let obj1 = JSON.parse(obj);
          obj1.address = obj1.address.join();
          if (this.formItem.id) {
            this.$api.updateAddress(obj1).then(res => {
              if (res.code === 200) {
                this.$Message.success("修改成功");
                this.getAddress();
                this.show = false;
              } else {
                this.$Message.error(res.msg);
              }
            });
          } else {
            this.$api.addAddress(obj1).then(res => {
              if (res.code === 200) {
                this.$Message.success("新增成功");
                this.getAddress();
                this.show = false;
              } else {
                this.$Message.error(res.msg);
              }
            });
          }
        }
      });
    },
    pay() {
      if (this.active) {
        let price = this.couponItem
          ? this.totalMoney - Number(this.couponItem.amount)
          : this.totalMoney;
        this.$api
          .addOrder({
            user_id: this.user._id,
            price: price,
            address:
              this.addressList[0].address + this.addressList[0].detailAddress,
            count: this.totalNum,
            pay_time: new Date(),
            goods_list: this.checkList,
            mobile: this.addressList[0].mobile
          })
          .then(res => {
            if (res.code === 200) {
              this.$Message.success(`成功支付${price}元`);
              localStorage.removeItem("checkList");
              this.$router.push("/");
            }
          });
      } else this.$Message.error("请选择收货地址");
    },
    goto(url, item) {
      if (item) {
        this.$router.push({
          path: "/details",
          query: {
            id: item._id,
            name: item.name
          }
        });
      } else this.$router.push(url);
    },
    //选择优惠券
    changeMenu(e) {
      this.couponItem = this.coupon[e];
    },
    //获取优惠券
    getCoupon() {
      this.$api.getCoupon().then(res => {
        if (res.code === 200) {
          this.coupon = res.data;
        }
      });
    },
    //获取收货地址数据
    getAddress() {
      this.$api.getAppAddress(this.user._id).then(res => {
        if (res.code === 200) {
          this.addressList = res.data;
        }
      });
    },
    //获取需要结算的商品列表
    getData() {
      this.checkList = JSON.parse(localStorage.getItem("checkList"));
      this.checkList.map(item => {
        this.totalMoney += Number(item.goods.presentPrice) * item.count;
        this.totalNum += item.count;
      });
    }
  },
  mounted() {
    this.getAddress();
    this.getData();
    this.getCoupon();
    this.getArea();
    window.scrollTo(0, 0);
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
.address-btn {
  width: 180px !important;
  border-radius: 0px !important;
}
.pay {
  .activeItem {
    border: 1px solid $color !important;
    .edit-d {
      display: block !important;
    }
  }
  .address {
    .item-b {
      width: 270px;
      .edit-d {
        display: none;
        position: absolute;
        bottom: -45px;
        right: -45px;
      }
      &:hover {
        .edit-d {
          display: block;
        }
      }
    }
    .item {
      border: 1px solid #eee;
      width: 270px;
      height: 180px;
    }
  }
  .goods {
    .img {
      width: 50px;
      height: 50px;
    }
    .name {
      width: 200px;
    }
    .coupon-i {
      color: $color;
    }
  }
  .pay {
    background: $color;
    padding: 10px 60px;
    border: 1px solid $color;
  }
  .carts {
    padding: 10px 60px;
    border: 1px solid #eee;
  }
}
</style>