import request from "@/utils/request.js";

export function createBooking(data) {
  return request.post('app-api/house/booking/create',data)
}