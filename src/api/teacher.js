import request from '@/utils/request'
import store from '../store'

export function getList() {
  const org = store.state.user.org
  return request({
    url: '/teacher/list',
    method: 'get',
    params: { org: org }
  })
}
export function addTeacher(data) {
  const org = store.state.user.org
  data.org = org
  return request({
    url: '/teacher',
    method: 'post',
    data
  })
}

export function delTeacher(id) {
  return request({
    url: '/teacher',
    method: 'DELETE',
    params: { id }
  })
}
export function getTeacher(id) {
  return request({
    url: '/teacher',
    method: 'get',
    params: { id }
  })
}
export function editTeacher(data) {
  return request({
    url: '/teacher',
    method: 'PUT',
    params: { id: data._id },
    data
  })
}
