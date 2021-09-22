<template>
  <div class="banner-box">
    <Carousel v-model="val" loop class="w1200" :autoplay="true" :autoplay-speed="5000" :radius-dot="true" arrow="always">
        <CarouselItem v-for="(item,index) in list" :key="index" class="w1200">
          <div class="hbfb wbfb demo-carousel"><img :src="item.url" class="ban-img w1200" /></div>
        </CarouselItem>
    </Carousel>
  </div>
</template>

<script>
export default {
  name: '',
  props:{},
  data () {
    return {
      list:[],
      val:0
    }
  },
  components: {},
  methods: {
    //获取轮播图数据
    getBanner(){
      this.$api.getBanner()
      .then(res=>{
        if(res.code===200) {
          this.list = res.data
        }
      })
    }
  },
  mounted() {
    this.getBanner()
  },
  computed: {},
  watch: {}
}
</script>

<style lang='scss' scoped>
.ban-img {
  height: 500px;
}
</style>