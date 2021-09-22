<template>
  <div>
    <div class="f-j-c plate">
      <div class="w1200 f-j-b">
        <div class="plate-o f-j-b f-w f-c-w p-10">
          <div
            v-for="(item, index) in plate.service"
            :key="index"
            class="item f-j-c p-r"
          >
            <div class="sx"></div>
            <div class="item1">
              <div class="t-a-c"><img :src="item.src" class="img" /></div>
              <div class="t-a-c f-s12">{{ item.name }}</div>
              <div class="hx" v-if="index < 3"></div>
            </div>
          </div>
        </div>
        <div
          v-for="(item, index) in plate.img"
          :key="index"
          @click="goto(item.path)"
        >
          <img :src="item.src" class="img c-p" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { plate } from "../../../types";
export default {
  name: "",
  props: {},
  data() {
    return {
      plate: plate
    };
  },
  components: {},
  methods: {
    //跳转页面
    goto(path) {
      window.open(path);
    }
  },
  mounted() {},
  computed: {},
  watch: {}
};
</script>

<style lang='scss' scoped>
.plate {
  .img {
    width: 310px;
    height: 176px;
  }
  .plate-o {
    width: 225px;
    height: 176px;
    background: #5f5750;
    .item {
      width: 60px;
      height: 75px;
    }
    .sx {
      height: 50px;
      width: 1px;
      background: #665e57;
      position: absolute;
      left: 0;
    }
    .hx {
      width: 50px;
      height: 1px;
      background: #665e57;
      position: absolute;
      bottom: -3px;
      left: 12px;
    }
    .item:nth-child(3n) {
      border-right: none;
    }
    .img {
      width: 24px;
      height: 24px;
    }
  }
}
</style>