import request from '@/utils/upload'

export function uploadImage(data) {
  data.append('path', 'image')
  return request({
    url: 'upload/single',
    method: 'post',
    data
  })
}
export function uploadVideo(data) {
  data.append('path', 'video')
  return request({
    url: 'upload/single',
    method: 'post',
    data
  })
}

