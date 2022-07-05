/*
 * @Descripttion: 
 * @Author: 刘晴
 * @Date: 2022-06-06 09:08:39
 * @LastEditors: 刘晴
 * @LastEditTime: 2022-06-06 13:30:23
 */
import request from '@/utils/request'

export function buildOrder(data: any) {
  return request({
    url: '/order/addOrder',
    method: 'post',
    data: data
  })
}

export function getOrder(data: any) {
  return request({
    url: '/order/selectPage',
    method: 'post',
    data: data
  })
}

//更改订单状态
export function updateOrder(data: any) {
  return request({
    url: 'order/updateOrder',
    method: 'post',
    data: data
  })
}

//一次购买多个商品
export function buildAllOrder(data: any) {
  return request({
    url: 'order/addAllOrder',
    method: 'post',
    data: data
  })
}