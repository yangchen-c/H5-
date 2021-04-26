/**
 * 环境判断
 */
import api from '../api'
const dev = api.dev
const pro = api.pro
export const baseURL =
	process.env.NODE_ENV === 'production' ?
	pro // 生产环境接口地址
	:
	dev // 开发环境接口地址
	
/**
 * H5网站
 */
export const webPath =
	process.env.NODE_ENV === 'production' ?
	'http://h5.hythink.cn/#/pages/register/register' // 生产环境接口地址
	:
	'http://h5.hythink.cn/#/pages/register/register' // 开发环境接口地址

/**
 * 当前版本
 */
/* export const version = 4 */