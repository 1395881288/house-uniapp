import request from "@/utils/request.js";

// 创建维修
export function create(data) {
  return request.post('app-api/repair/repair/create',data)
}

// 更新维修
export function update(data) {
  return request.put('app-api/repair/repair/update',data)
}

// 删除维修
export function del(id) {
  return request.delete('app-api/repair/repair/delete?id=' + id)
}

// 获得维修
export function get(id) {
  return request.get('app-api/repair/repair/get?id=' + id)
}

// 获得维修分页
export function getPage(params) {
  return request.get('app-api/repair/repair/page',params)
}