import request from '@/utils/request'

export function getQuestion(params) {
  return request({
    url: 'http://podolski.cn:5000/api/Questions',
    method: 'get',
    params
  })
}