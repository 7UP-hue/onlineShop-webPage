<!--
 * @Descripttion: 
 * @Author: 刘晴
 * @Date: 2022-05-31 10:40:07
 * @LastEditors: 刘晴
 * @LastEditTime: 2022-06-08 21:56:21
-->
<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { onMounted, ref, reactive } from 'vue'
import { getProduct } from '@/api/product'
const shopList = reactive([])
const detailMsgRef = ref()
const isShow = (item: any) => {
  detailMsgRef.value.showDetail(item)
}
const currentPage = ref(1)
const requset = reactive({
  pageNum: 1,
  pageSize: 12,
  type: 'page',
  proName: '',
  shopName: ''
})
const isOver = ref(false)
const getProList = () => {
  requset.pageNum = currentPage.value
  getProduct(requset).then((res: any) => {
    if(res.code === 200) {
      shopList.push(...res.rows)
      loading.value = false
      if(shopList.length>=res.total) isOver.value = true
      else isOver.value = false
    }
  })
}
onMounted(()=> {
  getProList()
})
const loadingMore = () => {
  loading.value = true
  currentPage.value = currentPage.value + 1
  setTimeout(() => {
    getProList()
  },1000)
}
const selectType = ref('proName')
const inputValue = ref('')
const loading = ref(false)
const searchPro = (value: any) => {
  if(selectType.value === 'proName') {
    requset.proName = value
  } else {
    requset.shopName = value
  }
  requset.pageNum = 1
  shopList.length = 0
  getProList()
}
</script>
<template>
  <my-header></my-header>
  <div>
    <div class="mx-auto mt-4" style="width: 70%">
      <div class="flex items-center">
        <div class="font-mono text-4xl bold text-yellow-500 w-212px">智慧商城</div>
        <el-input
          v-model="inputValue"
          placeholder="请输入关键字"
          class="input-with-select"
          @input="searchPro"
        >
          <template #prepend>
            <el-button :icon="Search" />
          </template>
          <template #append>
            <el-select
              v-model="selectType"
              placeholder="请选择查询方式"
              style="width: 150px"
            >
              <el-option label="根据商品名查询" value="proName" />
              <el-option label="根据商铺名查询" value="shopName" />
            </el-select>
          </template>
        </el-input>
      </div>
      <div>
        <el-row :gutter="25" justify="center">
          <el-col
            :span="5"
            v-for="item in shopList"
            :key=item
            @click="isShow(item)"
            class="shopItems h-360px border border-hec-ccc mx-3 my-2 shadow-md shadow-gray-200 cursor-pointer pt-3"
          >
            <div>
              <img :src="item.imgUrl" />
              <div class="proName mt-1 text-hex-999 text-left h-48px">{{item.proName}}</div>
              <div class="text-hex-FD3F31 text-18px mt-2 text-left">￥{{item.price}}</div>
              <div class="text-left mt-2 text-hex-999 text-13px flex items-center">
                <el-icon class="mr-1" color="rgb(253,102,89)"><Shop /></el-icon>
                <div class="shopName">{{item.shopName}}</div>
              </div>
              <div class="text-right mt-2 text-hex-999 text-13px py-1 border-t border-hex-eee">
                销量{{item.sales}}+
              </div>
            </div>
          </el-col>
        </el-row>
        <div
          class="my-5 text-hex-999 cursor-pointer"
          v-loading="loading"
          @click="loadingMore"
          v-if="!isOver"
          >—— ——点击加载更多—— ——
        </div>
        <div
          class="my-5 text-hex-999 cursor-pointer"
          v-else
          >—— ——没有更多了—— ——
        </div>
      </div>
      <show-detail ref="detailMsgRef"></show-detail>
    </div>
  </div>
</template>
<style scoped>
.shopItems:hover {
  border-color: rgb(255,68,0);
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
.proName {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.shopName {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>