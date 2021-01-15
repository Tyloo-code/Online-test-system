import request from '@/utils/request'
//下拉菜单班级
export function classList(params) {
  return request({
    url: 'http://podolski.cn:5000/api/Classes',
    method: 'get',
    params
  })
}
//下拉菜单课程
export function coueseList(params) {
    return request({
      url: 'http://podolski.cn:5000/api/Courses',
      method: 'get',
      params
    })
  }

//题目类型
export function questiontype(params) {
  return request({
    url: 'http://podolski.cn:5000/api/QuestionTypes',
    method: 'get',
    params
  })
}