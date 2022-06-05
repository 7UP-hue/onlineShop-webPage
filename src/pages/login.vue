<!--
 * @Descripttion: 
 * @Author: 刘晴
 * @Date: 2022-05-31 17:21:46
 * @LastEditors: 刘晴
 * @LastEditTime: 2022-06-03 22:19:21
-->
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'

import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const router = useRouter()
const store = useStore()
//重置文本框
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
const loginFormdata = ref({
  userName: '',
  userPsd: ''
})
const ruleFormRef = ref<FormInstance>()
const login = async(formEl: FormInstance | undefined) => {
  //校验失败
  if(!formEl) return
  await formEl.validate((valid, fields) => {
    //校验成功
    if(valid) {
      store.dispatch('login',loginFormdata.value)
      loginFormdata.value.userName = ''
      loginFormdata.value.userPsd = ''
    }
  })
  
}
const show_down = ref(true)
//校验规则
const rules = reactive({
  userName: [
    {required: true, message: '用户名不能为空！', trigger: 'blur'},
    {min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: 'blur'}
  ],
  userPsd: [
    {required: true, message: '密码不能为空！', trigger: 'blur'},
    {min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur'}
  ]
})
const changeArm = (flag: number) =>  {
  if( flag===1 ) {
    show_down.value = false
  }
  else {
    show_down.value = true
  }
}
</script>
<template>
  <div class="Container">
    <div class="shopName font-mono text-4xl bold text-yellow-500">
      欢迎来到智慧商城
    </div>
    <div class="w-md p-8 rounded-lg Login">
      <el-form
        style="max-width: 460px"
        ref="ruleFormRef"
        :model="loginFormdata"
        :rules="rules"
      >
        <el-form-item prop="userName">
          <el-input v-model.trim="loginFormdata.userName" placeholder="用户名" :prefix-icon="User"/>
        </el-form-item>
        <el-form-item prop="userPsd">
          <el-input @focus="changeArm(1)" @blur="changeArm(0)" v-model.trim="loginFormdata.userPsd" placeholder="密码" :prefix-icon="Unlock" type="password" show-password />
        </el-form-item>
        <div>
          <el-button type="text" @click="this.$router.push('/register')">还没有账号？点此注册</el-button>
          <el-button type="primary" @click="login(ruleFormRef)">登录</el-button>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.Container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/bgImg.jpg');
  background-position: 0 -200px;
  background-repeat: no-repeat;
  background-size: 100%;
}
.Login {
  position: absolute;
  top: 180px;
  right: 60px;
  background-color: rgba(210,153,100, 0.6);
}
.shopName {
  position: absolute;
  top: 100px;
  right: 60px;
}
</style>