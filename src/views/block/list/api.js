import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/blockchain',
    method: 'get',
    params
  })
}

