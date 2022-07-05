<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { getCart, updateCart, deleteCart, deleteAllCart } from '@/api/cart'
import { buildAllOrder } from '@/api/order'
import { onMounted, reactive, ref } from 'vue'
import { ElMessage,ElTable } from 'element-plus'
import { isVoidExpression } from 'typescript'
interface TableDate {
  proName: String,
  shopName: String,
  imgUrl: String,
  price: Number,
  choCnt: Number,
  cartId: String,
  proId: String
}
const tableData: Array<TableDate> = reactive([])
const totalSize = ref()
const request = reactive({
  proName: '',
  shopName: '',
})
const getCartList = () => {
  getCart(request).then((res: any) => {
    if(res.code === 200) {
      tableData.push(...res.rows)
      totalSize.value = res.total
    }
  })
}
onMounted(() => {
  getCartList()
})
const updateCnt = (row: any, type: any) => {
  if(type === 'sub' && row.choCnt<=1) return
  if(type === 'sub' && row.choCnt>1) {
    if(multipleSelection.value.indexOf(row) !==-1) {
      choPrice.value-=row.price
    }
    row.choCnt--    
  } else {
    if(multipleSelection.value.indexOf(row) !==-1) {
      choPrice.value+=row.price
    }
    row.choCnt++
  }
  console.log(row)
  updateCart({
    choCnt: row.choCnt,
    cartId: row.cartId
  }).then((res:any) => {
    if(res.code === 200) {
      console.log('修改成功')
    }
  })
}
const deleteDialogShow = ref(false)
const checkCartId = ref('')
const showDeleteDialog = (cartId: any) => {
  checkCartId.value = cartId
  deleteDialogShow.value = true
}
const onConfirmDelete = () => {
  deleteCart({cartId: checkCartId.value}).then((res: any) => {
    if(res.code === 200) {
      ElMessage({
        message: '删除成功',
        type: "success"
      })
      tableData.length = 0 
      getCartList()
    } else {
      ElMessage({
        message: '删除失败',
        type: "error"
      })
    }
  }).finally(() => {
    deleteDialogShow.value = false
  })
}
const inputValue = ref('')
const selectType = ref('proName')
const searchCart = (value: any) => {
  if(selectType.value === 'proName') {
    request.proName = value
  } else {
    request.shopName = value
  }
  tableData.length = 0
  getCartList()
}
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<TableDate[]>([])
const selectId = ref<String[]>([])
const choTotal = ref(0)
const choPrice = ref(0)
const handleSelectionChange = (val: TableDate[]) => {
  multipleSelection.value = val
  choTotal.value = val.length
  choPrice.value = 0
  selectId.value.length = 0
  if(val.length === totalSize.value) ad.value = true
  else ad.value = false
  val.forEach((val: any) => {
    selectId.value.push(val.cartId)
    choPrice.value += val.price*val.choCnt
  })
}
const ad = ref(false)
const toggleSelection = () => {
  multipleTableRef.value!.toggleAllSelection()
}
const showDeleteAll = ref(false)
const onConfirmDeleteAll = (flag: any) => {
  deleteAllCart(selectId.value).then((res: any) => {
    if(res.code === 200 && flag !== 555) {
      ElMessage({
        message: '删除成功',
        type: "success"
      })
      tableData.length = 0 
      getCartList()
    } else if(res.code === 200 && flag === 555){
      tableData.length = 0 
      getCartList()
    } else {
      ElMessage({
        message: '删除失败',
        type: "error"
      })
    }
  }).finally(() => {
    showDeleteAll.value = false
  })
  console.log(selectId.value)
}
const showBuyAll = ref(false)
const purchaseAll = () => {
  if(selectId.value.length===0) {
    ElMessage({
      message: '您还没有选择任何商品哦',
      type: "error"
    })
  } else {
    showBuyAll.value = true
  }
}
const onConfirmPurchaseAll = () => {
  buildAllOrder(multipleSelection.value).then((res: any) => {
    if(res.code === 200) {
      ElMessage({
        message: '购买成功',
        type: "success"
      })
      onConfirmDeleteAll(555)
    } else {
      ElMessage({
        message: res.msg,
        type: "success"
      })
    }
  }).finally(() => {
    showBuyAll.value = false
  })
}
</script>

<template>
  <my-header></my-header>
  <div class="mt-4 w-1024px mx-auto">
    <div class="p-3 shadow-lg shadow-gray-300 min-h-85vh border border-hex-eee">
      <div
        class="h-45px text-left flex items-center justify-between font-600 p-3 pb-5 border-b border-hex-ccc">
        <span class="flex items-center">
          <el-icon class="mr-1"><ShoppingCartFull /></el-icon>
          我的购物车（全部{{totalSize}}）
        </span>
        <span style="width: 50%">
          <el-input
            v-model="inputValue"
            placeholder="请输入关键字"
            class="input-with-select"
            @input="searchCart"
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
        </span>
      </div>
      <div class="mt-4">
        <el-table
        :data="tableData"
        @selection-change="handleSelectionChange"
        ref="multipleTableRef"
        style="width: 100%; min-height: 350px">
          <el-table-column type="selection" label="全选" width="55" />
          <el-table-column label="商品信息" width="350">
            <template #default="scope">
              <div class="flex">
                <img :src="scope.row.imgUrl" style="width:120px" />
                <div class="ml-3">
                  <div class="proName text-hex-999 text-left h-48px">{{scope.row.proName}}</div>
                  <div class="text-left mt-2 text-hex-999 text-13px flex items-center">
                    <el-icon class="mr-1" color="rgb(253,102,89)"><Shop /></el-icon>
                    <div class="shopName">{{scope.row.shopName}}</div>
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="单价">
            <template #default="scope">
              ￥{{scope.row.price}}
            </template>
          </el-table-column>
          <el-table-column label="数量">
            <template #default="scope">
              <div class="flex items-center">
                <div
                  class="bg-hex-eee border border-hex-eee px-1"
                  @click="updateCnt(scope.row, 'sub')"
                  :style="{cursor: scope.row.choCnt>1?'pointer':'not-allowed'}"><el-icon size="12px"><Minus /></el-icon></div>
                <div class="px-4 border border-hex-aaa">
                  {{scope.row.choCnt}}
                </div>
                <div class="bg-hex-eee border border-hex-eee px-1 cursor-pointer" @click="updateCnt(scope.row, 'add')"><el-icon size="12px"><Plus /></el-icon></div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="金额">
            <template #default="scope">
              <span class="text-hex-FF5000">￥{{scope.row.price*scope.row.choCnt}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100px" align="center">
            <template #default="scope">
              <el-button type="danger" size="small" @click="showDeleteDialog(scope.row.cartId)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog v-model="deleteDialogShow" width="30%">
        确定将它从购物车删除吗？
        <div class="mt-5">
        <el-button @click="deleteDialogShow = false">我再想想</el-button>
        <el-button type="primary" @click="onConfirmDelete">确定</el-button>
      </div>
      </el-dialog>
    </div>
    <div class="car-bottom-top"></div>
    <div class="car-bottom border border-hex-eee bg-white">
      <div class="flex justify-between items-center p-4 border-b border-hex-ccc">
        <span class="flex items-center text-sm text-hex-666">
          <el-checkbox v-model="ad" @click="toggleSelection">全选</el-checkbox>
          <el-link type="danger" class="ml-10" @click="showDeleteAll=true">删除</el-link>
        </span>
        <span class="flex items-center text-sm text-hex-666">
          <span class="flex items-center">
            已选商品<span class="text-xl font-600 text-hex-FF5000 mx-1"> {{choTotal}} </span>件
          </span>
          <span class="flex items-center ml-8">
            合计（不含运费）：
            <span class="text-xl font-600 text-hex-FF5000 mr-3">{{choPrice}}</span>
          </span>
          <span
            class="text-hex-fff bg-hex-FF5000 px-5 py-2 rounded-3xl cursor-pointer"
            @click="purchaseAll">结 算</span>
        </span>
      </div>
    </div>
    <el-dialog v-model="showDeleteAll" width="30%">
      确定将这些商品从购物车删除吗？
      <div class="mt-5">
        <el-button @click="showDeleteAll = false">我再想想</el-button>
        <el-button type="primary" @click="onConfirmDeleteAll">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog v-model="showBuyAll" width="30%">
      确定购买这些商品吗？
      <div class="mt-5">
        <el-button @click="showBuyAll = false">我再想想</el-button>
        <el-button type="primary" @click="onConfirmPurchaseAll">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style scoped>
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
.car-bottom-top {
  position: relative;
  height: 72px;
}
.car-bottom {
  z-index: 99;
  height: 72px;
  background: #fff;
  position: fixed;
  bottom: 0;
  width: 1024px;
  margin: 0 auto;
}
</style>