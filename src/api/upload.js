import request from '@/utils/upload'

export function uploadImage(data) {
  data.path = 'image'
  return request({
    url: 'upload/single',
    method: 'post',
    data
  })
}
