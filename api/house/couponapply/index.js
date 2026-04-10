import request from "@/utils/request.js";

// 创建优惠劵申请
export function createCouponApply(data) {
  return request.post('app-api/house/coupon-apply/create',data)
}

// 更新优惠劵申请
export function updateCouponApply(data) {
  return request.put('app-api/house/coupon-apply/update',data)
}

// 删除优惠劵申请
export function deleteCouponApply(id) {
  return request.delete('app-api/house/coupon-apply/delete?id=' + id)
}

// 获得优惠劵申请
export function getCouponApply(id) {
  return request.get('app-api/house/coupon-apply/get?id=' + id)
}

// 获得优惠劵申请分页
export function getCouponApplyPage(params) {
  return request.get('app-api/house/coupon-apply/page',params)
}
// 导出优惠劵申请 Excel
export function exportCouponApplyExcel(params) {
  return request({
    url: 'app-api/house/coupon-apply/export-excel',
    method: 'get',
    params,
    responseType: 'blob'
  })
}