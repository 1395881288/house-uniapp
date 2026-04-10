import request from "@/utils/request.js";

export function createOrder(data) {
  return request.post("app-api/house/transaction/create", data);
}
// 获得优惠劵申请
export function get(id) {
  return request.get('app-api/house/transaction/get?id=' + id)
}