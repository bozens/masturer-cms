import request from '@/utils/request'
import store from '../store'

export function getList() {
  console.log(store)
  const org = store.state.user.org
  console.log('org', org)
  return request({
    url: '/article/list',
    method: 'get',
    params: { org: org }
  })
}

export function delArticle(id) {
  return request({
    url: '/article',
    method: 'DELETE',
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

