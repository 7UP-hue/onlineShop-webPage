<!--
 * @Descripttion: 
 * @Author: 刘晴
 * @Date: 2022-05-31 10:40:07
 * @LastEditors: 刘晴
 * @LastEditTime: 2022-05-31 21:59:47
-->
<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue'
const shopList = ref([
  {
    proName: 'AK skylan2022年新款夏季短款polo领无袖薄款条纹针织背心马甲女',
    price: '89.00',
    imgSrc: 'src/assets/shopImg1.webp',
    shopName: 'widelia韩国女装',
    sales: 125
  },
  {
    proName: '芝士日【流光花园】法式复古宫廷风连衣裙白色方领重工2022年春夏',
    price: '218.00',
    imgSrc: 'src/assets/shopImg2.webp',
    shopName: '安小落ANLUO',
    sales: 125
  },
  {
    proName: 'TODAYZZ 官方授权 时尚套装女水蓝花牛仔背带裙泡泡袖上衣两件套',
    price: '549.00',
    imgSrc: 'src/assets/shopImg3.webp',
    shopName: 'Milka Studio 设计师品牌集成店',
    sales: 125
  },
  {
    proName: '「GUIER」系带短袖衬衫女设计感小众衬衣夏季新款法式别致上衣',
    price: '119.00',
    imgSrc: 'src/assets/shopImg4.webp',
    shopName: 'GUIER 桂儿',
    sales: 125
  },
  {
    proName: 'AK skylan2022年新款夏季短款polo领无袖薄款条纹针织背心马甲女',
    price: '89.00',
    imgSrc: 'src/assets/shopImg1.webp',
    shopName: 'widelia韩国女装',
    sales: 125
  },
  {
    proName: 'AK skylan2022年新款夏季短款polo领无袖薄款条纹针织背心马甲女',
    price: '89.00',
    imgSrc: 'src/assets/shopImg1.webp',
    shopName: 'widelia韩国女装',
    sales: 125
  },
  {
    proName: 'AK skylan2022年新款夏季短款polo领无袖薄款条纹针织背心马甲女',
    price: '89.00',
    imgSrc: 'src/assets/shopImg1.webp',
    shopName: 'widelia韩国女装',
    sales: 125
  },
  {
    proName: 'AK skylan2022年新款夏季短款polo领无袖薄款条纹针织背心马甲女',
    price: '89.00',
    imgSrc: 'src/assets/shopImg1.webp',
    shopName: 'widelia韩国女装',
    sales: 125
  },
  {
    proName: 'AK skylan2022年新款夏季短款polo领无袖薄款条纹针织背心马甲女',
    price: '89.00',
    imgSrc: 'src/assets/shopImg1.webp',
    shopName: 'widelia韩国女装',
    sales: 125
  },
])
const detailMsgRef = ref()
const isShow = (item: any) => {
  detailMsgRef.value.showDetail(item)
}
</script>
<template>
  <my-header></my-header>
  <div class="mt-4">
    <div class="mx-auto" style="width: 70%">
      <div class="flex items-center">
        <div class="font-mono text-4xl bold text-yellow-500 w-212px">智慧商城</div>
        <el-input
          placeholder="请输入关键字"
          class="input-with-select"
        >
          <template #prepend>
            <el-button :icon="Search" />
          </template>
          <template #append>
            <el-select
              v-model="select"
              placeholder="Select"
              style="width: 115px; color: white"
              class="text-white"
            >
              <el-option label="Restaurant" value="1" />
              <el-option label="Order No." value="2" />
              <el-option label="Tel" value="3" />
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
              <img :src="item.imgSrc" />
              <div class="proName mt-1 text-hex-999 text-left">{{item.proName}}</div>
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