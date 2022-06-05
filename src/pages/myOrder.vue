<!--
 * @Descripttion: 
 * @Author: 刘晴
 * @Date: 2022-05-30 11:15:44
 * @LastEditors: 刘晴
 * @LastEditTime: 2022-05-31 22:36:10
-->
<script setup lang="ts">
const tableData = [
  {
    proName: '男装印花T恤',
    proNum: '12654897915',
    purchasseNum: 2,
    status: 0
  },
  {
    proName: '男装印花T恤',
    proNum: '12654897915',
    purchasseNum: 2,
    status: 0
  },
  {
    proName: '男装印花T恤',
    proNum: '12654897915',
    purchasseNum: 2,
    status: 1
  },
  {
    proName: '男装印花T恤',
    proNum: '12654897915',
    purchasseNum: 2,
    status: 1
  },
  {
    proName: '男装印花T恤',
    proNum: '12654897915',
    purchasseNum: 2,
    status: 2
  },
  {
    proName: '男装印花T恤',
    proNum: '12654897915',
    purchasseNum: 2,
    status: 2
  }
]
</script>

<template>
  <my-header></my-header>
  <div class="mt-4">
    <div class="p-3 mx-auto shadow-lg shadow-gray-300 border border-hex-eee min-h-80vh" style="width: 70%">
      <el-form :inline="true">
        <el-form-item>
          <el-input placeholder="请输入关键字" />
        </el-form-item>
        <el-form-item>
          <el-button>重置</el-button>
          <el-button type="primary" :icon="Search">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="border border-hex-ccc">
        <el-table :data="tableData" style="width: 100%" >
          <el-table-column prop="proName" label="商品名" align="center"></el-table-column>
          <el-table-column prop="proNum" label="编号" align="center"></el-table-column>
          <el-table-column prop="purchasseNum" label="购买量" align="center"></el-table-column>
          <el-table-column prop="status" label="状态" align="center">
            <template #default="scope">
              <span v-if="scope.row.status===0">待商家确定</span>
              <span v-if="scope.row.status===1">运送中</span>
              <span v-if="scope.row.status===2">已收货</span>
              <span v-if="scope.row.status===3">已取消</span>
            </template>
          </el-table-column>
          <el-table-column prop="action" label="操作" align="center">
            <template #default="scope">
              <el-button v-if="scope.row.status===1" type="primary" size="small" plain>确认收货</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<style scoped>
</style>