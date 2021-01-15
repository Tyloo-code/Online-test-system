import request from '@/utils/request'

export function getquizzes(odatamark) {
  return request({
    url: 'http://podolski.cn:5000/api/Quizzes?$filter=markdown eq \''+ odatamark  + '\'',
    method: 'get'
  })
}

export function putquizzes(data) {
  return request({
    url: 'http://podolski.cn:5000/api/Quizzes',
    method: 'put',
    data
  })
}

export function putquestions(data) {
  return request({
    url: 'http://podolski.cn:5000/api/Questions',
    method: 'put',
    data
  })
}

export function postfile(data) {
  return request({
    url: 'http://podolski.cn:5000/api/Files',
    method: 'post',
    data
  })
}