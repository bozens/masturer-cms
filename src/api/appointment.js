import request from '@/utils/request'
import store from '../store'

export function getList() {
  console.log(store)
  const org = store.state.user.org
  console.log('org', org)
  return request({
    url: '/appointment/list',
    method: 'get',
    params: { org: org }
  })
}

export function delAppointment(id) {
  return request({
    url: '/appointment',
    method: 'DELETE',
    params: { id }
  })
}
export function editAppointment(data) {
  return request({
    url: '/appointment',
    method: 'PUT',
    params: { id: data._id },
    data
  })
}

