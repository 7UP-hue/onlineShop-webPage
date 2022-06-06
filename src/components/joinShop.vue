<!--
 * @Descripttion: 
 * @Author: 刘晴
 * @Date: 2022-05-30 11:15:44
 * @LastEditors: 刘晴
 * @LastEditTime: 2022-06-05 21:17:48
-->
<script setup lang="ts">
import { ref,reactive } from 'vue'
import type { FormInstance } from 'element-plus'
import { saveShop } from '@/api/user'
import{ ElMessage } from 'element-plus'
const ruleFormRef = ref<FormInstance>()
const editForm = reactive({
  shopName:'',
  shopPsd: '',
  shopDesc: '',
  phone: '',
  shopAddr: ''
})
const rules = reactive({
  shopName: [
    {required: true, message: '店铺名不能为空！', trigger: 'blur'},
    {min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: 'blur'}
  ],
  shopPsd: [
    {required: true, message: '密码不能为空！', trigger: 'blur'},
    {min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur'}
  ]
})
const onSubmit = async(formEl: FormInstance | undefined) => {
  if(!formEl) return
  await formEl.validate((valid, fields) => {
    if(valid) {
      saveShop(editForm).then((res: any) => {
        if(res.code === 200) {
          confirmDialog.value = true
          onCancel()
        } else {
          onCancel()
          ElMessage({
            message: res.msg,
            type: 'error'
          })
        }
      })
    } else {
      console.log('校验失败')
    }
  })
}
const confirmDialog = ref(false)
const editDialog = ref(false)
const showDialog = () => {
  editDialog.value = true
}
const onCancel = () => {
  editDialog.value = false
  editForm.shopName = ''
  editForm.shopPsd = ''
  editForm.shopDesc = ''
  editForm.phone = ''
  editForm.shopAddr = ''
}
defineExpose({showDialog})
</script>

<template>
  <el-dialog v-model="editDialog" width="50%">
    <div class="h-45px border-b border-hex-ccc text-left flex items-center font-600 pl-3">
      <el-icon class="mr-1"><CameraFilled /></el-icon>
      创建店铺
    </div>
    <div class="py-5 pr-5">
      <el-form :model="editForm" label-width="100px" ref="ruleFormRef" :rules="rules">
        <el-form-item label="商铺名" prop="shopName">
          <el-input v-model="editForm.shopName" />
        </el-form-item>
        <el-form-item label="登录密码" prop="shopPsd">
          <el-input v-model="editForm.shopPsd" type="password" show-password />
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="editForm.phone" />
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="editForm.shopAddr" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="editForm.shopDesc" type="textarea" />
        </el-form-item>
         <el-form-item>
          <el-button type="primary" @click="onSubmit(ruleFormRef)">确定</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
  <el-dialog v-model="confirmDialog" width="30%">
    <div class="mx-3 my-5">
      新增店铺成功，您可访问
      <el-link href="http://localhost:8088" type="primary" target="_blank">智慧商城后台管理</el-link>，
      根据您刚刚设置的店铺名和密码新增或查看您的商品
    </div>
    <el-button type="primary" @click="confirmDialog = false">关闭</el-button>
  </el-dialog>
</template>
