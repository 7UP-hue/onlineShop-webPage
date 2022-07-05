<!--
 * @Descripttion: 
 * @Author: 刘晴
 * @Date: 2022-05-31 13:40:47
 * @LastEditors: 刘晴
 * @LastEditTime: 2022-06-08 21:40:35
-->
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { buildOrder } from '@/api/order'
import { buildCart } from '@/api/cart'
import { updateData } from '@/api/user'
import { ElMessage } from 'element-plus'
interface ShopMsg{
  proName: String,
  shopName: String,
  price: Number,
  stock: Number,
  imgSrc: String,
}
let shopMsg: ShopMsg = reactive({
  proName: '',
  shopName: '',
  price: 0,
  stock: 0,
  imgSrc: '',
})
const proSize = ref('small')
const showDialog = ref(false)
const request = reactive({
  proId: '',
  purchaseCnt: 0
})
const cartRequest = reactive({
  proId: '',
  choCnt: 0
})
const showDetail = (detailMsg: any) => {
  showDialog.value = true
  shopMsg.proName = detailMsg.proName
  shopMsg.shopName = detailMsg.shopName
  shopMsg.price = detailMsg.price
  shopMsg.stock = detailMsg.stock
  shopMsg.imgSrc = detailMsg.imgUrl
  request.proId = detailMsg.proId,
  cartRequest.proId = detailMsg.proId,
  updateData({proId: detailMsg.proId}).then((res) => {
    console.log(res)
  })
}
const subCnt = () => {
  if(currentCnt.value>1) {
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
  currentCnt.value = 1
  proSize.value = 'small'
}
const onSubmit = () => {
  request.purchaseCnt = currentCnt.value
  buildOrder(request).then((res: any) => {
    if(res.code === 200) {
      ElMessage({
        message: '购买成功',
        type: 'success'
      })
    } else {
      ElMessage({
        message: res.msg,
        type: 'error'
      })
    }
  }).finally(() => {
    showDialog.value = false
  })
}
const addCart = () => {
  cartRequest.choCnt = currentCnt.value
  buildCart(cartRequest).then((res: any) => {
    if(res.code === 200) {
      ElMessage({
        message: res.msg,
        type: 'success'
      })
    } else {
      ElMessage({
        message: res.msg,
        type: 'error'
      })
    }
  }).finally(() => {
    showDialog.value = false
  })
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
      <el-button @click="onSubmit()">立即购买</el-button>
      <el-button @click="addCart()">加入购物车</el-button>
    </div>
  </el-dialog>
</template>