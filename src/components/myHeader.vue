<!--
 * @Descripttion: 
 * @Author: 刘晴
 * @Date: 2022-05-31 21:50:10
 * @LastEditors: 刘晴
 * @LastEditTime: 2022-06-05 21:15:13
-->
<script setup lang="ts">
import { ref } from 'vue'
const joinShopRef = ref()
const showShop = () => {
  joinShopRef.value.showDialog()
}
const isLogin = ref(true)
</script>

<template>
  <div class="h-50px bg-hex-333 flex items-center">
    <div class="mx-auto text-left flex justify-around items-center" style="width: 70%">
      <el-button type="text" class="items text-hex-b0b0b0" @click="this.$router.push('/home')">主页</el-button>
      <el-button type="text" class="items text-hex-b0b0b0" @click="this.$router.push('/myOrder')"
        style="color: #b0b0b0"
      >我的订单</el-button>
      <el-dropdown class="items py-0">
        <span class="el-dropdown-link text-hex-b0b0b0 cursor-pointer items">
          卖家中心
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="showShop">成立店铺</el-dropdown-item>
            <el-dropdown-item>
              <el-link href="http://localhost:8088" target="_blank">已卖出的宝贝</el-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-link href="http://localhost:8088" target="_blank">出售出的宝贝</el-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <span v-if="!isLogin">
        <el-button type="text" class="items text-hex-fff" @click="this.$router.push('/login')">亲，请登录</el-button>
        <el-button type="text" class="items text-hex-b0b0b0" @click="this.$router.push('/register')">还没有账号？点此注册</el-button>
      </span>
      <span v-if="isLogin" class="flex items-center cursor-pointer" @click="this.$router.push('/shoppingCart')">
        <el-icon color="#b0b0b0" size="15px" class="text-hex-b0b0b0 text-15px"><ShoppingCartFull /></el-icon>
        <span class="text-hex-b0b0b0 ml-1 text-15px">购物车</span>
      </span>
      <span v-if="isLogin" class="flex items-center cursor-pointer" @click="this.$router.push('/editMsg')">
        <el-avatar src="src/assets/toux.jpeg"/>
        <span class="text-hex-b0b0b0 ml-3 text-15px">userName</span>
      </span>
    </div>
  </div>
  <join-shop ref="joinShopRef"></join-shop>
</template>
<style scoped>
.items:hover {
  color: rgb(255,255,255)
}
</style>