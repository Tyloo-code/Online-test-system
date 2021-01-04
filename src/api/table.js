import {get} from '@/utils/request'

export function getList(params) {
  return get('/dev-api/vue-admin-template/table/list',params)
}
