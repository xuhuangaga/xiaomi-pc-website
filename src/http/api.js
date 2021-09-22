import http from "./index"
let token = localStorage.getItem('token')
export default {
  // 上传
  upload() {
    return http.post('/app/upload')
  },
  // 获取短信验证码
  getCode({
    mobile
  }) {
    return http.post('/app/getCode', {
      mobile
    })
  },
  // 注册
  register({
    mobile,
    code,
    username,
    password
  }) {
    return http.post('/app/register', {
      mobile,
      code,
      username,
      password
    })
  },
  // 手机号登录
  mobileLogin({
    mobile,
    code
  }) {
    return http.post('/app/mobileLogin', {
      mobile,
      code
    })
  },
  // 用户名登录
  userLogin({
    username,
    password
  }) {
    return http.post('/app/userLogin', {
      username,
      password
    })
  },
  // 微信登录
  wechatLogin({
    code
  }) {
    return http.post('/app/wechatLogin', {
      code
    })
  },
  // 获取轮播图
  getBanner() {
    return http.get('/app/getBanner')
  },
  // 获取导航
  getNav() {
    return http.get('/app/getNav')
  },
  // 获取全部商品
  getGoods() {
    return http.get('/app/getGoods')
  },
  // 获取分类
  getCategory() {
    return http.get('/app/getCategory')
  },
  // 获取优惠券
  getCoupon() {
    return http.get('/app/getCoupon')
  },
  // 获取秒杀商品
  getSeckill() {
    return http.get('/app/getSeckill')
  },
  // 获取新品
  getNew() {
    return http.get('/app/getNew')
  },
  // 获取热销商品
  getHot() {
    return http.get('/app/getHot')
  },
  // 获取推荐商品
  getRecommend() {
    return http.get('/app/getRecommend')
  },
  // 获取首页推荐导航
  getRecommendNav() {
    return http.get('/app/getRecommendNav')
  },
  // 获取导航商品详情
  getNavGoods({
    id
  }) {
    return http.post('/app/getNavGoods', {
      id
    })
  },
  // 获取搜索热词
  getSearchWords() {
    return http.get('/app/searchWord')
  },
  // 商品详情
  goodsDetail(id) {
    return http.post('/app/goodsDetail', {
      id
    })
  },
  // 搜索
  search({
    current,
    pageSize,
    query
  }) {
    return http.get(`/app/search?current=${current}&pageSize=${pageSize}&query=${query}`)
  },
  // 获取秒杀商品
  getSeckillGoods() {
    return http.get('/app/getSeckillGoods')
  },
  // 获取购物车
  getCart(user_id) {
    return http.post('/app/getCart', {
      user_id
    }, {
      headers: {
        token
      }
    })
  },
  // 添加购物车
  addCart({
    // 用户id
    user_id,
    // 购物车数量
    count,
    // 商品
    goods,
    // 商品规格
    spec
  }) {
    return http.post('/app/addCart', {
      user_id,
      count,
      goods,
      spec
    })
  },
  delCart({
    // 用户id
    user_id,
    // 商品id
    id
  }) {
    return http.post('/app/delCart', {
      id,
      user_id
    })
  },
  // 修改购物车
  updateCart({
    // 商品id
    id,
    // 用户id
    user_id,
    // 商品数量
    count,
  }) {
    return http.post('/app/updateCart', {
      id,
      user_id,
      count,
    })
  },
  addWechatUser(data) {
    return http.post('/app/addWechatUser', data)
  },
  // 获取用户地址
  getAppAddress(user_id) {
    return http.post('/app/getAppAddress', {
      // 用户id
      user_id
    })
  },
  getWechatAddress(openid) {
    return http.post('/app/getWechatAddress', {
      openid
    })
  },
  // 添加地址
  addAddress({
    // 用户id
    user_id,
    // 用户名
    username,
    // 用户电话
    mobile,
    // 用户省市区地址
    address,
    // 用户详细地址
    detailAddress,
    // 是否是默认地址
    isDefault,
  }) {
    return http.post('/app/addAddress', {
      user_id,
      username,
      mobile,
      address,
      detailAddress,
      isDefault,
    })
  },
  // 删除地址
  delAddress({
    // 地址id
    addressId,
    // 用户id
    user_id
  }) {
    return http.post('/app/delAddress', {
      addressId,
      user_id
    })
  },
  // 修改地址
  updateAddress({
    // 用户id
    user_id,
    // 用户名
    username,
    // 用户电话
    mobile,
    // 用户省市区地址
    address,
    // 用户详细地址
    detailAddress,
    // 是否是默认地址
    isDefault,
    // 地址id
    id
  }) {
    return http.post('/app/updateAddress', {
      user_id,
      username,
      mobile,
      address,
      detailAddress,
      isDefault,
      id
    })
  },
  // 设置默认地址
  setDefault({
    // 地址id
    addressId,
    // 用户id
    user_id
  }) {
    return http.post('/app/setDefault', {
      addressId,
      user_id
    })
  },
  // 订单
  getAppOrder(user_id) {
    return http.post('/app/getAppOrder', {
      // 用户id
      user_id
    })
  },
  // 添加订单
  addOrder({
    // 用户id
    user_id,
    // 订单总价
    price,
    // 用户地址
    address,
    // 订单商品数量
    count,
    // 支付时间
    pay_time,
    // 商品列表
    goods_list,
    // 用户电话
    mobile,
  }) {
    return http.post('/app/addOrder', {
      user_id,
      price,
      address,
      count,
      pay_time,
      goods_list,
      mobile,
    })
  },
  // 删除订单
  delOrder({
    // 订单id
    orderId,
    // 用户id
    user_id
  }) {
    return http.post('/app/delOrder', {
      orderId,
      user_id
    })
  },
  // 评价
  createComment({
    // 用户id
    user_id,
    // 商品id
    goods_id,
    // 订单id
    order_id,
    // 评分
    rate,
    // 评价内容
    content,
    // 评论图片
    pic,
    // 是否匿名
    isAnonymous,
    // 评论时间
    comment_time
  }) {
    return http.post('/app/createComment', {
      user_id,
      goods_id,
      order_id,
      rate,
      content,
      pic,
      isAnonymous,
      comment_time
    })
  },
  // 通知
  getNotice() {
    return http.get('/app/getNotice')
  },
  // 获取城市区域
  getAreaList() {
    return http.get('/app/getAreaList')
  },
  // 搜索城市区域
  searchAreaList(content) {
    return http.post('/app/searchAreaList', {
      content
    })
  },
  // 小米之家
  getStoreHome({
    // 地区名字
    area_name,
    // 地区id
    area_id
  }) {
    return http.post('/app/storeHome', {
      area_name,
      area_id
    })
  },
  // 店铺详情
  getStoreDetail(mihome_id) {
    return http.post('/app/storeDetail', {
      // 店铺id
      mihome_id
    })
  }
}
