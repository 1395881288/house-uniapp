import request from "@/utils/request.js";

export function getDecorateComponentListByPage(page) {
  return request.get("app-api/promotion/decorate/list", {
    page
  }, {
    noAuth: true // TODO ：后续要做调整
  });
}
