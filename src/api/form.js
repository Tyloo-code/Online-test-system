import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'http://podolski.cn:5000/api/Classes',
    method: 'get',
    params
  })
}
