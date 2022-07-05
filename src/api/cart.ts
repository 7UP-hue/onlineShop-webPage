import request from '@/utils/request'

export function buildCart(data: any) {
  return request({
    url: '/cart/addCart',
    method: 'post',
    data: data
  })
}

export function getCart(data: any) {
  return request({
    url: '/cart/selectPage',
    method: 'post',
    data: data
  })
}

export function updateCart(data: any) {
  return request({
    url: '/cart/updateCart',
    method: 'post',
    data: data
  })
}

export function deleteCart(data: any) {
  return request({
    url: '/cart/deleteCart',
    method: 'get',
    params: data
  })
}

export function deleteAllCart(data: any) {
  return request({
    method: 'post',
    url: '/cart/deleteAll',
    data: data
  })
}