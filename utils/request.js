import {
	HTTP_REQUEST_URL,
	HEADER,
	TOKENNAME,
	HEADERPARAMS
} from '@/config/app';
import {
	toLogin,
	checkLogin
} from '../libs/login';
import store from '../store';
import {
	getTerminal
} from "./util";


/**
 * 将对象序列化为URL查询字符串，用于替代第三方的 qs 库，节省宝贵的体积
 * 支持基本类型值和数组，不支持嵌套对象
 * @param obj 要序列化的对象
 * @returns 序列化后的查询字符串
 */
function stringifyQuery(obj) {

  if (!obj || typeof obj !== 'object' || Array.isArray(obj))
    return ''

  return Object.entries(obj)
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(([key, value]) => {
      // 对键进行编码
      const encodedKey = encodeURIComponent(key)
	console.log(key)
      // 处理数组类型
      if (Array.isArray(value)) {
        return value
          .filter(item => item !== undefined && item !== null)
          .map((item,index) => `${encodedKey}${ecURIComponent(index)}=${encodeURIComponent(item)}`)
          .join('&')
      }

      // 处理基本类型
      return `${encodedKey}=${encodeURIComponent(value)}`
    })
    .join('&')
}

function ecURIComponent(index)
{
	return encodeURIComponent('['+index+']')
}

// TODO ：临时解决 uniapp 在小程序，undefined 会被 tostring 的问题
function deleteUndefinedProperties(obj) {
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			if (typeof obj[key] === 'object' && obj[key] !== null) {
				
				deleteUndefinedProperties(obj[key]); // 递归调用，处理嵌套的对象
				
			} else if (obj[key] === undefined) {
				delete obj[key];
			}
		}
	}
}

/**
 * 发送请求
 */
function baseRequest(url, method, data, {
	noAuth = false,
	noVerify = false
}, params) {
	let Url = HTTP_REQUEST_URL,
		header = HEADER
	if (params != undefined) {
		header = HEADERPARAMS;
	}
	if (!noAuth) {
		//登录过期自动登录
		if (!store.state.app.token && !checkLogin()) {
			// debugger
			toLogin();
			return Promise.reject({
				msg: '未登录'
			});
		}
	}

	deleteUndefinedProperties(data)
	if(method=="get")
	{
		let queryStr=stringifyQuery(data)
		if (url.includes('?')) {
		  url += `&${queryStr}`
		}
		else {
		  url += `?${queryStr}`
		} 
		data=null
	}
	
	// TODO 补个 header 多租户
	if (url.indexOf('app-api') >= 0) {
		header = {
			...header
		}
		header['tenant-id'] = 177
	}

	// 终端
	header['terminal'] = getTerminal()

	if (store.state.app.token) {
		// header[TOKENNAME] = store.state.app.token;
		header['Authorization'] = 'Bearer ' + store.state.app.token;
	}
	console.log(Url+" url "+url)
	return new Promise((reslove, reject) => {
		uni.request({
			// url: url.indexOf('app-api') < 0 ? Url + '/api/front/' + url
			url: url.indexOf('app-api') < 0 ? Url + '/api/front/' + url
				// : 'http://yunai.natapp1.cc/' + url, // TODO ：搞个 url 的配置
				:
				(Url + (url.startsWith("/") ? url : ("/" + url))), // TODO ：搞个 url 的配置
			// : 'http://api.cn/' + url, // TODO ：搞个 url 的配置
			method: method || 'GET',
			header: header,
			data: data || {},
			success: (res) => {
				if (noVerify)
					reslove(res.data, res);
				else if (res.data.code === 200 || res.data.code === 0)
					reslove(res.data, res);
				else if ([410000, 410001, 410002, 401].indexOf(res.data.code) !== -1) {
					toLogin();
					reject(res.data);
				} else
					reject(res.data.msg || res.data.message || '系统错误');
			},
			fail: (msg) => {
				reject('请求失败');
			}
		})
	});
}

const request = {};

['options', 'get', 'post', 'put', 'head', 'delete', 'trace', 'connect'].forEach((method) => {
	request[method] = (api, data, opt, params) => baseRequest(api, method, data, opt || {}, params)
});



export default request;