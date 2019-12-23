import request from '@/utils/request'
import store from '../store'

export function getActivityList() {
  console.log(store)
  const org = store.state.user.org
  console.log('org', org)
  return request({
    url: '/activity/list',
    method: 'get',
    params: { org: org }
  })
}

export function addActivity(data) {
  return request({
    url: '/activity',
    method: 'post',
    data
  })
}
export function editActivity(data) {
  return request({
    url: '/activity',
    method: 'PUT',
    params: { id: data._id },
    data
  })
}

export function getActivity(id) {
  return request({
    url: '/activity',
    method: 'get',
    params: { id }
  })
}
export function delActivity(id) {
  return request({
    url: '/activity',
    method: 'DELETE',
    params: { id }
  })
}
