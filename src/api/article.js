import request from '@/utils/request'
import store from '../store'

export function getList() {
  const org = store.state.user.org
  return request({
    url: '/article/list',
    method: 'get',
    params: { org: org }
  })
}
export function addArticle(data) {
  const org = store.state.user.org
  data.org = org
  return request({
    url: '/article',
    method: 'post',
    data
  })
}

export function delArticle(id) {
  return request({
    url: '/article',
    method: 'DELETE',
    params: { id }
  })
}
export function getArticle(id) {
  return request({
    url: '/article',
    method: 'get',
    params: { id }
  })
}
export function editArticle(data) {
  return request({
    url: '/article',
    method: 'PUT',
    params: { id: data._id },
    data
  })
}

