<template>
  <div class="f-j-b login">
    <div class="p-f login-l"></div>
    <div class="f-2 p-f login-r p-20">
      <div class="top f-j-b">
        <div class="f-a-c">
          <img
            src="../../assets/image/logo-mi2.png"
            class="login c-p"
            @click="goto"
          />
          <div class="m-l10 f-s20">小米账号</div>
        </div>
        <div class="f-c-9 f-a-c">
          <div class="p-l-r10">用户协议</div>
          <div class="p-l-r10">隐私政策</div>
          <div class="p-l-r10">帮助中心</div>
          <div class="p-l-r10">|</div>
          <div class="p-l-r10">中文(简体)</div>
        </div>
      </div>
      <div class="f-j-c m-t20 p-t20">
        <div class="box">
          <div class="f-a-c f-s16">
            <div
              class="item c-p"
              @click="active = 0"
              :class="{ 'active-item': !active }"
            >
              登录
            </div>
            <div
              class="item c-p m-l10"
              @click="active = 1"
              :class="{ 'active-item': active }"
            >
              注册
            </div>
          </div>
          <div class="m-t10">
            <Form
              :model="formItem"
              :label-width="0"
              class="login-form"
              :rules="rules"
              ref="formItem"
            >
              <FormItem prop="username">
                <Input
                  v-model="formItem.username"
                  placeholder="请输入用户名"
                ></Input>
              </FormItem>
              <FormItem prop="password">
                <Input
                  v-model="formItem.password"
                  placeholder="请输入密码"
                  type="password"
                ></Input>
              </FormItem>
              <FormItem prop="mobile" v-if="active">
                <Input
                  v-model="formItem.mobile"
                  placeholder="请输入手机号码"
                ></Input>
              </FormItem>
              <FormItem prop="code" v-if="active">
                <Input v-model="formItem.code" placeholder="请输入验证码">
                  <template #append>
                    <Button size="large" @click="send" :disabled="time !== 0">{{
                      text
                    }}</Button>
                  </template>
                </Input>
              </FormItem>
              <FormItem>
                <Button
                  type="warning"
                  class="wbfb"
                  size="large"
                  @click="submit"
                  >{{ active ? "注册" : "登录" }}</Button
                >
              </FormItem>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
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
      time: 0,
      timer: null,
      text: "获取验证码",
      active: 0,
      formItem: {
        username: "",
        password: "",
        code: "",
        mobile: ""
      },
      rules: {
        mobile: [
          {
            validator: checkPhone,
            trigger: "blur"
          }
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 10, message: "密码长度为6-10个字符", trigger: "blur" }
        ]
      }
    };
  },
  components: {},
  methods: {
    //点击登录
    submit() {
      this.$refs.formItem.validate(valid => {
        if (valid) {
          if (!this.active) {
            this.$api.userLogin(this.formItem).then(res => {
              if (res.code === 200) {
                this.$Message.success("登录成功");
                localStorage.setItem("xm-pc-user", JSON.stringify(res.data));
                localStorage.setItem("token", res.token);
                this.$store.commit("setUser", JSON.stringify(res.data));
                this.$router.push("/");
              } else this.$Message.error(res.msg);
            });
          } else {
            this.$api.register(this.formItem).then(res => {
              if (res.code === 200) {
                this.$Message.success("注册成功");
                this.active = 0;
              } else this.$Message.error(res.msg);
            });
          }
        }
      });
    },
    //跳转页面
    goto() {
      this.$router.push("/");
    },
    //发送验证码
    send() {
      if (!this.formItem.mobile) {
        this.$Message.error("请输入手机号");
        return;
      }
      this.$api.getCode({ mobile: this.formItem.mobile }).then(res => {
        if (res.code === 200) {
          this.time = 60;
          let timer = setInterval(() => {
            if (this.time > 0) {
              this.text = `${this.time--}s后重新发送`;
            } else {
              this.text = "重新发送";
              clearInterval(timer);
            }
          }, 1000);
        }
      });
    }
  },
  mounted() {},
  computed: {},
  watch: {}
};
</script>

<style lang='scss' scoped>
.login {
  .login-l {
    width: 375px;
    bottom: 0;
    left: 0;
    top: 0;
    background: url("../../assets/image/banner.4994397e.jpg");
    background-size: 375px 700px;
  }
  .login-r {
    left: 375px;
    top: 0;
    right: 0;
    overflow: auto;
    bottom: 20px;
    .active-item {
      border-bottom: 2px solid #ff6700 !important;
    }
    .item {
      border-bottom: 2px solid #fff;
    }
  }
  .box {
    box-shadow: 1px 1px 10px #eee;
    padding: 30px;
    border-radius: 3px;
    width: 400px;
  }
}
</style>