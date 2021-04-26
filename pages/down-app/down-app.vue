<template>
	<view class="container">
		<view class="bg">
			<image class="" :src="config.logo"></image>
		</view>
		
		<!-- 下载按钮 -->
		<view class="down-app" @click="handleDownIos">
			<image src="/static/icon/ios.png"></image>
			<text>立即下载ios版</text>
		</view>
		<view class="down-app" @click="handleDownAndoird">
			<image src="/static/icon/android.png"></image>
			<text>立即下载安卓版</text>
		</view>
		<!-- 文字描述 -->
		<!-- <view class="describe">或请关注公众号“{{config.wechatPublicNumberName}}”进行充值</view> -->
		<!-- 判断微信运行环境 -->
		<tip-open-browser :openBrowserFlag="openBrowserFlag"></tip-open-browser>
	</view>
</template>

<script>
	import tipOpenBrowser from '@/pages/down-app/open-browser.vue'
	export default {
		data() {
			return {
				config: uni.getStorageSync('config'),
				openBrowserFlag: false
			}
		},
		methods: {
			// 点击下载按钮时触发
			handleDownAndoird() {
		        //Android平台下浏览器
		        // window.location.href = 'http://39.100.85.86:8888/apk/app-release.apk'
		        window.location.href = 'http://h5.muyunzhaig.com/apk/app-release.apk'
		    },
		    handleDownIos(){
		        //iOS平台下浏览器
				// alert('苹果版本紧张张罗中...');
				//window.location.href = 'http://cdn.wohitech.com/tf/twz5'
				window.location.href = 'http://longlingmac.com/tf/eqxb'
			},
			// 判断是否微信浏览器
			isWeiXin() {
				var ua = window.navigator.userAgent.toLowerCase()
				if (ua.match(/MicroMessenger/i) == 'micromessenger') {
					return true
				} else {
					return false
				}
			},
		},
		components: {
			tipOpenBrowser
		},
		onLoad() {
			// #ifdef H5
			if (this.isWeiXin()) this.openBrowserFlag = true
			else this.openBrowserFlag = false
			// #endif
			uni.getStorage({
				key: 'config',
				success: (res) =>{
					this.config = res.data;
				}
			})
		}
	}
</script>

<style lang="scss">
page::after{
	content: "";
	display: none;
}
.container {
	width: 100vw;
	height: 100vh;
	background: #000;
	
	.bg {
		width: 750upx;
		display: flex;
		align-items: center;
		justify-content: center;
		
		image{
			margin:154upx 0;
			width: 200upx;
			height: 200upx;
		}
	}
	
	.describe {
		color: #fff;
		text-align: center;
		width: 750upx;
		margin-top: 80upx;
		margin-bottom: 30upx;
	}
	
	.down-app {
		width: 500upx;
		height: 90upx;
		border: 2upx solid #FFFFFF;
		border-radius: 50upx;
		margin: 40upx auto;
		font-size: 17px;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		
		image {
			width: 42upx;
			height: 42upx;
			margin-right: 20upx;
		}
		
		&:active {
			opacity: .8
		}
	}
}
</style>
