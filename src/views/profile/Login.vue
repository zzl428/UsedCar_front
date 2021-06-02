<template>
  <div class="login">
    <van-form ref="loginForm">
      <van-field v-model="phone" name="手机号" label="手机号" placeholder="手机号"
        :rules="[{ pattern: /\d{11}/, message: '手机号格式错误', trigger: 'onBlur'},
                { required: true, message: '请填写手机号' }]"/>
      <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' },
                { pattern: /^[a-zA-Z\d_]{6,}$/, message: '密码长度不能小于 6 位'}]"/>
      <div style="margin: 16px;">
        <van-button round block type="info" @click="login">登录</van-button>
        <van-button round plain block type="primary" @click="toRegister">没有账号,立即注册</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import {login} from 'network/user'
import { Toast } from 'vant';

export default {
  name: 'Login',
  data() { 
    return {
      phone: '12345678910',
      password: '000000',
    }
  },
  methods: {
    // 网络请求
    login() {
      this.$refs.loginForm.validate().then(async () => {
        const {data} = await login(this.phone, this.password)
        if(!data) return
        if(data.meta.status !== 200) return Toast.fail('登录失败,账号或密码错误');
        Toast.success('登录成功');
        window.localStorage.setItem('front_token', data.data.token)
        window.localStorage.setItem('phone', data.data.phone)
        window.localStorage.setItem('front_id', data.data.id)
        this.$router.push('/profile')
      }).catch((err) => {
        return err
      })
    },

    // 功能
    toRegister() {
      this.$router.push('/register')
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
  .login {
  }

  .van-form {
    margin-top: 70%;

    .van-button {
      margin-top: 15px;
    }
  }
</style>