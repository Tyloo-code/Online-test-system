import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'http://podolski.cn:5000/api/Students?$expand=class',
    method: 'get',
    params
  })
}

export function getodataList(odataroute) {
  return request({
    url: 'http://podolski.cn:5000/api/Students?$expand=class'+ odataroute,
    method: 'get'
  })
}

export function postList(data) {
  return request({
    url: 'http://podolski.cn:5000/api/Classes',
    method: 'put',
    data
  })
}

export function deleteList(id) {
  return request({
    url: `http://podolski.cn:5000/api/Classes(${id})`,
    method: 'delete'
  })
}

export function postfile(data) {
  return request({
    url: 'http://podolski.cn:5000/api/Files',
    method: 'post',
    data
  })
}