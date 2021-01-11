import {get} from '@/utils/request'

export function getList(params) {
  return get('http://podolski.cn:5000/api/Quizzes',params)
}
