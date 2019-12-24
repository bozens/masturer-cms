import request from '@/utils/request'
import store from '../store'

export function getList() {
  const org = store.state.user.org
  return request({
    url: '/vip/list',
    method: 'get',
    params: { org: org }
  })
}
export function addVip(data) {
  const org = store.state.user.org
  data.org = org
  return request({
    url: '/vip',
    method: 'post',
    data
  })
}

export function delVip(id) {
  return request({
    url: '/vip',
    method: 'DELETE',
    params: { id }
  })
}

