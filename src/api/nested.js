import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'http://podolski.cn:5000/api/ClassCourseMaps?$expand=class,course',
    method: 'get',
    params
  })
}

export function getodataList(odataroute) {
  return request({
    url: 'http://podolski.cn:5000/api/ClassCourseMaps?$expand=class,course'+ odataroute,
    method: 'get'
  })
}

export function postList(data) {
  return request({
    url: 'http://podolski.cn:5000/api/Courses',
    method: 'put',
    data
  })
}

export function deleteList(id) {
  return request({
    url: `http://podolski.cn:5000/api/Courses(${id})`,
    method: 'delete'
  })
}