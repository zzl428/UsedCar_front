<template>
  <div class="register">
    <van-form validate-first ref="registerForm">
      <van-field v-model="phone" name="手机号" type="tel" label="手机号" placeholder="手机号"
        :rules="[{ pattern: /\d{11}/, message: '手机号格式错误', trigger: 'onBlur'},
                { validator: validPhone, message: '手机号已被注册'},
                { required: true, message: '请填写手机号'}]"/>
      <van-field v-model="password" name="密码" type="password" label="密码" placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' },
                { pattern: /^[a-zA-Z\d_]{6,}$/, message: '密码长度不能小于 6 位'}]"/>
      <van-field v-model="checkPassword" name="确认密码" type="password" label="确认密码" placeholder="确认密码"
        :rules="[{ required: true, message: '请填写密码' },
                { pattern: /^[a-zA-Z\d_]{6,}$/, message: '密码长度不能小于 6 位'},
                { validator: validPassword, message: '密码不一致'}]"/>
      <div style="margin: 16px;">
        <van-button round block type="primary" @click.native="register">注册</van-button>
        <van-button round block plain type="info"  @click="toLogin">已有账号,快去登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import {register, checkPhone} from 'network/user'
import { Toast } from 'vant';

export default {
  name: 'Register',
  data() { 
    return {
      phone: '',
      password: '',
      checkPassword: '',
    }
  },
  methods: {
    // 网络请求
    // 注册按钮
    register() {
      this.$refs.registerForm.validate().then(async () => {
        const {data} = await register(this.phone, this.password)
        if(!data) return
        if(data.meta.status !== 200) return Toast.fail('注册失败');
        Toast.success('注册成功');
        this.$router.push('/login')
      }).catch((err) => {
        return err
      })
    },
    // 验证手机号
    async validPhone() {
      const {data} = await checkPhone(this.phone)
      if(!data) return false
      if(data.meta.status !== 200) return false
      return true
    },

    // 功能
    // 跳转到登录界面
    toLogin() {
      this.$router.push('/login')
    },
    // 验证密码
    validPassword() {
      if(this.password !== this.checkPassword)  return false
    }
  }
 }
</script>

<style lang='less' scoped>
/*
 1.位置属性(position, top, right, z-index, display, float等)
 2.大小(width, height, padding, margin)
 3.文字系列(font, line-height, letter-spacing, color- text-align等)
 4.背景(background, border等)
 5.其他(animation, transition等)
*/

  .van-form {
    margin-top: 70%;

    .van-button {
      margin-top: 15px;
    }
  }
</style>