<template>
  <div class="p-t20 content f-j-c">
    <div class="w1200">
      <div class="f-j-c">
        <div class="f-a-c f-s16 f-c-9">
          <div :class="{ activeItem: !active }" @click="active = 0" class="c-p" v-if="detail.detail">
            商品详情
          </div>
          <div class="m-lr10 p-l-r20" v-if="detail.specParams">|</div>
          <div
            :class="{ activeItem: active }"
            @click="active = 1"
            class="c-p"
            v-if="detail.specParams"
          >
            规格参数
          </div>
        </div>
      </div>
      <div class="f-j-c">
        <div class="m-t10 f-s0" v-show="!active">
          <div v-html="detail.detail"></div>
        </div>
        <div class="m-t10 f-s0" v-show="active">
          <div v-html="detail.specParams"></div>
        </div>
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
      active: 0
    };
  },
  components: {},
  methods: {},
  mounted() {},
  computed: {},
  watch: {}
};
</script>

<style lang='scss' scoped>
.content {
  border-top: 1px solid #eee;
  .activeItem {
    color: #ff6700;
  }
}
</style>