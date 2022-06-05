<!--
 * @Descripttion: 
 * @Author: 刘晴
 * @Date: 2022-05-30 11:15:44
 * @LastEditors: 刘晴
 * @LastEditTime: 2022-05-31 21:59:01
-->
<script setup lang="ts">
import { ref,reactive } from 'vue'
const editForm = reactive({
  shopName:'',
  shopDesc: '',
  phone: '',
  shopAddr: ''
})
const editDialog = ref(false)
const showDialog = () => {
  editDialog.value = true
}
defineExpose({showDialog})
</script>

<template>
  <el-dialog v-model="editDialog" width="50%">
    <div class="py-5 pr-5">
      <el-form :model="editForm" label-width="100px">
        <el-form-item label="商铺名">
          <el-input v-model="editForm.shopName" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="editForm.shopDesc" />
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="editForm.phone" />
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="editForm.shopAddr" />
        </el-form-item>
         <el-form-item>
          <el-button type="primary" @click="editDialog = false">确定</el-button>
          <el-button @click="editDialog = false">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>
