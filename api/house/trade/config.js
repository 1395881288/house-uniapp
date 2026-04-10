import request from "@/utils/request.js";

// 获得交易配置
export function getTradeConfig() {
  return request.get("app-api/house/trade-config/get?id=1");
}