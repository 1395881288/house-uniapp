import request from "@/utils/request.js";

 
export function getBuildingPage(params) {
  return request.get('app-api/house/building/page',params)
}
