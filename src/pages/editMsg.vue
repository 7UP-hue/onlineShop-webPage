<!--
 * @Descripttion: 
 * @Author: 刘晴
 * @Date: 2022-05-30 11:15:44
 * @LastEditors: 刘晴
 * @LastEditTime: 2022-06-05 22:02:37
-->
<script setup lang="ts">
import { ref,reactive, onMounted } from 'vue'
import type { FormInstance } from 'element-plus'
import { getUserInfo, editUser } from '@/api/user'
import { ElMessage } from 'element-plus'
const ruleFormRef = ref<FormInstance>()
const editForm = reactive({
  userName:'',
  userPsd: '',
  phone: '',
  userAddr: '',
  userId: ''
})
const rules = reactive({
  userName: [
    {required: true, message: '店铺名不能为空！', trigger: 'blur'},
    {min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: 'blur'}
  ],
  userPsd: [
    {required: true, message: '密码不能为空！', trigger: 'blur'},
    {min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur'}
  ]
})
const onSubmit = async(formEl: FormInstance | undefined) => {
  //校验失败
  if(!formEl) return
  await formEl.validate((valid, fields) => {
    //校验成功
    if(valid) {
      editUser(editForm).then((res: any) => {
        if(res.code === 200) {
          ElMessage({
            message: '修改成功',
            type: 'success'
          })
        } else {
          ElMessage({
            message: '修改失败',
            type: 'error'
          })
          onCancel()
        }
      })
    }
  })
}
const onCancel = () => {
  getUserInfo().then((res: any) => {
    if(res.code === 200) {
      editForm.userName = res.data.userName
      editForm.userPsd = res.data.userPsd
      editForm.phone = res.data.phone
      editForm.userAddr = res.data.userAddr
      editForm.userId = res.data.userId
    }
  })
}
onMounted(() => {
  onCancel()
})
</script>

<template>
  <my-header></my-header>
  <div>
    <div class="mt-5 mx-auto h-600px shadow-lg shadow-gray-300 border border-hex-eee" style="width: 60%" >
      <div class="h-45px border-b border-hex-ccc text-left flex items-center font-600 pl-3">
        <el-icon class="mr-1"><CameraFilled /></el-icon>
        用户信息
      </div>
      <div class="py-5 pr-5">
        <el-form :model="editForm" label-width="100px" ref="ruleFormRef" :rules="rules"> 
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="editForm.userName" disabled />
          </el-form-item>
          <el-form-item label="密码" prop="userPsd">
            <el-input v-model="editForm.userPsd" />
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="editForm.phone" />
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="editForm.userAddr" />
          </el-form-item>
           <el-form-item>
            <el-button type="primary" @click="onSubmit(ruleFormRef)">确定</el-button>
            <el-button @click="onCancel">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<style scoped>
</style>