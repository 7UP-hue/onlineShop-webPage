<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import type { FormInstance } from 'element-plus'
  import { ElMessage } from 'element-plus'
  import { userRegister } from '@/api/user'
  import { useRouter } from 'vue-router'
  const router = useRouter()
  const regFormRef = ref<FormInstance>()
  const regForm = reactive({
    username: '',
    password1: '',
    password2: ''
  })

  //重置文本框
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
  
  const register = async(formEl: FormInstance | undefined) =>{
    //校验失败
    if(!formEl) return
    await formEl.validate((valid, fields) => {
      //校验成功
      if(valid){
        userRegister({
          userName: regForm.username,
          userPsd: regForm.password1
        }).then((res: any) => {
          if(res.code === 200) {
            ElMessage({
              message: '注册成功，即将返回登录页面',
              type: 'success',
            })
            setTimeout(()=> {
              router.push('/login')
            },800)
            console.log(res)
            regForm.username = ''
            regForm.password1 = ''
            regForm.password2 = ''
          } else {
            ElMessage({
              message: '注册失败，请重试',
              type: 'error',
            })
            regForm.username = ''
            regForm.password1 = ''
            regForm.password2 = ''
          }
        })
      }
    })
  }
  const validateName = (rule: any, value: any, callback: any) => {
    if(value === '') {
      callback(new Error('用户名不能为空！'))
    } else {
      callback()
    }
  }
  const validatePass = (rule: any, value: any, callback: any) => {
    if(value === '') {
      callback(new Error('密码不能为空！'))
    } else {
      if(regForm.password2 !== '') {
        if(!regFormRef.value) return 
        regFormRef.value.validateField('password2',() => null)
      }
      callback()
    }
  }
  const validatePass2 = (rule: any, value: any, callback: any) => {
    if(value === '') {
      callback(new Error('请再次输入密码'))
    } else if (value !== regForm.password1) {
      callback(new Error("两次输入不一致！"))
    } else {
      callback()
    }
  }
  const rules = reactive({
    username: [{validator: validateName, trigger: 'blur'}, {min: 4, max: 12, message: '用户名长度为4-12位', trigger: 'blur'}],
    password1: [{validator: validatePass, trigger: 'blur'}, {min: 3, max: 18, message: '密码长度在3到18个字符', trigger: 'blur'}],
    password2: [{validator: validatePass2, trigger: 'blur'}],
  })
</script>
<template>
  <div class="Container pt-36">
    <div class="shopName font-mono text-4xl bold text-yellow-500">
      欢迎来到智慧商城
    </div>
    <div class="mx-auto w-md p-8 rounded-lg Login">
      <div>
        <el-form
          style="max-width: 460px"
          :model="regForm"
          :rules="rules"
          ref="regFormRef"
        >
          <el-form-item prop="username">
            <el-input v-model.trim="regForm.username" placeholder="用户名" :prefix-icon="User"/>
          </el-form-item>
          <el-form-item prop="password1">
            <el-input @focus="changeArm(1)" @blur="changeArm(0)" v-model.trim="regForm.password1" placeholder="请输入密码" :prefix-icon="Unlock" type="password" show-password />
          </el-form-item>
          <el-form-item prop="password2">
            <el-input @focus="changeArm(1)" @blur="changeArm(0)" v-model.trim="regForm.password2" placeholder="请确认密码" :prefix-icon="Unlock" type="password" show-password />
          </el-form-item>
          <div>
            <el-button type="text" @click="this.$router.push('/login')">已有账号，点此登录</el-button>
            <el-button type="primary" @click="register(regFormRef)">注册</el-button>
            <el-button @click="resetForm(regFormRef)">重置</el-button>
          </div>
        </el-form>
      </div>
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