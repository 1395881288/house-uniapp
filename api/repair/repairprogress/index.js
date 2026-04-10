import request from "@/utils/request.js";

// 创建维修进度
export function createProgress(data) {
  return request.post('app-api/repair/progress/create',data)
}

// 更新维修进度
export function updateProgress(data) {
  return request.put('app-api/repair/progress/update',data)
}

// 删除维修进度
export function deleteProgress(id) {
  return request.delete('app-api/repair/progress/delete?id=' + id)
}

// 获得维修进度
export function getProgress(id) {
  return request.get('app-api/repair/progress/get?id=' + id)
}

// 获得维修进度分页
export function getProgressPage(params) {
  return request.get('app-api/repair/progress/page',params)
}
