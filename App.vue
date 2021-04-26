<script>
	import { version } from '@/config'
	export default {
		onLaunch: function() {
			// #ifdef APP-PLUS
			plus.screen.lockOrientation('portrait-primary') //锁定竖屏
			// #endif
			// #ifdef H5
				this.$fetch(this.$api.getSystemConfig).then(res=> {
					if (!+res.status) throw res.msg
					uni.setStorage({ key: 'config', data: res.content })
				})
			// #endif
			this.$fetch(this.$api.appCount)
			// #ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid, (widgetInfo) => {
				//console.log(widgetInfo)
				var platform = uni.getSystemInfoSync().platform
				console.log(platform)
				// 获取系统配置
				this.$fetch(this.$api.getSystemConfig, {
					version: widgetInfo.version
				}).then(res => {
					//console.log(res);
					if (!+res.status) throw res.msg
					uni.setStorage({ key: 'config', data: res.content })
					// #ifdef APP-PLUS
					if (res.content.is_update  == 1) {
						// ios版本暂时没有，先return
						if (plus.os.name === 'iOS') return
						// 提醒用户更新
						setTimeout(() => {
							uni.reLaunch({ url: '/pages/update/index' })
						}, 3000)
						// uni.showToast({
						// 	title: '发现新版本，即将更新', 
						// 	icon: 'loading', 
						// 	duration: 5000,
						// 	complete: function(){
						// 		setTimeout(() => {
						// 			uni.reLaunch({ url: '/pages/update/index' })
						// 		}, 5000)
						// 	}
						// });
					}
					// #endif
				})
			})
			//#endif
		},
		onShow: function() {
			//console.log('App Show')
		},
		onHide: function() {
			//console.log('App Hide')
		}
	}
</script>

<style>
	@import "colorui/main.css";
	@import url("/components/gaoyia-parse/parse.css");
	/*每个页面公共css */
	page {
		font-size: 28upx;
		color: #5B5B5B;
	}

	page::after {
		content: "";
		position: fixed;
		top: 0;
		/*  #ifdef H5 */
		top: 44px;
		/*  #endif  */
		left: 0;
		box-shadow: inset 0 4upx 8upx 0 rgb(244, 244, 244);
		z-index: 9;
		width: 750upx;
		height: 8upx;
	}

	/* 高度为30的灰色过渡 */
	.hg-30 {
		height: 30upx;
		background: #eff3f5;
	}
	.fhg-30 {
		height: 30upx;
		background: #fff;
	}
	
	/* 高度为30的灰色过渡 */
	.hg-60 {
		height: 60upx;
		background: #eff3f5;
	}
	.fhg-60 {
		height: 60upx;
		background: #fff;
	}
	
	/* 高度为30的灰色过渡 */
	.hg-20 {
		height: 20upx;
		background: #eff3f5;
	}
	.fhg-20 {
		height: 20upx;
		background: #fff;
	}
	
	/* 图片还没有加载出来时 */
	/* image {
		background: #f2f2f2;
	} */
	
	/* input 样式 */
	.input-placeholder {
		color: #999999;
	}
	/* 输入框为空时的占位符样式 */
	.placeholder {
		color: #999999;
	}

	/* 右箭头 */
	.right-arrow {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.right-arrow::after {
		content: "";
		width: 15upx;
		height: 15upx;
		border-top: 3upx solid #ccc;
		border-right: 3upx solid #ccc;
		transform: rotate(45deg);
	}
	
	/* 解决图片预览导航栏层级过高问题 */
	.uni-system-preview-image {
		display: block;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 999;
		width: 100%;
		height: 100%;
		background: #000;
	}
</style>
