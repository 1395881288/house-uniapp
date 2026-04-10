import request from "@/utils/request.js";

export function getRoomPage(params) {
  return request.get('app-api/house/room/page',params)
}
