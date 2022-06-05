<!--
 * @Descripttion: 
 * @Author: 刘晴
 * @Date: 2022-05-31 13:40:47
 * @LastEditors: 刘晴
 * @LastEditTime: 2022-05-31 14:57:57
-->
<script setup lang="ts">
import { reactive, ref } from 'vue'
interface ShopMsg{
  proName: String,
  shopName: String,
  price: Number,
  stock: Number,
  imgSrc: String
}
let shopMsg: ShopMsg = reactive({
  proName: '',
  shopName: '',
  price: 0,
  stock: 0,
  imgSrc: ''
})
const proSize = ref('small')
const showDialog = ref(false)
const showDetail = (detailMsg: any) => {
  showDialog.value = true
  shopMsg.proName = detailMsg.proName
  shopMsg.shopName = detailMsg.shopName
  shopMsg.price = detailMsg.price
  shopMsg.stock = 10000
  shopMsg.imgSrc = detailMsg.imgSrc
}
const subCnt = () => {
  if(currentCnt.value) {
    currentCnt.value--
  }
}
const addCnt = () => {
  if(currentCnt.value < shopMsg.stock) {
    currentCnt.value++
  }
}
const currentCnt = ref(1)
defineExpose({showDetail})
const onClose = () => {
  console.log('关闭')
  currentCnt.value = 1
  proSize.value = 'small'
}
</script>
<template>
  <el-dialog
    v-model="showDialog"
    width="40%"
    @close="onClose"
  >
    <div class="text-left">
      <img :src="shopMsg.imgSrc" style="width: 50%" />
      <div class="mt-2">商品名：{{shopMsg.proName}}</div>
      <div class="mt-2">
        价格：￥{{shopMsg.price}}
        <span class="ml-5">店铺名：{{shopMsg.shopName}}</span>
      </div>
      <div class="mt-2">
        选择数量
        <span class="rounded border border-hex-aaa ml-3">
          <span class="border-r border-hex-aaa px-2" @click="subCnt"><el-icon><Minus /></el-icon></span>
          <span class="px-2">{{currentCnt}}</span>
          <span class="border-l border-hex-aaa px-2" @click="addCnt"><el-icon><Plus /></el-icon></span>
        </span>
      </div>
      <div class="mt-2 flex items-center">
        <span class="mr-5">选择尺码</span>
        <el-radio-group v-model="proSize">
          <el-radio label="small">S</el-radio>
          <el-radio label="model">M</el-radio>
          <el-radio label="large">L</el-radio>
        </el-radio-group>
      </div>
      <div class="my-2">合计：￥{{shopMsg.price*currentCnt}}</div>
      <el-button>立即购买</el-button>
      <el-button>取消</el-button>
    </div>
  </el-dialog>
</template>