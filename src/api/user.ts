/*
 * @Descripttion: 
 * @Author: 刘晴
 * @Date: 2022-06-02 11:36:41
 * @LastEditors: 刘晴
 * @LastEditTime: 2022-06-05 21:55:49
 */
import request from '@/utils/request'

export function userLogin(data: any) {
  return request({
    method: 'post',
    url: '/user/login',
    data: data
  })
}
export function userLogout() {
  return request({
    method: 'post',
    url: '/login'
  })
}

export function getUserInfo() {
  return request({
    method: 'get',
    url: '/user/userMsg'
  })
}
export function userRegister(data: any) {
  return request({
    method: 'post',
    url: '/user/addUser',
    data: data
  })
}

export function saveShop(data: any) {
  return request({
    method: 'post',
    url: '/shop/addShop',
    data: data
  })
}

export function editUser(data: any) {
  return request({
    method: 'post',
    url: '/user/updateUser',
    data: data
  })
}

export function updateData(data: any) {
  return request({
    method: 'get',
    url: '/shopTotal/updateData',
    params: data
  })
}
