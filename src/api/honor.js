import request from '@/utils/request'
import store from '../store'

export function getList() {
  const org = store.state.user.org
  return request({
    url: '/honor/list',
    method: 'get',
    params: { org: org }
  })
}
export function addHonor(data) {
  const org = store.state.user.org
  data.org = org
  return request({
    url: '/honor',
    method: 'post',
    data
  })
}

export function delHonor(id) {
  return request({
    url: '/honor',
    method: 'DELETE',
    params: { id }
  })
}
export function getHonor(id) {
  return request({
    url: '/honor',
    method: 'get',
    params: { id }
  })
}
export function editHonor(data) {
  return request({
    url: '/honor',
    method: 'PUT',
    params: { id: data._id },
    data
  })
}

