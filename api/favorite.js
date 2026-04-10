import request from "@/utils/request.js";

//、、、、、、、、、、、、
// 检查是否收藏过商品
export function isFavoriteExists(roomId) {
  return request.get('app-api/house/favorite/exits', {roomId});
}

// 获得商品收藏数量
export function getFavoriteCount() {
  return request.get('app-api/house/favorite/get-count');
}

// 添加商品收藏
export function createFavorite(roomId) {
  return request.post('app-api/house/favorite/create', {
    roomId
  });
}

// 添加多个商品收藏
export function createFavoriteList(roomIds) {
  return request.post('app-api/house/favorite/create-list', {
    roomIds
  });
}

// 取消商品收藏
export function deleteFavorite(roomId) {
  return request.delete('app-api/house/favorite/delete', {
    roomId
  });
}

// 获得商品收藏分页
export function getFavoritePage(data) {
  return request.get('app-api/house/favorite/page', data);
}

// 取消多个商品收藏
export function deleteFavoriteList(roomIds) {
  return request.delete('app-api/house/favorite/delete-list', {
    roomIds
  });
}

