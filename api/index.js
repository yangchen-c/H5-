export default {
	// 开发调试地址--自动生效
	// dev: 'http://java-api.molinmall.cn/',
	// pro: 'http://java-api.molinmall.cn/',

	// dev: 'http://192.168.0.119:8080/',
	// pro: 'http://192.168.0.119:8080/', 
	
	
	// dev: 'http://39.100.85.86:9999/',
	// pro: 'http://39.100.85.86:9999/',

	dev: 'http://api.muyunzhaig.com/',
	pro: 'http://api.muyunzhaig.com/',


	// dev: 'http://bpi.hythink.cn/',
	// // 线上环境地址--自动生效
	// pro: 'http://bpi.hythink.cn/',
	//H5 下载地址
	h5down: (uni.getSystemInfoSync().platform === 'other' ? 'http://gvh5.molinmall.cn/pages/down-app/down-app' : '/pages/down-app/down-app'),

	// 上传图片的地址
	unloadLocation: 'https://upload.qiniup.com/',
	// 上传成功之后拼接资源的基础地址
	baseLocation: 'http://gvcdn.molinmall.cn/',
	// 上传至七牛的token 
	upToken: 'o0LJCt2VuwyRhDWaphZRJfQcHbWGh79blp_UgjG4:kU4U_XCm_uNmVoBOKFOLmEFb8DA=:eyJzY29wZSI6InNsZWciLCJkZWFkbGluZSI6NDc0OTEwODM1MH0=',
	/**
	/**
	 * 首页
	 */
	getSliderList: 'Home/getSliderList', // 首页轮播图接口
	getPosterList: 'Home/getPosterList', // 海报接口
	getHomeMsg: 'Home/getHomeMsg', // 获取今日油价
	getConfig: 'Home/getConfig', // 获取系统配置
	getSystemConfig: 'Home/getSystemConfig',//获取系统配置
	getSliderDetail: 'Home/getSliderDetail', // 轮播图详情接口 广告新闻
	editConfig: 'Home/editConfig', // 获取最新版本
	getArticleDetail: 'Home/getArticleDetail', //获取公告详情
	/**
	 * 用户
	 */
	// checkIsRegister: 'user/checkIsRegister', // 验证手机号是否注册
	checkIsRegister: 'user/register', // 验证手机号是否注册
	// sendSms: 'user/sendSms', // 发送验证码
	sendSms: '/user/msgCodeWeb', // 发送验证码
	// register: 'user/register', // 用户注册
	register: 'user/register', // 用户注册
	login: 'user/login', // 登录
	forgetPassword: 'user/forgetPassword', // 忘记密码
	editCashPassword: 'user/editCashPassword', // 修改提现密码 access-token
	getUserDetail: 'user/getUserDetail', // 获取用户详情
	appCount: 'user/appCount', 	// 应用启动次数

	/**
	 * 分享
	 */
	qrcode: 'Qrcode/qrcode', // 分享海报

	/**
	 * 系统
	 */
	getUpdate: 'home/getUpdater',

}
